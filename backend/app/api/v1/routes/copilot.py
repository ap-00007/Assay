import re
from fastapi import APIRouter
from app.schemas.financial_health import CopilotQueryRequest, CopilotQueryResponse
from app.providers.llm.base import LLMProvider

router = APIRouter(prefix="/copilot", tags=["copilot"])
llm_provider = LLMProvider()


@router.post("/query", response_model=CopilotQueryResponse)
async def query_copilot(request: CopilotQueryRequest):
    """
    Copilot query endpoint.
    Extracts parameters, computes deterministic financial metrics,
    and returns a structured LLM explanation.
    """
    question = request.question
    
    # Extract potential amount from question like ₹15,000 or 15000
    amount_match = re.search(r'(?:₹|rs\.?|inr)?\s*([\d,]+)', question, re.IGNORECASE)
    item_cost = 15000.0
    if amount_match:
        try:
            cleaned = amount_match.group(1).replace(",", "")
            if cleaned.isdigit() and float(cleaned) > 0:
                item_cost = float(cleaned)
        except Exception:
            pass

    current_balance = 210950.0
    projected_buffer = 8700.0

    result = await llm_provider.explain_affordability(
        question=question,
        current_balance=current_balance,
        projected_buffer=projected_buffer,
        item_cost=item_cost,
    )

    return CopilotQueryResponse(**result)
