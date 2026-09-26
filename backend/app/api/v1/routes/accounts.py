from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.account import Account
from app.schemas.account import AccountOut, DemoConnectResponse
from app.providers.aa.mock_provider import MockAAProvider

router = APIRouter(prefix="/accounts", tags=["accounts"])
mock_provider = MockAAProvider()


@router.post("/demo-connect", response_model=DemoConnectResponse)
async def demo_connect(db: Session = Depends(get_db)):
    """Creates/connects demo bank accounts via the mock AA provider."""
    mock_accounts = await mock_provider.fetch_accounts("consent_demo_123")
    
    # Store or update in DB
    for acc in mock_accounts:
        existing = db.query(Account).filter(Account.id == acc["id"]).first()
        if not existing:
            db_acc = Account(
                id=acc["id"],
                institution_name=acc["institution_name"],
                account_type=acc["account_type"],
                account_number_masked=acc["account_number_masked"],
                balance=acc["balance"],
                currency=acc["currency"],
                provider=acc["provider"],
                status=acc["status"],
            )
            db.add(db_acc)
    db.commit()

    return DemoConnectResponse(
        account_id="acc_hdfc_01",
        provider="mock_aa",
        institution_name="HDFC Bank",
        status="connected",
    )


@router.post("/{account_id}/sync")
async def sync_account(account_id: str, db: Session = Depends(get_db)):
    """Loads and synchronizes mock financial data."""
    account = db.query(Account).filter(Account.id == account_id).first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    
    return {
        "status": "synchronized",
        "account_id": account_id,
        "synced_records": 5,
    }


@router.get("", response_model=List[AccountOut])
def list_accounts(db: Session = Depends(get_db)):
    """Returns list of connected accounts."""
    accounts = db.query(Account).all()
    if not accounts:
        # Return fallback demo accounts
        return [
            AccountOut(
                id="acc_hdfc_01",
                institution_name="HDFC Bank",
                account_type="savings",
                account_number_masked="•••• 4821",
                balance=142500.0,
                currency="INR",
                provider="mock_aa",
                status="connected",
            ),
            AccountOut(
                id="acc_icici_02",
                institution_name="ICICI Bank",
                account_type="salary",
                account_number_masked="•••• 9104",
                balance=68450.0,
                currency="INR",
                provider="mock_aa",
                status="connected",
            ),
        ]
    return accounts
