from src.lib.jwt import encode_app_jwt, decode_app_jwt
from src.lib.array_util import interleave, interleaveString, untiInterleaveString
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

"""
インターリーブ処理のテスト
"""
def test_interleave():
  NUM_DIM = 2
  
  # 数字配列をインターリーブ
  array = [1,2,3,4,5,6]
  interleaved_array_predicted = [1,4,2,5,3,6]
  assert interleave(array, 3) == interleaved_array_predicted
  
  # 数字配列をインターリーブ（ただし、中途半端なサイズで実施）
  array = [1,2,3,4,5,6,7]
  interleaved_array_predicted = [1,4,2,5,3,6,7]
  assert interleave(array, 3) == interleaved_array_predicted
  
  # 文字の配列をインターリーブ
  array = ["i","e","t", "s", "h", "p", 'b', 'l']
  interleaved_array_predicted = ['i','s','e','h','t','p', 'b', 'l']
  assert interleave(array, 3) == interleaved_array_predicted
  
  # 文字列をインターリーブ
  target_string = "ietshpbl"
  interleaved_string_predicted = "isehtpbl"
  assert interleaveString(target_string, 3) == interleaved_string_predicted
  
  # インターリーブの逆処理を検証
  restored_string = untiInterleaveString(interleaved_string_predicted, 3)
  assert restored_string == target_string
  
  # 任意の文字列および任意の次元で、インターリーブ→デインターリーブで復元できるかどうかを検証
  target_string = "kokogaorenoanpanmanda"
  for i in range(7):
    dim = i+1
    assert untiInterleaveString(interleaveString(target_string, dim), dim) == "kokogaorenoanpanmanda"