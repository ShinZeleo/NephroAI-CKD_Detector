from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from ml_utils import predict_ckd, predict_batch_ckd
import pandas as pd
import io

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

@app.post("/predict_batch")
async def predict_batch(file: UploadFile = File(...)):
    try:
        if not file.filename.endswith('.csv'):
            raise HTTPException(status_code=400, detail="Only CSV files are supported")
            
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode('utf-8')))
        
        # Map CSV columns to model features
        rename_map = {
            'Blood_Pressure': 'Blood Pressure',
            'Specific_Gravity': 'Specific Gravity',
            'Red_Blood_Cells': 'Red Blood Cells',
            'Pus_Cell': 'Pus Cell',
            'Pus_Cell_clumps': 'Pus Cell clumps',
            'Blood_Glucose_Random': 'Blood Glucose Random',
            'Blood_Urea': 'Blood Urea',
            'Serum_Creatinine': 'Serum Creatinine',
            'Packed_Cell_Volume': 'Packed Cell Volume',
            'White_Blood_Cell_Count': 'White Blood Cell Count',
            'Red_Blood_Cell_Count': 'Red Blood Cell Count',
            'Diabetes_Mellitus': 'Diabetes Mellitus',
            'Coronary_Artery_Disease': 'Coronary Artery Disease',
            'Pedal_Edema': 'Pedal Edema'
        }
        df_for_model = df.rename(columns=rename_map)
        
        # Execute vectorized prediction
        batch_preds = predict_batch_ckd(df_for_model)
        
        # Prepare dataframe for JSON response without NaN issues
        df_json = df.where(pd.notnull(df), None)
        
        results = []
        for index, row in df_json.iterrows():
            pred = batch_preds[index]
            
            results.append({
                "id": str(row.get('id', index + 1)),
                "prediction": pred['prediction'],
                "probability": pred['probability'],
                "is_ckd": pred['is_ckd'],
                "risk": "High Risk" if pred['is_ckd'] else "Low Risk",
                "original_data": {
                    "Age": row.get('Age'),
                    "Blood_Pressure": row.get('Blood_Pressure', row.get('Blood Pressure')),
                    "Specific_Gravity": row.get('Specific_Gravity', row.get('Specific Gravity')),
                    "Albumin": row.get('Albumin'),
                    "Sugar": row.get('Sugar'),
                    "Red_Blood_Cells": row.get('Red_Blood_Cells', row.get('Red Blood Cells')),
                    "Pus_Cell": row.get('Pus_Cell', row.get('Pus Cell')),
                    "Pus_Cell_clumps": row.get('Pus_Cell_clumps', row.get('Pus Cell clumps')),
                    "Bacteria": row.get('Bacteria'),
                    "Blood_Glucose_Random": row.get('Blood_Glucose_Random', row.get('Blood Glucose Random')),
                    "Blood_Urea": row.get('Blood_Urea', row.get('Blood Urea')),
                    "Serum_Creatinine": row.get('Serum_Creatinine', row.get('Serum Creatinine')),
                    "Sodium": row.get('Sodium'),
                    "Potassium": row.get('Potassium'),
                    "Hemoglobin": row.get('Hemoglobin'),
                    "Packed_Cell_Volume": row.get('Packed_Cell_Volume', row.get('Packed Cell Volume')),
                    "White_Blood_Cell_Count": row.get('White_Blood_Cell_Count', row.get('White Blood Cell Count')),
                    "Red_Blood_Cell_Count": row.get('Red_Blood_Cell_Count', row.get('Red Blood Cell Count')),
                    "Hypertension": row.get('Hypertension'),
                    "Diabetes_Mellitus": row.get('Diabetes_Mellitus', row.get('Diabetes Mellitus')),
                    "Coronary_Artery_Disease": row.get('Coronary_Artery_Disease', row.get('Coronary Artery Disease')),
                    "Appetite": row.get('Appetite'),
                    "Pedal_Edema": row.get('Pedal_Edema', row.get('Pedal Edema')),
                    "Anemia": row.get('Anemia')
                }
            })
            
        summary = {
            "total": len(results),
            "high_risk": sum(1 for r in results if r["probability"] > 0.6),
            "medium_risk": sum(1 for r in results if 0.3 <= r["probability"] <= 0.6),
            "low_risk": sum(1 for r in results if r["probability"] < 0.3)
        }
            
        return {
            "summary": summary,
            "data": results
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
