
from fastapi import FastAPI

app = FastAPI(
    title="Kigu API",
    description="Backend API for the Kigu community platform",
    version="1.0.0"
)

@app.get("/")
def root():
    return {
        "message": "Kigu API is running"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }

@app.get("/api/people")
def get_people():
    people = [
        {
            "id": 1,
            "name": "Alice",
            "country": "Malaysia",
            "region": "Penang"
        },
        {
            "id": 2,
            "name": "Bob",
            "country": "Malaysia",
            "region": "Selangor"
        }
    ]

    return people