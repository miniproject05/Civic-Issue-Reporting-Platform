from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
from database import engine, get_db

# Automatically create tables in PostgreSQL on startup
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Civic Issue Reporting Platform API")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Civic Issue Reporting Platform API!"}

# Create a new civic issue
@app.post("/issues/", response_model=schemas.IssueResponse)
def create_issue(issue: schemas.IssueCreate, db: Session = Depends(get_db)):
    db_issue = models.Issue(**issue.model_dump())
    db.add(db_issue)
    db.commit()
    db.refresh(db_issue)
    return db_issue

# Get all reported civic issues
@app.get("/issues/", response_model=List[schemas.IssueResponse])
def get_issues(db: Session = Depends(get_db)):
    return db.query(models.Issue).all()