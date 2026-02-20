from database import Base
from sqlalchemy import Integer,String,DateTime,func
from sqlalchemy.orm import Mapped,mapped_column
class Project(Base):
    __tablename__ = "projects"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    project_name: Mapped[String] = mapped_column(String,nullable=False)
    project_description: Mapped[String]  = mapped_column(String,nullable=False)
    status: Mapped[int] = mapped_column(Integer,default=1)
    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )
