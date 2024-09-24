from sqlalchemy import Column, Integer, String, ForeignKey
from src.component.common.entity import Entity

class AppUser(Entity):
    __tablename__ = "app_user"
    name = Column(String)
    email = Column(String)
  