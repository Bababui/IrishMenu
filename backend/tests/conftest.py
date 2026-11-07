"""Shared setup for all tests. pytest finds this file by itself.

The most important rule: tests never touch the real pub.db.
Every test gets its own fresh database in a temporary folder, which is thrown away afterwards.

A "fixture" is something a test needs, prepared for it automatically: a test that has a
parameter called `client` gets the client below, without calling anything itself.
"""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app import auth
from app.database import Base, get_session
from app.main import app
from app.models import Category

TEST_PASSWORD = "test-password-123"


@pytest.fixture
def session_factory(tmp_path):
    """A fresh database with one category, in a temporary folder (tmp_path)."""
    engine = create_engine(f"sqlite:///{tmp_path / 'test.db'}")
    Base.metadata.create_all(engine)
    factory = sessionmaker(engine)
    with factory() as session:
        session.add(
            Category(id="draught", menu_group="beer", label_en="Draught beer", label_de="Bier vom Fass", position=0)
        )
        session.commit()
    yield factory  # the test runs here
    engine.dispose()


@pytest.fixture
def client(session_factory, monkeypatch):
    """Talks to the app like a browser would, but against the test database."""

    def test_session():
        with session_factory() as session:
            yield session

    # Every endpoint that asks for get_session gets a test session instead
    app.dependency_overrides[get_session] = test_session
    # A known test password, so we never need the real .env
    monkeypatch.setenv("ADMIN_PASSWORD_HASH", auth.hash_password(TEST_PASSWORD))
    monkeypatch.setenv("SECRET_KEY", "test-secret-key")

    yield TestClient(app)

    app.dependency_overrides.clear()


@pytest.fixture
def admin(client):
    """Like client, but already logged in."""
    token = client.post("/api/admin/login", json={"password": TEST_PASSWORD}).json()["token"]
    client.headers["Authorization"] = f"Bearer {token}"
    return client
