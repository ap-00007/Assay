from typing import List
from fastapi import APIRouter
from app.schemas.financial_health import (
    RecommendationOut,
    RecommendationSimulateRequest,
    RecommendationSimulateResponse,
)

router = APIRouter(prefix="/recommendations", tags=["recommendations"])


@router.get("", response_model=List[RecommendationOut])
def list_recommendations():
    """Returns active financial health recommendations."""
    return [
        RecommendationOut(
            id="rec_01",
            title="Optimize Food & Dining Delivery",
            category="Food & Dining",
            potential_monthly_savings=2000.0,
            impact_description="Cutting 3 weekly takeout orders can boost your month-end buffer by 23%.",
            action_type="spending_reduction",
        ),
        RecommendationOut(
            id="rec_02",
            title="Consolidate Streaming Subscriptions",
            category="Subscriptions",
            potential_monthly_savings=800.0,
            impact_description="Two unused entertainment subscriptions detected.",
            action_type="subscription_audit",
        ),
    ]


@router.post("/{recommendation_id}/simulate", response_model=RecommendationSimulateResponse)
def simulate_recommendation(recommendation_id: str, payload: RecommendationSimulateRequest):
    """Simulates financial impact of adopting a recommendation."""
    monthly_reduction = payload.assumption.monthly_reduction
    baseline_buffer = 4800.0
    projected_buffer = baseline_buffer + monthly_reduction

    return RecommendationSimulateResponse(
        baseline_monthly_buffer=baseline_buffer,
        projected_monthly_buffer=projected_buffer,
        monthly_impact=monthly_reduction,
        annualized_impact=monthly_reduction * 12,
        confidence=0.86,
        assumption=f"{payload.assumption.category} spending is reduced by ₹{monthly_reduction:,.0f} per month.",
    )
