import json
import os
from typing import Any, Dict
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.hazmat.primitives import hashes
from jose import jwe

def get_derived_encryption_key(secret: str, salt: str) -> bytes:
  """
  Derives a 64-byte encryption key using HKDF for A256CBC-HS512.
  
  Args:
  secret (str): The secret key material (Auth.js secret).
  salt (str): The salt to use in key derivation, typically the name of the cookie holding the JWT.
  
  Returns:
  bytes: A 64-byte derived key.
  """
  # Define the salt for HKDF
  salt_bytes = salt.encode('utf-8')
  # Correct info string format with salt in parentheses
  info_string = f"Auth.js Generated Encryption Key ({salt})".encode('utf-8')
  # Derive a 64-byte key using HKDF for A256CBC-HS512
  hkdf = HKDF(
      algorithm=hashes.SHA256(),
      length=64,  # 64 bytes for A256CBC-HS512
      salt=salt_bytes,
      info=info_string
  )
  # Derive the key using the provided secret
  key = hkdf.derive(secret.encode('utf-8'))
  # Check if the derived key length is 64 bytes (512 bits)
  if len(key) != 64:
      raise ValueError("Derived key length is incorrect. Expected 64 bytes, got {} bytes.".format(len(key)))
  return key

def decode_app_jwt(token: str) -> Dict[str, Any]:
  # Fetch the Auth.js secret and salt from the environment
  authjs_secret = "secret"
  authjs_salt = "saltdesu"
  
  if not authjs_secret:
    raise ValueError("AUTHJS_SECRET environment variable is not set.")
  if not authjs_salt:
    raise ValueError("AUTHJS_SALT environment variable is not set.")
  
  # Derive the encryption key using the secret and salt
  key = get_derived_encryption_key(authjs_secret, authjs_salt)
  
  # Decrypt the token using the derived key
  try:
    data = jwe.decrypt(token, key)
    # Parse the decrypted data into JSON
    decoded_token = json.loads(data.decode('utf-8'))
    return decoded_token
  except Exception as e:
    print(f"Error during decryption: {e}")
    raise e

def encode_app_jwt(obj: Dict[str, Any]) -> str:
  # Fetch the Auth.js secret and salt from the environment
  authjs_secret = "secret"
  authjs_salt = "saltdesu"
  
  if not authjs_secret:
    raise ValueError("AUTHJS_SECRET environment variable is not set.")
  if not authjs_salt:
    raise ValueError("AUTHJS_SALT environment variable is not set.")
  
  # Derive the encryption key using the secret and salt
  key = get_derived_encryption_key(authjs_secret, authjs_salt)

  # Decrypt the token using the derived key
  try:
    data = jwe.encrypt(json.dumps(obj), key, algorithm='dir', encryption='A256CBC-HS512')
    # Parse the decrypted data into JSON
    #encoded_token = data.encode('utf-8')
    return data.decode('utf-8')
  except Exception as e:
    print(f"Error during encryption: {e}")
    raise e