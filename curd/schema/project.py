from pydantic import BaseModel
class ProjectSchema(BaseModel):
    project_name: str
    project_description:str


class ProjectResponse(BaseModel):
    id: int
    project_name: str
    project_description: str
    status: int
    class Config:
        orm_mode = True