# ローカルにおける実行
rye run gunicorn -c gunicorn_config.py main:app

# ryeプロジェクトからrequirements.txtを抜き取り
cat requirements.lock | sed '/-e/d' > requirements.txt

# コンテナのビルド
docker build -t account_service_flask . --no-cache

# コンテナの実行
docker run -d -p 15000:15000 account_service_flask

# pytestの実行
rye run pytest tests