from fastapi import Depends,HTTPException,status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import jwt,JWTError
from database import get_db
from config import SECRET_KEY,ALGORITHM
from models import User
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/login')
def check_current_user(token:str = Depends(oauth2_scheme), db:Session = Depends(get_db)):
    try:
        payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        print(payload,'Payload')
        user_id = payload.get("sub")
        user_role = payload.get("role")
        if user_role != 'user':
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Api not authorized"
            )
        if not user_id:
            raise HTTPException(401, "Invalid token")
    except JWTError:
        raise HTTPException(401, "Token expired or invalid")
    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user or user.status != 1:
        raise HTTPException(403, "Inactive user")
    return user
def check_admin_user(token:str = Depends(oauth2_scheme), db:Session = Depends(get_db)):
    try:
        payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        print(payload,'Payload for admin')
        user_id = payload.get("sub")
        user_role = payload.get("role")
        print(user_id,type(user_role),'User id and User role')
        if not user_id:
            raise HTTPException(401, "Invalid token")
        if user_role != 'admin':
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not authorized"
            )

    except JWTError:
        raise HTTPException(401, "Token expired or invalid")
    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user or user.status != 1:
        raise HTTPException(403, "Inactive user")
    return user