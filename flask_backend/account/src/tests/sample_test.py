
from flask_testing import TestCase

from main import app

from database import db
from tests.base import BaseTestCase


class TestHogeListAPI(BaseTestCase):
  def test_sample(self):
    assert 1 == 1
    
  def test_sampleA(self):
    app = self.app
    assert 1 == 1
  
  # ポストリクエストが可能かどうかをテストする
  def test_post_new_team(self):
    form = dict(
        project_id='1901P01',
        customer_id=1901,
    )
    response = self.client.post('/account/welcome/new_team', data=form)
    self.assertStatus(response, 200)