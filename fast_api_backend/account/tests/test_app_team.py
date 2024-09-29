from typing import Optional
from starlette.testclient import TestClient
from src.schema.team_allocation.schemas import TeamCreate, TeamForUpdate
from src.repository.app_team import AppTeamRepository
from src.main import app

client = TestClient(app)
import logging


# テーブル単位のUT （app_teamが対象）
def test_db_unit_appTeam(SessionLocal):
  # ロガーの設定
  logging.basicConfig(level=logging.INFO)
  logger = logging.getLogger(__name__)

  repo = AppTeamRepository()
  db = SessionLocal()
  try:
    initialTeam = repo.insertAppTeam(db=db, team=TeamCreate(name="judgeMonster", secret_key="hunter"))
    db.commit()
    
    intialTeamConfirmed = repo.findAppTeamById(db=db, id=initialTeam.id)
    assert intialTeamConfirmed.name == "judgeMonster"
    
    updateModel = TeamForUpdate(name="judgeMonhun", id=initialTeam.id )
    
    repo.updateAppTeam(db = db, team=updateModel)
    
    updated = repo.findAppTeamById(db=db, id=initialTeam.id)
    
    assert updated.name == "judgeMonhun"
    assert updated.secret_key == "hunter"
    
    updateModel = TeamForUpdate(secret_key="passphraze12", id=initialTeam.id )
    
    repo.updateAppTeam(db = db, team=updateModel)
    
    updated = repo.findAppTeamById(db=db, id=initialTeam.id)
    
    assert updated.name == "judgeMonhun"
    assert updated.secret_key == "passphraze12"
    
    repo.deleteAppTeamByTeamId(db=db, team_id=initialTeam.id)
    db.commit()
    
    deleted = repo.findAppTeamById(db=db, id=initialTeam.id)
    assert deleted == None 
    
  finally:
    db.close()