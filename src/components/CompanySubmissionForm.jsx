import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "../supabase";

export default function CompanySubmissionForm({ companyCode, onSuccess, onLogoClick }) {
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    { id: "unfair-treatment", label: "Unfair Treatment", desc: "Favouritism, bias, or discrimination" },
    { id: "toxic-behaviour", label: "Toxic Behaviour", desc: "Bullying, harassment, or disrespect" },
    { id: "workload-issues", label: "Workload Issues", desc: "Unrealistic expectations or burnout" },
    { id: "office-politics", label: "Office Politics", desc: "Power plays affecting your career" },
    { id: "mental-health", label: "Mental Health", desc: "Work-related stress or anxiety" },
    { id: "manager-feedback", label: "Manager Feedback", desc: "Issues with leadership behaviour" },
    { id: "policy-violations", label: "Policy Violations", desc: "Rules being broken or ignored" },
    { id: "suggestions", label: "Suggestions", desc: "Ideas to improve the workplace" },
  ];

  useEffect(() => {
    fetchCompany();
  }, [companyCode]);

  const fetchCompany = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .eq("code", companyCode.toUpperCase())
      .single();

    if (error || !data) {
      setNotFound(true);
    } else {
      setCompany(data);
    }
    setIsLoading(false);
  };

  const generateTrackingCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "TR-";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!category) {
      setError("Please select a category");
      return;
    }
    if (!description.trim()) {
      setError("Please describe your concern");
      return;
    }

    setIsSubmitting(true);
    const trackingCode = generateTrackingCode();

    const { error: submitError } = await supabase
      .from("submissions")
      .insert([
        {
          tracking_code: trackingCode,
          category,
          description: description.trim(),
          severity,
          status: "new",
          company_id: company.id,
        },
      ]);

    if (submitError) {
      console.error("Submit error:", submitError);
      setError("Failed to submit. Please try again.");
      setIsSubmitting(false);
      return;
    }

    onSuccess(trackingCode);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-400">Loading...</p>
      </div>
    );
  }

  // Company not found
  if (notFound) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Company Not Found</h1>
          <p className="text-slate-400 mb-6">The company code "{companyCode}" doesn't exist.</p>
          <Button onClick={onLogoClick} className="bg-teal-500 hover:bg-teal-600">
            Go to Homepage
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="px-6 py-4 md:px-12 lg:px-20 border-b border-slate-800">
        <button onClick={onLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="text-xl font-semibold text-white">TrustRoom</span>
        </button>
      </header>

      {/* Form */}
      <div className="px-6 py-12 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto">
          {/* Company Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-2 mb-4">
              <span className="text-sm text-teal-400">Submitting to: {company.name}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Share Your Concern</h1>
            <p className="text-slate-400">
              Your submission is 100% anonymous. {company.name} will never know who you are.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Category Selection */}
            <div>
              <label className="block text-sm text-slate-400 mb-3">What's this about?</label>
              <div className="grid sm:grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      category === cat.id
                        ? "border-teal-500 bg-teal-500/10"
                        : "border-slate-700 bg-slate-800/30 hover:border-slate-600"
                    }`}
                  >
                    <h3 className={`font-medium ${category === cat.id ? "text-teal-400" : "text-white"}`}>
                      {cat.label}
                    </h3>
                    <p className="text-slate-500 text-sm mt-1">{cat.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">Describe your concern</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Share as much detail as you feel comfortable with..."
                className="w-full h-40 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none"
              />
            </div>

            {/* Severity */}
            <div>
              <label className="block text-sm text-slate-400 mb-3">How urgent is this?</label>
              <div className="flex gap-3">
                {[
                  { id: "low", label: "Low", color: "text-green-400 border-green-500/30 bg-green-500/10" },
                  { id: "medium", label: "Medium", color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10" },
                  { id: "high", label: "High", color: "text-red-400 border-red-500/30 bg-red-500/10" },
                ].map((sev) => (
                  <button
                    key={sev.id}
                    type="button"
                    onClick={() => setSeverity(sev.id)}
                    className={`flex-1 py-3 rounded-xl border transition-all ${
                      severity === sev.id
                        ? sev.color
                        : "border-slate-700 bg-slate-800/30 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    {sev.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-6 text-lg rounded-xl"
            >
              {isSubmitting ? "Submitting..." : "Submit Anonymously →"}
            </Button>

            {/* Privacy Note */}
            <div className="text-center">
              <p className="text-slate-500 text-sm">
                🔒 Your identity is protected. No login, no tracking, no way to trace this back to you.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}