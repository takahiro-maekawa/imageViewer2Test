from sqlalchemy import Column, DateTime, Integer, String, Sequence, event
from src.config.database import Base

class Entity(Base):
    __abstract__ = True  # 抽象基底クラスとして定義
    id = Column(Integer, Sequence('entity_id_seq'), primary_key=True, index=True)
    dataowner = Column(String)
    regist_date = Column(DateTime)
    enable_start_date = Column(DateTime)
    enable_end_date = Column(DateTime)
    version = Column(Integer, nullable=False)  # デフォルト値を設定
    __mapper_args__ = {
        'version_id_col': version,
    }