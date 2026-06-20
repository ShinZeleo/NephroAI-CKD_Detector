# NephroAI: Clinical Chronic Kidney Disease (CKD) Detector

![NephroAI Banner](https://img.shields.io/badge/NephroAI-Clinical_Intelligence-0d9488?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![RandomForest](https://img.shields.io/badge/Random_Forest-0f172a?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**NephroAI** adalah sebuah sistem Clinical Decision Support berbasis Machine Learning terdepan yang dirancang untuk mendeteksi dini probabilitas Penyakit Ginjal Kronis (CKD) pada pasien. Aplikasi ini memadukan keandalan algoritma Random Forest dengan antarmuka web bergaya Clinical Minimalist & Modern Editorial.

---

## Fitur Utama (Advanced Edition)

- **Deteksi Prediktif Akurat:** Ditenagai oleh model Machine Learning Random Forest yang tervalidasi menggunakan dataset rekam medis klinis.
- **Sistem Multi-Bahasa (i18n):** Dukungan penuh penerjemahan antarmuka secara dinamis (Bahasa Indonesia & Inggris).
- **Analisis Transparan (Explainable AI / SHAP):** Visualisasi grafis kontribusi parameter medis menggunakan SHAP (SHapley Additive exPlanations). Membantu dokter memahami alasan medis di balik prediksi risiko pasien secara spesifik.
- **Analisis Massal (CSV Batch Prediction):** Fitur pengunggahan dataset pasien secara massal dalam format `.csv`. Dilengkapi dengan:
  - Tombol unduh Template CSV.
  - Ringkasan metrik global pasien.
  - Drill-down Analisis SHAP di setiap baris tabel untuk membedah profil risiko secara individu.
- **Ekspor Laporan Klinis (PDF Report):** Fitur cetak laporan medis instan menggunakan Native Browser Print CSS teroptimasi, menjamin resolusi tinggi dan format vektor untuk arsip klinik.
- **Fitur Clinical UX:** Pengisian parameter klinis instan dengan baseline nilai normal fisiologis manusia untuk mempercepat pengujian dan simulasi rekam medis.
- **Pusat Edukasi Terpadu:** Edukasi patofisiologi penyakit ginjal berdasarkan pedoman klinis global (KDIGO).

---

## Arsitektur Sistem & Deployment

Proyek ini dibangun menggunakan arsitektur Decoupled dan siap untuk di-deploy pada layanan cloud modern:

- **Frontend (Web App):** React.js (Vite) + Tailwind CSS + Recharts. Direkomendasikan untuk di-deploy pada **Vercel** untuk optimalisasi Edge CDN.
- **Backend (API Layer):** FastAPI (Python) + Scikit-Learn + SHAP. Direkomendasikan untuk di-deploy pada **Render** atau infrastruktur berbasis kontainer karena kebutuhan komputasi Machine Learning.

---

## Panduan Menjalankan Secara Lokal

### Prasyarat
- Node.js (v16+)
- Python (v3.9+)
- Git

### 1. Kloning Repositori
```bash
git clone https://github.com/ShinZeleo/NephroAI-CKD_Detector.git
cd NephroAI-CKD_Detector
```

### 2. Konfigurasi Backend
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 3. Konfigurasi Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## Parameter Klinis yang Dianalisis

NephroAI memproses 24 paramater klinis dari rekam medis pasien:
- **Data Dasar:** Usia, Tekanan Darah, Riwayat Hipertensi, Diabetes Melitus, Penyakit Jantung Koroner, Nafsu Makan, Edema, Anemia.
- **Panel Darah:** Hemoglobin, Hematokrit (PCV), Leukosit, Eritrosit, Gula Darah Acak, Ureum (BUN), Kreatinin Serum, Natrium, Kalium.
- **Urinalisis:** Berat Jenis (Specific Gravity), Albumin (Proteinuria), Gula Urine, Sel Darah Merah (RBC), Sel Nanah (Pus Cell), Bakteri.

---

## Lisensi & Penafian Medis

Proyek ini dibuat untuk keperluan akademis dan penelitian (Tugas Pengantar Data Mining).

**Penafian Medis (Medical Disclaimer):**
Aplikasi NephroAI adalah Proof of Concept (PoC) berbasis kecerdasan buatan. Model ini TIDAK BOLEH digunakan sebagai substitusi absolut dari diagnosis klinis dokter. Seluruh indikasi keparahan medis wajib dirujuk dan diverifikasi langsung ke Dokter Spesialis Penyakit Dalam Subspesialis Ginjal Hipertensi (Sp.PD-KGH) di Indonesia melalui pemeriksaan laboratorium fisik resmi.

---
*Didesain dan dikembangkan oleh klp7*
