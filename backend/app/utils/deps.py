from fastapi import Header, HTTPException, status, Depends
from typing import Optional
from app.core.security import decode_access_token
from app.database import users_collection
from bson import ObjectId

async def get_token_payload(authorization: Optional[str] = Header(None)):
    """
    Expects header: Authorization: Bearer <token>
    Returns decoded payload dict or raises 401.
    """
    if not authorization:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing Authorization header")
    try:
        scheme, token = authorization.split()
    except ValueError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Bad Authorization header format")
    if scheme.lower() != "bearer":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unsupported auth scheme")
    try:
        payload = decode_access_token(token)
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
    return payload

async def require_admin(payload: dict = Depends(get_token_payload)):
    role = payload.get("role")
    if role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin privileges required")
    return payload

async def get_current_user(payload: dict = Depends(get_token_payload)):
    """
    Loads the user document from DB (if exists) and returns it.
    """
    user_id = payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")
    user = await users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    user_out = {
        "id": str(user["_id"]),
        "email": user["email"],
        "full_name": user.get("full_name"),
        "role": user.get("role", "driver")
    }
    return user_out
