
from flask_testing import TestCase

from main import app

from database import db
from tests.base import BaseTestCase


class TestHogeListAPI(BaseTestCase):
  def test_sample(self):
    assert 1 == 1