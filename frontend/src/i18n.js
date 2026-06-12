import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Resources
const resources = {
  id: {
    translation: {
      "nav_predict": "Prediksi CKD",
      "nav_batch": "Prediksi Massal",
      "nav_education": "Pusat Edukasi",
      "form_title": "Formulir Prediksi Klinis",
      "form_waiting": "Menunggu Input",
      "form_waiting_desc": "Isi parameter klinis di samping lalu tekan Mulai Prediksi.",
      "btn_predict": "Mulai Prediksi",
      "btn_analyzing": "Menganalisis Data...",
      "alert_incomplete": "⚠️ Silakan lengkapi semua form untuk memunculkan tombol prediksi.",
      "result_high_risk": "Risiko Tinggi",
      "result_low_risk": "Risiko Rendah",
      "probability": "Probabilitas",
      "action_plan": "Rencana Tindakan Klinis",
      "btn_download_pdf": "Unduh Laporan (PDF)",
      "risk_factors": "Faktor Risiko Utama",
      "batch_title": "Prediksi Massal (CSV)",
      "batch_desc": "Unggah dataset rekam medis pasien dalam format CSV untuk memprediksi risiko penyakit ginjal kronis (CKD) secara massal.",
      "batch_upload": "Unggah File CSV Pasien",
      "batch_drag_drop": "Pilih atau Tarik file CSV",
      "batch_format_note": "Pastikan format kolom sesuai dengan template standar NephroAI.",
      "batch_error_format": "Harap unggah file dengan format .csv",
      "batch_start_btn": "Mulai Analisis Massal",
      "batch_processing": "Memproses...",
      "batch_summary": "Ringkasan Prediksi Massal",
      "batch_total_patients": "Total Pasien",
      "batch_high_risk": "Risiko Tinggi",
      "batch_low_risk": "Risiko Rendah",
      "batch_col_id": "ID Pasien",
      "batch_col_prob": "Probabilitas",
      "batch_col_status": "Status Risiko",
      "batch_no_data": "Belum Ada Data",
      "batch_no_data_desc": "Unggah file CSV di samping untuk melihat hasil analisis di sini."
    }
  },
  en: {
    translation: {
      "nav_predict": "CKD Prediction",
      "nav_batch": "Batch Prediction",
      "nav_education": "Education Center",
      "form_title": "Clinical Prediction Form",
      "form_waiting": "Waiting for Input",
      "form_waiting_desc": "Fill in the clinical parameters on the side and press Start Prediction.",
      "btn_predict": "Start Prediction",
      "btn_analyzing": "Analyzing Data...",
      "alert_incomplete": "⚠️ Please complete all forms to show the prediction button.",
      "result_high_risk": "High Risk",
      "result_low_risk": "Low Risk",
      "probability": "Probability",
      "action_plan": "Clinical Action Plan",
      "btn_download_pdf": "Download Report (PDF)",
      "risk_factors": "Key Risk Factors",
      "batch_title": "Batch Prediction (CSV)",
      "batch_desc": "Upload patient medical record datasets in CSV format to predict chronic kidney disease (CKD) risk in batches.",
      "batch_upload": "Upload Patient CSV File",
      "batch_drag_drop": "Select or Drag CSV file",
      "batch_format_note": "Ensure column formats match the NephroAI standard template.",
      "batch_error_format": "Please upload a file in .csv format",
      "batch_start_btn": "Start Batch Analysis",
      "batch_processing": "Processing...",
      "batch_summary": "Batch Prediction Summary",
      "batch_total_patients": "Total Patients",
      "batch_high_risk": "High Risk",
      "batch_low_risk": "Low Risk",
      "batch_col_id": "Patient ID",
      "batch_col_prob": "Probability",
      "batch_col_status": "Risk Status",
      "batch_no_data": "No Data Yet",
      "batch_no_data_desc": "Upload a CSV file on the side to see the analysis results here."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "id", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
