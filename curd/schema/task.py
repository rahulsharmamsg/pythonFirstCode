
from pydantic import BaseModel
from enum import Enum
from schema.user import UserResponse
from schema.project import ProjectResponse
class TaskPriority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"
class TaskCreateSchema(BaseModel):
    title:str
    project_id: int
    user_id:int
    priority:str
class TaskUpdateSchema(BaseModel):
    title:str
    project_id: int
    user_id:int
    priority:str
    status:str
class TaskResponseSchema(BaseModel):
    id:int
    title:str
    project_id: int
    user_id:int
    priority:str
    status: str
    user:UserResponse
    project:ProjectResponse
    class Config():
        orm_mode = True
