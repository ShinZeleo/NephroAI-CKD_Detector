from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from ml_utils import predict_ckd

app = FastAPI(title="CKD Detection API", version="1.0")

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PatientData(BaseModel):
    Age: float = None
    Blood_Pressure: float = None
    Specific_Gravity: float = None
    Albumin: float = None
    Sugar: float = None
    Red_Blood_Cells: str = None
    Pus_Cell: str = None
    Pus_Cell_clumps: str = None
    Bacteria: str = None
    Blood_Glucose_Random: float = None
    Blood_Urea: float = None
    Serum_Creatinine: float = None
    Sodium: float = None
    Potassium: float = None
    Hemoglobin: float = None
    Packed_Cell_Volume: float = None
    White_Blood_Cell_Count: float = None
    Red_Blood_Cell_Count: float = None
    Hypertension: str = None
    Diabetes_Mellitus: str = None
    Coronary_Artery_Disease: str = None
    Appetite: str = None
    Pedal_Edema: str = None
    Anemia: str = None

@app.get("/")
def read_root():
    return {"message": "Welcome to CKD Detection API"}

@app.post("/predict")
def predict(patient: PatientData):
    try:
        # Map Pydantic fields (with underscores) to the expected feature names (with spaces)
        patient_dict = {
            'Age': patient.Age,
            'Blood Pressure': patient.Blood_Pressure,
            'Specific Gravity': patient.Specific_Gravity,
            'Albumin': patient.Albumin,
            'Sugar': patient.Sugar,
            'Red Blood Cells': patient.Red_Blood_Cells,
            'Pus Cell': patient.Pus_Cell,
            'Pus Cell clumps': patient.Pus_Cell_clumps,
            'Bacteria': patient.Bacteria,
            'Blood Glucose Random': patient.Blood_Glucose_Random,
            'Blood Urea': patient.Blood_Urea,
            'Serum Creatinine': patient.Serum_Creatinine,
            'Sodium': patient.Sodium,
            'Potassium': patient.Potassium,
            'Hemoglobin': patient.Hemoglobin,
            'Packed Cell Volume': patient.Packed_Cell_Volume,
            'White Blood Cell Count': patient.White_Blood_Cell_Count,
            'Red Blood Cell Count': patient.Red_Blood_Cell_Count,
            'Hypertension': patient.Hypertension,
            'Diabetes Mellitus': patient.Diabetes_Mellitus,
            'Coronary Artery Disease': patient.Coronary_Artery_Disease,
            'Appetite': patient.Appetite,
            'Pedal Edema': patient.Pedal_Edema,
            'Anemia': patient.Anemia
        }
        
        result = predict_ckd(patient_dict)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
