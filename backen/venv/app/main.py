from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Import the CORS middleware
from sqlalchemy.orm import Session
from . import models, schemas, database

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from your React app
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

models.Base.metadata.create_all(bind=database.engine)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/projects/", response_model=schemas.Project)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    db_project = models.Project(name=project.name, type=project.type, owner=project.owner)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)

    for metric in project.metrics:
        db_metric = models.Metric(project_id=db_project.id, name=metric.name, value=metric.value)
        db.add(db_metric)
    db.commit()

    db_project.metrics = db.query(models.Metric).filter(models.Metric.project_id == db_project.id).all()
    return db_project

@app.get("/projects/{project_id}", response_model=schemas.Project)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    project.metrics = db.query(models.Metric).filter(models.Metric.project_id == project_id).all()
    return project
