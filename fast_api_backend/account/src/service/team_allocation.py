from src.component.users_ import schemas
from src.repository.app_user import AppUserRepository

from src.component.users_.crud import get_user_by_email_query, create_user_query

class TeamAllocationService:
    def __init__(self, session_factory, app_user_repository: AppUserRepository):
        self.session_factory = session_factory
        self.app_user_repository = app_user_repository
        
    def findAppUserById(self, id: int):
        with self.session_factory() as session:
            return self.app_user_repository.findAppUserById(session, id)
        
    def getUserByEmailQuery(self, email: str):
        with self.session_factory() as session:
            return get_user_by_email_query(db=session, email=email)

    def createUsertQuery(self,  user: schemas.UserCreate):
        with self.session_factory() as session:
            return  create_user_query(db=session, user=user)