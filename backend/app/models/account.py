import uuid
from datetime import datetime, timezone
# pyrefly: ignore [missing-import]
from sqlalchemy import Column, String, Float, DateTime, ForeignKey
from app.core.database import Base


class Account(Base):
    __tablename__ = "accounts"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    institution_name = Column(String, nullable=False)
    account_type = Column(String, default="savings")
    account_number_masked = Column(String, nullable=True)
    balance = Column(Float, default=0.0)
    currency = Column(String, default="INR")
    provider = Column(String, default="mock_aa")
    status = Column(String, default="connected")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
