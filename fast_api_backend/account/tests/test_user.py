from starlette.testclient import TestClient
from src.main import app, get_db
from src.entity.team_allocation.crud import findAppUserById, insertAppUser, deleteAppUserByUserId, updateAppUser
from src.entity.team_allocation.schemas import UserBase, UserForUpdate

def temp_db(f):
    def func(SessionLocal, *args, **kwargs):
        # テスト用のDBに接続するためのsessionmaker instanse
        #  (SessionLocal) をfixtureから受け取る
        def override_get_db():
            try:
                db = SessionLocal()
                yield db
            finally:
                db.close()

        # fixtureから受け取るSessionLocalを使うようにget_dbを強制的に変更
        app.dependency_overrides[get_db] = override_get_db
        # Run tests
        f(*args, **kwargs)
        # get_dbを元に戻す
        app.dependency_overrides[get_db] = get_db

    return func

client = TestClient(app)


@temp_db
def test_create_user():
    response = client.post("/users/", json={"email": "foo", "password": "fo"})
    assert response.status_code == 200


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