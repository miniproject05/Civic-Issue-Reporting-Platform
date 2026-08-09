from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class IssueBase(BaseModel):
    title: str
    description: str
    category: Optional[str] = "General"
    location: Optional[str] = None

class IssueCreate(IssueBase):
    pass

class IssueResponse(IssueBase):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True