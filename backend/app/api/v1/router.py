from fastapi import APIRouter
from app.api.v1.routes import (
    auth,
    accounts,
    transactions,
    financial_health,
    copilot,
    recommendations,
    uploads,
)

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(accounts.router)
api_router.include_router(transactions.router)
api_router.include_router(financial_health.router)
api_router.include_router(copilot.router)
api_router.include_router(recommendations.router)
api_router.include_router(uploads.router)
