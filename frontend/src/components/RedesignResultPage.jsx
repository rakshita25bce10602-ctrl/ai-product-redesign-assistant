import React from 'react';
import { 
  Sparkles, 
  Download, 
  Printer, 
  ArrowLeft, 
  Box, 
  Info
} from 'lucide-react';
import ThreeDViewer from './ThreeDViewer';
import ScoreRadar from './ScoreRadar';
import ScamperSection from './ScamperSection';
import SustainabilityCard from './SustainabilityCard';
import ComparisonMatrix from './ComparisonMatrix';

export default function RedesignResultPage({ result, onNewAnalysis }) {
  if (!result) return null;

  const productInfo = result.product || {
    name: result.product_name,
    category: result.product_category,
    description: result.executive_summary || result.redesign_summary
  };

  const getSeverityBadge = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'low':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `redesign-${(productInfo.name || 'product').toLowerCase().replace(/\s+/g, '-')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  const recommendations = result.redesign_recommendations || result.recommendations || [];
  const problems = result.identified_problems || [];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      {/* Demo Mode Notice Banner if running in demo mode */}
      {result.is_demo_mode && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-slate-900 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-300">
                Demo Mode Active
              </div>
              <p className="text-[11px] text-slate-400">
                Demo Mode — Connect your AI API key (<code className="font-mono text-amber-300">GEMINI_API_KEY</code>) to enable live product analysis.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-900 text-amber-400 border border-amber-500/30">
            Heuristic Reference Output
          </span>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <button
          onClick={onNewAnalysis}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all flex items-center space-x-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Configure New Redesign</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleDownloadJSON}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-teal-400" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all flex items-center space-x-1.5 shadow-md shadow-teal-500/20 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Executive Summary Hero Card */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30 font-semibold">
                AI REDESIGN REPORT
              </span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Target: {result.target_user}
              </span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Category: {productInfo.category}
              </span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                Engine: {result.ai_model_used || "AI Engine"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {productInfo.name}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {productInfo.description || result.redesign_summary || result.executive_summary}
            </p>

            {/* Observed & Inferred Characteristics */}
            {productInfo.observed_features?.length > 0 && (
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5 text-xs">
                <div className="text-[10px] font-mono uppercase text-teal-400 font-bold">
                  Observed Visual Characteristics:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {productInfo.observed_features.map((obs, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 text-[11px]">
                      • {obs}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Priorities */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-slate-400 font-medium mr-1">Optimized for:</span>
              {(result.selected_priorities || result.design_priorities)?.map((p, idx) => (
                <span key={idx} className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-800/90 text-teal-300 border border-slate-700">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Existing Product Image Preview Box */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-[240px] rounded-2xl bg-slate-950 border border-slate-800 p-4 shadow-xl text-center space-y-3">
              <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                Existing Product Baseline
              </div>
              <div className="h-44 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-center overflow-hidden p-2">
                {result.image_url ? (
                  <img 
                    src={result.image_url} 
                    alt="Baseline product" 
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-center p-3 text-slate-500">
                    <Box className="w-10 h-10 mx-auto mb-1 text-slate-600" />
                    <span className="text-xs">No image provided</span>
                  </div>
                )}
              </div>
              <div className="text-[11px] text-slate-400">
                Category: <span className="text-slate-200">{productInfo.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Identified Problems Section */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <h2 className="text-lg font-bold text-white tracking-tight uppercase">
            Identified Problems & Friction Points
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {problems.map((prob, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {prob.category || 'Problem'}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase ${getSeverityBadge(prob.severity)}`}>
                    {prob.severity} Severity
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">
                  {prob.problem}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {prob.reason || prob.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Issue #0{idx + 1}</span>
                <span className="text-rose-400">Redesign priority</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Recommended Improvements Section */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
          <h2 className="text-lg font-bold text-white tracking-tight uppercase">
            Recommended Redesign Solutions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/90 border border-teal-500/20 hover:border-teal-500/40 transition-all space-y-3.5 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-teal-400 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
                  Area: {rec.area || rec.category || 'Design'}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  Solution 0{idx + 1}
                </span>
              </div>

              {rec.current_issue && (
                <div>
                  <span className="text-[10px] font-mono uppercase text-rose-400 block mb-0.5">Current Issue:</span>
                  <p className="text-xs text-slate-300 font-medium leading-snug">
                    {rec.current_issue}
                  </p>
                </div>
              )}

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-teal-400 font-bold block mb-0.5">Redesign Recommendation:</span>
                <p className="text-xs text-slate-200 font-medium leading-snug">
                  {rec.recommendation || rec.proposed_solution}
                </p>
                {rec.reason && (
                  <p className="text-[11px] text-slate-400 leading-snug pt-1">
                    <span className="text-slate-500">Rationale: </span>{rec.reason}
                  </p>
                )}
              </div>

              <div className="flex items-start space-x-2 text-xs text-cyan-300 bg-cyan-950/30 p-2.5 rounded-lg border border-cyan-500/20">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Expected Benefit: </span>
                  {rec.benefit || rec.expected_benefit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SCAMPER Analysis Section */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
          <h2 className="text-lg font-bold text-white tracking-tight uppercase">
            SCAMPER Redesign Analysis
          </h2>
        </div>
        <ScamperSection scamper={result.scamper} />
      </section>

      {/* 4. Redesign Score Dashboard */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <h2 className="text-lg font-bold text-white tracking-tight uppercase">
            AI Redesign Score Dashboard
          </h2>
        </div>
        <ScoreRadar scores={result.scores} />
      </section>

      {/* 5. Sustainability Analysis Section */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <h2 className="text-lg font-bold text-white tracking-tight uppercase">
            Sustainability & Material Circularity
          </h2>
        </div>
        <SustainabilityCard sustainability={result.sustainability} />
      </section>

      {/* 6. Existing vs Redesigned Comparison Matrix */}
      {result.comparison?.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
            <h2 className="text-lg font-bold text-white tracking-tight uppercase">
              Existing vs. Redesigned Comparison Matrix
            </h2>
          </div>
          <ComparisonMatrix comparison={result.comparison} />
        </section>
      )}

      {/* 7. 3D Visual Concept Representation */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
          <h2 className="text-lg font-bold text-white tracking-tight uppercase">
            AI Redesign Concept & 3D WebGL Inspection
          </h2>
        </div>
        <ThreeDViewer 
          modelType={result.visual_concept?.model_type || productInfo.category}
          conceptTitle={result.visual_concept?.concept_title}
          palette={result.visual_concept?.color_palette}
          highlights={result.visual_concept?.key_highlights}
        />
      </section>

      {/* 8. Final Redesign Summary Card */}
      {result.redesign_summary && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
          <h3 className="text-xs font-bold text-teal-400 uppercase tracking-wider">
            Final Redesign Summary
          </h3>
          <p className="text-sm text-slate-200 leading-relaxed">
            {result.redesign_summary}
          </p>
        </div>
      )}

      {/* Bottom CTA bar */}
      <div className="pt-6 pb-12 text-center space-y-4">
        <p className="text-xs text-slate-400">
          Ready to re-engineer another product or adjust your priorities?
        </p>
        <button
          onClick={onNewAnalysis}
          className="px-8 py-3.5 rounded-xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 shadow-xl shadow-teal-500/25 transition-all cursor-pointer"
        >
          Redesign Another Physical Product
        </button>
      </div>
    </div>
  );
}
