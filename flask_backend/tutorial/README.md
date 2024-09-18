# tutorial

Describe your project here.

# ryeプロジェクトからrequirements.txtを抜き取り
cat requirements.lock | sed '/-e/d' > requirements.txt

# コンテナのビルド
docker build -t myflaskapp . --no-cache

# コンテナの実行
docker run -d -p 8080:8080 myflaskapp