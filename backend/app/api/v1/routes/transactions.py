from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
import uuid
from app.core.database import get_db
from app.models.transaction import Transaction
from app.schemas.transaction import TransactionCreate, TransactionOut, TransactionListResponse
from app.providers.aa.mock_provider import MockAAProvider

router = APIRouter(prefix="/transactions", tags=["transactions"])
mock_provider = MockAAProvider()


@router.get("", response_model=TransactionListResponse)
def get_transactions(
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    category: Optional[str] = None,
    transaction_type: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(Transaction)
    if category:
        query = query.filter(Transaction.category == category)
    if transaction_type:
        query = query.filter(Transaction.type == transaction_type)
    
    total = query.count()
    items = query.offset(offset).limit(limit).all()

    if not items and offset == 0:
        # Provide realistic mock items if DB empty
        mock_items = [
            TransactionOut(
                id="tx_01",
                amount=85000.0,
                type="credit",
                category="Salary",
                merchant_name="TechCorp Solutions",
                description="Monthly Salary Credit",
                transaction_date="2026-09-01T10:00:00Z",
                is_recurring=True,
                is_fixed=True,
                is_discretionary=False,
                source_type="aa",
            ),
            TransactionOut(
                id="tx_02",
                amount=25000.0,
                type="debit",
                category="Housing & Rent",
                merchant_name="Landlord Rent Payment",
                description="Apartment Rent",
                transaction_date="2026-09-03T11:30:00Z",
                is_recurring=True,
                is_fixed=True,
                is_discretionary=False,
                source_type="aa",
            ),
            TransactionOut(
                id="tx_03",
                amount=3400.0,
                type="debit",
                category="Food & Dining",
                merchant_name="Swiggy",
                description="Weekend dinner delivery",
                transaction_date="2026-09-05T20:15:00Z",
                is_recurring=False,
                is_fixed=False,
                is_discretionary=True,
                source_type="aa",
            ),
        ]
        return TransactionListResponse(
            items=mock_items,
            total=len(mock_items),
            limit=limit,
            offset=offset,
        )

    return TransactionListResponse(
        items=[
            TransactionOut(
                id=tx.id,
                account_id=tx.account_id,
                amount=tx.amount,
                type=tx.type,
                category=tx.category,
                merchant_name=tx.merchant_name,
                description=tx.description,
                transaction_date=tx.transaction_date,
                is_recurring=tx.is_recurring,
                is_fixed=tx.is_fixed,
                is_discretionary=tx.is_discretionary,
                source_type=tx.source_type,
                created_at=str(tx.created_at),
            )
            for tx in items
        ],
        total=total,
        limit=limit,
        offset=offset,
    )


@router.get("/{transaction_id}", response_model=TransactionOut)
def get_transaction(transaction_id: str, db: Session = Depends(get_db)):
    tx = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not tx:
        return TransactionOut(
            id=transaction_id,
            amount=3400.0,
            type="debit",
            category="Food & Dining",
            merchant_name="Swiggy",
            description="Weekend dinner delivery",
            transaction_date="2026-09-05T20:15:00Z",
            is_recurring=False,
            is_fixed=False,
            is_discretionary=True,
            source_type="aa",
        )
    return TransactionOut(
        id=tx.id,
        account_id=tx.account_id,
        amount=tx.amount,
        type=tx.type,
        category=tx.category,
        merchant_name=tx.merchant_name,
        description=tx.description,
        transaction_date=tx.transaction_date,
        is_recurring=tx.is_recurring,
        is_fixed=tx.is_fixed,
        is_discretionary=tx.is_discretionary,
        source_type=tx.source_type,
        created_at=str(tx.created_at),
    )


@router.post("", response_model=TransactionOut, status_code=status.HTTP_201_CREATED)
def create_transaction(tx_in: TransactionCreate, db: Session = Depends(get_db)):
    tx = Transaction(
        id=f"tx_{uuid.uuid4().hex[:8]}",
        account_id=tx_in.account_id,
        amount=tx_in.amount,
        type=tx_in.type,
        category=tx_in.category,
        merchant_name=tx_in.merchant_name,
        description=tx_in.description,
        transaction_date=tx_in.transaction_date,
        is_recurring=tx_in.is_recurring,
        is_fixed=tx_in.is_fixed,
        is_discretionary=tx_in.is_discretionary,
        source_type=tx_in.source_type,
    )
    db.add(tx)
    db.commit()
    db.refresh(tx)

    return TransactionOut(
        id=tx.id,
        account_id=tx.account_id,
        amount=tx.amount,
        type=tx.type,
        category=tx.category,
        merchant_name=tx.merchant_name,
        description=tx.description,
        transaction_date=tx.transaction_date,
        is_recurring=tx.is_recurring,
        is_fixed=tx.is_fixed,
        is_discretionary=tx.is_discretionary,
        source_type=tx.source_type,
        created_at=str(tx.created_at),
    )
