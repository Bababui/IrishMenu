import sqlite3

# Opens the database file, or creates it if it doesn't exist yet
connection = sqlite3.connect("playground.db")

# SQL: create the menu_items table
connection.execute("""
    CREATE TABLE IF NOT EXISTS menu_items (
        id       INTEGER PRIMARY KEY,
        name     TEXT NOT NULL,
        category TEXT NOT NULL
    )
""")

# TODO 1: create the servings table
connection.execute("""
    CREATE TABLE IF NOT EXISTS servings (
        id       INTEGER PRIMARY KEY,
        item_id INTEGER NOT NULL REFERENCES menu_items(id),
        label TEXT,
        price REAL NOT NULL
    )
""")

menu = [
    {
        "name": "Guinness",
        "category": "draught",
        "servings": [("0,2 l", 3.00), ("0,3 l", 3.90), ("0,5 l", 6.50)],
    },
    {
        "name": "Kilkenny",
        "category": "draught",
        "servings": [("0,2 l", 3.00), ("0,3 l", 3.90), ("0,5 l", 6.50)],
    },
    {
        "name": "HopHouse 13",
        "category": "draught",
        "servings": [("0,2 l", 3.00), ("0,3 l", 3.90), ("0,5 l", 6.50)],
    },
]

for item in menu:
    cursor = connection.execute("INSERT INTO menu_items (name, category) VALUES (?,?)", 
        (item["name"], item["category"]),
    )

    item_id = cursor.lastrowid

    for label, price in item["servings"]:
        connection.execute("INSERT INTO servings (item_id, label, price) VALUES (?,?,?)", 
        (item_id, label, price),
    )


connection.commit()   # save the changes to the file

# SQL: read the rows back and print them
query = """
    SELECT menu_items.name, servings.label, servings.price
    FROM servings
    JOIN menu_items ON servings.item_id = menu_items.id
"""

for name, label, price in connection.execute(query):
    #f"{name} - {label}: ${price:.2f}"
    print(f"{name} - {label}: ${price:.2f}")