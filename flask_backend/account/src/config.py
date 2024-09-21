import os


class DevelopmentConfig:
  # SQLAlchemy
  SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://{user}:{password}@{host}/{database}'.format(
    **{
      'user': os.getenv('DB_USER', 'root'),
      'password': os.getenv('DB_PASSWORD', 'hoge'),
      'host': os.getenv('DB_HOST', 'db'),
      'database': os.getenv('DB_DATABASE', 'hoge'),
    })
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  SQLALCHEMY_ECHO = False
  SQLALCHEMY_ENGINE_OPTIONS = {
    'connect_args': {
      'options': '-c search_path={schema}'.format(
        schema=os.getenv('DB_SCHEMA', 'image')
      )
    }
  }

class TestingConfig:
  # SQLAlchemy
  SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://{user}:{password}@{host}/{database}'.format(
    **{
      'user': os.getenv('DB_USER', 'image_viewer'),
      'password': os.getenv('DB_PASSWORD', 'password00'),
      'host': os.getenv('DB_HOST', 'localhost:5432'),
      'database': os.getenv('DB_DATABASE', 'test_image_viewer'),
    })
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  SQLALCHEMY_ECHO = False
  SQLALCHEMY_ENGINE_OPTIONS = {
    'connect_args': {
      'options': '-c search_path={schema}'.format(
        schema=os.getenv('DB_SCHEMA', 'image')
      )
    }
  }


Config = DevelopmentConfig