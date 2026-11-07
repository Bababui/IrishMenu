"""Adds 2 test events to pub.db, so we can test /api/events. Practice only, delete later.

Run from the backend folder:   python add_test_events.py
"""

import datetime as dt

from app.database import SessionLocal
from app.models import Event

with SessionLocal() as session:
    # One event with everything filled in
    session.add(
        Event(
            date=dt.date(2026, 11, 13),
            time=dt.time(20, 0),
            title_en="Pub Quiz",
            description_en="Teams of up to 6",
            description_de="Teams bis 6 Personen",
        )
    )
    # One event with only the required fields: no time, no description
    session.add(Event(date=dt.date(2026, 11, 21), title_en="Live: Irish folk"))
    session.commit()

print("2 events added")
