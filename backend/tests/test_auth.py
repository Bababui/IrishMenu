"""The login: who gets in and who doesn't."""


def test_admin_endpoints_need_a_login(client):
    assert client.get("/api/admin/events").status_code == 401


def test_wrong_password_is_rejected(client):
    response = client.post("/api/admin/login", json={"password": "wrong"})
    assert response.status_code == 401


def test_logged_in_admin_gets_in(admin):
    assert admin.get("/api/admin/events").status_code == 200


def test_changed_token_is_rejected(admin):
    expires, signature = admin.headers["Authorization"].removeprefix("Bearer ").split(".")
    longer = f"{int(expires) + 99999}.{signature}"  # try to stay logged in longer
    admin.headers["Authorization"] = f"Bearer {longer}"
    assert admin.get("/api/admin/events").status_code == 401


def test_guest_site_needs_no_login(client):
    assert client.get("/api/menu").status_code == 200
    assert client.get("/api/events").status_code == 200
