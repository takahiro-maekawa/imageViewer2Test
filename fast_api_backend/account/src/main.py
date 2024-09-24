from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from src.component.users_ import models
from src.component.users_ import schemas
from src.component.users_.crud import get_user_by_email_query, create_user_query
from src.component.database import SessionLocal, engine

from src.component.user import models as UserModels

# table作成
models.Base.metadata.create_all(bind=engine)
UserModels.Entity.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    """Dependency"""
    try:
        db = SessionLocal()  # sessionを生成
        yield db
    finally:
        db.close()


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email_query(db=db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user_query(db=db, user=user)

@app.get("/")
def hello():
    return {"message": "Hello World"}

@app.post("/welcome/new_team_and_user")
def create_team_and_user():
    pass
    
    
    
    return {"message": "Hello World"}

@app.post("/welcome/new_team_and_user")
def create_team_and_user():
    return {"message": "Hello World"}