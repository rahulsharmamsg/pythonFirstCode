from fastapi import APIRouter,Depends,HTTPException,status
from database import get_db
from schema.project import ProjectSchema,ProjectResponse
from schema.user import UserRegister, UserResponse

from sqlalchemy.orm import session
from services import saveProject,saveTask
from models import Project,User,TaskModel
from core import check_admin_user
from schema.task import TaskCreateSchema,TaskResponseSchema,TaskUpdateSchema
router = APIRouter(
    dependencies=[Depends(check_admin_user)]
)

@router.post('/add_project',status_code=status.HTTP_201_CREATED)
def addProject(data:ProjectSchema,db:session = Depends(get_db)):
    try:
        res = saveProject(data,db)
        return {
            "message": "Project added successfully",
            "data": res
            }
    except HTTPException:
        db.rollback()
        raise
    except Exception:
        db.rollback()
        raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail = "Internal Server Error."
        )
@router.get('/fetch_project',response_model=list[ProjectResponse],status_code=status.HTTP_200_OK)
def getProject(db:session=Depends(get_db)):
    try:
        projects = db.query(Project).all()
        if not projects:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,data="Data Not Found..") 
        return projects
    except HTTPException:
        db.rollback()
        raise
    except Exception:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail ="Internal server error")
@router.get('/get_user',response_model=list[UserResponse],status_code=status.HTTP_200_OK)
def getUser(db:session=Depends(get_db)):
    try:
        userList = db.query(User).filter(User.role == "user", User.status == 1).all()
        if not userList:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,data="Data Not Found..") 
        return userList
    except HTTPException:
        db.rollback()
        raise
    except Exception:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail ="Internal server error")
@router.post('/add_task',status_code=status.HTTP_201_CREATED)
def addTask(data:TaskCreateSchema,db:session=Depends(get_db)):
    try:
        task = saveTask(data,db)
        return {
            "message": "Task added successfully",
            "data": task
            }
    except HTTPException:
        db.rollback()
        raise
    except Exception:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail ="Internal server error")
@router.get('/fetch_task',response_model=list[TaskResponseSchema],status_code=status.HTTP_200_OK)
def getTasks(db:session = Depends(get_db)):
    try:
        task =  db.query(TaskModel).filter().all()        
        if not task:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Task Not Foound")
        return task
    except HTTPException:
        db.rollback()
        raise
    except Exception:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")
@router.delete('/delete_task/{task_id}',status_code=status.HTTP_200_OK)
def delete_task(task_id:int,db:session=Depends(get_db)):
    try:
        print(task_id,'Task Id')
        task  = db.query(TaskModel).filter(TaskModel.id == task_id).first()
        if not task:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Task Not Found")
        db.delete(task)
        db.commit()
        return {"message": "Task deleted successfully"}
    except HTTPException:
        db.rollback()
        raise 
    except Exception:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")
@router.put("/tasks/{task_id}",response_model=TaskResponseSchema)
def update_task(task_id: int,payload: TaskUpdateSchema,db: session = Depends(get_db)):
    try:
        task = db.query(TaskModel).filter(TaskModel.id == task_id).first()

        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        # 🔥 FULL overwrite (PUT)
        task.title = payload.title
        task.project_id = payload.project_id
        task.user_id = payload.user_id
        task.priority = payload.priority
        task.status = payload.status

        db.commit()
        db.refresh(task)

        return task

    except HTTPException:
        db.rollback()
        raise

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )
