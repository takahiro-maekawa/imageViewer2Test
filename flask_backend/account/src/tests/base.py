from flask_testing import TestCase

from main import app

from database import db


class BaseTestCase(TestCase):
  def create_app(self):
    app.config.from_object('src.config.TestingConfig')
    db.init_app(app)
    return app

  def setUp(self):
    self.app = self.app.test_client()
    db.create_all()
    db.session.commit()

  def tearDown(self):
    print()
    db.session.remove()
    db.drop_all()