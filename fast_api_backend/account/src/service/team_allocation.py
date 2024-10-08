from typing import Any, Callable
from sqlalchemy.orm import Session

from src.schema.team_allocation.schemas import PermissionAllocationForCreate, TeamBase, UserBase
from src.service.common.abstract_service import AbstractService
from src.repository.app_user import AppUserRepository
from src.repository.app_team import AppTeamRepository
from src.repository.permission_allocation import PermissionAllocationRepository
from src.lib.jwt import encode_app_jwt, decode_app_jwt
from src.lib.array_util import interleaveString, untiInterleaveString

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
    res = self.app_user_repository.findAppUserById(session, id)
    return res.__dict__ if res else None
  
  @AbstractService.with_session_readonly
  def findAppTeamById(self, session, id: int):
    res = self.app_team_repository.findAppTeamById(session, id)
    return res.__dict__ if res else None
    
  @AbstractService.with_session_readonly
  def findAllocationById(self, session, id: int):
    res = self.permission_allocation_repository.findPermissionAllocationByPermissionId(session, id)
    if res is None:
      return None
    
    obj = res.__dict__
    obj['user'] = res.user.__dict__
    obj['team'] = res.team.__dict__
    
    return obj
  
  @AbstractService.with_session
  def createUserWithNewTeam(self, session, team_name: str, user_name: str, user_email: str):
    sample_team = TeamBase(name=team_name)
    sample_user = UserBase(name=user_name, email=user_email)
    dto = PermissionAllocationForCreate(team = sample_team, user=sample_user, read_level=2, write_level=2, is_admin=True)
    
    res =  self.permission_allocation_repository.insertAllocationWithNewTeamAndNewUser(session, dto)
    return res.__dict__ if res else None

  def exportPassCodeByTeamId(self, team_id: int):
    team = self.findAppTeamById(id = team_id)
    if team is None:
      return None
    team_name = team["name"]
    team_id = team["id"]
    
    obj = {
      "team_name": team_name,
      "team_id": team_id
    }
    
    return interleaveString(encode_app_jwt(obj), 8)
  
  def decodePassCode(self, code: str) -> dict[str, Any]:
    return decode_app_jwt(untiInterleaveString(code, 8))