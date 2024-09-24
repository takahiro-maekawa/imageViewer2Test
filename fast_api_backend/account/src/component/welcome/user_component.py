from sqlalchemy.orm import Session
from src.component.user import models

def get_app_user_by_email_query(db: Session, email: str):
    """get user by email"""
    return db.query(models.AppUser).filter(models.AppUser.email == email).first()