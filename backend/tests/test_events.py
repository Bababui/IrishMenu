import datetime as dt

import pytest

from app.clock import berlin_today


def in_days(days):
    """A date relative to today, as text: tests must keep working next year too."""
    return (berlin_today() + dt.timedelta(days=days)).isoformat()


def test_new_event_shows_on_guest_site(admin):
    response = admin.post("/api/admin/events", json={"date": in_days(7), "time": "20:00", "title_en": "  Pub Quiz "})
    assert response.status_code == 201
    assert response.json()["title_en"] == "Pub Quiz"  # spaces trimmed

    events = admin.get("/api/events").json()
    assert events == [{"id": "1", "date": in_days(7), "time": "20:00", "title": {"de": "Pub Quiz", "en": "Pub Quiz"}}]


# parametrize runs the same test once for every input in the list
@pytest.mark.parametrize(
    "bad_event",
    [
        {"date": "2026-02-31", "title_en": "Quiz"},  # no 31st February
        {"date": in_days(7), "time": "25:70", "title_en": "Quiz"},  # impossible time
        {"date": in_days(-7), "title_en": "Quiz"},  # in the past
        {"date": in_days(7), "title_en": "   "},  # only spaces
        {"date": in_days(7), "title_en": "Quiz", "description_de": "Nur Deutsch"},  # German without English
    ],
)
def test_bad_events_are_rejected(admin, bad_event):
    assert admin.post("/api/admin/events", json=bad_event).status_code == 422
    assert admin.get("/api/admin/events").json() == []  # nothing was saved


def test_deleting_a_missing_event_gives_404(admin):
    assert admin.delete("/api/admin/events/99").status_code == 404
