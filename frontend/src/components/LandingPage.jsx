import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Droplet, 
  Leaf, 
  ShieldCheck, 
  Briefcase, 
  CheckCircle, 
  Box
} from 'lucide-react';
import WorkflowVisual from './WorkflowVisual';

export default function LandingPage({ onStart, onQuickDemo }) {
  const targetProfiles = [
    {
      title: "Students",
      icon: "🎓",
      needs: "Lightweight • Low Cost • Leak-proof • Easy Carry • Backpack Fit",
      color: "from-blue-500/10 to-indigo-500/10 border-blue-500/30 text-blue-300"
    },
    {
      title: "Office Workers",
      icon: "💼",
      needs: "One-Hand Operation • Thermal Retention • Clean Look • Desk-Friendly",
      color: "from-cyan-500/10 to-teal-500/10 border-cyan-500/30 text-cyan-300"
    },
    {
      title: "Fitness & Sports",
      icon: "⚡",
      needs: "Ergonomic Grip • Quick-Sip Spout • Volume Markings • High Flow",
      color: "from-teal-500/10 to-emerald-500/10 border-teal-500/30 text-teal-300"
    },
    {
      title: "Travellers & Commuters",
      icon: "✈️",
      needs: "Secure Sealing • Carry Carabiner • Impact Durability • Cupholder Fit",
      color: "from-purple-500/10 to-indigo-500/10 border-purple-500/30 text-purple-300"
    },
    {
      title: "Families & Children",
      icon: "👨‍👩‍👧‍👦",
      needs: "100% BPA-Free • Soft Bite Valve • Anti-Mold Cleaning • Safe Rounded Edges",
      color: "from-rose-500/10 to-pink-500/10 border-rose-500/30 text-rose-300"
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 px-4">
        {/* Glow ambient sphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Project Tag */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>NextGen AI Engineering & Circular Redesign Assistant</span>
        </div>

        {/* Main Title & Subtitle */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15]">
          AI Product <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">Redesign</span> Assistant
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
          Transform existing physical products into smarter, more ergonomic, and sustainable designs with AI heuristics and the SCAMPER framework.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] transition-all flex items-center space-x-2"
          >
            <span>Start Redesigning</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={onQuickDemo}
            className="px-6 py-4 rounded-xl text-base font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all flex items-center space-x-2"
          >
            <Droplet className="w-5 h-5 text-cyan-400" />
            <span>Try Water Bottle Demo</span>
          </button>
        </div>

        {/* Feature quick badges */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-400">
          <div className="flex items-center justify-center space-x-1.5">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>Sustainable Materials</span>
          </div>
          <div className="flex items-center justify-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>SCAMPER Analysis</span>
          </div>
          <div className="flex items-center justify-center space-x-1.5">
            <Box className="w-4 h-4 text-cyan-400" />
            <span>Interactive 3D Mockup</span>
          </div>
          <div className="flex items-center justify-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Multi-Profile Ergonomics</span>
          </div>
        </div>
      </section>

      {/* Visual Workflow Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
            Engineering Workflow Pipeline
          </h2>
          <h3 className="text-2xl font-bold text-white mt-1">
            How The Redesign Engine Operates
          </h3>
        </div>

        <div className="rounded-2xl bg-slate-900/50 border border-slate-800/80 p-6 backdrop-blur-sm">
          <WorkflowVisual currentStep={0} />
        </div>
      </section>

      {/* Demonstration Showcase Card */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/20 p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-semibold">
                <Droplet className="w-3.5 h-3.5" />
                <span>Featured Showcase #1</span>
              </div>
              <h3 className="text-3xl font-extrabold text-white tracking-tight">
                Plastic Water Bottle Demonstration
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                See how a disposable, single-use PET water bottle is re-engineered with ergonomic hex-grips, modular cleanable bases, leak-proof autoseal caps, and 100% circular recycled Tritan polymers.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Ergonomic Hex-Grip contours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Modular wide-mouth cleaning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>One-touch leakproof safety spout</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>50% certified circular rPET/Tritan</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onQuickDemo}
                  className="px-6 py-3 rounded-xl font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all flex items-center space-x-2 shadow-lg shadow-teal-500/20"
                >
                  <span>Explore Water Bottle Redesign</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 h-80 rounded-2xl bg-slate-950 border border-slate-800 p-4 shadow-xl flex items-center justify-center group overflow-hidden">
                <img 
                  src="/demo-bottle.svg" 
                  alt="Plastic Water Bottle" 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target User Profiles Matrix */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="text-center mb-8">
          <h2 className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
            Extensible User Archetypes
          </h2>
          <h3 className="text-2xl font-bold text-white mt-1">
            Engineered For Specific User Needs & Priorities
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl mx-auto">
            The redesign engine dynamically shifts ergonomic trade-offs based on target user persona priorities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {targetProfiles.map((p, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-xl bg-slate-900/70 border ${p.color} hover:border-teal-400/60 transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="text-2xl mb-2">{p.icon}</div>
                <h4 className="text-sm font-bold text-white mb-2">{p.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{p.needs}</p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-800/60 text-[10px] text-slate-500 font-mono">
                Profile Active
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
