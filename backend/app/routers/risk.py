from fastapi import APIRouter, Depends
from app.schemas.health import HealthCreate
from app.schemas.vehicle import VehicleCreate
from app.database import risk_collection
from app.utils.deps import get_current_user
from datetime import datetime
from typing import Optional

router = APIRouter(prefix="/risk", tags=["risk"])

def simple_rule_based_risk(health: dict, vehicle: dict) -> dict:
    """
    Basic rule-based risk detection (placeholder).
    Your ML teammate will replace this behavior later.
    Returns dict with keys: risk_level (low/medium/high), reasons (list)
    """
    reasons = []
    score = 0.0

    # Health rules
    fatigue = health.get("fatigue_score") or 0.0
    stress = health.get("stress_score") or 0.0
    blink = health.get("blink_rate") or 0.0

    if fatigue >= 0.7:
        reasons.append("high_fatigue")
        score += 0.6
    elif fatigue >= 0.4:
        reasons.append("moderate_fatigue")
        score += 0.3

    if stress >= 0.7:
        reasons.append("high_stress")
        score += 0.4
    elif stress >= 0.4:
        reasons.append("moderate_stress")
        score += 0.2

    # Blink rate low or very high may indicate drowsiness/unusual
    if blink < 8:
        reasons.append("low_blink_rate")
        score += 0.2
    elif blink > 30:
        reasons.append("high_blink_rate")
        score += 0.1

    # Vehicle rules
    speed = vehicle.get("speed") or 0.0
    lane = vehicle.get("lane_deviation") or 0.0
    sudden_brake = vehicle.get("sudden_brake") or False

    if speed > 110:
        reasons.append("overspeeding")
        score += 0.5
    if lane and abs(lane) > 0.5:
        reasons.append("lane_deviation")
        score += 0.4
    if sudden_brake:
        reasons.append("sudden_brake")
        score += 0.4

    # Determine level
    if score >= 1.0:
        level = "high"
    elif score >= 0.5:
        level = "medium"
    else:
        level = "low"

    return {"risk_level": level, "reasons": reasons, "score": round(score, 2)}

@router.post("/predict")
async def predict(health: HealthCreate, vehicle: VehicleCreate, user = Depends(get_current_user)):
    # Restrict drivers to their own id
    if user["role"] == "driver" and user["id"] != health.driver_id:
        return {"error": "Not authorized to submit for other driver"}

    # Build dicts
    health_doc = health.dict()
    vehicle_doc = vehicle.dict()

    # Basic timestamp
    now = datetime.utcnow().isoformat()

    # Call rule-based detector
    risk_result = simple_rule_based_risk(health_doc, vehicle_doc)

    # Persist risk record
    doc = {
        "driver_id": health.driver_id,
        "timestamp": now,
        "health": health_doc,
        "vehicle": vehicle_doc,
        "risk": risk_result
    }
    res = await risk_collection.insert_one(doc)
    doc["id"] = str(res.inserted_id)

    # If high severity, mark an "alert" flag (frontend/admin can query)
    if risk_result["risk_level"] == "high":
        doc["alert"] = True
    else:
        doc["alert"] = False

    return doc

@router.get("/history/{driver_id}")
async def risk_history(driver_id: str, user = Depends(get_current_user)):
    if user["role"] == "driver" and user["id"] != driver_id:
        return {"error": "Not authorized"}
    out = []
    cursor = risk_collection.find({"driver_id": driver_id}).sort("timestamp", -1)
    async for r in cursor:
        r["id"] = str(r["_id"])
        r.pop("_id", None)
        out.append(r)
    return out
