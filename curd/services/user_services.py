from fastapi import HTTPException,status
from datetime import datetime, timedelta
from schema.user import UserRegister,UserLogin
from sqlalchemy.orm import Session
from jose import jwt
from core import has_password,verify_password
from config import ACCESS_TOKEN_EXPIRE_MINUTES,REFRESH_TOKEN_EXPIRE_DAYS,ALGORITHM,SECRET_KEY
from models import User
def register_user(data:UserRegister,db:Session):
    existing_user = db.query(User).filter(User.emailId == data.emailId).first()
    if existing_user:
        raise HTTPException(
                status_code = 400,
                detail = "Email allready registered."
            )
    new_user = User(
            userName=data.userName,
            emailId=data.emailId,
            password=has_password(data.password),  # ❌ plain text (hash later)
            phoneNumber=data.phoneNumber,
            gender=data.gender
        )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
def loginUser(data:UserLogin,db:Session):
    user = db.query(User).filter(User.emailId == data.userName).first()
    if not user:
        raise HTTPException(
                status_code = status.HTTP_401_UNAUTHORIZED,
                detail = "Username invalid."
            )
    if user.status != 1:
        raise HTTPException(
            status_code = status.HTTP_403_FORBIDDEN,
            detail = "Account Inactive."
        )
    if not verify_password(data.password,user.password):
        raise HTTPException(
                status_code = status.HTTP_401_UNAUTHORIZED,
                detail = "Password invalid."
            )
    return user
def create_access_token(data:dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)