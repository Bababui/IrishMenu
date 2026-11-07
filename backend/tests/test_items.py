GUINNESS = {
    "category_id": "draught",
    "name_en": "Guinness",
    "codes": [" a", "A"],
    "servings": [{"label_en": "0,3 l", "price": "3,90"}, {"label_en": "0,5 l", "price": 6.5}],
}


def test_new_item_shows_on_guest_menu(admin):
    response = admin.post("/api/admin/items", json=GUINNESS)
    assert response.status_code == 201
    assert response.json()["codes"] == ["A"]  # cleaned up and de-duplicated

    item = admin.get("/api/menu").json()["items"][0]
    assert item["name"] == "Guinness"
    assert item["servings"] == [{"price": 3.9, "label": "0,3 l"}, {"price": 6.5, "label": "0,5 l"}]


def test_price_change_reaches_guests(admin):
    item_id = admin.post("/api/admin/items", json=GUINNESS).json()["id"]
    cheaper = {**GUINNESS, "servings": [{"label_en": "0,5 l", "price": "5,50"}]}
    assert admin.put(f"/api/admin/items/{item_id}", json=cheaper).status_code == 200

    servings = admin.get("/api/menu").json()["items"][0]["servings"]
    assert servings == [{"price": 5.5, "label": "0,5 l"}]


def test_unknown_category_is_rejected(admin):
    response = admin.post("/api/admin/items", json={**GUINNESS, "category_id": "spaceship"})
    assert response.status_code == 422


def test_unknown_code_is_rejected(admin):
    assert admin.post("/api/admin/items", json={**GUINNESS, "codes": ["Z"]}).status_code == 422


def test_item_needs_a_price(admin):
    assert admin.post("/api/admin/items", json={**GUINNESS, "servings": []}).status_code == 422
