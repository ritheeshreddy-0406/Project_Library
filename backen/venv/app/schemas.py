from pydantic import BaseModel
from typing import List

class MetricBase(BaseModel):
    name: str
    value: str

class MetricCreate(MetricBase):
    pass

class ProjectBase(BaseModel):
    name: str
    type: str
    owner: str

class ProjectCreate(ProjectBase):
    metrics: List[MetricCreate]

class Project(ProjectBase):
    id: int
    metrics: List[MetricCreate]

    class Config:
        orm_mode = True
