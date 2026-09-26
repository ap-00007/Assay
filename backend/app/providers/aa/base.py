from abc import ABC, abstractmethod
from typing import List, Dict, Any


class AccountAggregatorProvider(ABC):
    @abstractmethod
    async def create_consent(self, user_phone: str) -> Dict[str, Any]:
        pass

    @abstractmethod
    async def fetch_accounts(self, consent_id: str) -> List[Dict[str, Any]]:
        pass

    @abstractmethod
    async def fetch_transactions(self, account_id: str, date_from: str, date_to: str) -> List[Dict[str, Any]]:
        pass
