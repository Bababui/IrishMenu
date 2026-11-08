"""Endpoints for the admin panel: create, change and delete.

Every endpoint here needs a valid login token (see auth.py).
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func, select
from sqlalchemy.orm import Session, selectinload

from ..auth import require_admin
from ..database import get_session
from ..models import Category, Event, ItemCode, MenuItem, Offer, OfferWeekday, Serving
from ..schemas import (
    CategoryOut,
    CopyDayIn,
    EventIn,
    EventOut,
    MenuItemIn,
    MenuItemOut,
    OfferIn,
    OfferOut,
)

# dependencies=[...] runs require_admin before every endpoint in this router
router = APIRouter(prefix="/api/admin", tags=["admin"], dependencies=[Depends(require_admin)])


def get_or_404(session, model, row_id):
    """Loads one row by id, or stops the request with "404 Not Found"."""
    row = session.get(model, row_id)
    if row is None:
        raise HTTPException(status_code=404, detail=f"{model.__name__} {row_id} not found")
    return row


def to_cents(price):
    """Decimal("6.50") -> 650. With Decimal this is exact, no rounding needed."""
    if price is None:
        return None
    return int(price * 100)


# ---------- Events ----------


@router.get("/events", response_model=list[EventOut])
def list_events(session: Session = Depends(get_session)):
    """All events, past ones too, so the boss sees everything he has entered."""
    return session.scalars(select(Event).order_by(Event.date, Event.time)).all()


@router.post("/events", response_model=EventOut, status_code=201)
def create_event(data: EventIn, session: Session = Depends(get_session)):
    event = Event(**data.model_dump())
    session.add(event)
    session.commit()
    return event


@router.put("/events/{event_id}", response_model=EventOut)
def update_event(event_id: int, data: EventIn, session: Session = Depends(get_session)):
    event = get_or_404(session, Event, event_id)
    for field, value in data.model_dump().items():
        setattr(event, field, value)
    session.commit()
    return event


@router.delete("/events/{event_id}", status_code=204)
def delete_event(event_id: int, session: Session = Depends(get_session)):
    event = get_or_404(session, Event, event_id)
    session.delete(event)
    session.commit()


# ---------- Offers ----------


def fill_offer(offer, data):
    """Copies the checked data onto an offer row. Used by create and update."""
    offer.title_en = data.title_en
    offer.title_de = data.title_de
    offer.note_en = data.note_en
    offer.note_de = data.note_de
    offer.price_cents = to_cents(data.price)
    offer.regular_price_cents = to_cents(data.regular_price)
    offer.date = data.date
    # Replace the whole list; delete-orphan removes the weekday rows that are no longer in it
    offer.weekdays = [OfferWeekday(weekday=weekday) for weekday in data.weekdays]


@router.get("/offers", response_model=list[OfferOut])
def list_offers(session: Session = Depends(get_session)):
    offers = session.scalars(select(Offer).order_by(Offer.id)).all()
    return [OfferOut.from_row(offer) for offer in offers]


@router.post("/offers", response_model=OfferOut, status_code=201)
def create_offer(data: OfferIn, session: Session = Depends(get_session)):
    offer = Offer()
    fill_offer(offer, data)
    session.add(offer)
    session.commit()
    return OfferOut.from_row(offer)


@router.put("/offers/{offer_id}", response_model=OfferOut)
def update_offer(offer_id: int, data: OfferIn, session: Session = Depends(get_session)):
    offer = get_or_404(session, Offer, offer_id)
    fill_offer(offer, data)
    session.commit()
    return OfferOut.from_row(offer)


@router.delete("/offers/{offer_id}", status_code=204)
def delete_offer(offer_id: int, session: Session = Depends(get_session)):
    offer = get_or_404(session, Offer, offer_id)
    session.delete(offer)
    session.commit()



@router.post("/offers/copy-day", response_model=list[OfferOut], status_code=201)
def copy_day(data: CopyDayIn, session: Session = Depends(get_session)):
    """Copies the one-off specials of data.from_date to data.to_date ("Same as Monday").

    Rules (tests/test_copy_day.py checks every one):
    - Only one-off specials, the ones whose date is from_date. Weekly specials
      repeat by themselves, so they are never copied.
    - A copy is a new Offer with the same title, note and prices, but date = to_date.
    - A special whose English title is already on to_date is skipped, so pressing
      the button twice doesn't create duplicates.
    - Returns the new offers as a list (OfferOut.from_row), [] if nothing was copied.
    """
    # TODO (Giorgi)
    raise NotImplementedError("copy_day is not written yet")

# ---------- Menu items ----------


@router.get("/categories", response_model=list[CategoryOut])
def list_categories(session: Session = Depends(get_session)):
    return session.scalars(select(Category).order_by(Category.position)).all()


@router.get("/items", response_model=list[MenuItemOut])
def list_items(session: Session = Depends(get_session)):
    items = session.scalars(
        select(MenuItem)
        .join(MenuItem.category)
        .order_by(Category.position, MenuItem.position)
        .options(selectinload(MenuItem.servings), selectinload(MenuItem.codes))
    ).all()
    return [MenuItemOut.from_row(item) for item in items]


def check_category(session, category_id):
    """Pydantic can't know which categories exist; only the database does."""
    if session.get(Category, category_id) is None:
        raise HTTPException(status_code=422, detail=f"Unknown category: {category_id}")


def end_of_category(session, category_id):
    """Position for an item added at the end of a category: the highest position + 1."""
    highest = session.scalar(
        select(func.max(MenuItem.position)).where(MenuItem.category_id == category_id)
    )
    return 0 if highest is None else highest + 1  # None: the category is still empty


def fill_item(item, data):
    """Copies the checked data onto an item row. Used by create and update."""
    item.category_id = data.category_id
    item.name_en = data.name_en
    item.name_de = data.name_de
    item.description_en = data.description_en
    item.description_de = data.description_de
    item.codes = [ItemCode(code=code) for code in data.codes]
    item.servings = [
        Serving(
            label_en=serving.label_en,
            label_de=serving.label_de,
            price_cents=to_cents(serving.price),
            position=position,
        )
        for position, serving in enumerate(data.servings)
    ]


@router.post("/items", response_model=MenuItemOut, status_code=201)
def create_item(data: MenuItemIn, session: Session = Depends(get_session)):
    check_category(session, data.category_id)
    item = MenuItem(position=end_of_category(session, data.category_id))
    fill_item(item, data)
    session.add(item)
    session.commit()
    return MenuItemOut.from_row(item)


@router.put("/items/{item_id}", response_model=MenuItemOut)
def update_item(item_id: int, data: MenuItemIn, session: Session = Depends(get_session)):
    item = get_or_404(session, MenuItem, item_id)
    check_category(session, data.category_id)
    if data.category_id != item.category_id:
        # Moved to another category: put it at the end there
        item.position = end_of_category(session, data.category_id)
    fill_item(item, data)
    session.commit()
    return MenuItemOut.from_row(item)


@router.delete("/items/{item_id}", status_code=204)
def delete_item(item_id: int, session: Session = Depends(get_session)):
    item = get_or_404(session, MenuItem, item_id)
    session.delete(item)  # servings and codes go with it (cascade)
    session.commit()
