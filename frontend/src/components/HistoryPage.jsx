import React, { useState, useEffect } from 'react';
import { History, Search, ArrowRight, Box, Calendar, Gauge, Sparkles } from 'lucide-react';

export default function HistoryPage({ onSelectRecord, onNewAnalysis }) {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/history')
      .then(res => res.json())
      .then(data => {
        setRecords(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load history", err);
        setLoading(false);
      });
  }, []);

  const filtered = records.filter(r => 
    r.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.product_category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.target_user?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (isoStr) => {
    try {
      return new Date(isoStr).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30">
              PERSISTENT DATABASE
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
            Redesign History & Saved Projects
          </h2>
          <p className="text-xs text-slate-400">
            Past physical product redesign analyses stored in SQLite
          </p>
        </div>

        <button
          onClick={onNewAnalysis}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all flex items-center space-x-1.5 shadow-md shadow-teal-500/20"
        >
          <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>New Redesign</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search saved redesigns by product name, category, or user profile..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-teal-500 text-xs text-white placeholder-slate-500 outline-none transition-all"
        />
      </div>

      {/* History List */}
      {loading ? (
        <div className="py-16 text-center text-slate-500 text-xs font-mono">
          Loading redesign records from database...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center space-y-3 rounded-2xl bg-slate-900/40 border border-slate-800 p-8">
          <Box className="w-12 h-12 text-slate-600 mx-auto" />
          <h4 className="text-sm font-semibold text-slate-300">No redesign records found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Execute your first product redesign analysis to automatically persist records in the database.
          </p>
          <button
            onClick={onNewAnalysis}
            className="px-4 py-2 rounded-lg text-xs font-medium bg-teal-500 text-slate-950 hover:bg-teal-400 transition-all"
          >
            Start First Redesign
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectRecord(item.id)}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 cursor-pointer transition-all hover:translate-y-[-2px] group shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {item.product_category}
                  </span>
                  <div className="flex items-center space-x-1 text-teal-400 text-xs font-bold font-mono">
                    <Gauge className="w-3.5 h-3.5" />
                    <span>Score: {item.overall_score || 88}</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
                  {item.product_name}
                </h3>

                <div className="mt-2 text-xs text-slate-400">
                  Target Profile: <span className="text-slate-200">{item.target_user}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(item.created_at)}</span>
                </div>
                <div className="flex items-center space-x-1 text-teal-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Open Report</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
