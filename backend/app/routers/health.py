from fastapi import APIRouter, Depends, HTTPException
from app.schemas.health import HealthCreate
from app.database import health_collection
from datetime import datetime
from app.utils.deps import get_current_user
from bson import ObjectId

router = APIRouter(prefix="/health", tags=["health"])

@router.post("/ingest")
async def ingest_health(payload: HealthCreate, user = Depends(get_current_user)):
    # Only allow driver to post their own records (or admin to post for any driver)
    if user["role"] == "driver" and user["id"] != payload.driver_id:
        raise HTTPException(status_code=403, detail="Drivers may only post their own health data")
    doc = payload.dict()
    doc["timestamp"] = doc.get("timestamp") or datetime.utcnow().isoformat()
    res = await health_collection.insert_one(doc)
    return {"id": str(res.inserted_id), **doc}

@router.get("/history/{driver_id}")
async def history(driver_id: str, user = Depends(get_current_user)):
    # Drivers can access their own history; admin can access any
    if user["role"] == "driver" and user["id"] != driver_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    out = []
    cursor = health_collection.find({"driver_id": driver_id}).sort("timestamp", -1)
    async for d in cursor:
        d["id"] = str(d["_id"])
        d.pop("_id", None)
        out.append(d)
    return out
