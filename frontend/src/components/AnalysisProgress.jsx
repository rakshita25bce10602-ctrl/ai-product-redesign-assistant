import React, { useEffect, useState } from 'react';
import { Cpu, CheckCircle2, Loader2, Sparkles, Activity, Shield, Leaf, Box, Layers, Gauge } from 'lucide-react';

const stages = [
  { id: 1, text: "Analyzing product baseline and visible characteristics", icon: Box },
  { id: 2, text: "Identifying design problems & failure points", icon: Shield },
  { id: 3, text: "Evaluating target user needs & ergonomic priorities", icon: Activity },
  { id: 4, text: "Running SCAMPER lateral engineering analysis", icon: Sparkles },
  { id: 5, text: "Generating sustainable redesign recommendations", icon: Leaf },
  { id: 6, text: "Calculating multi-factor design scores & 3D mockup", icon: Gauge },
];

export default function AnalysisProgress({ productName, targetUser }) {
  const [currentStage, setCurrentStage] = useState(1);
  const [percent, setPercent] = useState(18);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev < stages.length ? prev + 1 : prev));
      setPercent((prev) => Math.min(prev + 16, 95));
    }, 550);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-8 shadow-2xl relative overflow-hidden">
        {/* Top glowing ambient line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-400 to-indigo-500 animate-pulse" />

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-500 mx-auto flex items-center justify-center shadow-lg shadow-teal-500/25 mb-4 animate-bounce">
            <Cpu className="w-8 h-8 text-slate-950 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Analyzing {productName || 'Product'}...
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Synthesizing industrial design heuristics for <span className="text-teal-300 font-semibold">{targetUser}</span>
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Engineering Engine Processing</span>
            <span className="text-teal-400 font-bold">{percent}%</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-800">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Stages Checklist */}
        <div className="space-y-3.5">
          {stages.map((stage) => {
            const isDone = currentStage > stage.id;
            const isCurrent = currentStage === stage.id;
            const Icon = stage.icon;

            return (
              <div 
                key={stage.id}
                className={`flex items-center space-x-3.5 p-3 rounded-xl border transition-all ${
                  isDone 
                    ? 'bg-slate-950/70 border-teal-500/30 text-slate-200' 
                    : isCurrent 
                      ? 'bg-slate-950 border-cyan-500/50 text-white shadow-sm glow-cyan' 
                      : 'bg-slate-950/30 border-slate-800/60 text-slate-500'
                }`}
              >
                <div className="shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-teal-400" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] font-mono text-slate-500">
                      {stage.id}
                    </div>
                  )}
                </div>

                <div className="flex-1 text-xs font-medium">
                  {stage.text}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-slate-500 font-mono">
          Evaluating structural mechanics, material circularity & ergonomic factors
        </div>
      </div>
    </div>
  );
}
