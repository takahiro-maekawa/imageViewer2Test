from src.lib.jwt import encode_app_jwt, decode_app_jwt


def test_obj_is_the_same_as_encode_jwt_decode_jwt():
  obj = {"himei": [345, 593]}

  try:
    encoded_token = encode_app_jwt(obj)
    print(f"encoded Token: {encoded_token}")
    decoded = decode_app_jwt(encoded_token)
    print(f"Decoded Token: {decoded}")
  except Exception as e:
    print(f"Token encoding failed: {e}")
  
  assert obj == decoded