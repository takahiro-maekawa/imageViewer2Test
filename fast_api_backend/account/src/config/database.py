from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from contextlib import contextmanager, AbstractContextManager  
from typing import Callable

Base = declarative_base()

class Database:
  def __init__(self):
    self.db_url = "hoge"
    self._engine = create_engine(db_url=self.db_url, connect_args={"check_same_thread": False})
    self._session_factory =sessionmaker(autocommit=False, autoflush=False, bind=self._engine)
  
  @contextmanager
  def session(self) -> Callable[..., AbstractContextManager[Session]]:
    session: Session = self._session_factory()
    try:
        yield session
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()