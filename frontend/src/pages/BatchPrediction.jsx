import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, FileType, AlertCircle, CheckCircle, Activity, Users, Download, Search, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';

const BatchPrediction = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  // SHAP Modal State
  const [selectedRow, setSelectedRow] = useState(null);
  const [shapData, setShapData] = useState(null);
  const [loadingShap, setLoadingShap] = useState(false);

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
      setError(t('batch_error_process'));
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async (row) => {
    setSelectedRow(row);
    setLoadingShap(true);
    setShapData(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(row.original_data),
      });
      const data = await response.json();
      setShapData(data.shap_values);
    } catch (err) {
      console.error("Failed to fetch SHAP data", err);
    } finally {
      setLoadingShap(false);
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

            {/* CSV Info Card */}
            <div className="mt-8 bg-stone-50 border border-stone-200 rounded-lg p-5 flex-shrink-0">
              <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-primary" />
                {t('batch_info_title')}
              </h3>
              <p className="text-xs text-gray-500 mb-3">{t('batch_info_desc')}</p>
              
              <div className="space-y-4 text-xs mt-4">
                <div>
                  <p className="font-bold text-gray-700 mb-1.5">{t('batch_info_num')}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Age', 'Blood_Pressure', 'Blood_Glucose_Random', 'Blood_Urea', 'Serum_Creatinine', 'Sodium', 'Potassium', 'Hemoglobin', 'Packed_Cell_Volume', 'White_Blood_Cell_Count', 'Red_Blood_Cell_Count'].map(col => (
                      <span key={col} className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded-md font-mono">{col}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-700 mb-1.5">{t('batch_info_cat')}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Specific_Gravity', 'Albumin', 'Sugar'].map(col => (
                      <span key={col} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md font-mono">{col}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-700 mb-1.5">{t('batch_info_val_norm')}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Red_Blood_Cells', 'Pus_Cell'].map(col => (
                      <span key={col} className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-md font-mono">{col}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-700 mb-1.5">{t('batch_info_val_pres')}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Pus_Cell_clumps', 'Bacteria'].map(col => (
                      <span key={col} className="px-2 py-0.5 bg-orange-100 text-orange-800 rounded-md font-mono">{col}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-700 mb-1.5">{t('batch_info_bool')}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Hypertension', 'Diabetes_Mellitus', 'Coronary_Artery_Disease', 'Pedal_Edema', 'Anemia'].map(col => (
                      <span key={col} className="px-2 py-0.5 bg-green-100 text-green-800 rounded-md font-mono">{col}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-700 mb-1.5">{t('batch_info_val_good')}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Appetite'].map(col => (
                      <span key={col} className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded-md font-mono">{col}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          {results ? (
            <div className="bg-white p-8 border border-gray-200 clinical-shadow">
              <h2 className="text-lg font-bold text-gray-800 mb-6 uppercase tracking-wider">{t('batch_summary')}</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-stone-50 border border-stone-100 rounded-md text-center">
                  <Users className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-3xl font-serif font-black text-gray-800">{results.summary.total}</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{t('batch_total_patients')}</p>
                </div>
                <div className="p-4 bg-red-50 border border-red-100 rounded-md text-center">
                  <Activity className="w-6 h-6 text-red-400 mx-auto mb-2" />
                  <p className="text-3xl font-serif font-black text-red-600">{results.summary.high_risk}</p>
                  <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mt-1">Risiko Tinggi</p>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-100 rounded-md text-center">
                  <Activity className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                  <p className="text-3xl font-serif font-black text-orange-600">{results.summary.medium_risk}</p>
                  <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mt-1">Risiko Sedang</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-100 rounded-md text-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <p className="text-3xl font-serif font-black text-green-600">{results.summary.low_risk}</p>
                  <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mt-1">Risiko Rendah</p>
                </div>
              </div>

              <div className="bg-stone-50 border border-stone-100 rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2 h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Risiko Tinggi', value: results.summary.high_risk, color: '#dc2626' },
                          { name: 'Risiko Sedang', value: results.summary.medium_risk, color: '#f97316' },
                          { name: 'Risiko Rendah', value: results.summary.low_risk, color: '#0d9488' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {
                          [
                            { name: 'Risiko Tinggi', value: results.summary.high_risk, color: '#dc2626' },
                            { name: 'Risiko Sedang', value: results.summary.medium_risk, color: '#f97316' },
                            { name: 'Risiko Rendah', value: results.summary.low_risk, color: '#0d9488' }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))
                        }
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} Pasien`, 'Jumlah']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-sm font-bold text-gray-800 mb-4">Distribusi Risiko</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between text-sm">
                      <span className="flex items-center text-gray-600"><span className="w-3 h-3 rounded-full bg-red-600 mr-2"></span> Risiko Tinggi (&gt;60%)</span>
                      <span className="font-bold text-gray-800">{((results.summary.high_risk / results.summary.total) * 100).toFixed(1)}%</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                      <span className="flex items-center text-gray-600"><span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span> Risiko Sedang (30-60%)</span>
                      <span className="font-bold text-gray-800">{((results.summary.medium_risk / results.summary.total) * 100).toFixed(1)}%</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                      <span className="flex items-center text-gray-600"><span className="w-3 h-3 rounded-full bg-teal-600 mr-2"></span> Risiko Rendah (0-30%)</span>
                      <span className="font-bold text-gray-800">{((results.summary.low_risk / results.summary.total) * 100).toFixed(1)}%</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-50 border-y border-stone-200">
                    <tr>
                      <th className="px-4 py-3 font-bold text-xs text-gray-500 uppercase tracking-wider">{t('batch_col_id')}</th>
                      <th className="px-4 py-3 font-bold text-xs text-gray-500 uppercase tracking-wider">{t('batch_col_prob')}</th>
                      <th className="px-4 py-3 font-bold text-xs text-gray-500 uppercase tracking-wider">{t('batch_col_status')}</th>
                      <th className="px-4 py-3 font-bold text-xs text-gray-500 uppercase tracking-wider text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {results.data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-stone-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-gray-600">#{row.id}</td>
                        <td className="px-4 py-3 font-bold text-gray-800">{(row.probability * 100).toFixed(1)}%</td>
                        <td className="px-4 py-3">
                          {row.probability > 0.6 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800">Risiko Tinggi</span>
                          ) : row.probability >= 0.3 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-800">Risiko Sedang</span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800">Risiko Rendah</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button 
                            onClick={() => handleAnalyze(row)}
                            className="inline-flex items-center justify-center p-1.5 text-gray-400 hover:text-primary hover:bg-blue-50 rounded transition-colors"
                            title="Analisis SHAP"
                          >
                            <Search className="w-4 h-4" />
                          </button>
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

      {/* SHAP Modal */}
      {selectedRow && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl clinical-shadow overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-stone-50">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Analisis Pasien #{selectedRow.id}</h3>
                <p className="text-xs text-gray-500">{(selectedRow.probability * 100).toFixed(1)}% • {selectedRow.is_ckd ? t('batch_high_risk') : t('batch_low_risk')}</p>
              </div>
              <button onClick={() => setSelectedRow(null)} className="p-2 text-gray-400 hover:text-gray-800 bg-white rounded-full border border-gray-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {loadingShap ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Activity className="w-8 h-8 text-primary animate-spin mb-3" />
                  <p className="text-sm font-bold text-gray-500">Menganalisis Faktor Risiko...</p>
                </div>
              ) : shapData ? (
                <div>
                  <h4 className="text-xs font-bold text-gray-700 mb-4 uppercase tracking-wider">{t('risk_factors')} (AI Analysis)</h4>
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={shapData.map(item => ({...item, feature: item.feature.replace(/_/g, ' ')}))} 
                        layout="vertical" 
                        margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
                      >
                        <XAxis type="number" hide />
                        <YAxis dataKey="feature" type="category" width={140} tick={{ fontSize: 11, fill: '#4b5563', fontWeight: 500 }} axisLine={false} tickLine={false} />
                        <Tooltip formatter={(val) => val.toFixed(3)} labelStyle={{ color: '#1f2937', fontWeight: 'bold' }} />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                          {shapData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.value > 0 ? '#ef4444' : '#10b981'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-4 text-center">Merah: Meningkatkan Risiko CKD | Hijau: Menurunkan Risiko CKD</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchPrediction;
