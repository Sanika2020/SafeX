from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME", "driver_safety")

if not MONGODB_URI:
    raise RuntimeError("MONGODB_URI not set in environment variables")

client = AsyncIOMotorClient(MONGODB_URI)
db = client[DATABASE_NAME]

# Collections
users_collection = db["users"]
health_collection = db["driver_health_data"]
vehicle_collection = db["vehicle_data"]
risk_collection = db["risk_alerts"]
emergency_collection = db["emergency_reports"]
vehicle_info_collection = db["vehicle_info"]
