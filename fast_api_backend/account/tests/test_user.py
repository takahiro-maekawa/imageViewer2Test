from starlette.testclient import TestClient
from src.main import app
from src.component.team_allocation.crud import findAppUserById, insertAppUser, deleteAppUserByUserId, updateAppUser
from src.schema.team_allocation.schemas import UserBase, UserForUpdate
from dependency_injector import providers
from tests.config.database import DatabaseForTest
from src.entity.entity import Entity

client = TestClient(app)

# テーブル単位のUT （app_userが対象）
def test_db_unit_appUser(SessionLocal):
    db = SessionLocal()
    try:
        userInserted = insertAppUser(db, UserBase(email="foor", name="fo"))
        db.commit()
        db.refresh(userInserted)
        
        # ユーザーの更新
        userUpdated = updateAppUser(db, UserForUpdate(email="frings", name="fo", id=userInserted.id))
        db.commit()
        
        # 更新されたユーザーの取得
        userUpdatedAfter = findAppUserById(db, userUpdated.id)
        assert userUpdatedAfter.email == "frings"
        
        # ユーザーの削除
        deleteAppUserByUserId(db, userInserted.id)
        db.commit()
        
        # 削除されたユーザーの確認
        userDeleted = findAppUserById(db, userInserted.id)
        assert userDeleted is None
    finally:
        db.close()

# フォーム内容を整備
# emailアドレスとチーム名を送って、データを更新できればおk

# フォーム内容を整備
# emailアドレスと招待コードを送って、データを更新できればおk

def temp_db_container(f):
    def func(*args, **kwargs):
        
        db = DatabaseForTest()
        Entity.metadata.create_all(db._engine)
    
        # 既存のコンテナを取得
        original_container = app.container
        
        test_db = providers.Singleton(DatabaseForTest)
        original_container.db.override(test_db)
        
        try:
            # Run tests
            f(*args, **kwargs)
        finally:
            Entity.metadata.drop_all(db._engine)
            # データベース接続を元に戻す
            original_container.db.reset_override()
    return func

"""
チュートリアルにあったテストを実行
"""
@temp_db_container
def test_create_user():
    response = client.post("/users/", json={"email": "foo", "password": "fo"})
    assert response.status_code == 200
    
@temp_db_container
def test_create_user2():
    response = client.post("/users/", json={"email": "foo", "password": "fo"})
    assert response.status_code == 200