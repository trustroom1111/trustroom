import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "../supabase";

export default function CompanySubmissionForm({ companyCode, onSuccess, onLogoClick }) {
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Form fields
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("medium");
  const [incidentDate, setIncidentDate] = useState("");
  const [incidentLocation, setIncidentLocation] = useState("");
  const [namesInvolved, setNamesInvolved] = useState("");
  const [witnesses, setWitnesses] = useState("");
  const [identityShared, setIdentityShared] = useState(false);
  const [reporterName, setReporterName] = useState("");
  const [reporterContact, setReporterContact] = useState("");
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

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

    // Validations
    if (!category) {
      setError("Please select a category");
      return;
    }
    if (!description.trim()) {
      setError("Please describe your concern");
      return;
    }
    if (!disclaimerAccepted) {
      setError("Please accept the disclaimer to submit");
      return;
    }
    if (identityShared && !reporterName.trim()) {
      setError("Please enter your name or uncheck the identity disclosure option");
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
          disclaimer_accepted: disclaimerAccepted,
          incident_date: incidentDate || null,
          incident_location: incidentLocation.trim() || null,
          names_involved: namesInvolved.trim() || null,
          witnesses: witnesses.trim() || null,
          identity_shared: identityShared,
          reporter_name: identityShared ? reporterName.trim() : null,
          reporter_contact: identityShared ? reporterContact.trim() : null,
          credibility: "pending",
          conversation_closed: false,
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
              <label className="block text-sm text-slate-400 mb-3">What's this about? <span className="text-red-400">*</span></label>
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
              <label className="block text-sm text-slate-400 mb-2">Describe your concern <span className="text-red-400">*</span></label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Share as much detail as you feel comfortable with..."
                className="w-full h-40 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none"
              />
            </div>

            {/* Detailed Information Section */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-medium text-white">Additional Details</h3>
                <span className="text-slate-500 text-sm">(Optional but helps investigation)</span>
              </div>

              {/* Incident Date */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">When did this happen?</label>
                <input
                  type="date"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">Where did this happen?</label>
                <input
                  type="text"
                  value={incidentLocation}
                  onChange={(e) => setIncidentLocation(e.target.value)}
                  placeholder="e.g., Office, Meeting Room, Online meeting, etc."
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {/* Names Involved */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">Who was involved?</label>
                <input
                  type="text"
                  value={namesInvolved}
                  onChange={(e) => setNamesInvolved(e.target.value)}
                  placeholder="Names of people involved (if comfortable sharing)"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {/* Witnesses */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">Were there any witnesses?</label>
                <input
                  type="text"
                  value={witnesses}
                  onChange={(e) => setWitnesses(e.target.value)}
                  placeholder="Names of people who saw what happened"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              </div>
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

            {/* Optional Identity Disclosure */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="identityShared"
                  checked={identityShared}
                  onChange={(e) => setIdentityShared(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-slate-600 bg-slate-800 text-teal-500 focus:ring-teal-500"
                />
                <div className="flex-1">
                  <label htmlFor="identityShared" className="font-medium text-white cursor-pointer">
                    Share my identity confidentially (Optional)
                  </label>
                  <p className="text-slate-400 text-sm mt-1">
                    Only the admin will see your name. The person you're reporting about will NOT know who you are.
                    This can add credibility to your report.
                  </p>
                </div>
              </div>

              {/* Identity Fields - shown only when checked */}
              {identityShared && (
                <div className="mt-4 pt-4 border-t border-slate-700 space-y-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Your Name <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      value={reporterName}
                      onChange={(e) => setReporterName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Contact (Optional)</label>
                    <input
                      type="text"
                      value={reporterContact}
                      onChange={(e) => setReporterContact(e.target.value)}
                      placeholder="Email or phone (for follow-up)"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="disclaimer"
                  checked={disclaimerAccepted}
                  onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-amber-600 bg-slate-800 text-amber-500 focus:ring-amber-500"
                />
                <div className="flex-1">
                  <label htmlFor="disclaimer" className="font-medium text-amber-400 cursor-pointer">
                    I confirm this report is truthful and made in good faith <span className="text-red-400">*</span>
                  </label>
                  <p className="text-slate-400 text-sm mt-2">
                    I understand that submitting false or malicious reports damages workplace trust and undermines 
                    genuine concerns. False reports may be investigated and could have consequences.
                  </p>
                </div>
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
              disabled={isSubmitting || !disclaimerAccepted}
              className={`w-full py-6 text-lg rounded-xl ${
                disclaimerAccepted
                  ? "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"
                  : "bg-slate-700 text-slate-400 cursor-not-allowed"
              }`}
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