import { useState, useEffect } from "react";

export default function EmployeePortal({ companyCode, onNavigate, onLogoClick }) {
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("trustroom_onboarding");
    if (saved) {
      const data = JSON.parse(saved);
      if (data.companyCode === companyCode) {
        setCompanyName(data.companyName);
      }
    }
  }, [companyCode]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="w-full max-w-2xl px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <button onClick={onLogoClick} className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
          </button>
          {companyName && (
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-2 mb-4">
              <span className="text-sm text-teal-400">{companyName}</span>
            </div>
          )}
          {!companyName && companyCode && (
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 mb-4">
              <span className="text-sm text-slate-400 font-mono">{companyCode}</span>
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Your Voice Matters</h1>
          <p className="text-slate-400 text-lg">
            This is a safe and anonymous space to share your workplace concerns
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {/* Report an Issue */}
          <button
            onClick={() => onNavigate("company-submit", companyCode)}
            className="group bg-slate-900 border border-slate-800 rounded-2xl p-8 text-left hover:border-teal-500/50 hover:bg-slate-900/80 transition-all"
          >
            <div className="w-14 h-14 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400 mb-5 group-hover:bg-teal-500/20 transition-colors">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors">
              Report an Issue
            </h2>
            <p className="text-slate-400 text-sm">
              Submit a workplace concern anonymously
            </p>
            <div className="mt-4 text-teal-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Get started &rarr;
            </div>
          </button>

          {/* Track Your Report */}
          <button
            onClick={() => onNavigate("track")}
            className="group bg-slate-900 border border-slate-800 rounded-2xl p-8 text-left hover:border-teal-500/50 hover:bg-slate-900/80 transition-all"
          >
            <div className="w-14 h-14 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400 mb-5 group-hover:bg-teal-500/20 transition-colors">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors">
              Track Your Report
            </h2>
            <p className="text-slate-400 text-sm">
              Check the status of your submission
            </p>
            <div className="mt-4 text-teal-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Enter tracking code &rarr;
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-slate-500 text-sm">
            <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Your identity is always protected. All submissions are anonymous.
          </div>
        </div>
      </div>
    </div>
  );
}
