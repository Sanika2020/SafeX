from pydantic import BaseModel
from typing import Optional, Dict, Any

class HealthCreate(BaseModel):
    driver_id: str
    timestamp: Optional[str] = None
    fatigue_score: Optional[float] = None
    stress_score: Optional[float] = None
    blink_rate: Optional[float] = None
    heart_rate: Optional[float] = None
    extra: Optional[Dict[str, Any]] = {}
