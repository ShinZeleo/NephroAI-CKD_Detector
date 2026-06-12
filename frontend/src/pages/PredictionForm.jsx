import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ResultCard from '../components/ResultCard';

const PredictionForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    Age: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    const numericFields = ['Age', 'Blood_Pressure', 'Blood_Glucose_Random', 'Blood_Urea', 'Serum_Creatinine', 'Sodium', 'Potassium', 'Hemoglobin', 'Packed_Cell_Volume', 'White_Blood_Cell_Count', 'Red_Blood_Cell_Count']
    
    const payload = {}
    for (const key in formData) {
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
      "yes": "Ya", "no": "Tidak",
      "good": "Baik", "poor": "Buruk",
      "normal": "Normal", "abnormal": "Abnormal",
      "present": "Ada", "notpresent": "Tidak Ada",
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

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10 mt-6 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-3">
          {t('form_title')}
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Sistem inferensi berbasis Random Forest untuk deteksi dini Chronic Kidney Disease. Atur parameter klinis pasien pada form di bawah ini.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form Section */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl p-6 md:p-8 clinical-shadow border border-gray-100">
            
            <div className="flex space-x-6 border-b border-gray-200 mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <button type="button" onClick={() => setActiveTab("basic")} className={`pb-4 font-semibold text-sm whitespace-nowrap transition-colors relative ${activeTab === "basic" ? "text-primary" : "text-gray-400 hover:text-gray-700"}`}>
                Data Dasar
                {activeTab === "basic" && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-primary"></div>}
              </button>
              <button type="button" onClick={() => setActiveTab("blood")} className={`pb-4 font-semibold text-sm whitespace-nowrap transition-colors relative ${activeTab === "blood" ? "text-primary" : "text-gray-400 hover:text-gray-700"}`}>
                Panel Darah
                {activeTab === "blood" && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-primary"></div>}
              </button>
              <button type="button" onClick={() => setActiveTab("urine")} className={`pb-4 font-semibold text-sm whitespace-nowrap transition-colors relative ${activeTab === "urine" ? "text-primary" : "text-gray-400 hover:text-gray-700"}`}>
                Urinalisis
                {activeTab === "urine" && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-primary"></div>}
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 ${activeTab === "basic" ? "block" : "hidden"}`}>
                {renderRangeInput("Age", "Umur", "1", "120", "1", "Thn")}
                {renderRangeInput("Blood_Pressure", "Tekanan Darah", "40", "300", "1", "mmHg")}
                {renderToggleInput("Hypertension", "Hipertensi", ["no", "yes"])}
                {renderToggleInput("Diabetes_Mellitus", "Diabetes Melitus", ["no", "yes"])}
                {renderToggleInput("Coronary_Artery_Disease", "Riwayat Jantung Koroner", ["no", "yes"])}
                {renderToggleInput("Appetite", "Nafsu Makan", ["good", "poor"])}
                {renderToggleInput("Pedal_Edema", "Edema (Bengkak Kaki)", ["no", "yes"])}
                {renderToggleInput("Anemia", "Anemia", ["no", "yes"])}
              </div>

              <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 ${activeTab === "blood" ? "block" : "hidden"}`}>
                {renderRangeInput("Hemoglobin", "Hemoglobin", "3.0", "20.0", "0.1", "g/dL")}
                {renderRangeInput("Packed_Cell_Volume", "Hematokrit (PCV)", "10", "60", "1", "%")}
                {renderRangeInput("White_Blood_Cell_Count", "Leukosit", "2000", "30000", "100", "sel/µL")}
                {renderRangeInput("Red_Blood_Cell_Count", "Eritrosit", "2.0", "8.0", "0.1", "juta/µL")}
                {renderRangeInput("Blood_Glucose_Random", "Gula Darah Acak", "50", "500", "1", "mg/dL")}
                {renderRangeInput("Blood_Urea", "Ureum Darah (BUN)", "5", "300", "1", "mg/dL")}
                {renderRangeInput("Serum_Creatinine", "Kreatinin Serum", "0.1", "30.0", "0.1", "mg/dL")}
                {renderRangeInput("Sodium", "Natrium", "110", "160", "1", "mEq/L")}
                {renderRangeInput("Potassium", "Kalium", "2.0", "8.0", "0.1", "mEq/L")}
              </div>

              <div className={`grid grid-cols-1 gap-5 ${activeTab === "urine" ? "block" : "hidden"}`}>
                {renderToggleInput("Specific_Gravity", "Berat Jenis (SG)", ["1.005", "1.010", "1.015", "1.020", "1.025"])}
                {renderToggleInput("Albumin", "Albumin (AL)", ["0.0", "1.0", "2.0", "3.0", "4.0", "5.0"])}
                {renderToggleInput("Sugar", "Gula Urine (SU)", ["0.0", "1.0", "2.0", "3.0", "4.0", "5.0"])}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {renderToggleInput("Red_Blood_Cells", "Sel Darah Merah", ["normal", "abnormal"])}
                  {renderToggleInput("Pus_Cell", "Sel Nanah (Pus Cell)", ["normal", "abnormal"])}
                  {renderToggleInput("Pus_Cell_clumps", "Gumpalan Sel Nanah", ["notpresent", "present"])}
                  {renderToggleInput("Bacteria", "Bakteri", ["notpresent", "present"])}
                </div>
              </div>

              <div className="mt-10 pt-6 flex justify-end">
                {Object.values(formData).every(val => val !== "") ? (
                  <button type="submit" disabled={loading} className="w-full md:w-auto bg-primary text-white font-semibold py-3 px-8 rounded-md transition-colors hover:bg-slate-800 disabled:opacity-50 flex justify-center items-center">
                    {loading ? t('btn_analyzing') : t('btn_predict')}
                  </button>
                ) : (
                  <div className="w-full bg-stone-50 border border-gray-200 rounded-md p-4 text-center">
                    <p className="text-sm text-gray-500 font-medium flex items-center justify-center">
                      <span className="text-yellow-500 mr-2">⚠️</span> {t('alert_incomplete')}
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Result Section */}
        <div className="lg:w-1/3">
          {error && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
              <p className="text-sm text-red-700 font-bold">Koneksi Gagal</p>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          )}

          {!result && !error && (
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center text-center h-[300px] border border-gray-100 clinical-shadow">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
              </div>
              <h3 className="text-gray-800 font-serif font-bold mb-1">{t('form_waiting')}</h3>
              <p className="text-sm text-gray-500">{t('form_waiting_desc')}</p>
            </div>
          )}

          <ResultCard result={result} formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default PredictionForm;
