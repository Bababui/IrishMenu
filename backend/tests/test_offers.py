VALID_OFFER = {"title_en": "Guinness Tuesday", "weekdays": [2], "price": 5, "regular_price": 6.5}


def test_valid_offer_is_saved(admin):
    response = admin.post("/api/admin/offers", json=VALID_OFFER)
    assert response.status_code == 201
    assert response.json()["weekdays"] == [2]


def test_duplicate_weekdays_are_removed(admin):
    response = admin.post("/api/admin/offers", json={**VALID_OFFER, "weekdays": [5, 2, 5]})
    assert response.json()["weekdays"] == [2, 5]


def test_offer_without_date_and_weekdays_is_rejected(admin):
    response = admin.post("/api/admin/offers", json={**VALID_OFFER, "weekdays": []})
    assert response.status_code == 422


def test_offer_not_cheaper_is_rejected(admin):
    response = admin.post("/api/admin/offers", json={**VALID_OFFER, "price": 7})
    assert response.status_code == 422

    response = admin.post("/api/admin/offers", json={**VALID_OFFER, "price": 6.5})
    assert response.status_code == 422


def test_offer_with_only_one_price_is_saved(admin):
    response = admin.post("/api/admin/offers", json={**VALID_OFFER, "regular_price": None})
    assert response.status_code == 201
