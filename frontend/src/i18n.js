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
      "batch_upload": "Unggah File CSV Pasien",
      "batch_summary": "Ringkasan Prediksi Massal"
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
      "batch_upload": "Upload Patient CSV File",
      "batch_summary": "Batch Prediction Summary"
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
