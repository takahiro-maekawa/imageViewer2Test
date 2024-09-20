from flask import Flask
from flask_cors import CORS
from account.controller.welcome_controller import welcome_blueprint

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://example.com"])  # CORS設定を追加
    app.register_blueprint(welcome_blueprint)

    return app

app = create_app()

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=15000)