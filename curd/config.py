import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY  = os.getenv("SECRET_KEY","PYTHONSIMPLEPROJECT")
ALGORITHM  = os.getenv("ALGORITHM","HS256")
ACCESS_TOKEN_EXPIRE_MINUTES  = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES",2))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS",7))