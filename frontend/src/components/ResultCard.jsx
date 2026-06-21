import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ResultCard = ({ result, formData, setActivePage }) => {
  const { t } = useTranslation();
  const reportRef = useRef();

  if (!result) return null;

  const isCKD = result.is_ckd;
  const probabilityPercent = result.probability * 100;
  const confidenceStr = (probabilityPercent > 80 || probabilityPercent < 15) ? "Tinggi" : (probabilityPercent > 60 || probabilityPercent < 25 ? "Sedang" : "Rendah");
  
  let riskCategory = "Rendah";
  if (probabilityPercent > 60) riskCategory = "Tinggi";
  else if (probabilityPercent >= 30) riskCategory = "Sedang";

  const colorClass = riskCategory === 'Tinggi' ? 'text-red-500' : (riskCategory === 'Sedang' ? 'text-orange-500' : 'text-green-500');
  const bgClass = riskCategory === 'Tinggi' ? 'bg-red-50' : (riskCategory === 'Sedang' ? 'bg-orange-50' : 'bg-green-50');
  const strokeColor = riskCategory === 'Tinggi' ? '#dc2626' : (riskCategory === 'Sedang' ? '#f97316' : '#0d9488'); 

  const handleDownloadPdf = () => {
    window.print();
  };

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (result.probability * circumference);

  // eGFR Category
  let egfrCategory = "Normal Kidney Function";
  let egfrColor = "text-green-600";
  if (result.egfr) {
    if (result.egfr >= 90) { egfrCategory = "Fungsi Ginjal Normal"; egfrColor = "text-green-600"; }
    else if (result.egfr >= 60) { egfrCategory = "Penurunan Ringan"; egfrColor = "text-yellow-600"; }
    else if (result.egfr >= 45) { egfrCategory = "Penurunan Ringan-Sedang"; egfrColor = "text-orange-500"; }
    else if (result.egfr >= 30) { egfrCategory = "Penurunan Sedang-Berat"; egfrColor = "text-orange-600"; }
    else if (result.egfr >= 15) { egfrCategory = "Penurunan Berat"; egfrColor = "text-red-500"; }
    else { egfrCategory = "Gagal Ginjal"; egfrColor = "text-red-700"; }
  }

  const criticalFactors = [];
  if (formData) {
    if (parseFloat(formData.Systolic) >= 140 || parseFloat(formData.Blood_Pressure) >= 90) criticalFactors.push({ name: 'Tekanan Darah Tinggi', val: formData.Systolic ? `${formData.Systolic}/${formData.Blood_Pressure} mmHg` : `${formData.Blood_Pressure} mmHg` });
    if (parseFloat(formData.Serum_Creatinine) > 1.2) criticalFactors.push({ name: 'Kreatinin Abnormal', val: `${formData.Serum_Creatinine} mg/dL` });
    if (parseFloat(formData.Blood_Glucose_Random) > 200) criticalFactors.push({ name: 'Gula Darah Tinggi', val: `${formData.Blood_Glucose_Random} mg/dL` });
    if (parseFloat(formData.Hemoglobin) < 12) criticalFactors.push({ name: 'Indikasi Anemia', val: `${formData.Hemoglobin} g/dL` });
  }

  const shapFeatureMapping = {
    "Packed_Cell_Volume": "Packed Cell Volume (Hematokrit)",
    "Red_Blood_Cell_Count": "Red Blood Cell Count (Sel Darah Merah)",
    "White_Blood_Cell_Count": "White Blood Cell Count (Sel Darah Putih)",
    "Serum_Creatinine": "Serum Creatinine (Kreatinin)",
    "Blood_Urea": "Blood Urea (Ureum)",
    "Blood_Glucose_Random": "Blood Glucose Random (Gula Darah Acak)",
    "Blood_Pressure": "Blood Pressure (Tekanan Darah)",
    "Specific_Gravity": "Specific Gravity (Berat Jenis Urine)",
    "Albumin": "Albumin (Protein Urine)",
    "Sugar": "Sugar (Gula Urine)",
    "Pus_Cell": "Pus Cell (Sel Nanah)",
    "Red_Blood_Cells": "Red Blood Cells (Sel Darah Merah Urine)",
    "Pus_Cell_clumps": "Pus Cell Clumps (Gumpalan Sel Nanah)",
    "Bacteria": "Bacteria (Bakteri Urine)",
    "Hypertension": "Hypertension (Hipertensi)",
    "Diabetes_Mellitus": "Diabetes Mellitus (Kencing Manis)",
    "Coronary_Artery_Disease": "Coronary Artery Disease (Penyakit Jantung)",
    "Appetite": "Appetite (Nafsu Makan)",
    "Pedal_Edema": "Pedal Edema (Bengkak Kaki)",
    "Anemia": "Anemia (Kurang Darah)",
    "Age": "Age (Usia)",
    "Sodium": "Sodium (Natrium)",
    "Potassium": "Potassium (Kalium)",
    "Hemoglobin": "Hemoglobin (Hb)"
  };

  const getShapNarrative = (shap_values) => {
    if (!shap_values || shap_values.length === 0) return null;
    const sorted = [...shap_values].sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
    const topFactors = sorted.slice(0, 4);

    return (
      <div className="mt-6 mb-2">
        <h4 className="text-sm font-bold text-gray-800 mb-2">Mengapa Risiko Anda {riskCategory}?</h4>
        <ul className="space-y-3 mt-3 text-sm text-gray-700">
          {topFactors.map((factor, idx) => {
            const aliasName = shapFeatureMapping[factor.feature] || factor.feature.replace(/_/g, ' ');
            if (factor.value > 0) {
               return (
                 <li key={idx} className="flex items-start">
                   <span className="text-red-500 mr-2 mt-0.5">↑</span> 
                   <span><strong>{aliasName}</strong> berkontribusi meningkatkan risiko Anda.</span>
                 </li>
               );
            } else {
               return (
                 <li key={idx} className="flex items-start">
                   <span className="text-green-500 mr-2 mt-0.5">↓</span> 
                   <span><strong>{aliasName}</strong> berkontribusi menurunkan (menjaga) risiko Anda.</span>
                 </li>
               );
            }
          })}
        </ul>
        {setActivePage && (
          <button 
            onClick={() => setActivePage('education')}
            className="mt-5 btn-print-hide text-xs font-bold bg-blue-50 text-blue-700 py-2 px-4 rounded hover:bg-blue-100 transition-colors inline-flex items-center"
          >
            Pelajari Lebih Lanjut di Education Center <span className="ml-1">→</span>
          </button>
        )}
      </div>
    );
  };

  const CustomShapTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const val = data.value;
      const feat = data.feature;
      const impact = val > 0 ? "meningkatkan" : "menurunkan";
      const insight = `Nilai ${feat} pasien saat ini berkontribusi ${impact} risiko CKD.`;
      
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md max-w-xs z-50">
          <p className="font-bold text-gray-800 text-xs mb-1">{shapFeatureMapping[feat] || feat.replace(/_/g, ' ')}</p>
          <p className="text-[10px] text-gray-600 leading-relaxed">{insight}</p>
          <p className={`text-[10px] font-mono mt-2 font-bold ${val > 0 ? 'text-red-600' : 'text-green-600'}`}>
            SHAP Value: {val.toFixed(3)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-4">
      <div id="printable-report" className={`mt-0 bg-white border border-gray-200 clinical-shadow p-6 md:p-8 ${riskCategory === 'Tinggi' ? 'border-t-4 border-t-red-600' : (riskCategory === 'Sedang' ? 'border-t-4 border-t-orange-500' : 'border-t-4 border-t-teal-600')}`}>
        
        <div className="border-b border-gray-100 pb-4 mb-6 flex justify-between items-center">
          <h2 className="font-serif font-bold text-lg text-primary tracking-wide uppercase">Clinical Report</h2>
          <span className="text-xs text-gray-400 font-mono">ID: #{Math.floor(Math.random() * 90000) + 10000}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start w-full gap-6 sm:gap-8 mb-8 border-b border-gray-50 pb-8">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r={radius} fill="transparent" stroke="#f5f5f4" strokeWidth="8" />
              <circle cx="70" cy="70" r={radius} fill="transparent" stroke={strokeColor} strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="square" className="transition-all duration-1000 ease-out" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-serif font-bold ${strokeColor === '#dc2626' ? 'text-red-600' : (strokeColor === '#f97316' ? 'text-orange-500' : 'text-teal-600')}`}>
                {probabilityPercent.toFixed(1)}%
              </span>
              <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-widest mt-1">Probability</span>
            </div>
          </div>
          
          <div className="flex-1 w-full text-center sm:text-left mt-2 sm:mt-0">
            <h2 className={`text-3xl font-serif font-bold mb-1 ${strokeColor === '#dc2626' ? 'text-red-700' : (strokeColor === '#f97316' ? 'text-orange-600' : 'text-teal-700')}`}>
              Risiko CKD {riskCategory}
            </h2>
            <p className="text-gray-600 text-sm font-medium mb-4">
              Prediksi Saat Ini: <span className="font-bold">{isCKD ? 'Terindikasi CKD' : 'Tidak Terindikasi CKD'}</span>
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-5 print-hide">
               <span className="px-2.5 py-1 bg-stone-100 text-stone-600 text-xs rounded-md font-medium border border-stone-200">
                 Confidence: <strong className="text-stone-800">{confidenceStr}</strong>
               </span>
               <span className="px-2.5 py-1 bg-stone-100 text-stone-600 text-xs rounded-md font-medium border border-stone-200">
                 Threshold: <strong>{result.threshold_used}</strong>
               </span>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-md">
              <h3 className="text-xs font-bold text-blue-800 mb-1.5 uppercase tracking-wider">Ringkasan Klinis</h3>
              <p className="text-xs text-blue-900 leading-relaxed">
                Pasien berusia {formData?.Age || '-'} tahun dengan kondisi <strong>{egfrCategory.toLowerCase()}</strong> {result.egfr ? `(eGFR: ${result.egfr.toFixed(1)})` : ''}. 
                Berdasarkan analisis parameter klinis secara keseluruhan, risiko terjadinya Chronic Kidney Disease (CKD) saat ini tergolong <strong>{riskCategory.toLowerCase()}</strong>.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* eGFR Card */}
          <div className="bg-stone-50 border border-stone-200 p-5 rounded-lg flex flex-col justify-center">
            <h3 className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">eGFR Estimation</h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-serif font-black text-gray-800">{result.egfr ? result.egfr.toFixed(1) : 'N/A'}</span>
              <span className="text-sm font-medium text-gray-500 mb-1">mL/min/1.73m²</span>
            </div>
            <p className={`text-sm font-bold ${egfrColor}`}>{egfrCategory}</p>
          </div>

          {/* BUN/Cr Ratio Card */}
          <div className="bg-stone-50 border border-stone-200 p-5 rounded-lg flex flex-col justify-center">
            <h3 className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">BUN/Creatinine Ratio</h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-serif font-black text-gray-800">{result.bun_cr_ratio ? result.bun_cr_ratio.toFixed(1) : 'N/A'}</span>
            </div>
            <p className="text-sm font-medium text-gray-500">
              {result.bun_cr_ratio && result.bun_cr_ratio > 20 ? 'Kemungkinan Dehidrasi / Pre-renal' : 'Rasio Normal'}
            </p>
          </div>
        </div>

        <div className="w-full space-y-6">
          <div className="bg-stone-50 p-5 rounded-md border border-stone-100">
            <h3 className="text-sm font-bold text-primary mb-3 uppercase tracking-wider">Recommendations</h3>
            <ul className="space-y-3 text-sm text-gray-600 leading-relaxed">
              {isCKD ? (
                <>
                  <li className="flex items-start"><span className="text-red-600 mr-2 font-bold">›</span> {t('rec_ckd_1', 'Rujuk ke Dokter Spesialis Penyakit Dalam Konsultan Ginjal Hipertensi (Sp.PD-KGH) segera.')}</li>
                  <li className="flex items-start"><span className="text-red-600 mr-2 font-bold">›</span> {t('rec_ckd_2', 'Lakukan tes lab lengkap (Ureum, Kreatinin, Urinalisis).')}</li>
                  <li className="flex items-start"><span className="text-red-600 mr-2 font-bold">›</span> {t('rec_ckd_3', 'Pantau ketat tekanan darah harian pasien.')}</li>
                </>
              ) : (
                <>
                  <li className="flex items-start"><span className="text-teal-600 mr-2 font-bold">›</span> {t('rec_nockd_1', 'Pertahankan diet seimbang dan gaya hidup aktif.')}</li>
                  <li className="flex items-start"><span className="text-teal-600 mr-2 font-bold">›</span> {t('rec_nockd_2', 'Minum air putih yang cukup setiap hari.')}</li>
                  <li className="flex items-start"><span className="text-teal-600 mr-2 font-bold">›</span> {t('rec_nockd_3', 'Lakukan general check-up tahunan secara rutin.')}</li>
                </>
              )}
            </ul>
          </div>

          {criticalFactors.length > 0 && (
            <div className="border border-red-100 p-5 rounded-md break-inside-avoid">
              <h3 className="text-xs font-bold text-red-700 mb-3 uppercase tracking-wider">Critical Parameters Input</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {criticalFactors.slice(0, 4).map((factor, idx) => (
                  <div key={idx} className="bg-red-50/50 p-3 rounded border border-red-100 text-center">
                    <p className="text-[10px] text-gray-500 font-medium uppercase mb-1">{factor.name}</p>
                    <p className="text-sm font-bold text-red-700">{factor.val}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {result.shap_values && result.shap_values.length > 0 && (
            <div className="border border-gray-100 p-5 rounded-md mt-6 break-inside-avoid">
              <h3 className="text-xs font-bold text-gray-700 mb-4 uppercase tracking-wider">{t('risk_factors')} (AI Insights)</h3>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={result.shap_values.map(item => ({...item, featureName: shapFeatureMapping[item.feature] || item.feature.replace(/_/g, ' ')}))} 
                    layout="vertical" 
                    margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis dataKey="featureName" type="category" width={180} tick={{ fontSize: 10, fill: '#4b5563', fontWeight: 500 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomShapTooltip />} cursor={{fill: '#f5f5f4'}} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {result.shap_values.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.value > 0 ? '#ef4444' : '#10b981'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 text-center print-hide">Arahkan kursor ke grafik untuk melihat insight detail pengaruh masing-masing faktor.</p>
              
              <div className="border-t border-gray-100 mt-5 pt-2">
                {getShapNarrative(result.shap_values)}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 text-center text-[10px] text-gray-400 max-w-sm mx-auto leading-relaxed">
        Model Explainable AI ini dirancang sebagai alat bantu skrining awal. <br className="hidden md:block"/>
        Hasil prediksi <strong>tidak menggantikan diagnosis medis dari dokter</strong> atau pemeriksaan klinis/laboratorium menyeluruh.
      </div>

      <button 
        onClick={handleDownloadPdf}
        className="print-hide w-full font-bold py-3 px-4 rounded-md transition-colors border flex items-center justify-center space-x-2 bg-stone-100 hover:bg-stone-200 text-gray-700 border-stone-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
        <span>Download Clinical Report (PDF)</span>
      </button>
    </div>
  );
};

export default ResultCard;
