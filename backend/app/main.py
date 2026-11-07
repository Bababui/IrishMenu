from fastapi import FastAPI

from .routers import admin, public

app = FastAPI(title="Irish Pub HN")

app.include_router(public.router)
app.include_router(admin.router)


@app.get("/api/health")
def health():
    return {"status": "ok"}
