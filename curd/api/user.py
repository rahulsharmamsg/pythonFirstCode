from fastapi import APIRouter ,Depends, Header, status, HTTPException
from schema.user import UserRegister,UserLogin
from sqlalchemy.orm import Session
from database import get_db
from core import check_current_user
from services import register_user,loginUser,create_access_token,create_refresh_token,verify_token
# Check User login and role user than access api
router = APIRouter()
@router.post('/register',status_code=status.HTTP_201_CREATED)
def userRegister(data:UserRegister, db:Session = Depends(get_db)):
    try:
        user = register_user(data,db)
        return {
            "message":"User registered successfully",
            "user_id":user.id
        }
    except HTTPException:
        db.rollback()
        raise
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code = 500,
            detail = "Internal Server Error."
        )
@router.post('/login',status_code=status.HTTP_201_CREATED)
def userLogin(data:UserLogin,db:Session = Depends(get_db)):
    try:
        user  = loginUser(data,db)
        accessToken = create_access_token({
            "sub":str(user.id),
            "role":user.role
        })
        refreshToken = create_refresh_token({
            "sub":str(user.id),
            "role":user.role
        })

        return {
            "message": "Login successful",
            "user": user.userName,
            "accesstoken": accessToken,
            "refreshtoken": refreshToken
             }
    except HTTPException:
        db.rollback()
        raise
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail = "Internal Server Error."
        )
@router.post('/refresh-token')
def refresh_access_token(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401,detail="Refresh token missing")
    refresh_token = authorization.split(" ")[1]
    payload = verify_token(refresh_token)
    if not payload:
        raise HTTPException(status_code=401,detail="Invalid or expired refresh token")
    user_id = payload.get("sub")
    user_role = payload.get("role")
    new_access_token = create_access_token({
        "sub": user_id,
        "role": user_role
    })
    return {
        "accesstoken": new_access_token
    }