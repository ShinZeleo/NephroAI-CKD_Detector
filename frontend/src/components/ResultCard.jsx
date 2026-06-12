import React from 'react';

const ResultCard = ({ result, formData }) => {
  if (!result) return null;

  const isCKD = result.is_ckd;
  const confidence = (result.probability * 100).toFixed(1);
  const colorClass = isCKD ? 'text-red-500' : 'text-green-500';
  const bgClass = isCKD ? 'bg-red-50' : 'bg-green-50';
  const strokeColor = isCKD ? '#dc2626' : '#0d9488'; // Red-600 vs Teal-600

  // SVG Gauge Calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (result.probability * circumference);

  // Determine Critical Factors
  const criticalFactors = [];
  if (isCKD && formData) {
    if (parseFloat(formData.Blood_Pressure) > 90) criticalFactors.push({ name: 'Tekanan Darah Tinggi', val: `${formData.Blood_Pressure} mmHg` });
    if (parseFloat(formData.Serum_Creatinine) > 1.2) criticalFactors.push({ name: 'Kreatinin Abnormal', val: `${formData.Serum_Creatinine} mg/dL` });
    if (parseFloat(formData.Blood_Glucose_Random) > 200) criticalFactors.push({ name: 'Gula Darah Tinggi', val: `${formData.Blood_Glucose_Random} mg/dL` });
    if (parseFloat(formData.Hemoglobin) < 12) criticalFactors.push({ name: 'Indikasi Anemia', val: `${formData.Hemoglobin} g/dL` });
    if (formData.Hypertension === 'yes') criticalFactors.push({ name: 'Riwayat Hipertensi', val: 'Ya' });
    if (formData.Diabetes_Mellitus === 'yes') criticalFactors.push({ name: 'Riwayat Diabetes', val: 'Ya' });
  }

  return (
    <div className={`mt-0 bg-white border border-gray-200 clinical-shadow p-6 md:p-8 ${isCKD ? 'border-t-4 border-t-red-600' : 'border-t-4 border-t-teal-600'}`}>
      
      <div className="border-b border-gray-100 pb-4 mb-6 flex justify-between items-center">
        <h2 className="font-serif font-bold text-lg text-primary tracking-wide uppercase">Clinical Report</h2>
        <span className="text-xs text-gray-400 font-mono">ID: #{Math.floor(Math.random() * 90000) + 10000}</span>
      </div>

      <div className="flex flex-col items-center text-center w-full mb-8">
        <div className="relative w-40 h-40 mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r={radius} fill="transparent" stroke="#f5f5f4" strokeWidth="8" />
            <circle cx="70" cy="70" r={radius} fill="transparent" stroke={strokeColor} strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="square" className="transition-all duration-1000 ease-out" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-serif font-bold ${isCKD ? 'text-red-600' : 'text-teal-600'}`}>{confidence}%</span>
            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mt-1">Probability</span>
          </div>
        </div>
        
        <h2 className={`text-2xl font-serif font-bold mb-2 ${isCKD ? 'text-red-700' : 'text-teal-700'}`}>
          {isCKD ? 'CKD Detected' : 'No CKD Detected'}
        </h2>
        <p className="text-gray-500 text-xs max-w-[200px] leading-relaxed">
          Random Forest Analysis • Threshold: {result.threshold_used}
        </p>
      </div>

      <div className="w-full space-y-6">
        <div className="bg-stone-50 p-5 rounded-md border border-stone-100">
          <h3 className="text-sm font-bold text-primary mb-3 uppercase tracking-wider">Recommendations</h3>
          <ul className="space-y-3 text-sm text-gray-600 leading-relaxed">
            {isCKD ? (
              <>
                <li className="flex items-start"><span className="text-red-600 mr-2 font-bold">›</span> Rujuk ke dokter spesialis Nefrologi segera.</li>
                <li className="flex items-start"><span className="text-red-600 mr-2 font-bold">›</span> Lakukan tes lab lengkap (Ureum, Kreatinin, Urinalisis).</li>
                <li className="flex items-start"><span className="text-red-600 mr-2 font-bold">›</span> Pantau ketat tekanan darah harian pasien.</li>
              </>
            ) : (
              <>
                <li className="flex items-start"><span className="text-teal-600 mr-2 font-bold">›</span> Pertahankan diet seimbang dan gaya hidup aktif.</li>
                <li className="flex items-start"><span className="text-teal-600 mr-2 font-bold">›</span> Minum air putih yang cukup setiap hari.</li>
                <li className="flex items-start"><span className="text-teal-600 mr-2 font-bold">›</span> Lakukan general check-up tahunan secara rutin.</li>
              </>
            )}
          </ul>
        </div>

        {isCKD && criticalFactors.length > 0 && (
          <div className="border border-red-100 p-5 rounded-md">
            <h3 className="text-xs font-bold text-red-700 mb-3 uppercase tracking-wider">Critical Parameters</h3>
            <div className="grid grid-cols-2 gap-3">
              {criticalFactors.slice(0, 4).map((factor, idx) => (
                <div key={idx} className="bg-red-50/50 p-2 rounded border border-red-50">
                  <p className="text-[10px] text-gray-500 font-medium uppercase">{factor.name}</p>
                  <p className="text-sm font-bold text-red-700">{factor.val}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default ResultCard;
