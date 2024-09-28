from sqlalchemy.orm import Session
from src.entity.team_allocation import models
from src.schema.team_allocation import schemas

class AppUserRepository:
  def __init__(self):
    pass
  
  """
  id指定で参照処理を行うメソッド
  """
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
    db_user = db.query(models.AppUser).filter(models.AppUser.id == user.id)
    db_user.update(user.model_dump())
    return user

  """
  削除処理を行うメソッド
  トランザクション境界内で呼び出すこと
  """
  def deleteAppUserByUserId(db: Session, user_id: int):
    db.query(models.AppUser).filter(models.AppUser.id == user_id).delete()