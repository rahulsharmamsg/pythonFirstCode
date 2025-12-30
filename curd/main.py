from fastapi import FastAPI
from database import db_engine,Base
from sqlalchemy import text
from  models import User
from api import userRouter
app = FastAPI()
#Create all table from model.
Base.metadata.create_all(bind=db_engine)
app.include_router(userRouter)

@app.on_event("startup")
def startup_db_check():
    try:
        with db_engine.connect() as conn:
            result = conn.execute(text("select 1"))
            print("Database connected successfully:", result.scalar())
    except Exception as e:
        print("Database connection Failed..",e)
# @app.get('/')
# def rootFun():
#     return "Hello this is rootApi"
# @app.post("/register")
# def userRegister(data:UserRegister,db:Session = Depends(get_db)):
#     # print(data.dict())
#     return data