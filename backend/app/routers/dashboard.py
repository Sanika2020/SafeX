from fastapi import APIRouter, Depends
from app.utils.deps import require_admin, get_current_user
from app.database import users_collection, risk_collection, emergency_collection, vehicle_info_collection
from datetime import datetime, timedelta

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/admin")
async def admin_dashboard(admin = Depends(require_admin)):
    # Basic stats for admin dashboard
    total_users = await users_collection.count_documents({})
    total_drivers = await users_collection.count_documents({"role": "driver"})
    total_alerts = await risk_collection.count_documents({"risk.risk_level": "high"})
    open_emergencies = await emergency_collection.count_documents({"status": "open"})
    total_vehicles = await vehicle_info_collection.count_documents({})

    # recent alerts (last 24h)
    since = (datetime.utcnow() - timedelta(hours=24)).isoformat()
    recent_alerts_cursor = risk_collection.find({"timestamp": {"$gte": since}, "risk.risk_level": "high"}).sort("timestamp", -1).limit(10)
    recent_alerts = []
    async for a in recent_alerts_cursor:
        a["id"] = str(a["_id"])
        a.pop("_id", None)
        recent_alerts.append(a)

    return {
        "total_users": total_users,
        "total_drivers": total_drivers,
        "total_vehicles": total_vehicles,
        "total_high_risk_alerts": total_alerts,
        "open_emergencies": open_emergencies,
        "recent_alerts": recent_alerts
    }

@router.get("/driver")
async def driver_dashboard(user = Depends(get_current_user)):
    # driver-level small dashboard
    driver_id = user["id"]
    # latest risk
    latest = await risk_collection.find_one({"driver_id": driver_id}, sort=[("timestamp", -1)])
    if latest:
        latest["id"] = str(latest["_id"])
        latest.pop("_id", None)
    # emergencies
    open_em = await emergency_collection.count_documents({"driver_id": driver_id, "status": "open"})
    return {
        "latest_risk": latest,
        "open_emergencies": open_em
    }
