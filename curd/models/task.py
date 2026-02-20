
from database import Base
from sqlalchemy import String,Integer,ForeignKey,Enum,DateTime,func
from sqlalchemy.orm import Mapped, mapped_column,relationship
class TaskModel(Base):
    __tablename__ = 'tasks'
    id:Mapped[int] = mapped_column(primary_key=True,index=True)
    title:Mapped[str] = mapped_column(String(255),unique=True,nullable=False)
    user_id:Mapped[int] = mapped_column(Integer,ForeignKey("users.id"),nullable=False)
    project_id:Mapped[int] = mapped_column(Integer,ForeignKey("projects.id"),nullable=False)
    # priority:Mapped[str] = mapped_column(Enum("low", "medium", "high", name="priority_enum"), default="medium") 
    priority:Mapped[str] = mapped_column(String(255),nullable=False) 
    status:Mapped[str] = mapped_column(String(50),default="pending")
    user = relationship("User") # One way relation if we use two way relation back_populate="Here secound model attribute name "
    project = relationship("Project") # One way relation if we use two way relation back_populate="Here secound model attribute name "
    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    ),

