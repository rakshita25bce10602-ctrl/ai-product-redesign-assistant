import React from 'react';
import { 
  Gauge, 
  Smile, 
  Compass, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  DollarSign, 
  HeartHandshake, 
  Leaf, 
  Lightbulb, 
  Info,
  Award
} from 'lucide-react';

export default function ScoreRadar({ scores }) {
  if (!scores) return null;

  const scoreItems = [
    { key: 'comfort', label: 'Comfort & Ergonomics', val: scores.comfort, icon: Smile, color: 'from-blue-500 to-indigo-500' },
    { key: 'portability', label: 'Portability & Transit', val: scores.portability, icon: Compass, color: 'from-teal-500 to-cyan-500' },
    { key: 'reliability', label: 'Reliability & Durability', val: scores.reliability, icon: ShieldCheck, color: 'from-emerald-500 to-teal-500' },
    { key: 'hygiene', label: 'Hygiene & Cleanability', val: scores.hygiene, icon: HeartHandshake, color: 'from-cyan-500 to-blue-500' },
    { key: 'performance', label: 'Performance & Flow', val: scores.performance, icon: Zap, color: 'from-amber-500 to-yellow-500' },
    { key: 'affordability', label: 'Affordability & Value', val: scores.affordability, icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { key: 'safety', label: 'Safety & Non-Toxicity', val: scores.safety, icon: ShieldCheck, color: 'from-purple-500 to-indigo-500' },
    { key: 'sustainability', label: 'Sustainability & Circularity', val: scores.sustainability, icon: Leaf, color: 'from-teal-400 to-emerald-400' },
    { key: 'innovation', label: 'Innovation & Utility', val: scores.innovation, icon: Lightbulb, color: 'from-fuchsia-500 to-pink-500' },
  ];

  const overall = scores.overall_score || 88;

  const getScoreBadge = (score) => {
    if (score >= 90) return { text: 'Optimal (A+)', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
    if (score >= 80) return { text: 'Strong (A)', bg: 'bg-teal-500/10 text-teal-400 border-teal-500/30' };
    if (score >= 70) return { text: 'Moderate (B)', bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30' };
    return { text: 'Baseline (C)', bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
  };

  const overallBadge = getScoreBadge(overall);

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center text-slate-950 shadow-lg shadow-teal-500/20">
            <Gauge className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              AI Redesign Score Dashboard
            </h3>
            <p className="text-xs text-slate-400">
              Evaluated across 9 engineering, usability, and environmental dimensions (0–100 scale)
            </p>
          </div>
        </div>

        {/* Overall Score Badge Pill */}
        <div className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Overall Redesign Index</div>
            <div className="text-xs font-semibold text-teal-400">{overallBadge.text}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center font-black text-slate-950 text-xl shadow-md">
            {overall}
          </div>
        </div>
      </div>

      {/* Grid of Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {scoreItems.map((item) => {
          const Icon = item.icon;
          const badge = getScoreBadge(item.val);

          return (
            <div 
              key={item.key}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">
                    {item.label}
                  </span>
                </div>
                <span className="text-sm font-bold font-mono text-white">
                  {item.val}<span className="text-[10px] text-slate-500 font-normal">/100</span>
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden p-0.5 border border-slate-800">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000`}
                  style={{ width: `${item.val}%` }}
                />
              </div>

              <div className="flex items-center justify-between mt-2 text-[10px]">
                <span className="text-slate-500">Assessment Tier</span>
                <span className={`font-medium px-1.5 py-0.2 rounded border ${badge.bg}`}>
                  {badge.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Required Disclaimer Callout */}
      <div className="mt-6 flex items-start space-x-3 p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/20 text-xs text-slate-400 leading-relaxed">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-200">AI Assessment Notice: </span>
          {scores.disclaimer || "These scores are AI-generated design assessment indices based on user requirements, ergonomic heuristics, and material properties, not experimentally certified lab testing measurements."}
        </div>
      </div>
    </div>
  );
}
