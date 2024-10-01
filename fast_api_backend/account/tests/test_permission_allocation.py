from typing import Optional
from starlette.testclient import TestClient
from src.schema.team_allocation.schemas import PermissionAllocationBase, PermissionAllocationForCreate,TeamBase,  TeamCreate, UserBase
from src.repository.permission_allocation import PermissionAllocationRepository
from src.main import app

client = TestClient(app)
import logging


# テーブル単位のUT （app_teamが対象）
def test_db_unit_allocation_new_team(SessionLocal):
  sample_team = TeamBase(name="judgeMonster", secret_key="hunter")
  sample_user = UserBase(name="test", email="test@example.com")
  sample_allocation = PermissionAllocationForCreate(team = sample_team, user=sample_user)
  #sample_allocation = PermissionAllocationForCreate(user=sample_user)
  #sample_allocation = PermissionAllocationForCreate(team = sample_team)
  assert {} == sample_allocation.to_dict()
  
  with SessionLocal() as db:
    teamRepo = PermissionAllocationRepository()
    PermissionAllocationRepository.insertAllocation(db=db, allocation=sample_allocation)
    db.commit()
    allocation = PermissionAllocationRepository.findByAllocationByAllocationId(db = db, id = allocation.id)
    pass
    assert allocation.team.name == "judgeMonster"
  