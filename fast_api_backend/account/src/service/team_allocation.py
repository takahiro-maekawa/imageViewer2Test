from typing import Callable
from sqlalchemy.orm import Session

from src.schema.team_allocation.schemas import PermissionAllocationForCreate, TeamBase, UserBase
from src.service.common.abstract_service import AbstractService
from src.repository.app_user import AppUserRepository
from src.repository.app_team import AppTeamRepository
from src.repository.permission_allocation import PermissionAllocationRepository

class TeamAllocationService(AbstractService):
  def __init__(self, session_factory:Callable[[], Session],
                app_user_repository: AppUserRepository, app_team_repository: AppTeamRepository,
                  permission_allocation_repository: PermissionAllocationRepository):
    super().__init__(session_factory)
    self.app_user_repository = app_user_repository
    self.app_team_repository = app_team_repository
    self.permission_allocation_repository = permission_allocation_repository

  @AbstractService.with_session_readonly
  def findAppUserById(self, session, id: int):
    return self.app_user_repository.findAppUserById(session, id)
  
  @AbstractService.with_session_readonly
  def findAllocationById(self, session, id: int):
    return self.permission_allocation_repository.findPermissionAllocationByPermissionId(session, id)
  
  @AbstractService.with_session
  def createUserWithNewTeam(self, session, team_name: str, user_name: str, user_email: str):
    sample_team = TeamBase(name=team_name)
    sample_user = UserBase(name=user_name, email=user_email)
    dto = PermissionAllocationForCreate(team = sample_team, user=sample_user, read_level=2, write_level=2)
    
    self.permission_allocation_repository.insertAllocationWithNewTeamAndNewUser(session, dto)
    session.commit()