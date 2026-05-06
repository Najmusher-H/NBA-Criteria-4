/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator, Table, TrendingUp, Info, AlertCircle, Save } from 'lucide-react';

interface RowData {
  [key: string]: string;
}

interface SectionConfig {
  id: string;
  title: string;
  years: string[];
  fields: { id: string; label: string; placeholder: string }[];
  calculate: (data: RowData) => number;
  formula: string;
}

const SECTIONS: SectionConfig[] = [
  {
    id: 'ER',
    title: 'CR 4.1: Enrollment Ratio (ER)',
    years: ['CAY', 'CAYm1', 'CAYm2'],
    fields: [
      { id: 'N', label: 'N (Sanctioned intake)', placeholder: 'e.g., 60' },
      { id: 'N1', label: 'N1 (Adjusted Admitted Students)', placeholder: 'e.g., 55' },
      { id: 'N4', label: 'N4 (Supernumerary Admissions)', placeholder: 'e.g., 3' },
    ],
    calculate: (d) => {
      const n = parseFloat(d.N) || 0;
      const n1 = parseFloat(d.N1) || 0;
      const n4 = parseFloat(d.N4) || 0;
      return n === 0 ? 0 : (n1 + n4) / n;
    },
    formula: 'ER = (N1 + N4) / N',
  },
  {
    id: 'SR',
    title: 'CR 4.2: Success Rate (SR)',
    years: ['LYG', 'LYGm1', 'LYGm2'],
    fields: [
      { id: 'A', label: 'A* (Total Admitted + Lateral)', placeholder: 'e.g., 60' },
      { id: 'B', label: 'B (Number of Graduated)', placeholder: 'e.g., 45' },
    ],
    calculate: (d) => {
      const a = parseFloat(d.A) || 0;
      const b = parseFloat(d.B) || 0;
      return a === 0 ? 0 : (b / a) * 100;
    },
    formula: 'SR = (B / A) × 100',
  },
  {
    id: 'API1',
    title: 'CR 4.3: Academic Performance (1st Year)',
    years: ['CAYm1', 'CAYm2', 'CAYm3'],
    fields: [
      { id: 'X', label: 'X (Mean GPA or %/10)', placeholder: 'e.g., 7.5' },
      { id: 'Y', label: 'Y (Successful Students)', placeholder: 'e.g., 50' },
      { id: 'Z', label: 'Z (Students Appeared)', placeholder: 'e.g., 55' },
    ],
    calculate: (d) => {
      const x = parseFloat(d.X) || 0;
      const y = parseFloat(d.Y) || 0;
      const z = parseFloat(d.Z) || 0;
      return z === 0 ? 0 : x * (y / z);
    },
    formula: 'API = X × (Y / Z)',
  },
  {
    id: 'API2',
    title: 'CR 4.4: Academic Performance (2nd Year)',
    years: ['CAYm1', 'CAYm2', 'CAYm3'],
    fields: [
      { id: 'X', label: 'X (Mean GPA)', placeholder: 'e.g., 7.8' },
      { id: 'Y', label: 'Y (Successful Students)', placeholder: 'e.g., 48' },
      { id: 'Z', label: 'Z (Students Appeared)', placeholder: 'e.g., 52' },
    ],
    calculate: (d) => {
      const x = parseFloat(d.X) || 0;
      const y = parseFloat(d.Y) || 0;
      const z = parseFloat(d.Z) || 0;
      return z === 0 ? 0 : x * (y / z);
    },
    formula: 'API = X × (Y / Z)',
  },
  {
    id: 'API3',
    title: 'CR 4.5: Academic Performance (3rd Year)',
    years: ['CAYm1', 'CAYm2', 'CAYm3'],
    fields: [
      { id: 'X', label: 'X (Mean GPA)', placeholder: 'e.g., 8.0' },
      { id: 'Y', label: 'Y (Successful Students)', placeholder: 'e.g., 46' },
      { id: 'Z', label: 'Z (Students Appeared)', placeholder: 'e.g., 49' },
    ],
    calculate: (d) => {
      const x = parseFloat(d.X) || 0;
      const y = parseFloat(d.Y) || 0;
      const z = parseFloat(d.Z) || 0;
      return z === 0 ? 0 : x * (y / z);
    },
    formula: 'API = X × (Y / Z)',
  },
  {
    id: 'PI',
    title: 'CR 4.6: Placement / Higher Studies / Entrepreneurship',
    years: ['LYG', 'LYGm1', 'LYGm2'],
    fields: [
      { id: 'FS', label: 'FS* (Total Final Year Students)', placeholder: 'e.g., 60' },
      { id: 'X', label: 'X (Placed Students)', placeholder: 'e.g., 40' },
      { id: 'Y', label: 'Y (Higher Studies)', placeholder: 'e.g., 5' },
      { id: 'Z', label: 'Z (Entrepreneurship)', placeholder: 'e.g., 2' },
    ],
    calculate: (d) => {
      const fs = parseFloat(d.FS) || 0;
      const x = parseFloat(d.X) || 0;
      const y = parseFloat(d.Y) || 0;
      const z = parseFloat(d.Z) || 0;
      return fs === 0 ? 0 : ((x + y + z) / fs) * 100;
    },
    formula: 'P = ((X + Y + Z) / FS) × 100',
  },
];

export function CR4Module() {
  const [formData, setFormData] = useState<Record<string, Record<string, RowData>>>({});
  const [isCalculated, setIsCalculated] = useState(false);

  const handleInputChange = (sectionId: string, year: string, fieldId: string, value: string) => {
    setIsCalculated(false);
    setFormData((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [year]: {
          ...prev[sectionId]?.[year],
          [fieldId]: value,
        },
      },
    }));
  };

  const getCalculatedValue = (sectionId: string, year: string) => {
    const config = SECTIONS.find((s) => s.id === sectionId);
    if (!config) return 0;
    const data = formData[sectionId]?.[year] || {};
    return config.calculate(data);
  };

  const getSectionAverage = (sectionId: string) => {
    const config = SECTIONS.find((s) => s.id === sectionId);
    if (!config) return 0;
    return config.years.reduce((sum, year) => sum + getCalculatedValue(sectionId, year), 0) / config.years.length;
  };

  return (
    <div className="space-y-12 pb-20">
      <header className="mb-8 flex justify-between items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Criterion 4: Student Performance Evaluation</h2>
          <p className="text-slate-500 text-sm">Interactive workbook for Criterion 4 sections (Enrollment, Success, API & Placements).</p>
        </div>
        <button 
          onClick={() => setIsCalculated(true)}
          className="px-6 py-2.5 bg-[#2563eb] text-white text-xs font-bold uppercase tracking-widest rounded shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all flex items-center gap-2"
        >
          <Calculator size={16} />
          Calculate All
        </button>
      </header>

      {SECTIONS.map((section) => (
        <motion.section
          key={section.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden"
        >
          <div className="px-6 py-4 bg-[#fafafa] border-b border-[#e2e8f0] flex justify-between items-center">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#0f172a] flex items-center gap-2">
              <Table size={16} className="text-[#2563eb]" />
              {section.title}
            </h3>
            <div className="px-3 py-1 bg-[#eff6ff] text-[#2563eb] text-[10px] font-bold border border-[#dbeafe] rounded-full uppercase tracking-wider">
              {section.formula}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#fcfcfc] border-b border-[#e2e8f0]">
                  <th className="px-8 py-4 text-[11px] font-bold text-[#64748b] uppercase tracking-wider w-48">Variables</th>
                  {section.years.map((year) => (
                    <th key={year} className="px-6 py-4 text-[11px] font-bold text-[#64748b] uppercase tracking-wider text-center">{year}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-dotted divide-[#e2e8f0]">
                {section.fields.map((field) => (
                  <tr key={field.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-4">
                      <span className="text-[12px] font-semibold text-[#0f172a]">{field.label}</span>
                    </td>
                    {section.years.map((year) => (
                      <td key={year} className="px-6 py-3 text-center">
                        <input
                          type="number"
                          placeholder="0"
                          value={formData[section.id]?.[year]?.[field.id] || ''}
                          onChange={(e) => handleInputChange(section.id, year, field.id, e.target.value)}
                          className="w-24 px-2 py-1.5 text-sm border border-[#e2e8f0] bg-white rounded focus:ring-2 focus:ring-[#2563eb] focus:border-transparent outline-none transition-all text-center font-mono placeholder:text-slate-200"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-[#f8fafc] font-black">
                  <td className="px-8 py-5 text-[12px] text-[#2563eb] uppercase tracking-widest border-t border-[#e2e8f0]">Result Metrics</td>
                  {section.years.map((year) => {
                    const val = getCalculatedValue(section.id, year);
                    return (
                      <td key={year} className={`px-6 py-5 text-center text-xl border-t border-[#e2e8f0] transition-all duration-500 ${isCalculated ? 'text-[#10b981]' : 'text-[#2563eb]'}`}>
                        {val.toFixed(2)}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-[#f1f5f9] border-t border-[#e2e8f0]">
                  <td colSpan={section.years.length} className="px-8 py-4 text-right text-[11px] font-bold uppercase tracking-widest text-[#64748b]">
                    Averaged Index Score
                  </td>
                  <td className="px-6 py-4 text-center text-[#2563eb] text-xl font-black">
                    {getSectionAverage(section.id).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </motion.section>
      ))}

      {/* Summary Assessment Table */}
      <section className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-[#0f172a] border-b border-black">
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-white">Criterion 4: Executive Performance Summary</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                <th className="px-8 py-4 text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Sub-Criterion</th>
                <th className="px-8 py-4 text-[11px] font-bold text-[#64748b] uppercase tracking-wider text-right">Average Index Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {SECTIONS.map(s => (
                <tr key={s.id}>
                  <td className="px-8 py-4 text-xs font-bold text-[#0f172a] uppercase">{s.title.split(':')[0]}</td>
                  <td className="px-8 py-4 text-right text-base font-black text-[#2563eb]">{getSectionAverage(s.id).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Auditor Guidance */}
      <section className="bg-slate-900 rounded-2xl p-8 text-slate-100 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Calculator size={120} />
        </div>
        <div className="relative z-10">
          <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Info className="text-[#2563eb]" />
            Auditor Guidance
          </h4>
          <div className="grid md:grid-cols-2 gap-8 text-sm text-slate-400 leading-relaxed">
            <div className="space-y-4">
              <p>
                <strong className="text-white">Division by Zero:</strong> The calculator handles empty inputs and zeros automatically to prevent crashes. Ensure that denominators like ‘N’ or ‘FS’ are valid for non-zero results.
              </p>
              <p>
                <strong className="text-white">Precision:</strong> All results are displayed to <code className="text-blue-400">toFixed(2)</code> as per NBA SAR submission guidelines.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                <strong className="text-white">API Computation:</strong> X is the mean GPA. If using percentages, please divide by 10 before entry. (e.g., 75% → 7.5).
              </p>
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-[#2563eb] text-white font-bold text-xs uppercase tracking-widest rounded hover:bg-blue-600 transition-colors flex items-center gap-2">
                  <Save size={14} />
                  Save Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
