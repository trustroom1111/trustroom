import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function NewDashboard({ onLogout, onLogoClick, onNavigate }) {
  const [companyData, setCompanyData] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("trustroom_onboarding");
    if (saved) {
      setCompanyData(JSON.parse(saved));
    }
  }, []);

  const portalLink = companyData
    ? `trustroom.vercel.app/portal/${companyData.companyCode}`
    : "";

  const copyLink = () => {
    navigator.clipboard.writeText(`https://${portalLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("trustroom_onboarding");
    onLogout();
  };

  const categories = [
    "Unfair Treatment",
    "Toxic Behaviour",
    "Workload Issues",
    "Office Politics",
    "Mental Health",
    "Manager Feedback",
    "Policy Violations",
    "Suggestions",
  ];

  const severities = [
    { label: "High", color: "text-red-400" },
    { label: "Medium", color: "text-yellow-400" },
    { label: "Low", color: "text-green-400" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top Bar */}
      <header className="px-6 py-4 md:px-8 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-semibold text-white">TrustRoom</span>
            </button>
            {companyData && (
              <>
                <div className="hidden md:block h-6 w-px bg-slate-700"></div>
                <span className="hidden md:block text-slate-400">{companyData.companyName}</span>
              </>
            )}
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-slate-700 text-slate-400 hover:bg-slate-800"
          >
            Log out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8 md:px-8 max-w-7xl mx-auto">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Submissions", value: "0", icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            )},
            { label: "Open Cases", value: "0", icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )},
            { label: "Resolved", value: "0", icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )},
            { label: "Avg Response Time", value: "--", icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )},
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-teal-500/10 rounded-lg flex items-center justify-center text-teal-400">
                  {stat.icon}
                </div>
                <span className="text-slate-400 text-sm">{stat.label}</span>
              </div>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left Column - Recent Submissions */}
          <div className="lg:col-span-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800">
                <h2 className="text-lg font-semibold">Recent Submissions</h2>
              </div>
              <div className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-800 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No submissions yet</h3>
                <p className="text-slate-400 mb-6 max-w-sm mx-auto">
                  Share your employee portal link to get started. Employees can submit concerns anonymously.
                </p>
                <Button
                  onClick={copyLink}
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                >
                  {copied ? "Copied!" : "Copy Portal Link"}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Employee Portal Link Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Employee Portal Link
              </h3>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 mb-4">
                <p className="text-teal-400 text-sm font-mono break-all">{portalLink}</p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={copyLink}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {copied ? "Copied!" : "Copy"}
                </Button>
                <Button
                  onClick={() => onNavigate("employee-portal", companyData?.companyCode)}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Preview Portal
                </Button>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Quick Stats</h3>

              {/* Categories Breakdown */}
              <div className="mb-6">
                <h4 className="text-slate-400 text-sm mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <div key={cat} className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">{cat}</span>
                      <span className="text-slate-600 text-sm font-mono">0</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Severity Breakdown */}
              <div>
                <h4 className="text-slate-400 text-sm mb-3">Severity</h4>
                <div className="space-y-2">
                  {severities.map((sev) => (
                    <div key={sev.label} className="flex items-center justify-between">
                      <span className={`text-sm ${sev.color}`}>{sev.label}</span>
                      <span className="text-slate-600 text-sm font-mono">0</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
