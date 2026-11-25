from pydantic import BaseModel, Field


class PersonBase(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    country: str = Field(min_length=1, max_length=100)
    state: str | None = None
    region: str = Field(min_length=1, max_length=50)
    classification: str | None = None


class PersonCreate(PersonBase):
    pass


class PersonUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=100)
    country: str | None = Field(default=None, min_length=1, max_length=100)
    state: str | None = None
    region: str | None = Field(default=None, min_length=1, max_length=50)
    classification: str | None = None


class PersonRead(PersonBase):
    id: int
    registration_no: str