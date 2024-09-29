from pydantic import BaseModel, ConfigDict
from typing import Optional

class UserBase(BaseModel):
  def to_dict(self):
    return {k:v for k,v in self.model_dump().items() if v is not None}
  email: str
  name: str
    
class UserForUpdate(UserBase):
  id: int

class User(UserBase):
  """Output"""
  id: int
  is_active: bool
  model_config = ConfigDict(from_attributes=True)

class TeamBase(BaseModel):
  def to_dict(self):
    return {k:v for k,v in self.model_dump().items() if v is not None}

class TeamCreate(TeamBase):
  secret_key: str
  name: str

class TeamForUpdate(TeamBase):
  def to_dict(self):
    return {k:v for k,v in self.model_dump().items() if v is not None}
  id: int
  name: Optional[str] = None
  secret_key: Optional[str] = None