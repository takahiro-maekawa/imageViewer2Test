from starlette.testclient import TestClient
from src.main import app, get_db
from src.component.users_.schemas import UserCreate
from src.component.users_.crud import create_user_query, get_user_by_email_query

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


def test_db_unit(SessionLocal):
    db = SessionLocal()
    try:
        create_user_query(db, UserCreate(email="foo", password="fo"))
        user = get_user_by_email_query(db, "foo")
        assert "foo" == user.email
    finally:
        db.close()

# フォーム内容を整備
# emailアドレスとチーム名を送って、データを更新できればおk

# フォーム内容を整備
# emailアドレスと招待コードを送って、データを更新できればおk