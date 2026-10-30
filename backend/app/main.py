import sqlite3
from fastapi import FastAPI

app = FastAPI()

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.get("/api/menu")
def get_menu():
    connection = sqlite3.connect("playground.db")
    query = """
        SELECT menu_items.name, servings.label, servings.price
        FROM servings
        JOIN menu_items ON servings.item_id = menu_items.id
    """
    result = []
    for name, label, price in connection.execute(query):
        result.append({"name": name, "label": label, "price": price})

        
    connection.close()
    return result