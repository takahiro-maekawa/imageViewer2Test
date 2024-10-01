import pytest
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
