from fastapi import FastAPI
from fastapi.security import OAuth2PasswordBearer
from app.routers import auth, users, health, vehicle, risk, emergency, dashboard
import logging

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

app = FastAPI(title="Driver Health & Vehicle Safety - Backend",
    description="Backend API for AI-based driver health & vehicle safety system",
    version="1.0.0")

# include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(health.router)
app.include_router(vehicle.router)
app.include_router(risk.router)
app.include_router(emergency.router)
app.include_router(dashboard.router)

@app.get("/")
async def root():
    return {"status": "ok", "message": "Driver safety backend running"}

@app.on_event("startup")
async def startup_event():
    logging.info("Backend starting up. MongoDB and routes ready.")
