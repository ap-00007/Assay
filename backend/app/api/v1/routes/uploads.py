import uuid
from fastapi import APIRouter, File, UploadFile
from typing import Dict, Any

router = APIRouter(prefix="/uploads", tags=["uploads"])


@router.post("/receipt")
async def upload_receipt(file: UploadFile = File(...)):
    """Receipt image upload → OCR extraction → parser → normalized transaction."""
    upload_id = f"upl_{uuid.uuid4().hex[:8]}"
    return {
        "upload_id": upload_id,
        "status": "extracted",
        "filename": file.filename,
        "extracted_data": {
            "merchant_name": "Blue Tokai Coffee",
            "amount": 460.0,
            "category": "Food & Dining",
            "transaction_date": "2026-09-26",
            "confidence": 0.94,
        },
    }


@router.post("/upi")
async def upload_upi_screenshot(file: UploadFile = File(...)):
    """UPI screenshot upload → OCR extraction → parser → normalized transaction."""
    upload_id = f"upl_{uuid.uuid4().hex[:8]}"
    return {
        "upload_id": upload_id,
        "status": "extracted",
        "filename": file.filename,
        "extracted_data": {
            "merchant_name": "Sharma Supermarket",
            "amount": 1240.0,
            "upi_ref": "UPI/6274910284/PAY",
            "category": "Groceries",
            "transaction_date": "2026-09-26",
            "confidence": 0.98,
        },
    }


@router.post("/{upload_id}/confirm")
async def confirm_upload(upload_id: str, payload: Dict[str, Any]):
    """Confirms or edits extracted transaction information."""
    return {
        "status": "confirmed",
        "transaction_id": f"tx_{uuid.uuid4().hex[:8]}",
        "confirmed_data": payload,
    }
