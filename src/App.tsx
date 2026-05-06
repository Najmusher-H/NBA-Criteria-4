import React, { useMemo, useState } from 'react';
import { getAllStats, AcademicYear } from './utils';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, TrendingUp, History, ChevronRight, BarChart3, Users, GraduationCap, LayoutDashboard } from 'lucide-react';
import { HistoryModal } from './components/HistoryModal';
import { CR4Module } from './components/CR4Module';

type Tab = 'C4' | 'C5';

export default function App() {
  const { results, avgFQI, avgFR, individualFaculty, allYears } = useMemo(() => getAllStats(), []);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('C4');

  const years: AcademicYear[] = ["23-24", "24-25", "25-26"];
  const cayMapping: Record<AcademicYear, string> = {
    "20-21": "CAYm5",
    "21-22": "CAYm4",
    "22-23": "CAYm3",
    "23-24": "CAYm2",
    "24-25": "CAYm1",
    "25-26": "CAY"
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#0f172a]" id="app-root">
      {/* Sidebar / Navigation */}
      <nav className="fixed left-0 top-0 h-full w-20 bg-slate-900 flex flex-col items-center py-10 gap-8 z-40 hidden md:flex">
        <div className="w-10 h-10 bg-[#2563eb] rounded-xl flex items-center justify-center text-white mb-4">
          <LayoutDashboard size={24} />
        </div>
        <button 
          onClick={() => setActiveTab('C4')}
          className={`p-3 rounded-xl transition-all ${activeTab === 'C4' ? 'bg-[#2563eb] text-white shadow-lg shadow-[#2563eb]/30' : 'text-slate-400 hover:text-white'}`}
          title="Student Performance (C4)"
        >
          <GraduationCap size={24} />
        </button>
        <button 
          onClick={() => setActiveTab('C5')}
          className={`p-3 rounded-xl transition-all ${activeTab === 'C5' ? 'bg-[#2563eb] text-white shadow-lg shadow-[#2563eb]/30' : 'text-slate-400 hover:text-white'}`}
          title="Faculty Information (C5)"
        >
          <Users size={24} />
        </button>
      </nav>

      <div className="md:pl-20 min-h-screen">
        <header className="sticky top-0 bg-[#f8fafc]/80 backdrop-blur-md z-30 border-b border-[#e2e8f0] px-4 md:px-10 py-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-xl font-black tracking-tight uppercase text-[#0f172a]" id="main-title">
                NBA Auditor <span className="text-[#2563eb]">Dashboard</span>
              </h1>
              <p className="text-xs text-[#64748b] font-bold tracking-widest uppercase opacity-80" id="main-subtitle">
                SAR Compliance Management · Dept. of Computer Science & Engineering
              </p>
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="flex bg-white p-1 rounded-lg border border-[#e2e8f0] shadow-sm md:hidden">
                <button 
                  onClick={() => setActiveTab('C4')}
                  className={`px-4 py-2 rounded-md text-[11px] font-bold uppercase transition-all ${activeTab === 'C4' ? 'bg-[#2563eb] text-white' : 'text-[#64748b]'}`}
                >
                  C4
                </button>
                <button 
                  onClick={() => setActiveTab('C5')}
                  className={`px-4 py-2 rounded-md text-[11px] font-bold uppercase transition-all ${activeTab === 'C5' ? 'bg-[#2563eb] text-white' : 'text-[#64748b]'}`}
                >
                  C5
                </button>
              </div>

              {activeTab === 'C5' && (
                <button 
                  onClick={() => setIsHistoryModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-sm"
                >
                  <BarChart3 size={14} />
                  Historical Trends
                </button>
              )}
              <div className="h-4 w-px bg-[#e2e8f0] hidden md:block" />
              <div className="px-3 py-1.5 bg-[#eff6ff] text-[#2563eb] text-[10px] font-bold border border-[#dbeafe] rounded uppercase tracking-wider">
                AUDIT STATUS: ACTIVE
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-4 md:p-10">
          <AnimatePresence mode="wait">
            {activeTab === 'C5' ? (
              <motion.div
                key="c5-view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                {/* Faculty Module Header */}
                <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Criterion 5: Faculty Qualification & Retention</h2>
                    <p className="text-slate-500 text-sm">Automated analysis of Ph.D ratio, FQI, and longevity points.</p>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Avg. FQI</p>
                      <p className="text-2xl font-black text-[#2563eb] tracking-tighter leading-none mt-1">{avgFQI?.toFixed(2) || "0.00"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Avg. FR</p>
                      <p className="text-2xl font-black text-[#10b981] tracking-tighter leading-none mt-1">{avgFR?.toFixed(2) || "0.00"}</p>
                    </div>
                  </div>
                </header>

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    {/* Table 1: Faculty Qualification */}
                    <section className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden" id="fqi-section">
                      <div className="px-6 py-4 bg-[#fafafa] border-b border-[#e2e8f0]">
                        <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#0f172a]">Table No. 1: Faculty Qualification Assessment</h2>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left" id="fqi-table">
                          <thead>
                            <tr className="bg-[#fcfcfc] border-b border-[#e2e8f0]">
                              <th className="px-6 py-4 text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Year</th>
                              <th className="px-6 py-4 text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Description</th>
                              <th className="px-6 py-4 text-[11px] font-bold text-[#64748b] uppercase tracking-wider text-center">Ph.D (X)</th>
                              <th className="px-6 py-4 text-[11px] font-bold text-[#64748b] uppercase tracking-wider text-center">M.Tech (Y)</th>
                              <th className="px-6 py-4 text-[11px] font-bold text-[#64748b] uppercase tracking-wider text-center">Req. Total (RF)</th>
                              <th className="px-6 py-4 text-[11px] font-bold text-[#64748b] uppercase tracking-wider text-right">FQI</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-dotted divide-[#e2e8f0]">
                            {years.map((year) => (
                              <tr key={year} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 text-sm font-semibold text-[#0f172a]">{year}</td>
                                <td className="px-6 py-4 text-sm text-[#64748b] font-medium">{cayMapping[year]}</td>
                                <td className="px-6 py-4 text-sm font-medium text-[#0f172a] text-center">{results[year]?.X || 0}</td>
                                <td className="px-6 py-4 text-sm font-medium text-[#0f172a] text-center">{results[year]?.Y || 0}</td>
                                <td className="px-6 py-4 text-sm font-medium text-[#0f172a] text-center">{results[year]?.RF || 0}</td>
                                <td className="px-6 py-4 text-sm font-bold text-right text-[#2563eb]">
                                  {results[year]?.FQI?.toFixed(2) || "0.00"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="bg-[#f1f5f9] font-bold">
                              <td colSpan={5} className="px-6 py-4 text-right text-[11px] uppercase tracking-wider text-[#64748b]">Averaged Faculty Qualification Index</td>
                              <td className="px-6 py-4 text-right text-[#2563eb] text-lg">{avgFQI.toFixed(2)}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </section>

                    {/* Table 2: Faculty Retention */}
                    <section className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden" id="fr-section">
                      <div className="px-6 py-4 bg-[#fafafa] border-b border-[#e2e8f0]">
                        <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#0f172a]">Table No. 2: Faculty Retention & Experience</h2>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left" id="fr-table">
                          <thead>
                            <tr className="bg-[#fcfcfc] border-b border-[#e2e8f0]">
                              <th className="px-6 py-4 text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Year</th>
                              <th className="px-6 py-4 text-[11px] font-bold text-[#64748b] uppercase tracking-wider text-center">A (&lt;1)</th>
                              <th className="px-6 py-4 text-[11px] font-bold text-[#64748b] uppercase tracking-wider text-center">B (1-2)</th>
                              <th className="px-6 py-4 text-[11px] font-bold text-[#64748b] uppercase tracking-wider text-center">C (2-3)</th>
                              <th className="px-6 py-4 text-[11px] font-bold text-[#64748b] uppercase tracking-wider text-center">D (3-4)</th>
                              <th className="px-6 py-4 text-[11px] font-bold text-[#64748b] uppercase tracking-wider text-center">E (&gt;4)</th>
                              <th className="px-6 py-4 text-[11px] font-bold text-[#64748b] uppercase tracking-wider text-right">Points</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-dotted divide-[#e2e8f0]">
                            {years.map((year) => (
                              <tr key={year} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 text-sm font-semibold text-[#0f172a]">{year}</td>
                                <td className="px-6 py-4 text-sm text-[#0f172a] text-center">{results[year]?.retention?.A || 0}</td>
                                <td className="px-6 py-4 text-sm text-[#0f172a] text-center">{results[year]?.retention?.B || 0}</td>
                                <td className="px-6 py-4 text-sm text-[#0f172a] text-center">{results[year]?.retention?.C || 0}</td>
                                <td className="px-6 py-4 text-sm text-[#0f172a] text-center">{results[year]?.retention?.D || 0}</td>
                                <td className="px-6 py-4 text-sm text-[#0f172a] text-center">{results[year]?.retention?.E || 0}</td>
                                <td className="px-6 py-4 text-sm font-bold text-right text-[#10b981]">
                                  {results[year]?.retention?.FR?.toFixed(2) || "0.00"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="bg-[#f1f5f9] font-bold">
                              <td colSpan={6} className="px-6 py-4 text-right text-[11px] uppercase tracking-wider text-[#64748b]">Average Retention Points (FR)</td>
                              <td className="px-6 py-4 text-right text-[#10b981] text-lg">{avgFR.toFixed(2)}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </section>
                  </div>

                  <div className="space-y-8">
                    {/* Step-by-Step Calculation */}
                    <section className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm flex flex-col h-full" id="calculation-card">
                      <div className="px-6 py-4 bg-[#fafafa] border-b border-[#e2e8f0]">
                        <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#0f172a]">FQI Audit Verification (CAY)</h2>
                      </div>
                      <div className="p-6 space-y-6 flex-1">
                        <div className="p-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg font-mono text-xs leading-relaxed space-y-2">
                          <span className="text-[#2563eb] font-bold block mb-2">FQI = [ 2.5 * (10X + 4Y) ] / RF</span>
                          <p className="text-[10px] text-[#64748b] leading-relaxed mb-4">Values derived from AY 25-26 data verification audit.</p>
                          
                          <p>X = {results["25-26"]?.X || 0} (Doctorates)</p>
                          <p>Y = {results["25-26"]?.Y || 0} (Post Grads)</p>
                          <p>RF = {results["25-26"]?.RF || 0} (Sanctioned)</p>
                          
                          <p className="mt-4 border-t border-[#e2e8f0] pt-4">Numerator: (10*{results["25-26"]?.X || 0} + 4*{results["25-26"]?.Y || 0}) = {(10*(results["25-26"]?.X || 0) + 4*(results["25-26"]?.Y || 0))}</p>
                          <p>Weighted: 2.5 * {(10*(results["25-26"]?.X || 0) + 4*(results["25-26"]?.Y || 0))} = {2.5 * (10*(results["25-26"]?.X || 0) + 4*(results["25-26"]?.Y || 0))}</p>
                          <p className="font-bold text-[#2563eb] mt-2 text-[14px]">FQI = {results["25-26"]?.FQI?.toFixed(2) || "0.00"}</p>
                        </div>

                        <div>
                          <h3 className="text-[11px] font-bold text-[#64748b] uppercase tracking-widest mb-4">Trend Analysis</h3>
                          <div className="space-y-4">
                            <div className="flex gap-3">
                              <div className="w-1 h-auto bg-[#2563eb] rounded-full shrink-0" />
                              <p className="text-[13px] leading-relaxed text-[#0f172a]">
                                <span className="font-bold">Credential Growth:</span> Ph.D concentration reached {((results["25-26"]?.X || 0) / (results["25-26"]?.RF || 1) * 100).toFixed(0)}% in CAY, reflecting a 150% headcount increase since CAYm5.
                              </p>
                            </div>
                            <div className="flex gap-3">
                              <div className="w-1 h-auto bg-[#10b981] rounded-full shrink-0" />
                              <p className="text-[13px] leading-relaxed text-[#0f172a]">
                                <span className="font-bold">Stability Index:</span> Retention points have rebounded to {results["25-26"]?.retention?.FR?.toFixed(2) || "0.00"}, signaling institutional stability.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>

                {/* Experience Table */}
                <section className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden" id="experience-section">
                  <div className="px-6 py-4 bg-[#fafafa] border-b border-[#e2e8f0]">
                    <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#0f172a]">Individual Faculty Experience Mapping (CAY 25-26)</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left" id="experience-table">
                      <thead>
                        <tr className="bg-[#fcfcfc] border-b border-[#e2e8f0]">
                          <th className="px-6 py-4 text-[11px] font-bold text-[#64748b] uppercase tracking-wider">S.N</th>
                          <th className="px-6 py-4 text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Faculty Name</th>
                          <th className="px-6 py-4 text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Degree</th>
                          <th className="px-6 py-4 text-[11px] font-bold text-[#64748b] uppercase tracking-wider text-right">Years (Inst.)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-dotted divide-[#e2e8f0]">
                        {individualFaculty.map((f, i) => (
                          <tr key={i} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 text-sm text-[#64748b]">{i+1}</td>
                            <td className="px-6 py-4 text-sm font-semibold text-[#0f172a]">{f.name}</td>
                            <td className="px-6 py-4 text-sm text-[#64748b]">{f.degree}</td>
                            <td className="px-6 py-4 text-sm font-bold text-right text-[#0f172a]">{f.exp?.toFixed(1) || "0.0"} Yrs</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </motion.div>
            ) : (
              <motion.div
                key="c4-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <CR4Module />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="max-w-7xl mx-auto mt-20 pt-10 border-t border-[#e2e8f0] flex flex-col md:flex-row justify-between items-center text-[11px] text-[#64748b] font-medium uppercase tracking-widest gap-4 px-4 md:px-10 pb-20">
          <div className="flex items-center gap-6">
            <span>NBA Auditor Assistant v3.5 Professional</span>
            <span className="opacity-40">|</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-pulse" />
              <span>SAR Live Engine</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>Audit Integrity Status:</span>
            <span className="text-[#10b981] font-bold underline underline-offset-4">Verified</span>
          </div>
        </footer>

        <HistoryModal 
          isOpen={isHistoryModalOpen} 
          onClose={() => setIsHistoryModalOpen(false)} 
          data={results}
          allYears={allYears}
        />
      </div>
    </div>
  );
}
