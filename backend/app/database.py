"""Database connection: where the database file lives and how Python talks to it."""

from pathlib import Path

from sqlalchemy import Engine, create_engine, event
from sqlalchemy.orm import DeclarativeBase, sessionmaker

# backend/pub.db (next to the app folder), no matter which folder you start the server from
DB_FILE = Path(__file__).resolve().parent.parent / "pub.db"

# The engine is the connection to the database, like sqlite3.connect() in the playground
engine = create_engine(f"sqlite:///{DB_FILE}")

# SQLite ignores foreign keys unless you switch them on, for every connection.
# Without this, a serving could point to an item that doesn't exist.
# Listening on Engine (not just our engine) also covers the test databases.
@event.listens_for(Engine, "connect")
def enable_foreign_keys(dbapi_connection, connection_record):
    dbapi_connection.execute("PRAGMA foreign_keys = ON")

# A session is one "conversation" with the database: you make changes, then commit them
SessionLocal = sessionmaker(engine)


class Base(DeclarativeBase):
    """Every table class in models.py inherits from this."""


def get_session():
    """Gives each request its own session and closes it afterwards. FastAPI calls this for us."""
    with SessionLocal() as session:
        yield session
