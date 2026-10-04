import React from 'react';
import { ArrowLeftRight, Check, X, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ComparisonMatrix({ comparison }) {
  if (!comparison || comparison.length === 0) return null;

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center space-x-3 pb-5 border-b border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20">
          <ArrowLeftRight className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-bold text-white tracking-tight">
              Existing vs. Redesigned Product Comparison
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              FEATURE MATRIX
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Side-by-side engineering and user experience feature benchmarking
          </p>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] font-mono uppercase tracking-wider text-slate-400 bg-slate-950/60">
              <th className="py-3 px-4 rounded-l-lg">Feature Dimension</th>
              <th className="py-3 px-4 text-rose-400">Existing Baseline</th>
              <th className="py-3 px-4 text-teal-400">Redesigned Product</th>
              <th className="py-3 px-4 rounded-r-lg text-cyan-400">Key User Benefit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs">
            {comparison.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-950/40 transition-colors">
                {/* Feature Name */}
                <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                  {item.feature}
                </td>

                {/* Existing Product */}
                <td className="py-3.5 px-4 text-slate-400 leading-relaxed">
                  <div className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                    <span>{item.existing_product}</span>
                  </div>
                </td>

                {/* Redesigned Product */}
                <td className="py-3.5 px-4 text-slate-200 leading-relaxed font-medium bg-teal-500/5">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                    <span className="text-teal-200">{item.redesigned_product}</span>
                  </div>
                </td>

                {/* Key Benefit */}
                <td className="py-3.5 px-4 text-cyan-300 leading-relaxed">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-medium">
                    {item.key_benefit}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
