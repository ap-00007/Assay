from fastapi import APIRouter
from app.schemas.financial_health import FinancialHealthOut, Signal

router = APIRouter(tags=["financial-health"])


@router.get("/financial-health", response_model=FinancialHealthOut)
def get_financial_health():
    """Returns the deterministic financial-health snapshot."""
    return FinancialHealthOut(
        income=85000.0,
        spending=60200.0,
        savings=24800.0,
        savings_rate=0.2918,
        fixed_expenses=29000.0,
        variable_expenses=31200.0,
        recurring_obligations=18400.0,
        projected_month_end_balance=8700.0,
        health_score=78,
        signals=[
            Signal(
                type="spending_increase",
                category="Food & Dining",
                change_percent=27.0,
                description="Food delivery increased by 27% compared to last month",
                severity="warning",
            ),
            Signal(
                type="healthy_savings",
                category="Savings",
                change_percent=12.0,
                description="Savings rate is within top 25% percentile for your income bracket",
                severity="info",
            ),
        ],
    )


@router.get("/analytics/cash-flow")
def get_cash_flow():
    """Returns historical and projected cash flow."""
    return {
        "monthly_summary": [
            {"month": "Jul 2026", "inflow": 85000, "outflow": 54000, "net": 31000},
            {"month": "Aug 2026", "inflow": 85000, "outflow": 58200, "net": 26800},
            {"month": "Sep 2026", "inflow": 85000, "outflow": 60200, "net": 24800},
        ],
        "projected_month_end": 8700.0,
        "daily_burn_rate": 1845.0,
    }


@router.get("/analytics/obligations")
def get_obligations():
    """Returns detected recurring obligations."""
    return {
        "total_monthly_obligations": 18400.0,
        "items": [
            {"id": "ob_1", "name": "Apartment Rent", "amount": 25000.0, "frequency": "monthly", "due_day": 3},
            {"id": "ob_2", "name": "Netflix 4K", "amount": 999.0, "frequency": "monthly", "due_day": 12},
            {"id": "ob_3", "name": "Gym Cult.fit", "amount": 1850.0, "frequency": "monthly", "due_day": 18},
        ],
    }


@router.get("/analytics/spending")
def get_spending_breakdown():
    return {
        "categories": [
            {"name": "Housing & Rent", "amount": 25000, "percentage": 41.5},
            {"name": "Food & Dining", "amount": 14200, "percentage": 23.5},
            {"name": "Groceries", "amount": 8400, "percentage": 14.0},
            {"name": "Shopping & Lifestyle", "amount": 6200, "percentage": 10.3},
            {"name": "Subscriptions & Bills", "amount": 3600, "percentage": 6.0},
            {"name": "Transport", "amount": 2800, "percentage": 4.7},
        ]
    }
