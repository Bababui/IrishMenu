"""Tests for changing one price: PATCH /api/admin/servings/{id}."""

import pytest

GUINNESS = {
    "category_id": "draught",
    "name_en": "Guinness",
    "servings": [{"label_en": "0,3 l", "price": "3,90"}, {"label_en": "0,5 l", "price": "6,50"}],
}


def create_guinness(admin):
    """Adds Guinness and returns the ids of its two servings: (0,3 l, 0,5 l)."""
    item = admin.post("/api/admin/items", json=GUINNESS).json()
    return item["servings"][0]["id"], item["servings"][1]["id"]


def test_price_changes(admin):
    _, pint = create_guinness(admin)

    response = admin.patch(f"/api/admin/servings/{pint}", json={"price": 6.9})

    assert response.status_code == 200
    assert response.json() == {"id": pint, "label_en": "0,5 l", "label_de": None, "price": 6.9}


def test_guests_see_the_new_price_and_nothing_else_changes(admin):
    _, pint = create_guinness(admin)

    admin.patch(f"/api/admin/servings/{pint}", json={"price": "6,90"})  # typed the German way

    item = admin.get("/api/menu").json()["items"][0]
    assert item["name"] == "Guinness"
    assert item["servings"] == [{"price": 3.9, "label": "0,3 l"}, {"price": 6.9, "label": "0,5 l"}]


@pytest.mark.parametrize("bad_price", [0, -1, "abc", "6,555", ""])
def test_impossible_prices_are_rejected(admin, bad_price):
    _, pint = create_guinness(admin)

    assert admin.patch(f"/api/admin/servings/{pint}", json={"price": bad_price}).status_code == 422
    assert admin.get("/api/menu").json()["items"][0]["servings"][1]["price"] == 6.5  # unchanged


def test_unknown_serving_gives_404(admin):
    assert admin.patch("/api/admin/servings/999", json={"price": 5}).status_code == 404


def test_changing_a_price_needs_a_login(client):
    assert client.patch("/api/admin/servings/1", json={"price": 5}).status_code == 401
