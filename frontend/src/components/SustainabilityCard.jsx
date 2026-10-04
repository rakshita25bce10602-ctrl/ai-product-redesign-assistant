import React from 'react';
import { Leaf, RefreshCcw, Recycle, ArrowRight, ShieldCheck, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SustainabilityCard({ sustainability }) {
  if (!sustainability) return null;

  const score = sustainability.sustainability_score || 90;

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20">
            <Leaf className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-white tracking-tight">
                Sustainability & Circular Lifecycle Analysis
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                CIRCULAR DESIGN
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Material substitution, lightweighting, and closed-loop recyclability
            </p>
          </div>
        </div>

        {/* Circular Sustainability Score */}
        <div className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Eco-Design Rating</div>
            <div className="text-xs font-semibold text-emerald-400">Grade A (High Circularity)</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-slate-950 text-xl shadow-md">
            {score}
          </div>
        </div>
      </div>

      {/* Material Comparison Banner */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-6">
        <div className="md:col-span-5 p-4 rounded-xl bg-slate-950/70 border border-red-500/20">
          <div className="flex items-center space-x-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-[11px] font-mono uppercase text-red-400 font-bold">Baseline Current Material</span>
          </div>
          <h4 className="text-sm font-semibold text-slate-200 mb-1">
            {sustainability.current_material}
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            High virgin petrochemical dependency, slow decomposition, microplastic fragmentation risk.
          </p>
        </div>

        <div className="md:col-span-2 flex items-center justify-center">
          <div className="p-3 rounded-full bg-slate-950 border border-slate-800 text-teal-400">
            <ArrowRight className="w-5 h-5 hidden md:block" />
            <RefreshCcw className="w-5 h-5 md:hidden" />
          </div>
        </div>

        <div className="md:col-span-5 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 glow-teal">
          <div className="flex items-center space-x-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold">AI Recommended Material</span>
          </div>
          <h4 className="text-sm font-semibold text-emerald-200 mb-1">
            {sustainability.recommended_material}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Monomaterial circular architecture, food-grade certified, 100% recyclable or bio-attributed polymer.
          </p>
        </div>
      </div>

      {/* Eco Improvements List & Recyclability breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        {/* Key Eco Improvements */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sustainability Improvements</span>
          </h4>
          <div className="space-y-2.5">
            {sustainability.improvements?.map((imp, idx) => (
              <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{imp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recyclable Components Breakdown */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center space-x-2">
            <Recycle className="w-3.5 h-3.5 text-teal-400" />
            <span>Component Recyclability Map</span>
          </h4>
          <div className="space-y-2">
            {sustainability.recyclable_components?.map((comp, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-200 font-medium">{comp}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  Closed-Loop
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mandatory Lifecycle Disclaimer */}
      <div className="mt-6 flex items-start space-x-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 leading-relaxed">
        <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-300">Environmental Claims Disclaimer: </span>
          {sustainability.lifecycle_disclaimer || "Qualitative assessment of eco-design principles; exact environmental carbon offset requires formal ISO 14040 certified Life Cycle Assessment (LCA)."}
        </div>
      </div>
    </div>
  );
}
