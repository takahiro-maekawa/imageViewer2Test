from sqlalchemy import Column, DateTime, Integer, String
from src.component.database import Base

class Entity(Base):
    __abstract__ = True  # 抽象基底クラスとして定義
    id = Column(Integer, primary_key=True, index=True)
    dataowner = Column(String)
    regist_date = Column(DateTime)
    enable_end_date = Column(DateTime)
    version = Column(Integer)