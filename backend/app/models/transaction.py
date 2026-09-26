import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, Boolean, DateTime, ForeignKey
from app.core.database import Base


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    account_id = Column(String, ForeignKey("accounts.id"), nullable=True)
    amount = Column(Float, nullable=False)
    type = Column(String, nullable=False)  # "debit" | "credit"
    category = Column(String, nullable=False)
    merchant_name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    transaction_date = Column(String, nullable=False)
    is_recurring = Column(Boolean, default=False)
    is_fixed = Column(Boolean, default=False)
    is_discretionary = Column(Boolean, default=True)
    source_type = Column(String, default="manual")  # "aa" | "receipt_ocr" | "upi_ocr" | "manual"
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
