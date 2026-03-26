import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function OnboardingPage({ onComplete, onLogoClick }) {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [error, setError] = useState("");

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Manufacturing",
    "Education",
    "Retail",
    "Other",
  ];

  const employeeRanges = ["1-50", "51-200", "201-500", "501-1000", "1000+"];

  const generateCompanyCode = (name) => {
    const prefix = name
      .replace(/[^a-zA-Z]/g, "")
      .substring(0, 4)
      .toUpperCase()
      .padEnd(4, "X");
    const digits = Math.floor(1000 + Math.random() * 9000).toString();
    return prefix + digits;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!companyName.trim()) {
      setError("Please enter your company name");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your work email");
      return;
    }

    const companyCode = generateCompanyCode(companyName);

    localStorage.setItem(
      "trustroom_onboarding",
      JSON.stringify({
        companyName: companyName.trim(),
        email: email.trim(),
        industry,
        employeeCount,
        companyCode,
      })
    );

    onComplete(companyCode);
  };

  const inputClass =
    "w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500";
  const selectClass =
    "w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 appearance-none";

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="w-full max-w-lg px-6 py-12">
        {/* Logo */}
        <div className="text-center mb-8">
          <button onClick={onLogoClick} className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-semibold text-white">TrustRoom</span>
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-sm font-semibold">1</div>
            <span className="text-sm text-slate-300">Set up company</span>
          </div>
          <div className="w-8 h-px bg-slate-700"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-sm text-slate-500">2</div>
            <span className="text-sm text-slate-500">Dashboard</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h1 className="text-2xl font-bold mb-2">Set up your company</h1>
          <p className="text-slate-400 mb-8">Tell us about your organization</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Company Name */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Company Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g., Acme Corporation"
                className={inputClass}
              />
            </div>

            {/* Work Email */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Work Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className={inputClass}
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">Industry</label>
              <div className="relative">
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className={selectClass}
                >
                  <option value="" className="bg-slate-900">Select industry</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind} className="bg-slate-900">
                      {ind}
                    </option>
                  ))}
                </select>
                <svg className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Employee Count */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">Number of Employees</label>
              <div className="relative">
                <select
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(e.target.value)}
                  className={selectClass}
                >
                  <option value="" className="bg-slate-900">Select range</option>
                  {employeeRanges.map((range) => (
                    <option key={range} value={range} className="bg-slate-900">
                      {range}
                    </option>
                  ))}
                </select>
                <svg className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-6 text-lg rounded-xl mt-2"
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
