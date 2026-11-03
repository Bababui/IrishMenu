"""Fills pub.db with the menu and offers from the frontend (backend/seed/content.json).

Run from the backend folder:   python -m app.seed

Careful: it deletes the database and builds it fresh. Use it only before the boss
starts editing in the admin panel, or his changes are gone.
"""

import datetime as dt
import json
from pathlib import Path

from .database import DB_FILE, Base, SessionLocal, engine
from .models import Category, ItemCode, MenuItem, Offer, OfferWeekday, Serving

CONTENT_FILE = Path(__file__).resolve().parent.parent / "seed" / "content.json"


def split_text(value):
    """Turns a frontend text into (english, german).

    "Guinness"                                -> ("Guinness", None)
    {"de": "Apfelsaft", "en": "Apple juice"}  -> ("Apple juice", "Apfelsaft")
    None                                      -> (None, None)

    German is only kept when it is different from English (our language rule).
    """
    if value is None:
        return None, None
    if isinstance(value, str):
        return value, None
    english = value["en"]
    german = value["de"] if value["de"] != english else None
    return english, german


def to_cents(price):
    """6.5 -> 650.  round(), not int(): in Python 0.29 * 100 is 28.999999999999996."""
    if price is None:
        return None
    return round(price * 100)


def seed():
    content = json.loads(CONTENT_FILE.read_text(encoding="utf-8"))

    # Start from an empty database every time
    DB_FILE.unlink(missing_ok=True)
    Base.metadata.create_all(engine)

    with SessionLocal() as session:
        # 1. Categories, in the order of the menu
        for position, data in enumerate(content["categories"]):
            label_en, label_de = split_text(data["label"])
            session.add(
                Category(
                    id=data["id"],
                    menu_group=data["group"],
                    label_en=label_en,
                    label_de=label_de,
                    position=position,
                )
            )

        # 2. Menu items, each with its servings and codes
        next_position = {}  # category id -> position of the next item in that category
        for data in content["items"]:
            category_id = data["category"]
            position = next_position.get(category_id, 0)
            next_position[category_id] = position + 1

            name_en, name_de = split_text(data["name"])
            description_en, description_de = split_text(data.get("description"))
            item = MenuItem(
                category_id=category_id,
                name_en=name_en,
                name_de=name_de,
                description_en=description_en,
                description_de=description_de,
                position=position,
            )

            for serving_position, serving in enumerate(data["servings"]):
                label_en, label_de = split_text(serving.get("label"))
                item.servings.append(
                    Serving(
                        label_en=label_en,
                        label_de=label_de,
                        price_cents=to_cents(serving["price"]),
                        position=serving_position,
                    )
                )

            for code in data.get("codes", []):
                item.codes.append(ItemCode(code=code))

            session.add(item)

        # 3. Offers
        for data in content["offers"]:
            dates = data.get("dates") or []
            if len(dates) > 1:
                raise ValueError(f"Offer {data['id']} has several dates; the database keeps one per offer")

            title_en, title_de = split_text(data["title"])
            note_en, note_de = split_text(data.get("note"))
            offer = Offer(
                title_en=title_en,
                title_de=title_de,
                note_en=note_en,
                note_de=note_de,
                price_cents=to_cents(data.get("price")),
                regular_price_cents=to_cents(data.get("regularPrice")),
                date=dt.date.fromisoformat(dates[0]) if dates else None,
            )
            for weekday in data.get("weekdays") or []:
                offer.weekdays.append(OfferWeekday(weekday=weekday))
            session.add(offer)

        session.commit()

        print(f"Categories: {session.query(Category).count()}")
        print(f"Menu items: {session.query(MenuItem).count()}")
        print(f"Servings:   {session.query(Serving).count()}")
        print(f"Codes:      {session.query(ItemCode).count()}")
        print(f"Offers:     {session.query(Offer).count()}")


if __name__ == "__main__":
    seed()
