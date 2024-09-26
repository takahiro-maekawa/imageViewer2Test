import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, drop_database
from src.component.database import Base

import os
import dotenv

@pytest.fixture(scope="function")
def SessionLocal():
    dotenv.load_dotenv()
    
    # settings of test database
    TEST_SQLALCHEMY_DATABASE_URL = 'postgresql+psycopg2://{user}:{password}@{host}/{database}'.format(
    **{
        'user': os.getenv('DB_USER', 'sample_user'),
        'password': os.getenv('DB_PASSWORD', 'password'),
        'host': os.getenv('DB_HOST', 'localhost:5432'),
        'database': os.getenv('DB_DATABASE', 'test_schema'),
    })
    
    engine = create_engine(
        TEST_SQLALCHEMY_DATABASE_URL, echo=True, connect_args={
            'options': '-c search_path={schema}'.format(
                schema=os.getenv('DB_SCHEMA', 'image')
            )
        }
    )

    # Create test database and tables
    Base.metadata.create_all(engine)
    #AppUser.__table__.create(bind=engine)
    #Association.metadata.create_all(bind=engine)
    #Parent.metadata.create_all(bind=engine)
    #Child.metadata.create_all(bind=engine)
    
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    # Run the tests
    yield SessionLocal

    # Drop the test database
    Base.metadata.drop_all(engine)
