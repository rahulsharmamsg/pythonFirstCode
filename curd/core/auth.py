from fastapi import Depends,HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import jwt,JWTError
from database import get_db
from config import SECRET_KEY,ALGORITHM
from models import User
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/login')
def get_current_user(token:str = Depends(oauth2_scheme), db:Session = Depends(get_db)):
    try:
        payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        print(payload,'Payload')
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(401, "Invalid token")
    except JWTError:
        raise HTTPException(401, "Token expired or invalid")
    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user or user.status != 1:
        raise HTTPException(403, "Inactive user")
    return user