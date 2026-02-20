from fastapi import Depends,HTTPException,status
from sqlalchemy.orm import Session
from schema.task import TaskCreateSchema
from database import get_db
from models import TaskModel
def saveTask(data:TaskCreateSchema,db:Session):
    existing_task = db.query(TaskModel).filter(TaskModel.title == data.title).all()
    if existing_task:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail= "Task Allready Exist.."
        )
    task = TaskModel(
        title = data.title,
        user_id = data.user_id,
        project_id = data.project_id,
        priority = data.priority,
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task