from typing import Callable
from sqlalchemy.orm import Session

from src.service.common.abstract_service import AbstractService
from src.component.users_ import schemas
from src.repository.app_user import AppUserRepository
from src.component.users_.crud import get_user_by_email_query, create_user_query

class TeamAllocationService(AbstractService):
    def __init__(self, session_factory:Callable[[], Session], app_user_repository: AppUserRepository):
        super().__init__(session_factory)
        self.app_user_repository = app_user_repository
        
    @AbstractService.with_session
    def findAppUserById(self, session, id: int):
        return self.app_user_repository.findAppUserById(session, id)

    @AbstractService.with_session
    def getUserByEmailQuery(self, session, email: str):
        return get_user_by_email_query(db=session, email=email)

    @AbstractService.with_session
    def createUsertQuery(self, session, user: schemas.UserCreate):
        """
        Creates a new user.

        :param user: The user data to create.
        :return: The created user.
        """
        return create_user_query(db=session, user=user)