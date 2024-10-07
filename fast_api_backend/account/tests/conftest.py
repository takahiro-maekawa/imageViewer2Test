import pytest
from src.repository.app_user import AppUserRepository
from src.repository.app_team import AppTeamRepository
from src.repository.permission_allocation import PermissionAllocationRepository

from src.service.team_allocation import TeamAllocationService
from src.config.database import Base
from src.entity.entity import Entity
from tests.config.database import DatabaseForTest

@pytest.fixture(scope="function")
def SessionLocal():
    
    engine = DatabaseForTest()._engine

    # Create tables
    Entity.metadata.create_all(engine)
    
    SessionLocal = DatabaseForTest()._session_factory

    # Run the tests
    yield SessionLocal

    # Drop the test database
    Base.metadata.drop_all(engine)

@pytest.fixture(scope="function")
def teamAllocationService(SessionLocal):
    return TeamAllocationService(session_factory=SessionLocal, app_user_repository=AppUserRepository(), app_team_repository=AppTeamRepository(), permission_allocation_repository=PermissionAllocationRepository())
