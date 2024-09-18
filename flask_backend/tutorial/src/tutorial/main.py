from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(apporigins=["http://example.com"])  # CORS設定を追加

@app.route('/')
def hello_world():
    return {"contents": "Hello World Realy!!"}

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080)