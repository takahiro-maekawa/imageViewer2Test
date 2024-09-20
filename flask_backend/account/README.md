# ローカルにおける実行
rye run gunicorn -w 4 -b 0.0.0.0:15000 src.main:app

# ryeプロジェクトからrequirements.txtを抜き取り
cat requirements.lock | sed '/-e/d' > requirements.txt

# コンテナのビルド
docker build -t accountServiceFlask . --no-cache

# コンテナの実行
docker run -d -p 15000:15000 accountServiceFlask