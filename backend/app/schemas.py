"""What the admin panel is allowed to send.

Pydantic checks every incoming request against these classes before our code runs.
Anything that doesn't fit is rejected with an error that says which field is wrong,
and nothing reaches the database.

Rule of thumb: never trust what arrives. The admin UI will use date pickers and so on,
but anyone can send a request to the API directly (you did it yourself in /docs).
"""

import datetime as dt
from decimal import Decimal
from typing import Annotated

from pydantic import (
    BaseModel,
    BeforeValidator,
    ConfigDict,
    Field,
    StringConstraints,
    field_validator,
    model_validator,
)

from .clock import berlin_today


def empty_to_none(value):
    """A field the boss left blank arrives as "" (or "   "). We store that as None: "not filled in"."""
    if isinstance(value, str) and value.strip() == "":
        return None
    return value


# Reusable field types. strip_whitespace removes spaces at the start and end,
# so "  Pub Quiz " is saved as "Pub Quiz" and "   " doesn't count as a title.
ShortText = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=120)]
LongText = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=500)]
OptionalShortText = Annotated[ShortText | None, BeforeValidator(empty_to_none)]
OptionalLongText = Annotated[LongText | None, BeforeValidator(empty_to_none)]


def comma_to_dot(value):
    """The boss types "6,50" like any German would. Python needs "6.50"."""
    if isinstance(value, str):
        return value.replace(",", ".")
    return value


# A price in euros: more than 0, at most 1000, at most 2 decimal places (6.555 is rejected).
# Decimal instead of float, so 0.29 stays exactly 0.29 (see to_cents in admin.py).
Price = Annotated[Decimal, BeforeValidator(comma_to_dot), Field(gt=0, le=1000, decimal_places=2)]
OptionalPrice = Annotated[Price | None, BeforeValidator(empty_to_none)]


# ---------- Events ----------


class EventIn(BaseModel):
    """What the boss sends when he creates or changes an event."""

    date: dt.date  # "2026-02-31" or "13.11.2026" are rejected automatically
    time: Annotated[dt.time | None, BeforeValidator(empty_to_none)] = None  # "25:70" is rejected automatically
    title_en: ShortText
    title_de: OptionalShortText = None
    description_en: OptionalLongText = None
    description_de: OptionalLongText = None

    @field_validator("date")
    @classmethod
    def not_in_the_past(cls, value):
        if value < berlin_today():
            raise ValueError("This date is in the past")
        return value

    @model_validator(mode="after")
    def german_needs_english(self):
        # Our language rule: English is the main text, German only when it's different
        if self.title_de == self.title_en:
            self.title_de = None
        if self.description_de is not None and self.description_en is None:
            raise ValueError("Please write the English description too (German is only added when it's different)")
        return self


class EventOut(BaseModel):
    """What the admin panel gets back: every field, as stored, plus the id."""

    model_config = ConfigDict(from_attributes=True)  # lets Pydantic read a database row directly

    id: int
    date: dt.date
    time: dt.time | None
    title_en: str
    title_de: str | None
    description_en: str | None
    description_de: str | None


# ---------- Offers ----------


class OfferIn(BaseModel):
    """What the boss sends when he creates or changes an offer."""

    title_en: ShortText
    title_de: OptionalShortText = None
    note_en: OptionalLongText = None
    note_de: OptionalLongText = None
    price: OptionalPrice = None  # special price in euros, e.g. 5.00 or "5,00"
    regular_price: OptionalPrice = None  # shown crossed out next to the special price
    date: Annotated[dt.date | None, BeforeValidator(empty_to_none)] = None  # one-off offers
    weekdays: list[Annotated[int, Field(ge=0, le=6)]] = []  # 0 = Sunday ... 6 = Saturday

    @field_validator("date")
    @classmethod
    def not_in_the_past(cls, value):
        if value is not None and value < berlin_today():
            raise ValueError("This date is in the past")
        return value

    @field_validator("weekdays")
    @classmethod
    def no_duplicate_days(cls, value):
        return sorted(set(value))  # [5, 2, 5] -> [2, 5]

    @model_validator(mode="after")
    def german_needs_english(self):
        if self.title_de == self.title_en:
            self.title_de = None
        if self.note_de is not None and self.note_en is None:
            raise ValueError("Please write the English note too (German is only added when it's different)")
        return self

    @model_validator(mode="after")
    def date_or_weekday(self):
        if self.date is None and len(self.weekdays) == 0:
            raise ValueError("Please fill in a date or at least one weekday")
        return self
    
    @model_validator(mode="after")
    def price_rule(self):
        if self.price is not None and self.regular_price is not None and self.price >= self.regular_price:
            raise ValueError("The special price must be lower than the regular price")
        return self


class OfferOut(BaseModel):
    """What the admin panel gets back. Prices in euros, weekdays as a simple list."""

    id: int
    title_en: str
    title_de: str | None
    note_en: str | None
    note_de: str | None
    price: float | None
    regular_price: float | None
    date: dt.date | None
    weekdays: list[int]

    @classmethod
    def from_row(cls, offer):
        """Database row -> OfferOut. Needed because the columns don't match 1:1
        (price_cents -> price, OfferWeekday rows -> a list of numbers)."""
        return cls(
            id=offer.id,
            title_en=offer.title_en,
            title_de=offer.title_de,
            note_en=offer.note_en,
            note_de=offer.note_de,
            price=None if offer.price_cents is None else offer.price_cents / 100,
            regular_price=None if offer.regular_price_cents is None else offer.regular_price_cents / 100,
            date=offer.date,
            weekdays=[offer_weekday.weekday for offer_weekday in offer.weekdays],
        )


# ---------- Menu items ----------

# The codes from the paper menu's legend: numbers = additives, letters = allergens
ALLOWED_CODES = {"1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I"}


class ServingIn(BaseModel):
    """One size and price. The label is optional: a burger's base price has none."""

    label_en: OptionalShortText = None
    label_de: OptionalShortText = None
    price: Price  # required: a serving without a price makes no sense

    @model_validator(mode="after")
    def german_needs_english(self):
        if self.label_de == self.label_en:
            self.label_de = None
        if self.label_de is not None and self.label_en is None:
            raise ValueError("Please write the English label too (German is only added when it's different)")
        return self


class MenuItemIn(BaseModel):
    """What the boss sends when he creates or changes a drink or dish."""

    category_id: str  # checked against the database in the endpoint
    name_en: ShortText
    name_de: OptionalShortText = None
    description_en: OptionalLongText = None
    description_de: OptionalLongText = None
    codes: list[str] = []
    servings: list[ServingIn] = Field(min_length=1, max_length=10)  # at least one price

    @field_validator("codes")
    @classmethod
    def known_codes_only(cls, value):
        codes = {code.strip().upper() for code in value}  # " a" -> "A", duplicates disappear
        unknown = codes - ALLOWED_CODES
        if unknown:
            raise ValueError(f"Unknown codes: {', '.join(sorted(unknown))}")
        return sorted(codes)  # numbers first, then letters, like the paper menu

    @model_validator(mode="after")
    def german_needs_english(self):
        if self.name_de == self.name_en:
            self.name_de = None
        if self.description_de is not None and self.description_en is None:
            raise ValueError("Please write the English description too (German is only added when it's different)")
        return self


class ServingOut(BaseModel):
    label_en: str | None
    label_de: str | None
    price: float


class MenuItemOut(BaseModel):
    id: int
    category_id: str
    position: int
    name_en: str
    name_de: str | None
    description_en: str | None
    description_de: str | None
    codes: list[str]
    servings: list[ServingOut]

    @classmethod
    def from_row(cls, item):
        return cls(
            id=item.id,
            category_id=item.category_id,
            position=item.position,
            name_en=item.name_en,
            name_de=item.name_de,
            description_en=item.description_en,
            description_de=item.description_de,
            codes=[item_code.code for item_code in item.codes],
            servings=[
                ServingOut(label_en=serving.label_en, label_de=serving.label_de, price=serving.price_cents / 100)
                for serving in item.servings
            ],
        )


class CategoryOut(BaseModel):
    """For the category dropdown in the admin panel."""

    model_config = ConfigDict(from_attributes=True)

    id: str
    menu_group: str
    label_en: str
    label_de: str | None
