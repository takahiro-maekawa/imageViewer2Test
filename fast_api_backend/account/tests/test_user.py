from starlette.testclient import TestClient
from src.main import app, get_db
from src.component.user.crud import insert, findById
from src.component.user.models import AppUserTest

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


# ユニットテストのサンプルは次の通りである
# insertとfindByIdを使って、AppUserを作成し、取得することを確認する
def test_db_unit_appUser(SessionLocal):
    db = SessionLocal()
    try:
        userInserted = insert(db, AppUserTest(email="foor", name="fo"))
        db.commit()
        db.refresh(userInserted)
        user = findById(db, 1)
        assert 1 == user.id
    finally:
        db.close()

# フォーム内容を整備
# emailアドレスとチーム名を送って、データを更新できればおk

# フォーム内容を整備
# emailアドレスと招待コードを送って、データを更新できればおk