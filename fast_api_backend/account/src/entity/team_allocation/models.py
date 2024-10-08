from typing import List, Optional

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from src.entity.entity import Entity

class PermissionAllocation(Entity):
    __tablename__ = "permission_allocation"
    user_id: Mapped[int] = mapped_column(ForeignKey("app_user.id"), primary_key=True)
    team_id: Mapped[int] = mapped_column(
        ForeignKey("app_team.id"), primary_key=True
    )
    read_level: Mapped[int] = mapped_column(default=0)
    write_level: Mapped[int] = mapped_column(default=0)
    is_admin: Mapped[bool] = mapped_column(default=False)
    
    user: Mapped["AppUser"] = relationship(back_populates="allocation")
    team: Mapped["AppTeam"] = relationship(back_populates="allocation")

class AppUser(Entity):
    __tablename__ = "app_user"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    email: Mapped[str] = mapped_column()
    allocation: Mapped[List["PermissionAllocation"]] = relationship(back_populates="user")

class AppTeam(Entity):
    __tablename__ = "app_team"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    allocation: Mapped[List["PermissionAllocation"]] = relationship(back_populates="team")