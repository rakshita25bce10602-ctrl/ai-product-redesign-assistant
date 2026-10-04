import React, { useState } from 'react';
import { 
  Repeat, 
  Layers, 
  Cpu, 
  Sliders, 
  Compass, 
  Trash2, 
  Shuffle, 
  Sparkles,
  CheckCircle
} from 'lucide-react';

const scamperConfigs = [
  {
    key: 'substitute',
    letter: 'S',
    principle: 'Substitute',
    question: 'What component, material, or process can be substituted?',
    icon: Repeat,
    color: 'from-blue-500 to-indigo-600',
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30'
  },
  {
    key: 'combine',
    letter: 'C',
    principle: 'Combine',
    question: 'What functions or components can be combined?',
    icon: Layers,
    color: 'from-teal-500 to-emerald-600',
    text: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/30'
  },
  {
    key: 'adapt',
    letter: 'A',
    principle: 'Adapt',
    question: 'What existing design or mechanism can be adapted?',
    icon: Cpu,
    color: 'from-purple-500 to-indigo-600',
    text: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30'
  },
  {
    key: 'modify',
    letter: 'M',
    principle: 'Modify',
    question: 'What can be changed, enlarged, reduced or reshaped?',
    icon: Sliders,
    color: 'from-amber-500 to-orange-600',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30'
  },
  {
    key: 'put_to_another_use',
    letter: 'P',
    principle: 'Put to Another Use',
    question: 'Can the product or component serve another purpose?',
    icon: Compass,
    color: 'from-pink-500 to-rose-600',
    text: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/30'
  },
  {
    key: 'eliminate',
    letter: 'E',
    principle: 'Eliminate',
    question: 'What unnecessary component, material or step can be removed?',
    icon: Trash2,
    color: 'from-red-500 to-orange-600',
    text: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30'
  },
  {
    key: 'reverse_rearrange',
    letter: 'R',
    principle: 'Reverse / Rearrange',
    question: 'Can the arrangement, usage sequence or geometry be rearranged?',
    icon: Shuffle,
    color: 'from-cyan-500 to-teal-600',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30'
  }
];

export default function ScamperSection({ scamper }) {
  if (!scamper) return null;

  const [activeTab, setActiveTab] = useState('ALL');

  // Normalize suggestions from string or list
  const getSuggestions = (itemKey) => {
    // Handle both reverse and reverse_rearrange key names
    let val = scamper[itemKey];
    if (!val && itemKey === 'reverse_rearrange') {
      val = scamper['reverse'];
    }
    if (!val && itemKey === 'reverse') {
      val = scamper['reverse_rearrange'];
    }

    if (!val) return [];

    // If it's a legacy object with suggestions
    if (typeof val === 'object' && !Array.isArray(val) && val.suggestions) {
      return val.suggestions;
    }

    if (Array.isArray(val)) {
      return val;
    }

    if (typeof val === 'string') {
      return [val];
    }

    return [];
  };

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
            <Sparkles className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-white tracking-tight">
                SCAMPER Redesign Analysis
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
                7-AXIS INNOVATION
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Structured lateral engineering prompts across all 7 creative redesign principles
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              activeTab === 'ALL' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All 7 Principles
          </button>
          {scamperConfigs.map((item) => (
            <button
              key={item.letter}
              onClick={() => setActiveTab(item.letter)}
              className={`w-7 h-7 rounded-lg font-mono font-bold transition-all flex items-center justify-center cursor-pointer ${
                activeTab === item.letter ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {item.letter}
            </button>
          ))}
        </div>
      </div>

      {/* SCAMPER Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {scamperConfigs
          .filter(conf => activeTab === 'ALL' || activeTab === conf.letter)
          .map((conf) => {
            const suggestions = getSuggestions(conf.key);
            const Icon = conf.icon;

            return (
              <div 
                key={conf.letter}
                className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Letter & Title */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2.5">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${conf.color} flex items-center justify-center text-white font-black font-mono text-sm shadow-md`}>
                        {conf.letter}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-tight">
                          {conf.principle}
                        </h4>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">
                          Principle {conf.letter}
                        </span>
                      </div>
                    </div>
                    <div className={`p-1.5 rounded-md ${conf.bg} ${conf.text} border ${conf.border}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Core Prompt Question */}
                  <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-300 italic mb-3.5">
                    "{conf.question}"
                  </div>

                  {/* Concrete Suggestions List */}
                  <div className="space-y-2">
                    {suggestions.length > 0 ? (
                      suggestions.map((sug, sIdx) => (
                        <div key={sIdx} className="flex items-start space-x-2 text-xs text-slate-300 leading-relaxed">
                          <CheckCircle className={`w-3.5 h-3.5 ${conf.text} shrink-0 mt-0.5`} />
                          <span>{sug}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-slate-500 italic">
                        No specific modification identified for this axis.
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Lateral Redesign Engine</span>
                  <span className={conf.text}>Actionable</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
