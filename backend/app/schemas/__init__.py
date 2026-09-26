from app.schemas.auth import UserBase, UserCreate, UserLogin, UserOut, Token, TokenPayload
from app.schemas.account import AccountBase, AccountCreate, AccountOut, DemoConnectResponse
from app.schemas.transaction import TransactionBase, TransactionCreate, TransactionOut, TransactionListResponse
from app.schemas.financial_health import (
    Signal,
    FinancialHealthOut,
    CopilotQueryRequest,
    CopilotQueryResponse,
    RecommendationAssumption,
    RecommendationSimulateRequest,
    RecommendationSimulateResponse,
    RecommendationOut,
)
