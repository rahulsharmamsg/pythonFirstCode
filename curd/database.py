from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from urllib.parse import quote_plus
# URL encode
encoded_password = quote_plus('@Shanvi@21')  # Output: '%40Shanvi%4021'

# DATABASE_URL
DATABASE_URL = f"postgresql://postgres:{encoded_password}@localhost:5432/mydb"
db_engine = create_engine(DATABASE_URL)
print("✅ Database engine created ss")
SessionLocal = sessionmaker(autoflush=False,bind=db_engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()