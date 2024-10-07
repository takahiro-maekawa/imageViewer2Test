from starlette.testclient import TestClient
from src.repository.app_user import AppUserRepository
from src.main import app
from src.schema.team_allocation.schemas import UserBase, UserForUpdate
from dependency_injector import providers
from tests.config.database import DatabaseForTest
from src.entity.entity import Entity

client = TestClient(app)

# テーブル単位のUT （app_userが対象）
def test_db_unit_appUser(SessionLocal):
    repo = AppUserRepository()
    with SessionLocal() as db:
        try:
            # ユーザの追加
            userInserted = repo.insertAppUser(db, UserBase(email="foor", name="fo"))
            db.commit()
            db.refresh(userInserted)
            assert userInserted.version == 1
            
            # ユーザーの更新
            repo.updateAppUser(db, UserForUpdate(email="frings", name="fo", id=userInserted.id, version=userInserted.version+1))
            db.commit()
            
            # 更新されたユーザーの取得
            userUpdatedAfter = repo.findAppUserById(db, userInserted.id)
            db.refresh(userUpdatedAfter)
            assert userUpdatedAfter.email == "frings"
            assert userUpdatedAfter.name == "fo"
            assert userUpdatedAfter.version == 2
            
            # ユーザーの削除
            repo.deleteAppUserByUserId(db, userInserted.id)
            db.commit()
        except Exception as e:
            db.rollback()
            raise e


# フォーム内容を整備
# emailアドレスとチーム名を送って、データを更新できればおk
from tests.config.database import temp_db_container

"""
チュートリアルにあったリクエストテストを実行


@temp_db_container
def test_create_user():
    response = client.post("/users/", json={"email": "foo", "password": "fo"})
    assert response.status_code == 200
    
@temp_db_container
def test_create_user2():
    response = client.post("/users/", json={"email": "foo", "password": "fo"})
    assert response.status_code == 200
    
"""