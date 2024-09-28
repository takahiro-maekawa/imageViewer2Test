from dependency_injector import containers, providers

from src.repository.app_user import AppUserRepository
from src.service.team_allocation import TeamAllocationService
from src.config.database import Database

class TestClassA:
  def __init__(self):
    self.a = "a"
    
class Container(containers.DeclarativeContainer):
  wiring_config = containers.WiringConfiguration(["src.endpoints.welcome"])
  config = providers.Configuration()
  
  db = providers.Singleton(Database)
  
  user_repository = providers.Factory(
    AppUserRepository
  )
  
  user_service = providers.Factory(
    TeamAllocationService, session_factory=db.provided.session, 
      app_user_repository=user_repository
  )
  
  test = providers.Factory(TestClassA)
  
  