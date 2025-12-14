from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from app.database import emergency_collection
from app.utils.deps import get_current_user
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/emergency", tags=["emergency"])

class EmergencyCreate(BaseModel):
    driver_id: str
    description: Optional[str] = ""

@router.post("/report")
async def report_emergency(payload: EmergencyCreate, user = Depends(get_current_user)):
    # drivers may only report for themselves
    if user["role"] == "driver" and user["id"] != payload.driver_id:
        raise HTTPException(status_code=403, detail="Not authorized to report for another driver")
    doc = {
        "driver_id": payload.driver_id,
        "description": payload.description,
        "timestamp": datetime.utcnow().isoformat(),
        "status": "open"
    }
    res = await emergency_collection.insert_one(doc)
    doc["id"] = str(res.inserted_id)
    return doc

@router.get("/list")
async def list_emergencies(user = Depends(get_current_user)):
    # drivers see only their emergencies; admin sees all
    query = {}
    if user["role"] == "driver":
        query = {"driver_id": user["id"]}
    out = []
    cursor = emergency_collection.find(query).sort("timestamp", -1)
    async for e in cursor:
        e["id"] = str(e["_id"])
        e.pop("_id", None)
        out.append(e)
    return out
