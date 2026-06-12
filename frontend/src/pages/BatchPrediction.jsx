import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, FileType, AlertCircle, CheckCircle, Activity, Users, Download } from 'lucide-react';

const BatchPrediction = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === 'text/csv') {
      setFile(selected);
      setError(null);
    } else {
      setFile(null);
      setError(t('batch_error_format'));
    }
  };

  const downloadTemplate = () => {
    const headers = "Age,Blood_Pressure,Specific_Gravity,Albumin,Sugar,Red_Blood_Cells,Pus_Cell,Pus_Cell_clumps,Bacteria,Blood_Glucose_Random,Blood_Urea,Serum_Creatinine,Sodium,Potassium,Hemoglobin,Packed_Cell_Volume,White_Blood_Cell_Count,Red_Blood_Cell_Count,Hypertension,Diabetes_Mellitus,Coronary_Artery_Disease,Appetite,Pedal_Edema,Anemia\n";
    const sampleRow = "48,80,1.020,1,0,normal,normal,notpresent,notpresent,121,36,1.2,135,4.5,15.4,44,7800,5.2,yes,yes,no,good,no,no\n";
    const blob = new Blob([headers + sampleRow], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'nephroai_batch_template.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/predict_batch`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Terjadi kesalahan saat memproses file di server.');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-serif font-bold text-primary mb-3">
          {t('batch_title')}
        </h1>
        <p className="text-gray-500 text-sm max-w-2xl">
          {t('batch_desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 border border-gray-200 clinical-shadow h-full flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 mb-6 uppercase tracking-wider text-center">{t('batch_upload')}</h2>
            
            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-stone-50 hover:bg-stone-100 transition-colors relative cursor-pointer">
              <input 
                type="file" 
                accept=".csv" 
                onChange={handleFileChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <FileType className="w-12 h-12 text-primary mb-4" />
              <p className="text-sm font-bold text-gray-700 text-center mb-1">{t('batch_drag_drop')}</p>
              <p className="text-xs text-gray-400 text-center">{t('batch_format_note')}</p>
              
              <button 
                type="button" 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); downloadTemplate(); }}
                className="mt-3 inline-flex items-center text-xs font-bold text-primary hover:text-slate-800 transition-colors z-10 relative"
              >
                <Download className="w-3 h-3 mr-1" />
                {t('batch_download_template')}
              </button>

              {file && (
                <div className="mt-6 w-full p-3 bg-teal-50 border border-teal-200 rounded flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-800 truncate pr-2">{file.name}</span>
                  <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-600 flex items-start">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button 
              onClick={handleUpload}
              disabled={!file || loading}
              className="mt-6 w-full bg-primary hover:bg-slate-800 text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-50 flex justify-center items-center"
            >
              {loading ? (
                <><Activity className="w-4 h-4 mr-2 animate-spin" /> {t('batch_processing')}</>
              ) : t('batch_start_btn')}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          {results ? (
            <div className="bg-white p-8 border border-gray-200 clinical-shadow">
              <h2 className="text-lg font-bold text-gray-800 mb-6 uppercase tracking-wider">{t('batch_summary')}</h2>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-stone-50 border border-stone-100 rounded-md text-center">
                  <Users className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-3xl font-serif font-black text-gray-800">{results.summary.total}</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{t('batch_total_patients')}</p>
                </div>
                <div className="p-4 bg-red-50 border border-red-100 rounded-md text-center">
                  <Activity className="w-6 h-6 text-red-400 mx-auto mb-2" />
                  <p className="text-3xl font-serif font-black text-red-600">{results.summary.high_risk}</p>
                  <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mt-1">{t('batch_high_risk')}</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-100 rounded-md text-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <p className="text-3xl font-serif font-black text-green-600">{results.summary.low_risk}</p>
                  <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mt-1">{t('batch_low_risk')}</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-50 border-y border-stone-200">
                    <tr>
                      <th className="px-4 py-3 font-bold text-xs text-gray-500 uppercase tracking-wider">{t('batch_col_id')}</th>
                      <th className="px-4 py-3 font-bold text-xs text-gray-500 uppercase tracking-wider">{t('batch_col_prob')}</th>
                      <th className="px-4 py-3 font-bold text-xs text-gray-500 uppercase tracking-wider">{t('batch_col_status')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {results.data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-stone-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-gray-600">#{row.id}</td>
                        <td className="px-4 py-3 font-bold text-gray-800">{(row.probability * 100).toFixed(1)}%</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${row.is_ckd ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                            {row.is_ckd ? t('batch_high_risk') : t('batch_low_risk')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="h-full bg-stone-50 border border-gray-200 rounded-lg flex flex-col items-center justify-center p-12 text-center text-gray-400">
              <Activity className="w-16 h-16 mb-4 text-stone-300" />
              <h3 className="text-lg font-serif font-bold text-gray-500 mb-2">{t('batch_no_data')}</h3>
              <p className="text-sm">{t('batch_no_data_desc')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchPrediction;
