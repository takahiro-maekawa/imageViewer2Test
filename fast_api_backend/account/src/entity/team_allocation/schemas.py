from pydantic import BaseModel, ConfigDict

class UserBase(BaseModel):
  def to_dict(self):
    return self.model_dump()
  email: str
  name: str
    
class UserForUpdate(UserBase):
  id: int
  pass

class User(UserBase):
    """Output"""

    id: int
    is_active: bool

    model_config = ConfigDict(from_attributes=True)