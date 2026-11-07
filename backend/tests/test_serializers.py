"""The language rule and price conversion: plain functions, so no database needed."""

from app.serializers import euros, localized, translatable


def test_same_name_in_both_languages_is_a_plain_string():
    assert translatable("Guinness", None) == "Guinness"


def test_different_german_name_gives_both():
    assert translatable("Apple juice", "Apfelsaft") == {"de": "Apfelsaft", "en": "Apple juice"}


def test_missing_german_falls_back_to_english():
    assert localized("Irish stout", None) == {"de": "Irish stout", "en": "Irish stout"}


def test_cents_become_euros():
    assert euros(650) == 6.5
    assert euros(29) == 0.29
    assert euros(None) is None
