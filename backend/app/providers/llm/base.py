from typing import Dict, Any, List


class LLMProvider:
    """
    LLM provider interface that interprets structured financial facts
    rather than acting as calculation source of truth.
    """

    async def explain_affordability(
        self,
        question: str,
        current_balance: float,
        projected_buffer: float,
        item_cost: float,
    ) -> Dict[str, Any]:
        can_afford = projected_buffer >= item_cost
        
        if can_afford:
            answer = (
                f"Yes, you can afford this purchase of ₹{item_cost:,.0f}. "
                f"Your projected month-end buffer will remain safe at ₹{(projected_buffer - item_cost):,.0f}."
            )
        else:
            shortfall = item_cost - projected_buffer
            answer = (
                f"Making this ₹{item_cost:,.0f} purchase right now would create cash-flow pressure, "
                f"exceeding your projected buffer by ₹{shortfall:,.0f}. We recommend waiting until next month's salary cycle or splitting into zero-cost installments."
            )

        return {
            "intent": "affordability",
            "answer": answer,
            "observed": [
                {"label": "Current Available Balance", "value": f"₹{current_balance:,.0f}"},
                {"label": "Projected Monthly Buffer", "value": f"₹{projected_buffer:,.0f}"},
                {"label": "Target Expense", "value": f"₹{item_cost:,.0f}"},
            ],
            "analysis": {
                "can_afford": can_afford,
                "projected_buffer_after_purchase": projected_buffer - item_cost,
                "risk_level": "low" if can_afford else "high",
            },
            "recommendation": {
                "action": "Proceed with purchase" if can_afford else "Defer purchase or split across 2 cycles",
                "impact": f"Retains safety buffer of ₹{max(0.0, projected_buffer - item_cost):,.0f}",
            },
            "confidence": 0.92,
            "limitations": [
                "Assumes recurring subscriptions and rent are paid as scheduled",
                "Based on the last 90 days of categorized banking transactions",
            ],
        }
