import React from 'react';
import { Box, Cpu, AlertTriangle, Lightbulb, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    step: 1,
    title: "Existing Product",
    desc: "Input baseline specs, materials, and user profile.",
    icon: Box,
    color: "from-blue-500 to-indigo-500",
    border: "border-blue-500/30",
    badge: "Input Baseline"
  },
  {
    step: 2,
    title: "AI Analysis",
    desc: "Heuristic evaluation of ergonomics & usability.",
    icon: Cpu,
    color: "from-indigo-500 to-purple-500",
    border: "border-indigo-500/30",
    badge: "Multi-factor AI"
  },
  {
    step: 3,
    title: "Problem Identification",
    desc: "Pinpoint design flaws, leaks, grip & waste.",
    icon: AlertTriangle,
    color: "from-amber-500 to-orange-500",
    border: "border-amber-500/30",
    badge: "Flaw Detection"
  },
  {
    step: 4,
    title: "Suggest Improvements",
    desc: "SCAMPER framework & sustainable mechanics.",
    icon: Lightbulb,
    color: "from-teal-500 to-emerald-500",
    border: "border-teal-500/30",
    badge: "SCAMPER & Eco"
  },
  {
    step: 5,
    title: "Improved Product",
    desc: "3D concept model, comparison matrix & scores.",
    icon: Sparkles,
    color: "from-cyan-500 to-teal-400",
    border: "border-cyan-500/30",
    badge: "NextGen Output"
  }
];

export default function WorkflowVisual({ currentStep = 0, interactive = false, onStepClick }) {
  return (
    <div className="w-full py-6">
      <div className="relative">
        {/* Desktop Step Flow */}
        <div className="hidden lg:grid grid-cols-5 gap-3 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isCompleted = currentStep > item.step;
            const isCurrent = currentStep === item.step;

            return (
              <div 
                key={item.step}
                onClick={() => interactive && onStepClick && onStepClick(item.step)}
                className={`relative rounded-xl p-4 transition-all duration-300 ${
                  isCurrent 
                    ? 'bg-slate-900 border-2 border-teal-400/80 glow-teal translate-y-[-2px]' 
                    : 'bg-slate-900/60 border border-slate-800/80 hover:border-slate-700'
                } ${interactive ? 'cursor-pointer' : ''}`}
              >
                {/* Step number badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    STEP 0{item.step}
                  </span>
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${item.color} flex items-center justify-center text-slate-950 shadow-md`}>
                    <Icon className="w-4 h-4 text-white stroke-[2.2]" />
                  </div>
                </div>

                <h4 className="text-sm font-semibold text-white tracking-tight mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>

                {/* Connecting arrow for steps 1-4 */}
                {idx < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden xl:flex items-center justify-center w-6 h-6 rounded-full bg-slate-950 border border-slate-700 text-slate-400">
                    <ArrowRight className="w-3 h-3 text-teal-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile / Tablet Step Flow */}
        <div className="lg:hidden space-y-3">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.step}
                className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800"
              >
                <div className={`w-9 h-9 rounded-lg shrink-0 bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-md`}>
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono text-teal-400">0{item.step}</span>
                    <h4 className="text-xs font-semibold text-white">{item.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
