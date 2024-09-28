from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from src.component.users_ import models
from src.component.users_ import schemas
from src.component.users_.crud import get_user_by_email_query, create_user_query
from src.component.database import SessionLocal, engine

from src.config.container import Container

from src.endpoints.welcome import welcome_router

def createApp() -> FastAPI:
    container = Container()
    app = FastAPI()
    app.container = container
    app.include_router(welcome_router)  
    
    return app

app = createApp()

def get_db():
    """Dependency"""
    try:
        db = SessionLocal()  # sessionを生成
        yield db
    finally:
        db.close()



