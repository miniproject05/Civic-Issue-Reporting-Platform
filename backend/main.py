from fastapi import FastAPI

app = FastAPI(title="Civic Issue Reporting Platform API")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Civic Issue Reporting Platform API!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}