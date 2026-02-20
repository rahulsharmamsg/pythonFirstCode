from fastapi import FastAPI
from database import db_engine,Base
from sqlalchemy import text
from  models import User
from api import userRouter,adminRouter

from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
origins = [
    "http://localhost:5173",   # Vite
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # 👈 frontend URLs
    allow_credentials=True,
    allow_methods=["*"],        # GET, POST, PUT, DELETE
    allow_headers=["*"],        # Authorization, Content-Type
)

#Create all table from model.
Base.metadata.create_all(bind=db_engine)
app.include_router(userRouter)
app.include_router(adminRouter,prefix="/admin")

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