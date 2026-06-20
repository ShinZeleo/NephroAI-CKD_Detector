import pandas as pd
import numpy as np
import joblib
import os
import warnings
import shap

# Base paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(os.path.dirname(BASE_DIR), 'output')

# Load models
MICE_IMPUTER_PATH = os.path.join(OUTPUT_DIR, 'mice_imputer.pkl')
MODEL_PATH = os.path.join(OUTPUT_DIR, 'pipeline_random_forest.pkl')

mice_imputer = joblib.load(MICE_IMPUTER_PATH)
model_pipeline = joblib.load(MODEL_PATH)

# Define features mapping
BASE_FEATURES = [
    'Age', 'Blood Pressure', 'Specific Gravity', 'Albumin', 'Sugar', 
    'Red Blood Cells', 'Pus Cell', 'Pus Cell clumps', 'Bacteria', 
    'Blood Glucose Random', 'Blood Urea', 'Serum Creatinine', 'Sodium', 
    'Potassium', 'Hemoglobin', 'Packed Cell Volume', 'White Blood Cell Count', 
    'Red Blood Cell Count', 'Hypertension', 'Diabetes Mellitus', 
    'Coronary Artery Disease', 'Appetite', 'Pedal Edema', 'Anemia'
]

BASE_BINARY = [
    'Red Blood Cells','Pus Cell','Pus Cell clumps','Bacteria',
    'Hypertension','Diabetes Mellitus','Coronary Artery Disease',
    'Appetite','Pedal Edema','Anemia'
]

DOMINANT_FEATURES_TO_DROP = [
    'Serum Creatinine', 'Blood Urea', 'Hemoglobin', 'Specific Gravity', 'Albumin'
]

DERIVED_TO_DROP = [
    'Anemia_Index', 'Creatinine_High', 'Urea_High', 'Hb_Low', 'GFR_Stage', 'Uremia_Risk'
]

ALL_DROPPED = DOMINANT_FEATURES_TO_DROP + DERIVED_TO_DROP

def apply_feature_engineering(X):
    Xf = X.copy()
    
    # 8.1 Rasio Klinis
    Xf['BUN_Creatinine_Ratio'] = Xf['Blood Urea'] / (Xf['Serum Creatinine'] + 1e-6)
    Xf['Anemia_Index'] = Xf['Hemoglobin'] * Xf['Packed Cell Volume']
    
    # 8.2 Estimasi GFR (MDRD Simplified)
    Xf['eGFR'] = (186 * (Xf['Serum Creatinine'].clip(lower=0.1) ** -1.154) * (Xf['Age'].clip(lower=1) ** -0.203))
    
    def _gfr_stage(v):
        if   v >= 90: return 1
        elif v >= 60: return 2
        elif v >= 45: return 3
        elif v >= 30: return 4
        elif v >= 15: return 5
        else:         return 6
    Xf['GFR_Stage'] = Xf['eGFR'].apply(_gfr_stage)
    
    # 8.3 Flag Klinis
    Xf['Creatinine_High'] = (Xf['Serum Creatinine'] > 1.2).astype(int)
    Xf['Hb_Low']          = (Xf['Hemoglobin']        < 12 ).astype(int)
    Xf['Na_Low']          = (Xf['Sodium']             < 136).astype(int)
    Xf['K_High']          = (Xf['Potassium']          > 5.0).astype(int)
    Xf['Urea_High']       = (Xf['Blood Urea']         > 40 ).astype(int)
    Xf['WBC_High']        = (Xf['White Blood Cell Count'] > 11000).astype(int)
    
    # 8.4 Skor Komorbiditas
    Xf['Comorbidity_Score'] = (Xf['Hypertension'] + Xf['Diabetes Mellitus'] + Xf['Coronary Artery Disease'])
    Xf['HT_DM_Both']  = ((Xf['Hypertension'] == 1) & (Xf['Diabetes Mellitus'] == 1)).astype(int)
    Xf['Uremia_Risk'] = (Xf['Urea_High'] + Xf['Creatinine_High'] + Xf['K_High'])
    
    return Xf

def predict_ckd(patient_data: dict):
    # Convert dictionary to DataFrame
    df = pd.DataFrame([patient_data])
    
    # Apply categorical mapping
    mappings = {
        'Red Blood Cells'        : {'normal': 1, 'abnormal': 0},
        'Pus Cell'               : {'normal': 1, 'abnormal': 0},
        'Pus Cell clumps'        : {'present': 1, 'notpresent': 0},
        'Bacteria'               : {'present': 1, 'notpresent': 0},
        'Hypertension'           : {'yes': 1, 'no': 0},
        'Diabetes Mellitus'      : {'yes': 1, 'no': 0},
        'Coronary Artery Disease': {'yes': 1, 'no': 0},
        'Appetite'               : {'good': 1, 'poor': 0},
        'Pedal Edema'            : {'yes': 1, 'no': 0},
        'Anemia'                 : {'yes': 1, 'no': 0}
    }
    
    for col, m in mappings.items():
        if col in df.columns:
            # We map it, but handle cases where it might already be 1 or 0
            df[col] = df[col].apply(lambda x: m.get(str(x).strip().lower(), x) if pd.notnull(x) else x)
            
    # Ensure correct column order
    # Note: we assume patient_data keys match exactly or we can extract them
    # Any missing keys will become NaN
    for col in BASE_FEATURES:
        if col not in df.columns:
            df[col] = np.nan
            
    df_base = df[BASE_FEATURES].copy()
    
    # Convert all object columns to numeric just in case
    for col in df_base.columns:
        df_base[col] = pd.to_numeric(df_base[col], errors='coerce')
    
    # 1. MICE Imputation
    df_imp = pd.DataFrame(
        mice_imputer.transform(df_base),
        columns=BASE_FEATURES, 
        index=df_base.index
    )
    
    # Post-MICE: rounding fitur biner
    for col in BASE_BINARY:
        if col in df_imp.columns:
            df_imp[col] = np.clip(np.round(df_imp[col]), 0, 1).astype(int)
            
    # 2. Feature Engineering
    df_fe = apply_feature_engineering(df_imp)
    
    # 3. Feature Control (Drop dominant and derived)
    df_controlled = df_fe.drop(columns=[c for c in ALL_DROPPED if c in df_fe.columns])
    
    # 4. Predict
    prob = model_pipeline.predict_proba(df_controlled)[:, 1][0]
    
    # Threshold 0.3 as recommended by analysis
    threshold = 0.3
    prediction = 1 if prob >= threshold else 0
    
    # 5. Explain with SHAP
    shap_data = []
    try:
        # Extract the actual estimator from the pipeline (assuming it's a Pipeline and the last step is the model)
        estimator = model_pipeline.steps[-1][1] if hasattr(model_pipeline, 'steps') else model_pipeline
        explainer = shap.TreeExplainer(estimator)
        
        # Calculate SHAP values for the single instance
        # shap_values returns a list of arrays for classification (one for each class). We want class 1 (CKD)
        shap_vals = explainer.shap_values(df_controlled)
        if isinstance(shap_vals, list):
            sv = shap_vals[1][0]  # Class 1, first instance
        else:
            sv = shap_vals[0] # Some versions return single array for binary
        
        # Map to feature names
        features = df_controlled.columns.tolist()
        for i, f_name in enumerate(features):
            val = sv[i]
            # If val is an array (e.g. binary classification returning [class0_shap, class1_shap])
            if isinstance(val, (np.ndarray, list)):
                val = val[1] if len(val) > 1 else val[0]
                
            if abs(val) > 0.001:  # Filter out near-zero noise
                shap_data.append({
                    "feature": f_name,
                    "value": float(val)
                })
        # Sort by absolute impact
        shap_data.sort(key=lambda x: abs(x['value']), reverse=True)
        # Take top 10 most impactful features
        shap_data = shap_data[:10]
    except Exception as e:
        print(f"SHAP explanation failed: {e}")
        shap_data = []
    
    return {
        "prediction": prediction,
        "probability": float(prob),
        "threshold_used": threshold,
        "is_ckd": bool(prediction == 1),
        "shap_values": shap_data
    }
