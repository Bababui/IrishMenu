"""Turns database rows into the JSON shapes the frontend expects (see src/types.ts).

"Serializing" means turning objects into plain data (dicts, lists, strings, numbers)
that can be sent over the internet as JSON.
"""


def translatable(en, de):
    """Text that may be the same in both languages (frontend type `Translatable`).

    No German, or German == English  ->  "Guinness"
    Different German                 ->  {"de": "Apfelsaft", "en": "Apple juice"}
    """
    if de is None or de == en:
        return en
    return {"de": de, "en": en}


def localized(en, de):
    """Text that always has both languages (frontend type `Localized`).
    Empty German falls back to English: our language rule."""
    return {"de": de if de is not None else en, "en": en}


def euros(cents):
    """650 -> 6.5. The frontend formats it as "6,50 €"."""
    if cents is None:
        return None
    return cents / 100


def category_to_dict(category):
    return {
        "id": category.id,
        "group": category.menu_group,
        "label": localized(category.label_en, category.label_de),
    }


def serving_to_dict(serving):
    result = {"price": euros(serving.price_cents)}
    if serving.label_en is not None:
        result["label"] = translatable(serving.label_en, serving.label_de)
    return result


def item_to_dict(item):
    # Required fields first, optional ones only when they have a value:
    # the frontend checks `if (drink.description)`, so a missing key means "none".
    result = {
        "id": str(item.id),
        "name": translatable(item.name_en, item.name_de),
        "category": item.category_id,
        "servings": [serving_to_dict(serving) for serving in item.servings],
    }
    if item.description_en is not None:
        result["description"] = localized(item.description_en, item.description_de)
    codes = [item_code.code for item_code in item.codes]
    if codes:
        result["codes"] = codes
    return result


def offer_to_dict(offer):
    result = {
        "id": str(offer.id),
        "title": localized(offer.title_en, offer.title_de),
    }
    if offer.note_en is not None:
        result["note"] = localized(offer.note_en, offer.note_de)
    if offer.price_cents is not None:
        result["price"] = euros(offer.price_cents)
    if offer.regular_price_cents is not None:
        result["regularPrice"] = euros(offer.regular_price_cents)
    if offer.date is not None:
        result["dates"] = [offer.date.isoformat()]  # date(2026, 10, 27) -> "2026-10-27"
    weekdays = [offer_weekday.weekday for offer_weekday in offer.weekdays]
    if weekdays:
        result["weekdays"] = weekdays
    return result


def event_to_dict(event):
    result = {
        "id": str(event.id),
        "date": event.date.isoformat(),
        "title": localized(event.title_en, event.title_de),
    }
    if event.time is not None:
        result["time"] = event.time.strftime("%H:%M")
    if event.description_en is not None:
        result["description"] = localized(event.description_en, event.description_de)

    return result
