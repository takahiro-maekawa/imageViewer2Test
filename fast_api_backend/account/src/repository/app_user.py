from sqlalchemy.orm import Session
from src.entity.team_allocation import models
from src.schema.team_allocation import schemas

class AppUserRepository:
  """
  id指定で参照処理を行うメソッド
  """
  def findAppUserById(self, db: Session, id: int):
    return db.query(models.AppUser).filter(models.AppUser.id == id).first()

  """
  挿入処理を行うメソッド
  トランザクション境界内で呼び出すこと
  """
  def insertAppUser(self, db: Session, user: schemas.UserBase) -> models.AppUser:
    db_user = models.AppUser(name=user.name, email=user.email)
    db.add(db_user)
    db.flush()
    return db_user

  """
  更新処理を行うメソッド
  トランザクション境界内で呼び出すこと
  """
  def updateAppUser(self, db: Session, user: schemas.UserForUpdate) -> models.AppUser:
    db.query(models.AppUser).filter(models.AppUser.id == user.id).update(user.to_dict())

  """
  削除処理を行うメソッド
  トランザクション境界内で呼び出すこと
  """
  def deleteAppUserByUserId(self, db: Session, user_id: int):
    db.query(models.AppUser).filter(models.AppUser.id == user_id).delete()