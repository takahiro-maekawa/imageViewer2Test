from src.lib.jwt import encode_app_jwt, decode_app_jwt
import re

UUID_PATTERN = re.compile(r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$')

"""
作成した暗号化or復号化メソッドが正常に動作するか確認する
"""
def test_obj_is_the_same_as_encode_jwt_decode_jwt():
  obj = {"himei": [345, 593]}

  encoded_token = encode_app_jwt(obj)
  decoded = decode_app_jwt(encoded_token)
  
  assert obj["himei"] == decoded["himei"]

"""
JWTトークンをでデコードした際に、iat, exp, jtiがきちんと付与されていることを確認する
"""
def test_obj_is_the_same_as_encode_jwt_decode_jwt_and_has_extrernal1():
  obj = {"himei": [345, 593]}
  expiration_days = 8
  encoded_token = encode_app_jwt(obj, expiration_days=expiration_days)
  decoded = decode_app_jwt(encoded_token)
  
  assert obj["himei"] == decoded["himei"]
  assert decoded["iat"] != None
  assert decoded["exp"] == decoded["iat"] + (60 * 60 * 24 * expiration_days)
  assert UUID_PATTERN.match(decoded["jti"]) != None

