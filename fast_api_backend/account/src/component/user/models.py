from sqlalchemy import Column, Integer, String, ForeignKey
from src.component.common.entity import Entity

class AppUserTest(Entity):
    __tablename__ = "app_usqer"
    name = Column(String)
    email = Column(String)
