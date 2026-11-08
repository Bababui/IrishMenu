"""Tests for "Same as Monday": POST /api/admin/offers/copy-day.

Written before the code (this is called test-driven development):
the tests describe what copy_day must do, then you write it until they all pass.
"""

import datetime as dt

from app.clock import berlin_today


def in_days(days):
    return (berlin_today() + dt.timedelta(days=days)).isoformat()


MONDAY = in_days(1)
TUESDAY = in_days(2)


def add_special(admin, title, date=MONDAY, **extra):
    response = admin.post("/api/admin/offers", json={"title_en": title, "date": date, "price": 5, **extra})
    assert response.status_code == 201
    return response.json()


def copy(admin, from_date=MONDAY, to_date=TUESDAY):
    return admin.post("/api/admin/offers/copy-day", json={"from_date": from_date, "to_date": to_date})


def test_specials_are_copied_to_the_other_day(admin):
    add_special(admin, "Guinness 0,5 l", note_en="Only today", regular_price=6.5)
    add_special(admin, "Irish Coffee")

    response = copy(admin)

    assert response.status_code == 201
    copies = response.json()
    assert [offer["title_en"] for offer in copies] == ["Guinness 0,5 l", "Irish Coffee"]
    assert copies[0]["date"] == TUESDAY
    assert copies[0]["note_en"] == "Only today"
    assert copies[0]["price"] == 5.0
    assert copies[0]["regular_price"] == 6.5
    # the originals stay on Monday: 2 originals + 2 copies
    assert len(admin.get("/api/admin/offers").json()) == 4


def test_weekly_specials_are_not_copied(admin):
    admin.post("/api/admin/offers", json={"title_en": "Whiskey Wednesday", "weekdays": [3], "price": 5})

    assert copy(admin).json() == []


def test_specials_already_on_that_day_are_skipped(admin):
    add_special(admin, "Guinness 0,5 l")
    copy(admin)

    second_time = copy(admin)  # the boss presses the button again

    assert second_time.json() == []
    assert len(admin.get("/api/admin/offers").json()) == 2  # no duplicates


def test_cannot_copy_into_the_past(admin):
    assert copy(admin, to_date=in_days(-1)).status_code == 422


def test_cannot_copy_a_day_onto_itself(admin):
    assert copy(admin, to_date=MONDAY).status_code == 422


def test_copying_needs_a_login(client):
    assert client.post("/api/admin/offers/copy-day", json={"from_date": MONDAY, "to_date": TUESDAY}).status_code == 401
