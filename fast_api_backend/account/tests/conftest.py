import pytest
from src.repository.app_user import AppUserRepository
from src.service.team_allocation import TeamAllocationService
from src.component.database import Base
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
    return TeamAllocationService(session_factory=SessionLocal, app_user_repository=AppUserRepository())

from src.main import app
from dependency_injector import providers

def temp_db_container(f):
    def func(*args, **kwargs):
        
        db = DatabaseForTest()
        Entity.metadata.create_all(db._engine)
    
        # 既存のコンテナを取得
        original_container = app.container
        
        test_db = providers.Singleton(DatabaseForTest)
        original_container.db.override(test_db)
        
        try:
            # Run tests
            f(*args, **kwargs)
        finally:
            Entity.metadata.drop_all(db._engine)
            # データベース接続を元に戻す
            original_container.db.reset_override()
    return func