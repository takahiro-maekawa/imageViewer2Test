
from sqlalchemy.orm import Session

from src.entity.team_allocation import models
from src.schema.team_allocation import schemas

class AppTeamRepository:
  
  def findAppTeamById(self, db: Session, id: int):
    return db.query(models.AppTeam).filter(models.AppTeam.id == id).first()
  
  def insertAppTeam(self, db: Session, team: schemas.TeamBase) -> models.AppTeam:
    db_team = models.AppTeam(name=team.name)
    db.add(db_team)
    db.flush()
    return db_team
  
  def updateAppTeam(self, db: Session, team: schemas.TeamForUpdate):
    db.query(models.AppTeam).filter(models.AppTeam.id == team.id).update(team.to_dict())
    
  def deleteAppTeamByTeamId(self, db: Session, team_id: int):
    db.query(models.AppTeam).filter(models.AppTeam.id == team_id).delete()
  
  """
  個数をカウントするメソッド
  """
  def count(self, db: Session):
    return db.query(models.AppTeam).count()