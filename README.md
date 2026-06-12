# 🩺 NephroAI: Chronic Kidney Disease (CKD) Detector

![NephroAI Banner](https://img.shields.io/badge/NephroAI-Clinical_Intelligence-0d9488?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![LightGBM](https://img.shields.io/badge/LightGBM-F3702A?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**NephroAI** adalah sebuah sistem *Clinical Decision Support* (Sistem Pendukung Keputusan Klinis) berbasis *Machine Learning* terdepan yang dirancang untuk mendeteksi probabilitas Penyakit Ginjal Kronis (CKD) pada pasien. Aplikasi ini memadukan keandalan algoritma pohon gradien (LightGBM) dengan antarmuka web bergaya *Clinical Minimalist & Modern Editorial*.

---

## 🌟 Fitur Utama

- **🤖 Deteksi Prediktif Akurat:** Ditenagai oleh model *Machine Learning* yang telah dioptimalkan (LightGBM / Random Forest / Logistic Regression) yang dilatih menggunakan dataset medis CKD berstandar internasional.
- **🎨 Clinical Minimalist UI/UX:** Antarmuka pengguna (UI) yang dirancang khusus untuk memenuhi standar kebersihan visual alat medis. Tidak ada komponen bising; mengutamakan tipografi editorial (*serif* yang elegan) dan palet warna klinis (Teal & Stone).
- **📊 Laporan Diagnostik Interaktif (Result Card):** Hasil prediksi tidak ditampilkan sekadar "Ya/Tidak", melainkan disajikan dalam bentuk Laporan Medis (*Clinical Report*) lengkap dengan indikator risiko berbasis Gauge SVG, penjelasan parameter medis, dan anjuran protokol selanjutnya.
- **📚 Ensiklopedia Medis Terintegrasi:** Edukasi mendalam (berbasis pedoman KDIGO) yang menjelaskan patofisiologi penyakit, interpretasi parameter lab (Kreatinin, BUN, Urinalisis), serta protokol pencegahan dan penanganan.
- **🧠 Analisis Model Transparan (XAI):** Pipeline ML didukung oleh SHAP (SHapley Additive exPlanations) untuk memberikan interpretasi *Feature Importance*, memastikan bahwa prediksi model dapat dijelaskan secara medis (*Explainable AI*).

---

## 🏗️ Arsitektur Sistem

Proyek ini dibangun menggunakan arsitektur *Decoupled* yang memisahkan *Frontend*, *Backend*, dan *Machine Learning Pipeline*:

1. **Frontend (Web App):**
   - **Framework:** React.js (Vite)
   - **Styling:** Tailwind CSS (dengan utilitas khusus penyembunyian *scrollbar*, desain grid editorial, dan tata letak *mobile-responsive*)
   - **Komponen Kunci:**
     - `PredictionForm`: Sistem input terpadu dengan *Segmented Controls* dan *Sliders* untuk mengumpulkan data dasar, darah, dan urine pasien.
     - `Dashboard`: Dasbor analitik global.
     - `Education`: Literatur klinis.

2. **Backend (API Layer):**
   - **Framework:** FastAPI (Python)
   - **Fungsi:** Mengambil *payload* data medis dari *frontend*, melakukan prapemrosesan (Imputasi MICE, *Scaling*), dan meneruskannya ke model *Machine Learning* termuat (*Pickle/Joblib*) untuk *inference*.

3. **Machine Learning (Data Science Pipeline):**
   - **Jupyter Notebooks / Streamlit:** Digunakan untuk *Exploratory Data Analysis* (EDA) fase 1 dan 2.
   - **Preprocessing:** MICE Imputer untuk *missing values*, Robust/Standard Scaler.
   - **Model Inti:** LightGBM sebagai *champion model* karena keunggulannya dalam menangani data tabular kompleks dengan *missing values*.

---

## 🚀 Panduan Menjalankan Secara Lokal (Local Installation)

### Prasyarat
- **Node.js** (v16 atau ke atas)
- **Python** (v3.9 atau ke atas)
- **Git**

### 1. Kloning Repositori
```bash
git clone https://github.com/ShinZeleo/NephroAI-CKD_Detector.git
cd NephroAI-CKD_Detector
```

### 2. Konfigurasi Backend (FastAPI & ML)
Buka terminal baru untuk *backend*:
```bash
# Pindah ke direktori backend
cd backend

# Buat virtual environment (disarankan)
python -m venv venv

# Aktivasi virtual environment (Windows)
venv\Scripts\activate
# Aktivasi virtual environment (Mac/Linux)
# source venv/bin/activate

# Install dependensi
pip install -r requirements.txt

# Jalankan server FastAPI
uvicorn main:app --reload --port 8000
```
Backend akan berjalan di `http://localhost:8000`.

### 3. Konfigurasi Frontend (React + Vite)
Buka terminal baru untuk *frontend*:
```bash
# Pindah ke direktori frontend
cd frontend

# Install dependensi Node modules
npm install

# Jalankan server pengembangan
npm run dev
```
Frontend akan berjalan secara lokal di `http://localhost:5173` (atau *port* yang tertera pada terminal).

---

## 🩸 Parameter Klinis yang Dianalisis

NephroAI mengonsumsi 24 paramater dari rekam medis pasien, terbagi dalam tiga domain utama:
- **Data Dasar:** Usia, Tekanan Darah, Riwayat Hipertensi, Diabetes Melitus, Penyakit Jantung Koroner, Nafsu Makan, Edema, Anemia.
- **Panel Darah:** Hemoglobin, Hematokrit (PCV), Leukosit, Eritrosit, Gula Darah Acak, Ureum (BUN), Kreatinin Serum, Natrium, Kalium.
- **Urinalisis:** Berat Jenis (Specific Gravity), Albumin (Proteinuria), Gula Urine, Sel Darah Merah (RBC), Sel Nanah (Pus Cell), Bakteri.

---

## 📜 Lisensi

Proyek ini dibuat untuk keperluan akademis dan penelitian (Tugas Pengantar Data Mining). 

> **Penafian Medis (Medical Disclaimer):**
> Aplikasi *NephroAI* adalah *Proof of Concept* (PoC) berbasis kecerdasan buatan. Model ini TIDAK BOLEH digunakan sebagai substitusi absolut dari diagnosis klinis dokter spesialis (Nefrolog). Semua keputusan medis harus diverifikasi melalui laboratorium fisik yang tervalidasi.

---
*Didesain dan dikembangkan dengan ❤️ oleh ShinZeleo*
