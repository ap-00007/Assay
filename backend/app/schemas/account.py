from typing import Optional, List
from pydantic import BaseModel


class AccountBase(BaseModel):
    institution_name: str
    account_type: str = "savings"
    account_number_masked: Optional[str] = None
    balance: float = 0.0
    currency: str = "INR"


class AccountCreate(AccountBase):
    pass


class AccountOut(AccountBase):
    id: str
    provider: str
    status: str
    created_at: Optional[str] = None

    class Config:
        from_attributes = True


class DemoConnectResponse(BaseModel):
    account_id: str
    provider: str
    institution_name: str
    status: str
