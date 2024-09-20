# gunicorn_config.py
import os
import sys

# プロジェクトのルートディレクトリをPYTHONPATHに追加
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), 'src')))

bind = '0.0.0.0:15000'
workers = 2