from functools import wraps
from typing import Callable
from sqlalchemy.orm import Session

class AbstractService:
  def __init__(self, session_factory:Callable[[], Session]):
    self.session_factory = session_factory

  @staticmethod
  def with_session_readonly(func):
    @wraps(func)
    def wrapper(self, *args, **kwargs):
      with self.session_factory() as session:
          return func(self, session, *args, **kwargs)
    return wrapper
  
  @staticmethod
  def with_session(func):
    @wraps(func)
    def wrapper(self, *args, **kwargs):
      with self.session_factory() as session:
        try:
          result=func(self, session, *args, **kwargs)
          session.commit()
          return result
        except Exception as e:
          session.rollback()  # 例外が発生した場合はロールバック
          raise e
        finally:
          session.close()
    return wrapper