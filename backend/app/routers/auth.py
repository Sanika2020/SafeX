from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.user import UserCreate, UserLogin, UserOut, TokenOut
from app.database import users_collection
from app.core.security import hash_password, verify_password, create_access_token
from bson import ObjectId

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserOut)
async def register(user: UserCreate):
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = hash_password(user.password)
    doc = {
        "email": user.email,
        "password": hashed,
        "full_name": user.full_name,
        "role": user.role or "driver",
    }
    result = await users_collection.insert_one(doc)
    return {"id": str(result.inserted_id), "email": user.email, "full_name": user.full_name, "role": doc["role"]}

@router.post("/login", response_model=TokenOut)
async def login(payload: UserLogin):
    user = await users_collection.find_one({"email": payload.email})
    if not user or not verify_password(payload.password, user["password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token_data = {"user_id": str(user["_id"]), "role": user.get("role", "driver"), "email": user["email"]}
    access_token = create_access_token(token_data)
    return {"access_token": access_token, "token_type": "bearer"}
