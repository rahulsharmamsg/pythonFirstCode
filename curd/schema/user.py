from pydantic import BaseModel
from typing import List

class UserRegister(BaseModel):
    userName:str
    emailId:str
    password:str
    phoneNumber:int
    gender:str
    role: str
    status: int = 1
class UserLogin(BaseModel):
    userName:str
    password:str
