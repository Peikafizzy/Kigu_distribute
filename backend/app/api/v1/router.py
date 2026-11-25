from fastapi import APIRouter

from backend.app.api.v1 import people


api_router = APIRouter()

api_router.include_router(
    people.router,
    prefix="/people",
    tags=["People"]
)