from fastapi import APIRouter, Depends, HTTPException
from app.schemas.vehicle import VehicleCreate
from app.database import vehicle_collection, vehicle_info_collection
from datetime import datetime
from app.utils.deps import get_current_user
from bson import ObjectId

router = APIRouter(prefix="/vehicle", tags=["vehicle"])

@router.post("/ingest")
async def ingest_vehicle(payload: VehicleCreate, user = Depends(get_current_user)):
    if user["role"] == "driver" and user["id"] != payload.driver_id:
        raise HTTPException(status_code=403, detail="Drivers may only post their own vehicle telemetry")
    doc = payload.dict()
    doc["timestamp"] = doc.get("timestamp") or datetime.utcnow().isoformat()
    res = await vehicle_collection.insert_one(doc)
    return {"id": str(res.inserted_id), **doc}

@router.post("/info")
async def create_vehicle_info(info: dict, user = Depends(get_current_user)):
    # any authenticated user can create a vehicle record; admin can manage all
    res = await vehicle_info_collection.insert_one(info)
    return {"id": str(res.inserted_id), **info}

@router.get("/info/{vehicle_id}")
async def get_vehicle_info(vehicle_id: str, user = Depends(get_current_user)):
    v = await vehicle_info_collection.find_one({"_id": ObjectId(vehicle_id)})
    if not v:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    v["id"] = str(v["_id"])
    v.pop("_id", None)
    return v
