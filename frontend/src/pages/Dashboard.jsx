import React from 'react';

const Dashboard = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-serif font-bold text-primary mb-3">
          CKD Global Analytics
        </h1>
        <p className="text-gray-500 text-sm max-w-2xl">
          Tinjauan epidemiologi global mengenai tingkat prevalensi, mortalitas, dan distribusi etiologi Penyakit Ginjal Kronis berdasarkan sumber jurnal nefrologi.
        </p>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white border-l-4 border-primary p-6 shadow-sm">
          <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Prevalensi Global</h3>
          <p className="text-3xl font-serif font-black text-gray-900">~10%</p>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">Estimasi persentase populasi dunia terdiagnosis CKD stadium 1-5.</p>
        </div>
        
        <div className="bg-white border-l-4 border-red-600 p-6 shadow-sm">
          <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Angka Kematian</h3>
          <p className="text-3xl font-serif font-black text-red-600">Top 12</p>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">Penyebab mortalitas tertinggi menurut data WHO terkini.</p>
        </div>

        <div className="bg-white border-l-4 border-teal-600 p-6 shadow-sm">
          <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Pasien Dialisis</h3>
          <p className="text-3xl font-serif font-black text-teal-600">2.6 Jt+</p>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">Pasien ESRD bergantung pada terapi pengganti ginjal.</p>
        </div>

        <div className="bg-white border-l-4 border-orange-400 p-6 shadow-sm">
          <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Gejala Awal</h3>
          <p className="text-2xl font-serif font-black text-orange-500">Asimtomatik</p>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">Stadium awal berjalan tanpa manifestasi klinis yang jelas.</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 border border-gray-200">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">Etiologi Utama (Penyebab CKD)</h2>
            
            {/* Fake Bar Chart */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wide mb-2 text-gray-800">
                  <span>Nefropati Diabetik</span>
                  <span>30 - 50%</span>
                </div>
                <div className="w-full bg-stone-100 h-2">
                  <div className="bg-primary h-2 w-[45%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wide mb-2 text-gray-800">
                  <span>Nefrosklerosis Hipertensif</span>
                  <span>25 - 30%</span>
                </div>
                <div className="w-full bg-stone-100 h-2">
                  <div className="bg-primary h-2 w-[28%] opacity-80"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wide mb-2 text-gray-800">
                  <span>Glomerulonefritis Kronis</span>
                  <span>10 - 15%</span>
                </div>
                <div className="w-full bg-stone-100 h-2">
                  <div className="bg-primary h-2 w-[15%] opacity-60"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wide mb-2 text-gray-800">
                  <span>Etiologi Lain (Genetik, Toksik)</span>
                  <span>10 - 20%</span>
                </div>
                <div className="w-full bg-stone-100 h-2">
                  <div className="bg-primary h-2 w-[12%] opacity-40"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="bg-stone-50 p-8 border border-stone-200">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Stadium CKD Berdasarkan eGFR</h2>
            <ul className="space-y-0 text-sm">
              <li className="flex justify-between items-center py-3 border-b border-stone-200">
                <span className="font-semibold text-gray-700">Stadium 1 (G1)</span>
                <span className="text-xs font-mono bg-white border border-stone-300 px-2 py-1">&gt; 90</span>
              </li>
              <li className="flex justify-between items-center py-3 border-b border-stone-200">
                <span className="font-semibold text-gray-700">Stadium 2 (G2)</span>
                <span className="text-xs font-mono bg-white border border-stone-300 px-2 py-1">60 - 89</span>
              </li>
              <li className="flex justify-between items-center py-3 border-b border-stone-200">
                <span className="font-semibold text-gray-700">Stadium 3 (G3a/b)</span>
                <span className="text-xs font-mono bg-white border border-stone-300 px-2 py-1">30 - 59</span>
              </li>
              <li className="flex justify-between items-center py-3 border-b border-stone-200">
                <span className="font-semibold text-gray-700">Stadium 4 (G4)</span>
                <span className="text-xs font-mono bg-white border border-stone-300 px-2 py-1">15 - 29</span>
              </li>
              <li className="flex justify-between items-center py-3">
                <span className="font-bold text-red-700">Stadium 5 (ESRD)</span>
                <span className="text-xs font-mono font-bold bg-red-100 text-red-800 border border-red-200 px-2 py-1">&lt; 15</span>
              </li>
            </ul>
            <p className="text-[10px] text-gray-400 mt-6 leading-tight">
              *eGFR (Estimated Glomerular Filtration Rate) diukur dalam mL/min/1.73m². Klasifikasi berdasarkan pedoman KDIGO.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
