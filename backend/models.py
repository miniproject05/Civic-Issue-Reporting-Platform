from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from database import Base

class Issue(Base):
    __tablename__ = "issues"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(100), default="General")  # e.g., Pothole, Streetlight, Garbage
    location = Column(String(255), nullable=True)      # e.g., Kanpur / GPS coords
    status = Column(String(50), default="Pending")     # Pending, In Progress, Resolved
    created_at = Column(DateTime, default=datetime.utcnow)