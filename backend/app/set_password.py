"""Sets the admin password.  Run from the backend folder:   python -m app.set_password

Writes backend/.env with the password's hash and a new secret key.
A new secret key also logs out everyone who is logged in right now.
"""

import getpass
import secrets

from .auth import ENV_FILE, hash_password


def main():
    password = getpass.getpass("New admin password: ")  # typing stays invisible
    if len(password) < 10:
        print("Please use at least 10 characters. Nothing was changed.")
        return
    if getpass.getpass("Repeat it: ") != password:
        print("The two passwords don't match. Nothing was changed.")
        return

    ENV_FILE.write_text(
        f"ADMIN_PASSWORD_HASH={hash_password(password)}\n"
        f"SECRET_KEY={secrets.token_hex(32)}\n"
    )
    print(f"Saved to {ENV_FILE}")
    print("Restart the server (Ctrl + C, then fastapi dev app/main.py) so it picks up the new password.")


if __name__ == "__main__":
    main()
