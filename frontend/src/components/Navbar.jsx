import React from 'react';
import { Sparkles, RefreshCw, History, Droplet, ArrowRight, Cpu } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onQuickDemo, apiStatus }) {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('landing')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-all">
              <RefreshCw className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-teal-200 bg-clip-text text-transparent">
                  AI Product Redesign
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30">
                  ASSISTANT
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Sustainable Physical Product Engineering
              </p>
            </div>
          </div>

          {/* Nav items */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('landing')}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'landing'
                  ? 'bg-slate-800 text-teal-300 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('input')}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
                activeTab === 'input' || activeTab === 'result'
                  ? 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Redesign Studio</span>
            </button>
            <button
              onClick={onQuickDemo}
              className="px-3.5 py-2 rounded-lg text-xs font-medium text-cyan-300 hover:text-cyan-200 hover:bg-cyan-950/40 border border-cyan-500/20 transition-all flex items-center space-x-1.5"
            >
              <Droplet className="w-3.5 h-3.5 text-cyan-400" />
              <span>Bottle Demo</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
                activeTab === 'history'
                  ? 'bg-slate-800 text-teal-300 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>History</span>
            </button>
          </nav>

          {/* Right Status & Action */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center space-x-2 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-[11px]">
              <Cpu className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
              <span className="text-slate-400">Engine:</span>
              <span className="font-medium text-slate-200">
                {apiStatus?.has_gemini_key ? 'Gemini 1.5' : 'Heuristic Engine (Demo)'}
              </span>
            </div>

            <button
              onClick={() => setActiveTab('input')}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 shadow-md shadow-teal-500/20 hover:shadow-teal-500/30 transition-all flex items-center space-x-1.5"
            >
              <span>Redesign Product</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
