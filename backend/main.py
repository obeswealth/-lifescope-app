from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
from sqlalchemy.orm import Session
from datetime import datetime

# Import database components
from database import engine, get_db, Base
import models

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="LifeScope API")

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://192.168.5.14:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Test endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to LifeScope API"}

# Health check
@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Assessment data model
class AssessmentData(BaseModel):
    eating_habits: Optional[dict] = None
    physical_activity: Optional[dict] = None
    body_indicators: Optional[dict] = None
    sleep_routine: Optional[dict] = None
    substances: Optional[dict] = None
    family_history: Optional[dict] = None
    user_id: Optional[str] = None

def calculate_risk_score(data: AssessmentData) -> Dict:
    """
    Enhanced risk calculation with better weighting and medical evidence.
    Score range: 0-100, with thresholds: <25 = low, 25-50 = moderate, >50 = higher
    """
    
    heart_score = 0
    diabetes_score = 0
    kidney_score = 0
    obesity_score = 0
    
    # ===== EATING HABITS (High Impact) =====
    if data.eating_habits:
        veg = data.eating_habits.get('vegetables', '')
        if veg == 'none':
            heart_score += 15
            diabetes_score += 12
            obesity_score += 12
        elif veg == 'one':
            heart_score += 8
            diabetes_score += 6
            obesity_score += 6
        elif veg == 'three':
            heart_score += 3
            diabetes_score += 2
        
        processed = data.eating_habits.get('processedFood', '')
        if processed == 'daily':
            heart_score += 20
            diabetes_score += 15
            obesity_score += 18
            kidney_score += 8
        elif processed == 'often':
            heart_score += 12
            diabetes_score += 10
            obesity_score += 12
            kidney_score += 4
        elif processed == 'sometimes':
            heart_score += 4
            diabetes_score += 3
            obesity_score += 4
    
    # ===== PHYSICAL ACTIVITY (Very High Impact) =====
    if data.physical_activity:
        exercise = data.physical_activity.get('exercise', '')
        if exercise == 'none':
            heart_score += 20
            diabetes_score += 18
            obesity_score += 22
        elif exercise == 'low':
            heart_score += 12
            diabetes_score += 10
            obesity_score += 15
        elif exercise == 'moderate':
            heart_score += 4
            diabetes_score += 3
            obesity_score += 5
        
        sitting = data.physical_activity.get('sitting', '')
        if sitting == 'very_high':
            heart_score += 15
            diabetes_score += 15
            obesity_score += 12
        elif sitting == 'high':
            heart_score += 10
            diabetes_score += 10
            obesity_score += 8
        elif sitting == 'moderate':
            heart_score += 3
            diabetes_score += 3
    
    # ===== SLEEP ROUTINE (Moderate Impact) =====
    if data.sleep_routine:
        sleep = data.sleep_routine.get('sleep', '')
        if sleep == 'low':
            heart_score += 10
            diabetes_score += 8
            obesity_score += 8
        elif sleep == 'moderate':
            heart_score += 4
            diabetes_score += 3
        elif sleep == 'high':
            obesity_score += 3
    
    # ===== SUBSTANCES (CRITICAL IMPACT - Especially Smoking) =====
    if data.substances:
        smoking = data.substances.get('smoking', '')
        if smoking == 'daily':
            heart_score += 25  # Smoking is the #1 preventable cause of heart disease
            diabetes_score += 8
            kidney_score += 20
        elif smoking == 'occasional':
            heart_score += 15
            diabetes_score += 5
            kidney_score += 12
        elif smoking == 'former':
            heart_score += 4
            kidney_score += 3
    
    # ===== BODY INDICATORS (Very High Impact) =====
    if data.body_indicators:
        age = data.body_indicators.get('age', '')
        if age == 'senior':
            heart_score += 15
            diabetes_score += 12
            kidney_score += 12
        elif age == 'middle':
            heart_score += 8
            diabetes_score += 8
            kidney_score += 4
        elif age == 'adult':
            heart_score += 3
        
        weight = data.body_indicators.get('weight', '')
        if weight == 'obese':
            heart_score += 20
            diabetes_score += 25  # Obesity is the strongest predictor of type 2 diabetes
            kidney_score += 12
            obesity_score += 35
        elif weight == 'overweight':
            heart_score += 12
            diabetes_score += 15
            kidney_score += 7
            obesity_score += 20
        elif weight == 'underweight':
            heart_score += 4
            obesity_score += 5
        
        gender = data.body_indicators.get('gender', '')
        if gender == 'male':
            heart_score += 8  # Men have higher baseline heart disease risk
    
    # ===== COMBINATION EFFECTS (Compound Risks) =====
    # Obesity + Sedentary lifestyle = Much higher diabetes risk
    if (data.body_indicators and data.body_indicators.get('weight') in ['obese', 'overweight'] and
        data.physical_activity and data.physical_activity.get('exercise') in ['none', 'low']):
        diabetes_score += 10
        heart_score += 8
    
    # Smoking + Poor diet = Much higher heart risk
    if (data.substances and data.substances.get('smoking') in ['daily', 'occasional'] and
        data.eating_habits and data.eating_habits.get('processedFood') in ['daily', 'often']):
        heart_score += 8
    
    # Senior + Multiple risk factors = Higher kidney risk
    if (data.body_indicators and data.body_indicators.get('age') == 'senior' and
        data.substances and data.substances.get('smoking') in ['daily', 'occasional']):
        kidney_score += 8
    
    # Convert scores to risk tiers with better thresholds
    def score_to_tier(score):
        if score < 25:
            return 'low'
        elif score < 50:
            return 'moderate'
        else:
            return 'higher'
    
    # Generate specific, actionable suggestions
    def get_suggestions(category, score, data):
        suggestions = []
        
        if category == 'heart':
            if data.substances and data.substances.get('smoking') in ['daily', 'occasional']:
                suggestions.append("Quit smoking - this is the single most important change for heart health")
            if data.eating_habits and data.eating_habits.get('vegetables') in ['none', 'one']:
                suggestions.append("Increase vegetable and fruit intake to 5+ servings daily")
            if data.physical_activity and data.physical_activity.get('exercise') in ['none', 'low']:
                suggestions.append("Aim for 150+ minutes of moderate exercise per week")
            if data.eating_habits and data.eating_habits.get('processedFood') in ['daily', 'often']:
                suggestions.append("Reduce processed and fast food consumption")
            if data.body_indicators and data.body_indicators.get('weight') in ['obese', 'overweight']:
                suggestions.append("Work towards a healthy body weight")
        
        elif category == 'diabetes':
            if data.body_indicators and data.body_indicators.get('weight') in ['obese', 'overweight']:
                suggestions.append("Losing 5-10% of body weight can significantly reduce diabetes risk")
            if data.physical_activity and data.physical_activity.get('exercise') in ['none', 'low']:
                suggestions.append("Regular exercise improves insulin sensitivity - start with 30 min daily walks")
            if data.eating_habits and data.eating_habits.get('processedFood') in ['daily', 'often']:
                suggestions.append("Replace refined carbohydrates with whole grains and vegetables")
            if data.physical_activity and data.physical_activity.get('sitting') in ['high', 'very_high']:
                suggestions.append("Break up sitting time - stand and move every 30 minutes")
        
        elif category == 'kidney':
            if data.substances and data.substances.get('smoking') in ['daily', 'occasional']:
                suggestions.append("Stop smoking to protect kidney function")
            suggestions.append("Stay well-hydrated with 6-8 glasses of water daily")
            if data.eating_habits and data.eating_habits.get('processedFood') in ['daily', 'often']:
                suggestions.append("Reduce sodium and processed food intake")
            suggestions.append("Monitor blood pressure and blood sugar levels regularly")
        
        elif category == 'obesity':
            if data.physical_activity and data.physical_activity.get('exercise') in ['none', 'low']:
                suggestions.append("Increase physical activity - aim for 150+ minutes per week")
            if data.eating_habits and data.eating_habits.get('processedFood') in ['daily', 'often']:
                suggestions.append("Cook more meals at home and reduce takeout/fast food")
            if data.sleep_routine and data.sleep_routine.get('sleep') in ['low', 'moderate']:
                suggestions.append("Aim for 7-9 hours of quality sleep - poor sleep increases obesity risk")
            suggestions.append("Focus on portion control and eating mindfully")
        
        return suggestions[:3]
    
    return {
        "heart": {
            "risk_tier": score_to_tier(heart_score),
            "score": heart_score,
            "contributing_habits": [],
            "improvement_suggestions": get_suggestions('heart', heart_score, data)
        },
        "diabetes": {
            "risk_tier": score_to_tier(diabetes_score),
            "score": diabetes_score,
            "contributing_habits": [],
            "improvement_suggestions": get_suggestions('diabetes', diabetes_score, data)
        },
        "kidney": {
            "risk_tier": score_to_tier(kidney_score),
            "score": kidney_score,
            "contributing_habits": [],
            "improvement_suggestions": get_suggestions('kidney', kidney_score, data)
        },
        "obesity": {
            "risk_tier": score_to_tier(obesity_score),
            "score": obesity_score,
            "contributing_habits": [],
            "improvement_suggestions": get_suggestions('obesity', obesity_score, data)
        }
    }

# Submit assessment endpoint
@app.post("/api/assessment/submit")
def submit_assessment(data: AssessmentData, db: Session = Depends(get_db)):
    risk_results = calculate_risk_score(data)
    
    db_assessment = models.Assessment(
        user_id=data.user_id,
        eating_habits=data.eating_habits,
        physical_activity=data.physical_activity,
        body_indicators=data.body_indicators,
        sleep_routine=data.sleep_routine,
        substances=data.substances,
        family_history=data.family_history,
        heart_risk=risk_results['heart']['risk_tier'],
        heart_score=risk_results['heart']['score'],
        diabetes_risk=risk_results['diabetes']['risk_tier'],
        diabetes_score=risk_results['diabetes']['score'],
        kidney_risk=risk_results['kidney']['risk_tier'],
        kidney_score=risk_results['kidney']['score'],
        obesity_risk=risk_results['obesity']['risk_tier'],
        obesity_score=risk_results['obesity']['score']
    )
    
    db.add(db_assessment)
    db.commit()
    db.refresh(db_assessment)
    
    return {
        "message": "Assessment received and saved",
        "assessment_id": db_assessment.id,
        "created_at": db_assessment.created_at,
        "risk_results": risk_results
    }

# Get assessment history
@app.get("/api/assessments/history")
def get_assessment_history(user_id: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.Assessment)
    
    if user_id:
        query = query.filter(models.Assessment.user_id == user_id)
    
    assessments = query.order_by(models.Assessment.created_at.desc()).limit(10).all()
    
    return {
        "count": len(assessments),
        "assessments": [
            {
                "id": a.id,
                "created_at": a.created_at,
                "heart_risk": a.heart_risk,
                "diabetes_risk": a.diabetes_risk,
                "kidney_risk": a.kidney_risk,
                "obesity_risk": a.obesity_risk
            }
            for a in assessments
        ]
    }