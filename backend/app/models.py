"""The database tables, written as Python classes. SQLAlchemy turns each class into a table."""

import datetime as dt

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base

# Language rule: English is required, German is optional.
# If a German column is empty (None), the guest site shows the English text.


class Category(Base):
    """A heading on the menu, e.g. "Bier vom Fass", and the group button it sits under."""

    __tablename__ = "categories"

    id: Mapped[str] = mapped_column(primary_key=True)  # e.g. "draught"
    menu_group: Mapped[str]  # e.g. "beer"
    label_en: Mapped[str]
    label_de: Mapped[str | None]
    position: Mapped[int]  # order on the menu

    items: Mapped[list["MenuItem"]] = relationship(
        back_populates="category", order_by="MenuItem.position"
    )


class MenuItem(Base):
    # One drink or dish

    __tablename__ = "menu_items"

    id: Mapped[int] = mapped_column(primary_key=True)
    category_id: Mapped[str] = mapped_column(ForeignKey("categories.id"))
    name_en: Mapped[str]
    name_de: Mapped[str | None]
    description_en: Mapped[str | None]
    description_de: Mapped[str | None]
    position: Mapped[int]  # order inside its category

    category: Mapped[Category] = relationship(back_populates="items")
    servings: Mapped[list["Serving"]] = relationship(
        back_populates="item", cascade="all, delete-orphan", order_by="Serving.position"
    )
    codes: Mapped[list["ItemCode"]] = relationship(
        back_populates="item", cascade="all, delete-orphan", order_by="ItemCode.id"
    )


class Serving(Base):
    """One way to serve a menu item, e.g. "0.3 l" or "vegan"."""

    __tablename__ = "servings"

    id: Mapped[int] = mapped_column(primary_key=True)
    item_id: Mapped[int] = mapped_column(ForeignKey("menu_items.id"))
    label_en: Mapped[str | None]  # optional: 33 servings on the menu have no label
    label_de: Mapped[str | None]
    price_cents: Mapped[int]  # 650 means 6.50 €
    position: Mapped[int]  # order inside its item

    item: Mapped[MenuItem] = relationship(back_populates="servings")



class ItemCode(Base):
    """One allergen or additive code on one item, e.g. "A" or "3"."""

    __tablename__ = "item_codes"

    id: Mapped[int] = mapped_column(primary_key=True)
    item_id: Mapped[int] = mapped_column(ForeignKey("menu_items.id"))
    code: Mapped[str]

    item: Mapped[MenuItem] = relationship(back_populates="codes")


class Offer(Base):
    """A special offer: on one date, or every week on some weekdays, or both."""

    __tablename__ = "offers"

    id: Mapped[int] = mapped_column(primary_key=True)
    title_en: Mapped[str]
    title_de: Mapped[str | None]
    note_en: Mapped[str | None]
    note_de: Mapped[str | None]
    price_cents: Mapped[int | None]  # special price, if there is one
    regular_price_cents: Mapped[int | None]  # shown crossed out next to the special price
    date: Mapped[dt.date | None]  # only for one-off offers

    weekdays: Mapped[list["OfferWeekday"]] = relationship(
        back_populates="offer", cascade="all, delete-orphan", order_by="OfferWeekday.weekday"
    )


class OfferWeekday(Base):
    """One weekday a repeating offer runs on. 0 = Sunday ... 6 = Saturday, like the frontend."""

    __tablename__ = "offer_weekdays"

    id: Mapped[int] = mapped_column(primary_key=True)
    offer_id: Mapped[int] = mapped_column(ForeignKey("offers.id"))
    weekday: Mapped[int]

    offer: Mapped[Offer] = relationship(back_populates="weekdays")


class Event(Base):
    """Quiz night, live music and so on."""

    __tablename__ = "events"

    id: Mapped[int] = mapped_column(primary_key=True)
    date: Mapped[dt.date]
    time: Mapped[dt.time | None]  # start time, optional
    title_en: Mapped[str]
    title_de: Mapped[str | None]
    description_en: Mapped[str | None]
    description_de: Mapped[str | None]
