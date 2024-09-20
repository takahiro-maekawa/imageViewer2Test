# ベースイメージを指定
FROM python:3.11-slim

# 必要なビルドツールをインストール
RUN apt-get update && apt-get install -y \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ryeのインストール
RUN pip install --upgrade pip 

# 作業ディレクトリを設定
WORKDIR /app

# プロジェクトファイルをコピー
COPY . .

# 依存関係をインストール
RUN pip3 install -r requirements.txt

# Gunicornを使用してアプリケーションを起動
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8080", "src.tutorial.main:app"]