from pydantic import BaseModel
from typing import List

class UserRegister(BaseModel):
    userName:str
    emailId:str
    password:str
    phoneNumber:int
    gender:str
    role: str = "user"
    status: int = 1
class UserLogin(BaseModel):
    userName:str
    password:str
    
class UserResponse(BaseModel):
    id:int
    userName:str
    emailId:str
    phoneNumber:int
    gender:str
    role: str
    status: int
    class Config():
        orm_mode = True
