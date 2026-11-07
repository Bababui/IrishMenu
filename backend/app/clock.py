"""The pub's clock. Always German time, even when the server runs somewhere on UTC."""

import datetime as dt
from zoneinfo import ZoneInfo

PUB_TIMEZONE = ZoneInfo("Europe/Berlin")


def berlin_today():
    return dt.datetime.now(PUB_TIMEZONE).date()
