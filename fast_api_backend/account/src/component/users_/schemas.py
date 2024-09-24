from pydantic import BaseModel, ConfigDict


class UserBase(BaseModel):
    """Base User scheme"""

    email: str


class UserCreate(UserBase):
    """Input"""

    password: str


class User(UserBase):
    """Output"""

    id: int
    is_active: bool

    model_config = ConfigDict(from_attributes=True)
