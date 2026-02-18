from sqlalchemy import Column, Integer, String, DateTime, JSON, Float
from datetime import datetime
from database import Base

class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=True)  # Optional for anonymous users
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Assessment answers stored as JSON
    eating_habits = Column(JSON)
    physical_activity = Column(JSON)
    body_indicators = Column(JSON)
    sleep_routine = Column(JSON)
    substances = Column(JSON)
    family_history = Column(JSON)
    
    # Risk results
    heart_risk = Column(String)
    heart_score = Column(Float)
    diabetes_risk = Column(String)
    diabetes_score = Column(Float)
    kidney_risk = Column(String)
    kidney_score = Column(Float)
    obesity_risk = Column(String)
    obesity_score = Column(Float)