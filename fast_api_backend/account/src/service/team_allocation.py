from typing import Callable
from sqlalchemy.orm import Session

from src.service.common.abstract_service import AbstractService
from src.repository.app_user import AppUserRepository

class TeamAllocationService(AbstractService):
    def __init__(self, session_factory:Callable[[], Session], app_user_repository: AppUserRepository):
        super().__init__(session_factory)
        self.app_user_repository = app_user_repository
        
    @AbstractService.with_session
    def findAppUserById(self, session, id: int):
        return self.app_user_repository.findAppUserById(session, id)