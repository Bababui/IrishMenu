from fastapi import FastAPI

from .routers import public

app = FastAPI(title="Irish Pub HN")

app.include_router(public.router)


@app.get("/api/health")
def health():
    return {"status": "ok"}
