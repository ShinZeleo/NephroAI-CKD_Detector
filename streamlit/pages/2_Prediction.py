import streamlit as st
import requests

st.set_page_config(page_title="Prediction", page_icon="🔮", layout="wide")

st.markdown("# CKD Prediction 🔮")
st.write("Geser slider atau pilih opsi di bawah ini. Kami telah mengatur nilai awal ke angka normal pasien sehat untuk mempercepat input Anda.")

with st.form("patient_data_form"):
    tab1, tab2, tab3 = st.tabs(["Data Dasar & Gejala", "Tes Darah", "Tes Urine"])
    
    with tab1:
        col1, col2 = st.columns(2)
        with col1:
            age = st.slider("Umur (Tahun)", min_value=1.0, max_value=120.0, value=50.0, step=1.0)
            bp = st.slider("Tekanan Darah (mmHg)", min_value=40.0, max_value=300.0, value=80.0, step=1.0)
            htn = st.selectbox("Hipertensi", ["no", "yes"], index=0)
            dm = st.selectbox("Diabetes Mellitus", ["no", "yes"], index=0)
        with col2:
            cad = st.selectbox("Penyakit Jantung Koroner", ["no", "yes"], index=0)
            appet = st.selectbox("Nafsu Makan", ["good", "poor"], index=0)
            pe = st.selectbox("Pembengkakan Kaki (Edema)", ["no", "yes"], index=0)
            ane = st.selectbox("Anemia", ["no", "yes"], index=0)
            
    with tab2:
        col3, col4 = st.columns(2)
        with col3:
            hemo = st.slider("Hemoglobin (g/dL)", min_value=3.0, max_value=20.0, value=15.0, step=0.1)
            pcv = st.slider("PCV / Hematokrit (%)", min_value=10.0, max_value=60.0, value=45.0, step=1.0)
            wbc = st.slider("Leukosit (sel/µL)", min_value=2000.0, max_value=30000.0, value=8000.0, step=100.0)
            rc = st.slider("Eritrosit (juta/µL)", min_value=2.0, max_value=8.0, value=5.0, step=0.1)
            bgr = st.slider("Gula Darah Acak (mg/dL)", min_value=50.0, max_value=500.0, value=110.0, step=1.0)
        with col4:
            bu = st.slider("Ureum Darah (mg/dL)", min_value=5.0, max_value=300.0, value=20.0, step=1.0)
            sc = st.slider("Kreatinin Serum (mg/dL)", min_value=0.1, max_value=30.0, value=1.0, step=0.1)
            sod = st.slider("Natrium (mEq/L)", min_value=110.0, max_value=160.0, value=140.0, step=1.0)
            pot = st.slider("Kalium (mEq/L)", min_value=2.0, max_value=8.0, value=4.5, step=0.1)

    with tab3:
        col5, col6 = st.columns(2)
        with col5:
            sg = st.selectbox("Berat Jenis Urine (SG)", [1.005, 1.010, 1.015, 1.020, 1.025], index=3)
            al = st.selectbox("Albumin Urine (AL)", [0.0, 1.0, 2.0, 3.0, 4.0, 5.0], index=0)
            su = st.selectbox("Gula Urine (SU)", [0.0, 1.0, 2.0, 3.0, 4.0, 5.0], index=0)
        with col6:
            rbc = st.selectbox("Sel Darah Merah Urine", ["normal", "abnormal"], index=0)
            pc = st.selectbox("Sel Nanah (Pus Cell)", ["normal", "abnormal"], index=0)
            pcc = st.selectbox("Gumpalan Sel Nanah", ["notpresent", "present"], index=0)
            ba = st.selectbox("Bakteri", ["notpresent", "present"], index=0)

    submitted = st.form_submit_button("Prediksi Sekarang")

if submitted:
    payload = {
        "Age": age,
        "Blood_Pressure": bp,
        "Specific_Gravity": sg,
        "Albumin": al,
        "Sugar": su,
        "Red_Blood_Cells": rbc,
        "Pus_Cell": pc,
        "Pus_Cell_clumps": pcc,
        "Bacteria": ba,
        "Blood_Glucose_Random": bgr,
        "Blood_Urea": bu,
        "Serum_Creatinine": sc,
        "Sodium": sod,
        "Potassium": pot,
        "Hemoglobin": hemo,
        "Packed_Cell_Volume": pcv,
        "White_Blood_Cell_Count": wbc,
        "Red_Blood_Cell_Count": rc,
        "Hypertension": htn,
        "Diabetes_Mellitus": dm,
        "Coronary_Artery_Disease": cad,
        "Appetite": appet,
        "Pedal_Edema": pe,
        "Anemia": ane
    }
    
    # Remove keys with None so backend falls back to defaults (which are None anyway) but it's cleaner
    payload = {k: v for k, v in payload.items() if v is not None}
    
    try:
        response = requests.post("http://127.0.0.1:8000/predict", json=payload)
        
        if response.status_code == 200:
            result = response.json()
            if result["is_ckd"]:
                st.error(f"🚨 Prediction: CKD Detected (Probability: {result['probability']:.2f})")
            else:
                st.success(f"✅ Prediction: Not CKD (Probability: {result['probability']:.2f})")
        else:
            st.error(f"Error from API: {response.text}")
    except Exception as e:
        st.error(f"Failed to connect to API: {e}. Is the FastAPI backend running?")
