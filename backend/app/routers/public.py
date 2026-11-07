"""Endpoints for the guest site. Read-only: anyone can call them, nobody can change anything."""

import datetime as dt

from fastapi import APIRouter, Depends
from sqlalchemy import or_, select
from sqlalchemy.orm import Session, selectinload

from ..clock import berlin_today
from ..database import get_session
from ..models import Category, Event, MenuItem, Offer
from ..serializers import category_to_dict, event_to_dict, item_to_dict, offer_to_dict

router = APIRouter(prefix="/api", tags=["guest site"])


def cutoff_date():
    """Yesterday in Heilbronn. Things dated before this are over.

    Why yesterday and not today: at 00:30 it's already Wednesday, but for the pub it's
    still Tuesday night. The frontend knows the opening hours and does the exact cut;
    the backend only throws away what is definitely over.
    """
    return berlin_today() - dt.timedelta(days=1)


@router.get("/menu")
def get_menu(session: Session = Depends(get_session)):
    """All categories and items, in menu order."""
    categories = session.scalars(select(Category).order_by(Category.position)).all()
    items = session.scalars(
        select(MenuItem)
        .join(MenuItem.category)
        .order_by(Category.position, MenuItem.position)
        # Load all servings and codes in 2 extra queries instead of 2 per item (448 queries)
        .options(selectinload(MenuItem.servings), selectinload(MenuItem.codes))
    ).all()
    return {
        "categories": [category_to_dict(category) for category in categories],
        "items": [item_to_dict(item) for item in items],
    }


@router.get("/offers")
def get_offers(session: Session = Depends(get_session)):
    """Repeating offers, plus one-off offers that aren't over yet."""
    offers = session.scalars(
        select(Offer)
        .where(or_(Offer.date.is_(None), Offer.date >= cutoff_date()))
        .order_by(Offer.id)
        .options(selectinload(Offer.weekdays))
    ).all()
    return [offer_to_dict(offer) for offer in offers]


@router.get("/events")
def get_events(session: Session = Depends(get_session)):
    """Events that aren't over yet, soonest first."""
    events = session.scalars(
        select(Event)
        .where(Event.date >= cutoff_date())
        .order_by(Event.date, Event.time)
    ).all()
    return [event_to_dict(event) for event in events]
