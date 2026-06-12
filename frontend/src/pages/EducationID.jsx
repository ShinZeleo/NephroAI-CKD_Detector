import React from 'react';

const EducationID = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      
      {/* Hero Section */}
      <div className="mb-16 border-b-2 border-gray-900 pb-10">
        <div className="uppercase tracking-widest text-primary font-bold text-xs mb-3">Tinjauan Klinis Menyeluruh</div>
        <h1 className="text-5xl md:text-6xl font-serif font-black text-gray-900 mb-6 tracking-tight leading-tight">
          Ensiklopedia Medis: <br/> Chronic Kidney Disease
        </h1>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-4xl font-medium">
          Panduan komprehensif berstandar klinis mengenai etiologi, patofisiologi, manifestasi klinis, interpretasi laboratorium, serta tata laksana Penyakit Ginjal Kronis berdasarkan literatur nefrologi modern (Pedoman KDIGO).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        {/* Left Column (Main Content - 3 columns wide) */}
        <div className="lg:col-span-3 space-y-16">
          
          {/* Chapter 1 */}
          <section>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
              1. Definisi & Epidemiologi
            </h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                <strong>Penyakit Ginjal Kronis (CKD)</strong> didefinisikan sebagai kelainan struktur atau fungsi ginjal yang menetap selama lebih dari 3 bulan, yang memiliki implikasi terhadap kesehatan pasien. Kondisi ini dicirikan oleh kerusakan jaringan ginjal yang ireversibel (tidak dapat disembuhkan) dan bersifat progresif, yang pada akhirnya mengarah pada <em>End-Stage Renal Disease</em> (ESRD).
              </p>
              <p>
                Secara epidemiologi, CKD merupakan masalah kesehatan masyarakat global yang masif. Prevalensi global diperkirakan mencapai 9-13%, menyumbang beban morbiditas dan mortalitas yang sangat tinggi, terutama akibat komplikasi kardiovaskular. Sering dijuluki sebagai <em>"The Silent Killer"</em>, CKD pada stadium awal umumnya asimtomatik, sehingga diagnosis sering kali terlambat saat sebagian besar nefron telah hancur.
              </p>
            </div>
          </section>

          {/* Chapter 2 */}
          <section>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
              2. Stadium Penyakit Ginjal Kronis (Klasifikasi KDIGO)
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Tingkat keparahan CKD diklasifikasikan berdasarkan Estimasi Laju Filtrasi Glomerulus (eGFR), yang mengukur seberapa efisien ginjal menyaring limbah dari darah per menit. Berdasarkan pedoman global KDIGO (<em>Kidney Disease: Improving Global Outcomes</em>), CKD terbagi dalam 5 stadium:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-stone-100 border-b-2 border-gray-300">
                    <th className="p-4 font-bold text-gray-900">Stadium</th>
                    <th className="p-4 font-bold text-gray-900">Deskripsi Klinis</th>
                    <th className="p-4 font-bold text-gray-900">eGFR (mL/min/1.73m²)</th>
                    <th className="p-4 font-bold text-gray-900">Tindakan Medis</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-bold">1 (G1)</td>
                    <td className="p-4">Kerusakan ginjal ringan dengan GFR normal/tinggi</td>
                    <td className="p-4 font-mono font-bold text-green-700">&ge; 90</td>
                    <td className="p-4">Observasi, kontrol tekanan darah, terapi komorbiditas.</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-bold">2 (G2)</td>
                    <td className="p-4">Penurunan GFR ringan</td>
                    <td className="p-4 font-mono font-bold text-green-600">60 - 89</td>
                    <td className="p-4">Estimasi tingkat progresi penyakit.</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-bold">3a (G3a)</td>
                    <td className="p-4">Penurunan GFR ringan - sedang</td>
                    <td className="p-4 font-mono font-bold text-yellow-600">45 - 59</td>
                    <td className="p-4">Evaluasi dan pengobatan komplikasi medis.</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-bold">3b (G3b)</td>
                    <td className="p-4">Penurunan GFR sedang - berat</td>
                    <td className="p-4 font-mono font-bold text-orange-500">30 - 44</td>
                    <td className="p-4">Manajemen intensif, rujukan ke Nefrolog.</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-bold">4 (G4)</td>
                    <td className="p-4">Penurunan GFR sangat berat (Persiapan Cuci Darah)</td>
                    <td className="p-4 font-mono font-bold text-red-500">15 - 29</td>
                    <td className="p-4">Persiapan terapi pengganti ginjal (RRT).</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-red-700">5 (G5)</td>
                    <td className="p-4 text-red-700 font-bold">Gagal Ginjal Terminal (ESRD)</td>
                    <td className="p-4 font-mono font-black text-red-700">&lt; 15</td>
                    <td className="p-4 font-bold text-red-700">Hemodialisis, Peritoneal Dialisis, atau Transplantasi.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Chapter 3 */}
          <section>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
              3. Interpretasi Lanjutan Parameter Laboratorium
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Aplikasi NephroAI kami menganalisis puluhan parameter dari tes darah dan urine. Berikut adalah patofisiologi di balik tes laboratorium terpenting dalam mendiagnosis CKD:
            </p>
            
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Retensi Limbah Nitrogen</h3>
                  <div className="bg-stone-50 p-6 border border-gray-200 rounded-sm space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900">Kreatinin Serum</h4>
                      <p className="text-sm text-gray-600 mt-1">Sisa metabolisme fosfokreatin otot. Ginjal sehat menyaringnya hampir 100%. Peningkatan kadar kreatinin (&gt;1.2 mg/dL) adalah <em>biomarker</em> paling definitif untuk memprediksi penurunan Laju Filtrasi Glomerulus.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Blood Urea Nitrogen (BUN)</h4>
                      <p className="text-sm text-gray-600 mt-1">Urea terbentuk di hati dari pemecahan protein. Akumulasi ureum tingkat tinggi dalam darah menciptakan racun uremik yang dapat merusak otak (ensefalopati uremik) dan jantung (perikarditis).</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-red-700 mb-3">Kelainan Hematologi & Darah</h3>
                  <div className="bg-stone-50 p-6 border border-gray-200 rounded-sm space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900">Hemoglobin & Eritrosit</h4>
                      <p className="text-sm text-gray-600 mt-1">Ginjal yang rusak berhenti memproduksi <em>Eritropoietin</em>, hormon pemicu sumsum tulang untuk membuat sel darah merah. Akibatnya, pasien CKD selalu mengalami Anemia kronis yang memicu kelelahan ekstrem dan sesak napas.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-yellow-600 mb-3">Analisis Urine Klinis</h3>
                  <div className="bg-stone-50 p-6 border border-gray-200 rounded-sm space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900">Albuminuria (Proteinuria)</h4>
                      <p className="text-sm text-gray-600 mt-1">Kehadiran protein albumin di urine mengindikasikan kerusakan pada membran dasar glomerulus (pintu saringan ginjal). Tingkat albuminuria berkorelasi langsung dengan laju mortalitas.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Berat Jenis Urine</h4>
                      <p className="text-sm text-gray-600 mt-1">Ginjal CKD tidak mampu membuang air berlebih atau menyerap air saat dehidrasi. Hal ini membuat urine encer dan berat jenisnya mengunci di titik isostenurik (sekitar 1.010).</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-teal-700 mb-3">Gangguan Elektrolit</h3>
                  <div className="bg-stone-50 p-6 border border-gray-200 rounded-sm space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900">Kalium (Potassium)</h4>
                      <p className="text-sm text-gray-600 mt-1">Kegagalan ekskresi kalium memicu hiperkalemia. Kadar kalium yang sangat tinggi (&gt;6.5 mEq/L) merupakan kegawatdaruratan medis karena dapat menyebabkan aritmia fatal (jantung berhenti berdetak).</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Chapter 4 */}
          <section>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
              4. Nutrisi & Tata Laksana Dietetik
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Manajemen diet merupakan pilar utama penundaan progresi CKD secara konservatif. Intervensi nutrisi yang ketat dapat mengurangi penumpukan limbah metabolik secara signifikan.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <li className="bg-white p-6 border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-900 text-lg mb-2 flex items-center"><span className="text-primary mr-2">🥩</span> Restriksi Protein</h4>
                <p className="text-sm text-gray-600">Diet rendah protein (0.6 - 0.8 g/kg berat badan/hari) diwajibkan untuk pasien predialisis guna mengurangi beban kerja penyaringan ginjal dan menekan racun uremik.</p>
              </li>
              <li className="bg-white p-6 border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-900 text-lg mb-2 flex items-center"><span className="text-primary mr-2">🧂</span> Batasan Natrium (Garam)</h4>
                <p className="text-sm text-gray-600">Maksimal 2.000 mg (2 gram) natrium per hari untuk mengendalikan retensi cairan (edema), mengontrol hipertensi, dan meminimalkan proteinuria.</p>
              </li>
              <li className="bg-white p-6 border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-900 text-lg mb-2 flex items-center"><span className="text-primary mr-2">🍌</span> Kontrol Kalium & Fosfat</h4>
                <p className="text-sm text-gray-600">Menghindari buah kaya kalium (pisang, alpukat, tomat) dan makanan tinggi fosfat (susu, keju, minuman bersoda) untuk mencegah kalsifikasi pembuluh darah dan henti jantung.</p>
              </li>
              <li className="bg-white p-6 border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-900 text-lg mb-2 flex items-center"><span className="text-primary mr-2">💧</span> Regulasi Cairan</h4>
                <p className="text-sm text-gray-600">Pada pasien stadium lanjut yang mengalami oliguria (produksi urine menurun), asupan cairan harian dibatasi sesuai volume urine harian ditambah +500ml.</p>
              </li>
            </ul>
          </section>

          {/* Chapter 6: Global Analytics (Merged from Dashboard) */}
          <section className="pt-8 border-t border-gray-200">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 pb-2 border-b border-gray-100">
              6. Analitik Epidemiologi Global
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-stone-50 border-l-4 border-primary p-6 shadow-sm">
                <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">Prevalensi Global</h3>
                <p className="text-3xl font-serif font-black text-gray-900">~10%</p>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">Estimasi persentase populasi dunia terdiagnosis CKD stadium 1-5.</p>
              </div>
              
              <div className="bg-stone-50 border-l-4 border-red-600 p-6 shadow-sm">
                <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">Angka Kematian</h3>
                <p className="text-3xl font-serif font-black text-red-600">Top 12</p>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">Penyebab mortalitas tertinggi menurut data WHO terkini.</p>
              </div>

              <div className="bg-stone-50 border-l-4 border-teal-600 p-6 shadow-sm">
                <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">Pasien Dialisis</h3>
                <p className="text-3xl font-serif font-black text-teal-600">2.6 Jt+</p>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">Pasien ESRD bergantung pada terapi pengganti ginjal.</p>
              </div>

              <div className="bg-stone-50 border-l-4 border-orange-400 p-6 shadow-sm">
                <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">Gejala Awal</h3>
                <p className="text-2xl font-serif font-black text-orange-500">Asimtomatik</p>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">Stadium awal berjalan tanpa manifestasi klinis yang jelas.</p>
              </div>
            </div>

            <div className="bg-white p-6 border border-gray-200 clinical-shadow mt-8">
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Distribusi Etiologi Utama</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wide mb-2 text-gray-800">
                    <span>Nefropati Diabetik</span>
                    <span>30 - 50%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-2 w-[45%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wide mb-2 text-gray-800">
                    <span>Nefrosklerosis Hipertensif</span>
                    <span>25 - 30%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-teal-600 h-2 w-[28%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wide mb-2 text-gray-800">
                    <span>Glomerulonefritis Kronis</span>
                    <span>10 - 15%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-orange-400 h-2 w-[15%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wide mb-2 text-gray-800">
                    <span>Etiologi Lainnya</span>
                    <span>10 - 20%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-400 h-2 w-[12%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-1 space-y-10">
          
          {/* Risk Factors Box */}
          <div className="bg-gray-900 text-white p-8 rounded-sm shadow-xl sticky top-24">
            <h3 className="font-serif font-bold text-2xl mb-6 text-primary-light border-b border-gray-700 pb-4">Faktor Risiko Terbesar</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg text-orange-400">1. Nefropati Diabetik</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">Penyumbang 40% kasus ESRD. Gula darah tinggi secara kronis memicu stres oksidatif dan menghancurkan pembuluh kapiler saringan ginjal secara masif.</p>
              </div>
              
              <div>
                <h4 className="font-bold text-lg text-orange-400">2. Nefrosklerosis Hipertensif</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">Menyumbang 27% kasus ESRD. Tekanan pembuluh darah yang tinggi mengeras jaringan halus dalam ginjal (sklerosis), mematikan unit-unit nefron.</p>
              </div>

              <div>
                <h4 className="font-bold text-lg text-orange-400">3. Glomerulonefritis</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">Peradangan ginjal yang sering diinduksi oleh respon autoimun tubuh (contoh: Lupus/SLE).</p>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <h4 className="font-bold text-sm text-gray-300 mb-2">Risiko Lainnya:</h4>
                <ul className="space-y-2 text-xs text-gray-400">
                  <li>• Batu Ginjal berulang (Obstruksi)</li>
                  <li>• Penggunaan OAIN/NSAID jangka panjang</li>
                  <li>• Ginjal Polikistik (Genetik keturunan)</li>
                  <li>• Riwayat Medis Keluarga</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-gray-800 p-4 border-l-4 border-primary">
              <p className="text-xs italic text-gray-300">"Deteksi dini pada kelompok berisiko tinggi adalah ujung tombak dalam memutus rantai prevalensi ESRD di seluruh dunia."</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default EducationID;
