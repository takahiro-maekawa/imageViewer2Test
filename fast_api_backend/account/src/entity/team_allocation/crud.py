from sqlalchemy.orm import Session
from src.entity.team_allocation import models
from src.entity.team_allocation import schemas

def findAllocationById(db: Session, id: int):
    return db.query(models.PermissionAllocation).filter(models.PermissionAllocation.id == id).first()

def findAppUserById(db: Session, id: int):
    return db.query(models.AppUser).filter(models.AppUser.id == id).first()

"""
挿入処理を行うメソッド
トランザクション境界内で呼び出すこと
"""
def insertAppUser(db: Session, user: schemas.UserBase) -> models.AppUser:
    db_user = models.AppUser(name=user.name, email=user.email)
    db.add(db_user)
    return db_user

"""
更新処理を行うメソッド
トランザクション境界内で呼び出すこと
"""
def updateAppUser(db: Session, user: schemas.UserForUpdate):
    db.query(models.AppUser).filter(models.AppUser.id == user.id).update(user.model_dump())
    return user

"""
削除処理を行うメソッド
トランザクション境界内で呼び出すこと
"""
def deleteAppUserByUserId(db: Session, user_id: int):
    db.query(models.AppUser).filter(models.AppUser.id == user_id).delete()