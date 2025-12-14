from pydantic import BaseModel
from typing import Optional, Dict, Any

class VehicleCreate(BaseModel):
    driver_id: str
    timestamp: Optional[str] = None
    speed: Optional[float] = None
    lane_deviation: Optional[float] = None
    sudden_brake: Optional[bool] = None
    steering_angle: Optional[float] = None
    extra: Optional[Dict[str, Any]] = {}
