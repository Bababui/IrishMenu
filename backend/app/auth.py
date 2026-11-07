"""Login for the admin panel. One user (the boss), one password.

How it works (like the stamp on your hand at the pub door):
1. The boss sends his password to POST /api/admin/login.
2. We hash it and compare it with the hash stored in backend/.env.
3. If it matches, he gets a token, valid for 12 hours.
4. The admin panel sends that token with every request; require_admin checks it.

The password itself is never stored anywhere, only its hash.
"""

import hashlib
import hmac
import os
import secrets
import time
from pathlib import Path

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel

# backend/.env holds the secrets. It is in .gitignore, so it never reaches GitHub.
ENV_FILE = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(ENV_FILE)

TOKEN_HOURS = 12


# ---------- Password hashing ----------


def hash_password(password, salt=None):
    """"guinness123" -> "scrypt:<salt>:<hash>".

    A hash is a one-way function: the same password (with the same salt) always gives
    the same hash, but there is no way back from the hash to the password.
    The salt is a random value that makes every stored hash different, even for
    the same password. scrypt is deliberately slow, so guessing millions of
    passwords takes far too long.
    """
    if salt is None:
        salt = secrets.token_bytes(16)
    digest = hashlib.scrypt(password.encode(), salt=salt, n=2**14, r=8, p=1)
    return f"scrypt:{salt.hex()}:{digest.hex()}"


def check_password(password, stored_hash):
    """Hash the attempt with the same salt and compare the two hashes."""
    salt_hex = stored_hash.split(":")[1]
    attempt = hash_password(password, bytes.fromhex(salt_hex))
    # compare_digest takes the same time no matter where the strings differ,
    # so an attacker can't learn anything from how fast the answer comes back
    return hmac.compare_digest(attempt, stored_hash)


# ---------- Tokens ----------


def setting(name):
    value = os.environ.get(name)
    if not value:
        raise HTTPException(
            status_code=503,
            detail="Admin login is not set up yet: run  python -m app.set_password",
        )
    return value


def sign(text):
    """A signature only someone who knows SECRET_KEY can produce."""
    return hmac.new(setting("SECRET_KEY").encode(), text.encode(), hashlib.sha256).hexdigest()


def make_token():
    """Token = "<expiry time>.<signature>". Changing the time breaks the signature."""
    expires = str(int(time.time()) + TOKEN_HOURS * 3600)
    return f"{expires}.{sign(expires)}"


def token_is_valid(token):
    expires, _, signature = token.partition(".")
    if not expires.isdigit():
        return False
    return hmac.compare_digest(signature, sign(expires)) and int(expires) > time.time()


# ---------- Endpoints ----------

router = APIRouter(prefix="/api/admin", tags=["login"])


class LoginIn(BaseModel):
    password: str


@router.post("/login")
def login(data: LoginIn):
    if not check_password(data.password, setting("ADMIN_PASSWORD_HASH")):
        time.sleep(1)  # makes trying thousands of passwords painfully slow
        raise HTTPException(status_code=401, detail="Wrong password")
    return {"token": make_token(), "expires_in_hours": TOKEN_HOURS}


bearer = HTTPBearer(auto_error=False)


def require_admin(credentials: HTTPAuthorizationCredentials | None = Depends(bearer)):
    """Runs before every admin endpoint. No valid token -> 401, the endpoint never runs."""
    if credentials is None or not token_is_valid(credentials.credentials):
        raise HTTPException(
            status_code=401,
            detail="Please log in",
            headers={"WWW-Authenticate": "Bearer"},
        )
