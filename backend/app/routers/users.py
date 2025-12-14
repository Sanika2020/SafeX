from fastapi import APIRouter, Depends, HTTPException
from app.utils.deps import require_admin
from app.database import users_collection
from bson import ObjectId

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/all")
async def list_users(admin = Depends(require_admin)):
    out = []
    cursor = users_collection.find()
    async for u in cursor:
        out.append({
            "id": str(u["_id"]),
            "email": u["email"],
            "full_name": u.get("full_name"),
            "role": u.get("role", "driver")
        })
    return out

@router.delete("/{user_id}")
async def delete_user(user_id: str, admin = Depends(require_admin)):
    res = await users_collection.delete_one({"_id": ObjectId(user_id)})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"status": "deleted", "id": user_id}
