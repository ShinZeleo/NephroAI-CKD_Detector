import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ResultCard from '../components/ResultCard';

const PredictionForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    Age: "",
    Systolic: "",
    Blood_Pressure: "",
    Specific_Gravity: "",
    Albumin: "",
    Sugar: "",
    Red_Blood_Cells: "",
    Pus_Cell: "",
    Pus_Cell_clumps: "",
    Bacteria: "",
    Blood_Glucose_Random: "",
    Blood_Urea: "",
    Serum_Creatinine: "",
    Sodium: "",
    Potassium: "",
    Hemoglobin: "",
    Packed_Cell_Volume: "",
    White_Blood_Cell_Count: "",
    Red_Blood_Cell_Count: "",
    Hypertension: "",
    Diabetes_Mellitus: "",
    Coronary_Artery_Disease: "",
    Appetite: "",
    Pedal_Edema: "",
    Anemia: ""
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("basic")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFillNormal = () => {
    setFormData({
      Age: "35",
      Systolic: "120",
      Blood_Pressure: "80",
      Specific_Gravity: "1.020",
      Albumin: "0.0",
      Sugar: "0.0",
      Red_Blood_Cells: "normal",
      Pus_Cell: "normal",
      Pus_Cell_clumps: "notpresent",
      Bacteria: "notpresent",
      Blood_Glucose_Random: "90",
      Blood_Urea: "30",
      Serum_Creatinine: "0.8",
      Sodium: "140",
      Potassium: "4.0",
      Hemoglobin: "15.0",
      Packed_Cell_Volume: "45",
      White_Blood_Cell_Count: "7000",
      Red_Blood_Cell_Count: "5.0",
      Hypertension: "no",
      Diabetes_Mellitus: "no",
      Coronary_Artery_Disease: "no",
      Appetite: "good",
      Pedal_Edema: "no",
      Anemia: "no"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    const numericFields = ['Age', 'Systolic', 'Blood_Pressure', 'Blood_Glucose_Random', 'Blood_Urea', 'Serum_Creatinine', 'Sodium', 'Potassium', 'Hemoglobin', 'Packed_Cell_Volume', 'White_Blood_Cell_Count', 'Red_Blood_Cell_Count']
    
    const payload = {}
    for (const key in formData) {
      if (key === "Systolic") continue; // Skip Systolic, model only takes Diastolic (Blood_Pressure)
      if (formData[key] === "") {
        payload[key] = null
      } else {
        payload[key] = numericFields.includes(key) ? parseFloat(formData[key]) : formData[key]
      }
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to get prediction from server')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const renderRangeInput = (name, label, min, max, step = "1", unit = "") => (
    <div className="space-y-3 bg-white p-5 rounded-xl border border-gray-100 clinical-shadow">
      <div className="flex justify-between items-center border-b border-gray-50 pb-2">
        <label className="text-sm font-bold text-gray-800">{label}</label>
        <div className="flex items-center space-x-2">
          <input 
            type="number" 
            name={name}
            min={min}
            max={max}
            step={step}
            value={formData[name]}
            onChange={handleChange}
            placeholder="-"
            className="w-20 text-right font-bold text-primary text-lg border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary bg-stone-50"
          />
          <span className="text-xs text-gray-500 font-normal">{unit}</span>
        </div>
      </div>
      <div className="pt-2">
        <input type="range" min={min} max={max} step={step} name={name} value={formData[name] === "" ? min : formData[name]} onChange={handleChange} className="w-full" />
      </div>
      <div className="flex justify-between text-xs text-gray-400 font-medium">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  )

  const formatLabel = (val) => {
    const map = {
      "yes": t("opt_yes"), "no": t("opt_no"),
      "good": t("opt_good"), "poor": t("opt_poor"),
      "normal": t("opt_normal"), "abnormal": t("opt_abnormal"),
      "present": t("opt_present"), "notpresent": t("opt_notpresent"),
    };
    return map[val] || val;
  }

  const renderToggleInput = (name, label, options) => (
    <div className="space-y-3 bg-white p-5 rounded-xl border border-gray-100 clinical-shadow">
      <label className="text-sm font-bold text-gray-800 block border-b border-gray-50 pb-2">{label}</label>
      <div className="flex flex-wrap gap-2 pt-1">
        {options.map(opt => (
          <label key={opt} className={`cursor-pointer flex-1 text-center py-2 px-3 rounded-md text-sm font-medium transition-all border ${
            formData[name] === opt 
              ? 'bg-primary text-white border-primary shadow-sm' 
              : 'bg-stone-50 text-gray-500 border-gray-200 hover:bg-stone-100'
          }`}>
            <input 
              type="radio" 
              name={name} 
              value={opt} 
              checked={formData[name] === opt} 
              onChange={handleChange} 
              className="sr-only" 
            />
            {formatLabel(opt)}
          </label>
        ))}
      </div>
    </div>
  )

  const getBpCategory = () => {
    if (!formData.Systolic || !formData.Blood_Pressure) return null;
    const sys = parseInt(formData.Systolic);
    const dia = parseInt(formData.Blood_Pressure);

    if (sys >= 160 || dia >= 100) return { label: "Stage 2 Hypertension", color: "text-red-600", bg: "bg-red-50 border-red-200" };
    if (sys >= 140 || dia >= 90) return { label: "Stage 1 Hypertension", color: "text-orange-600", bg: "bg-orange-50 border-orange-200" };
    if ((sys >= 120 && sys <= 139) || (dia >= 80 && dia <= 89)) return { label: "Prehypertension", color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200" };
    return { label: "Normal", color: "text-green-600", bg: "bg-green-50 border-green-200" };
  };

  const getWarnings = () => {
    const warnings = [];
    if (formData.Serum_Creatinine && parseFloat(formData.Serum_Creatinine) > 5.0) {
      warnings.push("⚠ Nilai Serum Creatinine sangat tinggi dibanding rentang normal.");
    }
    if (formData.Potassium && parseFloat(formData.Potassium) > 6.0) {
      warnings.push("⚠ Nilai Kalium (Potassium) sangat tinggi dibanding rentang normal.");
    }
    if (formData.Blood_Glucose_Random && parseFloat(formData.Blood_Glucose_Random) > 300) {
      warnings.push("⚠ Nilai Gula Darah sangat tinggi dibanding rentang normal.");
    }
    if (formData.Systolic && parseFloat(formData.Systolic) > 180) {
      warnings.push("⚠ Nilai Tekanan Darah Systolic sangat tinggi (Krisis Hipertensi).");
    }
    return warnings;
  };

  const warnings = getWarnings();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10 mt-6 max-w-2xl print-hide">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-3">
          {t('form_title')}
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          {t('form_desc') || "Sistem inferensi berbasis Random Forest untuk deteksi dini Chronic Kidney Disease. Atur parameter klinis pasien pada form di bawah ini."}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form Section */}
        <div className="lg:w-2/3 print-hide">
          <div className="bg-white rounded-2xl p-6 md:p-8 clinical-shadow border border-gray-100">
            
            <div className="flex space-x-6 border-b border-gray-200 mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <button type="button" onClick={() => setActiveTab("basic")} className={`pb-4 font-semibold text-sm whitespace-nowrap transition-colors relative ${activeTab === "basic" ? "text-primary" : "text-gray-400 hover:text-gray-700"}`}>
                {t('tab_basic')}
                {activeTab === "basic" && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-primary"></div>}
              </button>
              <button type="button" onClick={() => setActiveTab("blood")} className={`pb-4 font-semibold text-sm whitespace-nowrap transition-colors relative ${activeTab === "blood" ? "text-primary" : "text-gray-400 hover:text-gray-700"}`}>
                {t('tab_blood')}
                {activeTab === "blood" && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-primary"></div>}
              </button>
              <button type="button" onClick={() => setActiveTab("urine")} className={`pb-4 font-semibold text-sm whitespace-nowrap transition-colors relative ${activeTab === "urine" ? "text-primary" : "text-gray-400 hover:text-gray-700"}`}>
                {t('tab_urine')}
                {activeTab === "urine" && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-primary"></div>}
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 ${activeTab === "basic" ? "block" : "hidden"}`}>
                {renderRangeInput("Age", t("lbl_age"), "1", "120", "1", "Thn")}
                <div className="space-y-4 bg-white p-5 rounded-xl border border-gray-100 clinical-shadow">
                  <div className="border-b border-gray-50 pb-2">
                    <label className="text-sm font-bold text-gray-800">{t("lbl_bp") || "Tekanan Darah"}</label>
                    <p className="text-[10px] text-gray-400 mt-1 leading-tight">
                      Catatan: Model CKD menggunakan nilai tekanan darah diastolik (BP) sesuai atribut pada dataset UCI Chronic Kidney Disease.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="text-xs text-gray-600 font-semibold mb-1 block">Systolic (mmHg)</label>
                      <input 
                        type="number" name="Systolic" min="70" max="250" 
                        value={formData.Systolic} onChange={handleChange} placeholder="120" 
                        className="w-full font-bold text-primary text-sm border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary bg-stone-50" 
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 font-semibold mb-1 block">Diastolic (mmHg)</label>
                      <input 
                        type="number" name="Blood_Pressure" min="40" max="150" 
                        value={formData.Blood_Pressure} onChange={handleChange} placeholder="80" 
                        className="w-full font-bold text-primary text-sm border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary bg-stone-50" 
                      />
                    </div>
                  </div>

                  {formData.Systolic && formData.Blood_Pressure && (
                    <div className={`mt-3 px-3 py-2 rounded-md border ${getBpCategory()?.bg} flex flex-col xl:flex-row xl:items-center justify-between gap-1`}>
                      <span className="text-xs font-semibold text-gray-600">Kategori Tekanan Darah:</span>
                      <span className={`text-xs font-bold ${getBpCategory()?.color}`}>{getBpCategory()?.label}</span>
                    </div>
                  )}
                </div>
                {renderToggleInput("Hypertension", t("lbl_htn"), ["no", "yes"])}
                {renderToggleInput("Diabetes_Mellitus", t("lbl_dm"), ["no", "yes"])}
                {renderToggleInput("Coronary_Artery_Disease", t("lbl_cad"), ["no", "yes"])}
                {renderToggleInput("Appetite", t("lbl_appetite"), ["good", "poor"])}
                {renderToggleInput("Pedal_Edema", t("lbl_pe"), ["no", "yes"])}
                {renderToggleInput("Anemia", t("lbl_ane"), ["no", "yes"])}
              </div>

              <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 ${activeTab === "blood" ? "block" : "hidden"}`}>
                {renderRangeInput("Hemoglobin", t("lbl_hemo"), "3.0", "20.0", "0.1", "g/dL")}
                {renderRangeInput("Packed_Cell_Volume", t("lbl_pcv"), "10", "60", "1", "%")}
                {renderRangeInput("White_Blood_Cell_Count", t("lbl_wbc"), "2000", "30000", "100", "sel/µL")}
                {renderRangeInput("Red_Blood_Cell_Count", t("lbl_rbc"), "2.0", "8.0", "0.1", "juta/µL")}
                {renderRangeInput("Blood_Glucose_Random", t("lbl_bgr"), "50", "500", "1", "mg/dL")}
                {renderRangeInput("Blood_Urea", t("lbl_bu"), "5", "300", "1", "mg/dL")}
                {renderRangeInput("Serum_Creatinine", t("lbl_sc"), "0.1", "30.0", "0.1", "mg/dL")}
                {renderRangeInput("Sodium", t("lbl_sod"), "110", "160", "1", "mEq/L")}
                {renderRangeInput("Potassium", t("lbl_pot"), "2.0", "8.0", "0.1", "mEq/L")}
              </div>

              <div className={`grid grid-cols-1 gap-5 ${activeTab === "urine" ? "block" : "hidden"}`}>
                {renderToggleInput("Specific_Gravity", t("lbl_sg"), ["1.005", "1.010", "1.015", "1.020", "1.025"])}
                {renderToggleInput("Albumin", t("lbl_al"), ["0.0", "1.0", "2.0", "3.0", "4.0", "5.0"])}
                {renderToggleInput("Sugar", t("lbl_su"), ["0.0", "1.0", "2.0", "3.0", "4.0", "5.0"])}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {renderToggleInput("Red_Blood_Cells", t("lbl_rbcc"), ["normal", "abnormal"])}
                  {renderToggleInput("Pus_Cell", t("lbl_pc"), ["normal", "abnormal"])}
                  {renderToggleInput("Pus_Cell_clumps", t("lbl_pcc"), ["notpresent", "present"])}
                  {renderToggleInput("Bacteria", t("lbl_ba"), ["notpresent", "present"])}
                </div>
              </div>

              {warnings.length > 0 && (
                <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-bold text-yellow-800">Perhatian: Input Abnormal</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <ul className="list-disc pl-5 space-y-1">
                          {warnings.map((w, idx) => <li key={idx}>{w}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <button 
                  type="button" 
                  onClick={handleFillNormal}
                  className="w-full md:w-auto bg-stone-100 text-gray-700 font-semibold py-3 px-6 rounded-md border border-stone-200 transition-colors hover:bg-stone-200 flex justify-center items-center"
                >
                  {t('btn_fill_normal')}
                </button>
                
                {Object.values(formData).every(val => val !== "") ? (
                  <button type="submit" disabled={loading} className="w-full md:w-auto bg-primary text-white font-semibold py-3 px-8 rounded-md transition-colors hover:bg-slate-800 disabled:opacity-50 flex justify-center items-center">
                    {loading ? t('btn_analyzing') : t('btn_predict')}
                  </button>
                ) : (
                  <div className="w-full md:w-auto flex-1 bg-stone-50 border border-gray-200 rounded-md p-3 text-center md:text-right">
                    <p className="text-sm text-gray-500 font-medium inline-flex items-center">
                      <span className="text-yellow-500 mr-2">⚠️</span> {t('alert_incomplete')}
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Result Section */}
        <div className="lg:w-1/3 print-w-full">
          {error && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
              <p className="text-sm text-red-700 font-bold">Koneksi Gagal</p>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          )}

          {!result && !error && (
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center text-center border border-gray-100 clinical-shadow h-auto md:min-h-[400px]">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-5">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <h3 className="text-gray-800 font-serif font-bold text-xl mb-2">{t('form_waiting')}</h3>
              <p className="text-sm text-gray-500 mb-8 max-w-[250px] mx-auto">{t('form_waiting_desc')}</p>
              
              <div className="w-full text-left bg-stone-50 border border-stone-200 rounded-lg p-5">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Model Specifications</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Model:</span>
                    <span className="text-sm font-bold text-gray-800">Random Forest</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Accuracy:</span>
                    <span className="text-sm font-bold text-teal-600">99.0%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Recall:</span>
                    <span className="text-sm font-bold text-teal-600">100.0%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Dataset:</span>
                    <span className="text-sm font-bold text-gray-800">UCI CKD</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <ResultCard result={result} formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default PredictionForm;
