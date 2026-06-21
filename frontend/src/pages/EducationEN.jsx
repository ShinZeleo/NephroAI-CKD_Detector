import React from 'react';

const EducationEN = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      
      {/* Hero Section */}
      <div className="mb-16 border-b-2 border-gray-900 pb-10">
        <div className="uppercase tracking-widest text-primary font-bold text-xs mb-3">Comprehensive Clinical Overview</div>
        <h1 className="text-5xl md:text-6xl font-serif font-black text-gray-900 mb-6 tracking-tight leading-tight">
          Medical Encyclopedia: <br/> Chronic Kidney Disease
        </h1>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-4xl font-medium">
          A comprehensive clinical-standard guide on the etiology, pathophysiology, clinical manifestations, laboratory interpretation, and management of Chronic Kidney Disease based on modern nephrology literature (KDIGO Guidelines).
        </p>
      </div>

      {/* Quick Facts */}
      <div className="mb-12 bg-blue-50 border border-blue-100 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Quick Facts: CKD at a Glance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-lg border border-blue-50 shadow-sm">
            <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-2">Prevalence</h3>
            <p className="text-gray-700 text-sm">Estimated 1 in 10 adults worldwide have CKD, and most don't know it.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-blue-50 shadow-sm">
            <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-2">Early Symptoms</h3>
            <p className="text-gray-700 text-sm">Early stages are mostly asymptomatic. Physical symptoms only appear when kidney function drops significantly.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-blue-50 shadow-sm">
            <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-2">Risk Factors</h3>
            <p className="text-gray-700 text-sm">Diabetes Mellitus and Hypertension are the two most dominant causes, accounting for the vast majority of cases.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-blue-50 shadow-sm">
            <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-2">When to Check?</h3>
            <p className="text-gray-700 text-sm">If you have diabetes, high blood pressure, or a family history of kidney failure, check eGFR at least once a year.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        {/* Left Column (Main Content - 3 columns wide) */}
        <div className="lg:col-span-3 space-y-16">
          
          {/* Chapter 1 */}
          <section>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
              1. Definition & Epidemiology
            </h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                <strong>Chronic Kidney Disease (CKD)</strong> is defined as abnormalities of kidney structure or function, present for greater than 3 months, with implications for health. This condition is characterized by irreversible and progressive kidney tissue damage, ultimately leading to <em>End-Stage Renal Disease</em> (ESRD).
              </p>
              <p>
                Epidemiologically, CKD is a massive global public health issue. Global prevalence is estimated at 9-13%, contributing to very high morbidity and mortality burdens, primarily due to cardiovascular complications. Often dubbed <em>"The Silent Killer"</em>, early-stage CKD is generally asymptomatic, so diagnosis is often delayed when most nephrons have been destroyed.
              </p>
            </div>
          </section>

          {/* Chapter 2 */}
          <section>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
              2. Stages of Chronic Kidney Disease (KDIGO Classification)
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              The severity of CKD is classified based on the Estimated Glomerular Filtration Rate (eGFR), which measures how efficiently the kidneys filter waste from the blood per minute. Based on the KDIGO global guidelines, CKD is divided into 5 stages:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-stone-100 border-b-2 border-gray-300">
                    <th className="p-4 font-bold text-gray-900">Stage</th>
                    <th className="p-4 font-bold text-gray-900">Clinical Description</th>
                    <th className="p-4 font-bold text-gray-900">eGFR (mL/min/1.73m²)</th>
                    <th className="p-4 font-bold text-gray-900">Medical Action</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-bold">1 (G1)</td>
                    <td className="p-4">Mild kidney damage with normal/high eGFR</td>
                    <td className="p-4 font-mono font-bold text-green-700">&ge; 90</td>
                    <td className="p-4">Observation, blood pressure control.</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-stone-50">
                    <td className="p-4 font-bold">2 (G2)</td>
                    <td className="p-4">Mild decrease in eGFR</td>
                    <td className="p-4 font-mono font-bold text-green-600">60 - 89</td>
                    <td className="p-4">Estimate progression rate, diet modifications.</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-bold">3a & 3b (G3)</td>
                    <td className="p-4">Mild-moderate to moderate-severe decrease in eGFR</td>
                    <td className="p-4 font-mono font-bold text-yellow-600">30 - 59</td>
                    <td className="p-4">Evaluate and treat complications (anemia, bone).</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-orange-50">
                    <td className="p-4 font-bold text-orange-700">4 (G4)</td>
                    <td className="p-4 text-orange-800">Severe decrease in eGFR</td>
                    <td className="p-4 font-mono font-bold text-orange-600">15 - 29</td>
                    <td className="p-4">Prepare for renal replacement therapy.</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="p-4 font-bold text-red-700">5 (G5 / ESRD)</td>
                    <td className="p-4 text-red-800">Kidney Failure</td>
                    <td className="p-4 font-mono font-bold text-red-600">&lt; 15</td>
                    <td className="p-4 font-bold text-red-700">Dialysis or transplant required.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Chapter 3 */}
          <section>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
              3. Interpretation of Diagnostic Parameters
            </h2>
            <div className="space-y-6">
              
              <div className="bg-white p-6 border border-gray-200 clinical-shadow">
                <h3 className="text-xl font-bold text-primary mb-3">A. Blood Panel (Serum)</h3>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li><strong>Serum Creatinine:</strong> A waste product of muscle metabolism. Elevated levels strongly indicate impaired kidney filtration.</li>
                  <li><strong>Blood Urea (BUN):</strong> Urea nitrogen levels in the blood. Elevated BUN (uremia) can cause nausea, fatigue, and neurological disorders.</li>
                  <li><strong>Hemoglobin & PCV:</strong> Kidneys produce the hormone Erythropoietin (EPO) which stimulates red blood cell formation. CKD patients often experience severe anemia.</li>
                  <li><strong>Electrolytes (Sodium & Potassium):</strong> Failing kidneys cannot excrete excess potassium (hyperkalemia), which can lead to fatal cardiac arrhythmias.</li>
                </ul>
              </div>

              <div className="bg-white p-6 border border-gray-200 clinical-shadow">
                <h3 className="text-xl font-bold text-teal-600 mb-3">B. Urinalysis</h3>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li><strong>Albumin / Proteinuria:</strong> Healthy kidneys do not leak protein. The presence of albumin in urine is an early hallmark of glomerular damage.</li>
                  <li><strong>Specific Gravity:</strong> Shows the kidney's ability to concentrate urine. In advanced CKD, this ability is lost (isosthenuria).</li>
                  <li><strong>Pus Cell & Bacteria:</strong> Indicates urinary tract infection, which can exacerbate kidney damage if it ascends to the kidneys (pyelonephritis).</li>
                </ul>
              </div>

            </div>
          </section>

          {/* Chapter 4 */}
          <section>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
              4. Key Complications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <h4 className="font-bold text-gray-900">Cardiovascular Disease (CVD)</h4>
                <p className="text-sm text-gray-600 mt-1">The leading cause of death in CKD. Vascular calcification due to mineral imbalance causes fatal heart attacks.</p>
              </div>
              <div className="border-l-4 border-orange-400 pl-4 py-2">
                <h4 className="font-bold text-gray-900">Pulmonary/Pedal Edema</h4>
                <p className="text-sm text-gray-600 mt-1">Fluid retention causing swelling in the legs (pedal edema) and fluid in the lungs, causing shortness of breath.</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <h4 className="font-bold text-gray-900">CKD-MBD (Bone Disorder)</h4>
                <p className="text-sm text-gray-600 mt-1">Disruption of calcium and phosphate metabolism leads to fragile bones and calcification of blood vessels.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h4 className="font-bold text-gray-900">Metabolic Acidosis</h4>
                <p className="text-sm text-gray-600 mt-1">The kidneys fail to excrete dietary acid loads, leading to systemic acid buildup that accelerates disease progression.</p>
              </div>
            </div>
          </section>

          {/* Chapter 5 */}
          <section>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
              5. Clinical Recommendations & Lifestyle
            </h2>
            <div className="bg-stone-50 p-6 rounded-md border border-stone-200">
              <ul className="list-disc pl-5 space-y-3 text-gray-700 text-sm leading-relaxed">
                <li><strong>Strict Blood Pressure Control:</strong> Target &lt; 130/80 mmHg using ACE-Inhibitors or ARBs to protect the kidneys.</li>
                <li><strong>Glycemic Control:</strong> For diabetic patients, maintain HbA1c &lt; 7.0%.</li>
                <li><strong>Dietary Restrictions:</strong> Limit intake of salt (&lt; 2g/day), protein (0.6-0.8 g/kg/day for non-dialysis), potassium, and phosphorus.</li>
                <li><strong>Nephrotoxin Avoidance:</strong> Stop using NSAIDs (like Ibuprofen) and herbal medicines of unknown composition that can poison the kidneys.</li>
              </ul>
            </div>
          </section>

          {/* Chapter 6: Global Analytics (Merged from Dashboard) */}
          <section className="pt-8 border-t border-gray-200">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 pb-2 border-b border-gray-100">
              6. Global Epidemiology Analytics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-stone-50 border-l-4 border-primary p-6 shadow-sm">
                <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">Global Prevalence</h3>
                <p className="text-3xl font-serif font-black text-gray-900">~10%</p>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">Estimated percentage of the world population diagnosed with CKD stages 1-5.</p>
              </div>
              
              <div className="bg-stone-50 border-l-4 border-red-600 p-6 shadow-sm">
                <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">Mortality Rate</h3>
                <p className="text-3xl font-serif font-black text-red-600">Top 12</p>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">Among the leading causes of mortality according to the latest WHO data.</p>
              </div>

              <div className="bg-stone-50 border-l-4 border-teal-600 p-6 shadow-sm">
                <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">Dialysis Patients</h3>
                <p className="text-3xl font-serif font-black text-teal-600">2.6M+</p>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">ESRD patients dependent on renal replacement therapy.</p>
              </div>

              <div className="bg-stone-50 border-l-4 border-orange-400 p-6 shadow-sm">
                <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">Early Symptoms</h3>
                <p className="text-2xl font-serif font-black text-orange-500">Asymptomatic</p>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">Early stages progress without clear clinical manifestations.</p>
              </div>
            </div>

            <div className="bg-white p-6 border border-gray-200 clinical-shadow mt-8">
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Major Etiology Distribution</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wide mb-2 text-gray-800">
                    <span>Diabetic Nephropathy</span>
                    <span>30 - 50%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-2 w-[45%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wide mb-2 text-gray-800">
                    <span>Hypertensive Nephrosclerosis</span>
                    <span>25 - 30%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-teal-600 h-2 w-[28%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wide mb-2 text-gray-800">
                    <span>Chronic Glomerulonephritis</span>
                    <span>10 - 15%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-orange-400 h-2 w-[15%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wide mb-2 text-gray-800">
                    <span>Other Etiologies</span>
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

        {/* Right Column (Sidebar Sticky) */}
        <div className="lg:col-span-1">
          
          {/* Risk Factors Box */}
          <div className="bg-gray-900 text-white p-8 rounded-sm shadow-xl sticky top-24">
            <h3 className="font-serif font-bold text-2xl mb-6 text-primary-light border-b border-gray-700 pb-4">Major Risk Factors</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg text-orange-400">1. Diabetic Nephropathy</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">Accounts for 40% of ESRD cases. Chronically high blood sugar triggers oxidative stress and massively destroys kidney filter capillaries.</p>
              </div>
              
              <div>
                <h4 className="font-bold text-lg text-orange-400">2. Hypertensive Nephrosclerosis</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">Contributes to 27% of ESRD cases. High blood pressure hardens delicate tissues in the kidneys (sclerosis), killing nephron units.</p>
              </div>

              <div>
                <h4 className="font-bold text-lg text-orange-400">3. Glomerulonephritis</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">Kidney inflammation often induced by the body's autoimmune response (e.g., Lupus/SLE).</p>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <h4 className="font-bold text-sm text-gray-300 mb-2">Other Risks:</h4>
                <ul className="space-y-2 text-xs text-gray-400">
                  <li>• Recurrent Kidney Stones (Obstruction)</li>
                  <li>• Long-term NSAID use</li>
                  <li>• Polycystic Kidney Disease (Genetic)</li>
                  <li>• Family Medical History</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-gray-800 p-4 border-l-4 border-primary">
              <p className="text-xs italic text-gray-300">"Early detection in high-risk groups is the spearhead in breaking the chain of ESRD prevalence worldwide."</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default EducationEN;
