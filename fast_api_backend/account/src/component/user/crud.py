from sqlalchemy.orm import Session
from src.component.user import models

def findById(db: Session, id: int):
    return db.query(models.AppUserTest).filter(models.AppUserTest.id == id).first()


"""
挿入処理を行うメソッド
トランザクション境界内で呼び出すこと
"""
def insert(db: Session, user: models.AppUserTest):
    db.add(user)
    return user

def update(db: Session, user: models.AppUserTest):
    db.query(models.AppUserTest).filter(models.AppUserTest.id == user.id).update(user)
    db.commit()
    db.refresh(user)
    return user

