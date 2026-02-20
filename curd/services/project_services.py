from sqlalchemy.orm import Session
from fastapi import HTTPException,status
from schema.project import ProjectSchema
from models import Project
def saveProject(data:ProjectSchema,db:Session):
    existing_project = db.query(Project).filter(Project.project_name == data.project_name).first()
    print(existing_project,'db data')
    if existing_project:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail = "Project Allready Exist.."
        )
    new_project = Project(
        project_name =  data.project_name,
        project_description = data.project_description
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project) 
    return new_project
