from typing import List, Dict, Any
from app.providers.aa.base import AccountAggregatorProvider


class MockAAProvider(AccountAggregatorProvider):
    async def create_consent(self, user_phone: str) -> Dict[str, Any]:
        return {
            "consent_id": f"consent_mock_{user_phone[-4:] if len(user_phone) >= 4 else '1234'}",
            "status": "APPROVED",
            "redirect_url": "https://sandbox.assay.finance/consent",
        }

    async def fetch_accounts(self, consent_id: str) -> List[Dict[str, Any]]:
        return [
            {
                "id": "acc_hdfc_01",
                "institution_name": "HDFC Bank",
                "account_type": "savings",
                "account_number_masked": "•••• 4821",
                "balance": 142500.0,
                "currency": "INR",
                "provider": "mock_aa",
                "status": "connected",
            },
            {
                "id": "acc_icici_02",
                "institution_name": "ICICI Bank",
                "account_type": "salary",
                "account_number_masked": "•••• 9104",
                "balance": 68450.0,
                "currency": "INR",
                "provider": "mock_aa",
                "status": "connected",
            },
        ]

    async def fetch_transactions(self, account_id: str, date_from: str, date_to: str) -> List[Dict[str, Any]]:
        return [
            {
                "id": "tx_mock_1",
                "account_id": account_id,
                "amount": 85000.0,
                "type": "credit",
                "category": "Salary",
                "merchant_name": "TechCorp Solutions",
                "description": "Monthly Salary Credit",
                "transaction_date": "2026-09-01T10:00:00Z",
                "is_recurring": True,
                "is_fixed": True,
                "is_discretionary": False,
                "source_type": "aa",
            },
            {
                "id": "tx_mock_2",
                "account_id": account_id,
                "amount": 25000.0,
                "type": "debit",
                "category": "Housing & Rent",
                "merchant_name": "Landlord Rent Payment",
                "description": "Apartment Rent",
                "transaction_date": "2026-09-03T11:30:00Z",
                "is_recurring": True,
                "is_fixed": True,
                "is_discretionary": False,
                "source_type": "aa",
            },
            {
                "id": "tx_mock_3",
                "account_id": account_id,
                "amount": 3400.0,
                "type": "debit",
                "category": "Food & Dining",
                "merchant_name": "Swiggy",
                "description": "Weekend dinner delivery",
                "transaction_date": "2026-09-05T20:15:00Z",
                "is_recurring": False,
                "is_fixed": False,
                "is_discretionary": True,
                "source_type": "aa",
            },
            {
                "id": "tx_mock_4",
                "account_id": account_id,
                "amount": 4200.0,
                "type": "debit",
                "category": "Groceries",
                "merchant_name": "Blinkit",
                "description": "Weekly household essentials",
                "transaction_date": "2026-09-08T18:45:00Z",
                "is_recurring": False,
                "is_fixed": False,
                "is_discretionary": False,
                "source_type": "aa",
            },
            {
                "id": "tx_mock_5",
                "account_id": account_id,
                "amount": 999.0,
                "type": "debit",
                "category": "Subscriptions",
                "merchant_name": "Netflix",
                "description": "Premium 4K plan renewal",
                "transaction_date": "2026-09-12T09:00:00Z",
                "is_recurring": True,
                "is_fixed": True,
                "is_discretionary": True,
                "source_type": "aa",
            },
        ]
