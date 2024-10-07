from pydantic import BaseModel, ConfigDict
from typing import Optional

def remove_none_values(d):
  if not isinstance(d, dict):
    return d
  return {k: remove_none_values(v) for k, v in d.items() if v is not None}
  
class CustomBaseModel(BaseModel):
  def to_dict(self):
    dict = {k: v for k,v in self.model_dump().items() if v is not None}
    return remove_none_values(dict)
      
class UserBase(CustomBaseModel):
  email: Optional[str] = None
  name: Optional[str] = None
  id: Optional[int] = None

class UserCreate(UserBase):
  pass

class UserForUpdate(UserBase):
  id: int
  version: Optional[int] = None

class User(UserBase):
  """Output"""
  id: int
  is_active: bool
  model_config = ConfigDict(from_attributes=True)

class TeamBase(CustomBaseModel):
  #secret_key: Optional[str] = None
  name: Optional[str] = None
  id: Optional[int] = None

class TeamCreate(TeamBase):
  pass

class TeamForUpdate(TeamBase):
  id: int
  name: Optional[str] = None
  
class PermissionAllocationBase(CustomBaseModel):    
  read_level: int = 0
  write_level: int = 0
  team: Optional[TeamBase] = None
  user: Optional[UserBase] = None
  id: Optional[int] = None
  
class PermissionAllocationForCreate(PermissionAllocationBase):
  team_id: Optional[int] = None
  user_id: Optional[int] = None
  pass
  
class PermissionAllocationForUpdate(PermissionAllocationBase):
  id: int