import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ResultCard = ({ result, formData, setActivePage }) => {
  const { t } = useTranslation();
  const reportRef = useRef();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!result) return null;

  const isCKD = result.is_ckd;
  const probabilityPercent = result.probability * 100;
  const rawRiskCategory = probabilityPercent > 60 ? 'Tinggi' : (probabilityPercent >= 30 ? 'Sedang' : 'Rendah');
  const confidenceStr = (probabilityPercent > 80 || probabilityPercent < 15) ? t('risk_category_high') : (probabilityPercent > 60 || probabilityPercent < 25 ? t('risk_category_med') : t('risk_category_low'));
  
  let riskCategory = rawRiskCategory === 'Tinggi' ? t('risk_category_high') : (rawRiskCategory === 'Sedang' ? t('risk_category_med') : t('risk_category_low'));

  const colorClass = rawRiskCategory === 'Tinggi' ? 'text-red-500' : (rawRiskCategory === 'Sedang' ? 'text-orange-500' : 'text-green-500');
  const bgClass = rawRiskCategory === 'Tinggi' ? 'bg-red-50' : (rawRiskCategory === 'Sedang' ? 'bg-orange-50' : 'bg-green-50');
  const strokeColor = rawRiskCategory === 'Tinggi' ? '#dc2626' : (rawRiskCategory === 'Sedang' ? '#f97316' : '#0d9488'); 

  const handleDownloadPdf = () => {
    window.print();
  };

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (result.probability * circumference);

  // eGFR Category
  let egfrCategory = t('egfr_cat_normal');
  let egfrColor = "text-green-600";
  if (result.egfr) {
    if (result.egfr >= 90) { egfrCategory = t('egfr_cat_normal'); egfrColor = "text-green-600"; }
    else if (result.egfr >= 60) { egfrCategory = t('egfr_cat_mild'); egfrColor = "text-yellow-600"; }
    else if (result.egfr >= 45) { egfrCategory = t('egfr_cat_mild_mod'); egfrColor = "text-orange-500"; }
    else if (result.egfr >= 30) { egfrCategory = t('egfr_cat_mod_sev'); egfrColor = "text-orange-600"; }
    else if (result.egfr >= 15) { egfrCategory = t('egfr_cat_sev'); egfrColor = "text-red-500"; }
    else { egfrCategory = t('egfr_cat_fail'); egfrColor = "text-red-700"; }
  }

  const criticalFactors = [];
  if (formData) {
    if (parseFloat(formData.Systolic) >= 140 || parseFloat(formData.Blood_Pressure) >= 90) criticalFactors.push({ name: t('crit_bp'), val: formData.Systolic ? `${formData.Systolic}/${formData.Blood_Pressure} mmHg` : `${formData.Blood_Pressure} mmHg` });
    if (parseFloat(formData.Serum_Creatinine) > 1.2) criticalFactors.push({ name: t('crit_cr'), val: `${formData.Serum_Creatinine} mg/dL` });
    if (parseFloat(formData.Blood_Glucose_Random) > 200) criticalFactors.push({ name: t('crit_bg'), val: `${formData.Blood_Glucose_Random} mg/dL` });
    if (parseFloat(formData.Hemoglobin) < 12) criticalFactors.push({ name: t('crit_ane'), val: `${formData.Hemoglobin} g/dL` });
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
    const topFactor = [...shap_values].sort((a, b) => Math.abs(b.value) - Math.abs(a.value))[0];
    const val = topFactor.value;
    const featName = shapFeatureMapping[topFactor.feature] || topFactor.feature.replace(/_/g, ' ');
    
    if (val > 0) {
      return (
        <span dangerouslySetInnerHTML={{ __html: t('shap_narrative_high', { featName }).replace('<1>', '<strong>').replace('</1>', '</strong>').replace('<3>', '<strong>').replace('</3>', '</strong>') }} />
      );
    } else {
      return (
        <span dangerouslySetInnerHTML={{ __html: t('shap_narrative_low', { featName }).replace('<1>', '<strong>').replace('</1>', '</strong>').replace('<3>', '<strong>').replace('</3>', '</strong>') }} />
      );
    }
  };

  const CustomShapTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const val = data.value;
      const feat = data.feature;
      const impact = val > 0 ? t('shap_tooltip_inc') : t('shap_tooltip_dec');
      const insight = t('shap_tooltip_insight', { feat: shapFeatureMapping[feat] || feat.replace(/_/g, ' '), impact });
      
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
    <div className={`flex flex-col gap-4 relative transition-all duration-700 ease-in-out ${isExpanded ? '' : 'max-h-[780px] overflow-hidden'} rounded-2xl`}>
      <div id="printable-report" className={`mt-0 bg-white border border-gray-200 clinical-shadow rounded-xl p-6 md:p-8 ${rawRiskCategory === 'Tinggi' ? 'border-t-4 border-t-red-600' : (rawRiskCategory === 'Sedang' ? 'border-t-4 border-t-orange-500' : 'border-t-4 border-t-teal-600')}`}>
        
        <div className="border-b border-gray-100 pb-4 mb-6 flex justify-between items-center">
          <h2 className="font-serif font-bold text-lg text-primary tracking-wide uppercase">{t('report_title')}</h2>
          <span className="text-xs text-gray-400 font-mono">ID: #{Math.floor(Math.random() * 90000) + 10000}</span>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start w-full gap-5 mb-8 border-b border-gray-50 pb-8">
          <div className="relative w-28 h-28 flex-shrink-0 mt-1">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r={radius} fill="transparent" stroke="#f5f5f4" strokeWidth="10" />
              <circle cx="70" cy="70" r={radius} fill="transparent" stroke={strokeColor} strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center mt-0.5">
              <span className={`text-2xl font-serif font-bold ${strokeColor === '#dc2626' ? 'text-red-600' : (strokeColor === '#f97316' ? 'text-orange-500' : 'text-teal-600')}`}>
                {probabilityPercent.toFixed(1)}%
              </span>
              <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Prob</span>
            </div>
          </div>
          
          <div className="flex-1 w-full text-center md:text-left">
            <h2 className={`text-2xl font-serif font-bold mb-1.5 ${strokeColor === '#dc2626' ? 'text-red-700' : (strokeColor === '#f97316' ? 'text-orange-600' : 'text-teal-700')}`}>
              {t('risk_ckd_prefix')} {riskCategory}
            </h2>
            <p className="text-gray-600 text-[13px] font-medium mb-3">
              {t('current_pred')} <span className="font-bold">{isCKD ? t('ind_ckd_strong') : t('ind_ckd_no')}</span>
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4 print-hide">
               <span className="px-2 py-1 bg-stone-100 text-stone-600 text-[11px] rounded font-medium border border-stone-200">
                 Conf: <strong className="text-stone-800">{confidenceStr}</strong>
               </span>
               <span className="px-2 py-1 bg-stone-100 text-stone-600 text-[11px] rounded font-medium border border-stone-200">
                 Thresh: <strong>{result.threshold_used}</strong>
               </span>
            </div>

            <div className="bg-blue-50/60 border border-blue-100 p-3.5 rounded-lg text-left w-full">
              <h3 className="text-[11px] font-bold text-blue-800 mb-1 uppercase tracking-wider">{t('clin_summary')}</h3>
              <p className="text-[13px] text-blue-900/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('summary_text', { age: formData?.Age || '-', egfrCat: '<strong>' + egfrCategory.toLowerCase() + '</strong>', egfr: result.egfr ? result.egfr.toFixed(1) : '-', riskLevel: '<strong>' + riskCategory.toLowerCase() + '</strong>' }) }} />
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* eGFR Card */}
          <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl flex flex-col justify-center">
            <h3 className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">{t('egfr_label')}</h3>
            <div className="flex flex-col mb-2">
              <span className="text-3xl font-serif font-black text-gray-800 leading-none">{result.egfr ? result.egfr.toFixed(1) : 'N/A'}</span>
              <span className="text-[10px] font-medium text-gray-400 mt-1">mL/min/1.73m²</span>
            </div>
            <p className={`text-xs font-bold leading-tight ${egfrColor}`}>{egfrCategory}</p>
          </div>

          {/* BUN/Cr Ratio Card */}
          <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl flex flex-col justify-center">
            <h3 className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">{t('bun_cr_label')}</h3>
            <div className="flex flex-col mb-2">
              <span className="text-3xl font-serif font-black text-gray-800 leading-none">{result.bun_cr_ratio ? result.bun_cr_ratio.toFixed(1) : 'N/A'}</span>
              <span className="text-[10px] font-medium text-gray-400 mt-1">Ratio</span>
            </div>
            <p className="text-[11px] font-medium text-gray-500 leading-tight">
              {result.bun_cr_ratio && result.bun_cr_ratio > 20 ? t('ratio_dehyd') : t('ratio_normal')}
            </p>
          </div>
        </div>

        <div className="w-full space-y-5">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-xs font-bold text-gray-800 mb-4 uppercase tracking-wider flex items-center">
              <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
              {t('recommendations_title')}
            </h3>
            <ul className="space-y-3.5 text-[13px] text-gray-600 leading-relaxed">
              {isCKD ? (
                <>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-red-500 mr-2.5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    <span>{t('rec_ckd_1', 'Rujuk ke Dokter Spesialis Penyakit Dalam Konsultan Ginjal Hipertensi (Sp.PD-KGH) segera.')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-red-500 mr-2.5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    <span>{t('rec_ckd_2', 'Lakukan tes lab lengkap (Ureum, Kreatinin, Urinalisis).')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-red-500 mr-2.5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    <span>{t('rec_ckd_3', 'Pantau ketat tekanan darah harian pasien.')}</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-teal-500 mr-2.5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>{t('rec_nockd_1', 'Pertahankan diet seimbang dan gaya hidup aktif.')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-teal-500 mr-2.5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>{t('rec_nockd_2', 'Minum air putih yang cukup setiap hari.')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-teal-500 mr-2.5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>{t('rec_nockd_3', 'Lakukan general check-up tahunan secara rutin.')}</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {criticalFactors.length > 0 && (
            <div className="bg-red-50/40 border border-red-100 p-4 rounded-xl break-inside-avoid">
              <h3 className="text-[10px] font-bold text-red-700 mb-3 uppercase tracking-wider flex items-center">
                <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                {t('critical_params_title')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {criticalFactors.slice(0, 4).map((factor, idx) => (
                  <div key={idx} className="bg-white p-2.5 rounded-lg border border-red-100/50 shadow-[0_1px_2px_rgba(0,0,0,0.03)] text-center flex flex-col justify-center">
                    <p className="text-[9px] text-gray-500 font-bold uppercase mb-0.5 truncate px-1">{factor.name}</p>
                    <p className="text-sm font-black text-red-600">{factor.val}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {result.shap_values && result.shap_values.length > 0 && (
            <div className="bg-white border border-gray-100 shadow-sm p-4 rounded-xl mt-5 break-inside-avoid overflow-hidden">
              <div className="flex items-center mb-4 border-b border-gray-50 pb-3">
                <svg className="w-4 h-4 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                <h3 className="text-[11px] font-bold text-gray-800 uppercase tracking-wider">{t('shap_insights_title')}</h3>
              </div>
              
              <div className="bg-slate-50/70 rounded-lg p-2 mb-4 border border-slate-100">
                <div className="h-[220px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={result.shap_values.map(item => ({...item, featureName: shapFeatureMapping[item.feature] || item.feature.replace(/_/g, ' ')}))} 
                      layout="vertical" 
                      margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                    >
                      <XAxis type="number" hide />
                      <YAxis dataKey="featureName" type="category" width={110} tick={{ fontSize: 9, fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomShapTooltip />} cursor={{fill: '#f1f5f9'}} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={16}>
                        {result.shap_values.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.value > 0 ? '#ef4444' : '#10b981'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-[9px] text-slate-400 mt-1 text-center print-hide italic">{t('hover_chart_hint')}</p>
              </div>
              
              <div className="bg-indigo-50/60 p-3.5 rounded-lg border border-indigo-100/50">
                <div className="flex items-start">
                  <svg className="w-4 h-4 text-indigo-500 mr-2.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <div className="text-[11.5px] text-indigo-900/80 leading-relaxed font-medium">
                    {getShapNarrative(result.shap_values)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 text-center text-[10px] text-gray-400 max-w-sm mx-auto leading-relaxed">
        {t('disclaimer_text_1')} <br className="hidden md:block"/>
        <span dangerouslySetInnerHTML={{ __html: t('disclaimer_text_2').replace('tidak menggantikan diagnosis medis dari dokter', '<strong>tidak menggantikan diagnosis medis dari dokter</strong>').replace('do not replace medical diagnosis from a doctor', '<strong>do not replace medical diagnosis from a doctor</strong>') }} />
      </div>

      <button 
        onClick={handleDownloadPdf}
        className="print-hide w-full font-bold py-3 px-4 rounded-md transition-colors border flex items-center justify-center space-x-2 bg-stone-100 hover:bg-stone-200 text-gray-700 border-stone-200 mt-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
        <span>Download Clinical Report (PDF)</span>
      </button>

      {!isExpanded && (
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#fafaf9] via-[#fafaf9]/90 to-transparent flex items-end justify-center pb-6 z-10">
          <button 
            onClick={() => setIsExpanded(true)}
            className="bg-primary text-white px-7 py-2.5 rounded-full font-bold shadow-[0_4px_14px_0_rgba(13,148,136,0.39)] hover:bg-teal-700 hover:shadow-[0_6px_20px_rgba(13,148,136,0.23)] hover:-translate-y-1 transition-all duration-300 flex items-center text-sm tracking-wide"
          >
            <span>{t('btn_see_full')}</span>
            <svg className="w-4 h-4 ml-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
