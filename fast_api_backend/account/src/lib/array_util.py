import numpy as np
"""
リストの順番を入れ替える処理
"""
def interleave(l: list, dim: int) -> list:
  res_size = len(l) % dim
  resid = []
  target_list = l.copy()
  
  if res_size != 0:
    resid = l[(-1 * res_size):]
    target_list = l[:(-1 * res_size)]
    
  new_list = np.array(target_list).reshape(-1, dim).T.flatten().tolist()
  return new_list + resid

"""
リストの順番を入れ替える処理の逆、次元自体はinterleave時に設定したものをそのまま代入する
"""
def untiInterleave(l: list, dim: int) -> list:
  res_size = len(l) % dim
  resid = []
  target_list = l.copy()
  
  new_dim = int(len(l) // dim)
  if res_size != 0:
    resid = l[(-1 * res_size):]
    target_list = l[:(-1 * res_size)]
  new_list = np.array(target_list).reshape(-1, new_dim).T.flatten().tolist()
  return new_list + resid

"""
インターリーブを文字列に適用したもの
"""
def interleaveString(s: str, dim: int) -> str:
  return "".join(interleave(list(s), dim))

"""
インターリーブの逆処理を文字列に適用したもの
"""
def untiInterleaveString(s: str, dim: int) -> str:
  return "".join(untiInterleave(list(s), dim))