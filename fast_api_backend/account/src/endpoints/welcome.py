from fastapi import APIRouter, Depends, Response, status  
from dependency_injector.wiring import inject, Provide
from src.config.container import Container, TestClassA

from src.service.team_allocation import TeamAllocationService

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from src.component.users_ import models
from src.component.users_ import schemas

from src.component.users_.crud import get_user_by_email_query, create_user_query

welcome_router = APIRouter()

@welcome_router.get("/welcome/some_user")
@inject
def get_some_user(service :TeamAllocationService = Depends(Provide[Container.user_service])):
    return service.findAppUserById(1)

@welcome_router.post("/users/", response_model=schemas.User)
@inject
def create_user(user: schemas.UserCreate, service :TeamAllocationService = Depends(Provide[Container.user_service])):
    db_user = service.getUserByEmailQuery(user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return service.createUsertQuery(user=user)

@welcome_router.get("/")
@inject
def hello(testc: TestClassA = Depends(Provide[Container.test])):
    assert testc.a == "a"
    return {"message": "Hello World"}

@welcome_router.post("/welcome/new_team_and_user")
@inject
def create_team_and_user(testc = Depends(Provide[Container.test])):    
    return {"message": "Hello World"}