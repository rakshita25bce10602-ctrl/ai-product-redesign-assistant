import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ProductInputPage from './components/ProductInputPage';
import AnalysisProgress from './components/AnalysisProgress';
import RedesignResultPage from './components/RedesignResultPage';
import HistoryPage from './components/HistoryPage';
import { RefreshCw, AlertCircle, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [currentResult, setCurrentResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);
  const [loadingContext, setLoadingContext] = useState({ name: 'Product', user: 'Target User' });
  const [globalError, setGlobalError] = useState(null);

  // Fetch API health status on load
  const fetchHealth = () => {
    fetch('https://ai-product-redesign-assistant-1.onrender.com/api/health')
      .then(res => res.json())
      .then(data => setApiStatus(data))
      .catch(err => {
        console.warn("Backend API not reachable directly; running local proxy fallback.", err);
        setApiStatus({ has_gemini_key: false, demo_mode_active: true });
      });
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  // Handle Redesign submission to /api/analyze-product
  const handleSubmitRedesign = async (formData) => {
    setGlobalError(null);
    setLoadingContext({
      name: formData.product_name,
      user: formData.target_user
    });
    setIsLoading(true);
    setActiveTab('analysis');

    const startTime = Date.now();

    try {
      const response = await fetch('https://ai-product-redesign-assistant-1.onrender.com/api/analyze-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        let errMessage = `Analysis request failed (Status ${response.status})`;
        try {
          const errData = await response.json();
          if (errData.detail) {
            errMessage = errData.detail;
          }
        } catch {}
        throw new Error(errMessage);
      }

      const data = await response.json();
      
      // Ensure the progress checklist displays for at least ~1.5s so the user visually sees the evaluation stages
      const elapsed = Date.now() - startTime;
      const remainingWait = Math.max(0, 1800 - elapsed);

      setTimeout(() => {
        setCurrentResult(data);
        setIsLoading(false);
        setActiveTab('result');
      }, remainingWait);

    } catch (err) {
      console.error("Redesign submission error:", err);
      setIsLoading(false);
      setActiveTab('input');
      setGlobalError(err.message || "Failed to analyze product. Please verify the backend connection.");
    }
  };

  // Quick demo water bottle handler
  const handleQuickDemoBottle = async () => {
    setGlobalError(null);
    setLoadingContext({
      name: 'Single-Use Plastic Water Bottle',
      user: 'Fitness & Sports Users'
    });
    setIsLoading(true);
    setActiveTab('analysis');

    const startTime = Date.now();

    try {
      const res = await fetch('https://ai-product-redesign-assistant-1.onrender.com/api/demo-bottle');
      if (res.ok) {
        const data = await res.json();
        const elapsed = Date.now() - startTime;
        const remainingWait = Math.max(0, 1800 - elapsed);
        setTimeout(() => {
          setCurrentResult(data);
          setIsLoading(false);
          setActiveTab('result');
        }, remainingWait);
        return;
      }
    } catch (e) {
      console.warn("Direct demo bottle error, falling back to analyze-product payload", e);
    }

    // Direct submission fallback
    handleSubmitRedesign({
      product_name: "Single-Use Plastic Water Bottle",
      category: "Water Bottle",
      target_user: "Fitness & Sports Users",
      selected_priorities: ["Comfort", "Portability", "Sustainability", "Durability", "Hygiene"],
      user_problems: "Slippery when sweaty, flimsy disposable cap, leaks inside gym bag, difficult to clean narrow neck.",
      image_url: "/demo-bottle.svg"
    });
  };

  // Select history record
  const handleSelectHistoryRecord = async (recordId) => {
    setGlobalError(null);
    try {
      const res = await fetch(`https://ai-product-redesign-assistant-1.onrender.com/api/redesign/${recordId}`);
      if (res.ok) {
        const data = await res.json();
        setCurrentResult(data);
        setActiveTab('result');
      }
    } catch (err) {
      console.error("Failed to load redesign record", err);
      setGlobalError("Unable to retrieve the requested redesign project.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-teal-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onQuickDemo={handleQuickDemoBottle}
        apiStatus={apiStatus}
      />

      {/* Global Error Banner */}
      {globalError && (
        <div className="max-w-5xl mx-auto px-4 mt-4 w-full">
          <div className="p-4 rounded-2xl bg-rose-950/70 border border-rose-500/40 flex items-center justify-between text-rose-200 text-xs shadow-xl">
            <div className="flex items-center space-x-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{globalError}</span>
            </div>
            <button
              onClick={() => setGlobalError(null)}
              className="p-1 rounded bg-rose-900/50 hover:bg-rose-900 text-rose-300 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage 
            onStart={() => setActiveTab('input')}
            onQuickDemo={handleQuickDemoBottle}
          />
        )}

        {activeTab === 'input' && (
          <ProductInputPage 
            onSubmit={handleSubmitRedesign}
            isLoading={isLoading}
            apiStatus={apiStatus}
          />
        )}

        {activeTab === 'analysis' && (
          <AnalysisProgress 
            productName={loadingContext.name}
            targetUser={loadingContext.user}
          />
        )}

        {activeTab === 'result' && (
          <RedesignResultPage 
            result={currentResult}
            onNewAnalysis={() => setActiveTab('input')}
          />
        )}

        {activeTab === 'history' && (
          <HistoryPage 
            onSelectRecord={handleSelectHistoryRecord}
            onNewAnalysis={() => setActiveTab('input')}
          />
        )}
      </main>

      {/* Modern Engineering Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <RefreshCw className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-300">
              AI Product Redesign Assistant
            </span>
            <span className="text-slate-600">•</span>
            <span>Sustainable Industrial Design & SCAMPER System</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-slate-500">
            <span>FastAPI + SQLite + React + Three.js</span>
            <span>•</span>
            <span className="text-teal-400 font-mono">Reference: Plastic Water Bottle</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

