import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "../supabase";

export default function SubmissionForm({ onBack, onSubmitSuccess, onLogoClick }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { 
      id: "unfair-treatment", 
      title: "Unfair Treatment", 
      desc: "Favouritism, bias, or discrimination",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      )
    },
    { 
      id: "toxic-behaviour", 
      title: "Toxic Behaviour", 
      desc: "Bullying, harassment, or disrespect",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    { 
      id: "workload-issues", 
      title: "Workload Issues", 
      desc: "Unrealistic expectations or burnout",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    { 
      id: "office-politics", 
      title: "Office Politics", 
      desc: "Power plays affecting your career",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      id: "mental-health", 
      title: "Mental Health", 
      desc: "Work-related stress or anxiety",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    { 
      id: "manager-feedback", 
      title: "Manager Feedback", 
      desc: "Issues with leadership behaviour",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    { 
      id: "policy-violations", 
      title: "Policy Violations", 
      desc: "Rules being broken or ignored",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      )
    },
    { 
      id: "suggestions", 
      title: "Suggestions", 
      desc: "Ideas to improve the workplace",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
  ];

  const severityLevels = [
    { id: "low", label: "Low", desc: "Minor issue, not urgent" },
    { id: "medium", label: "Medium", desc: "Affecting my work" },
    { id: "high", label: "High", desc: "Serious concern" },
    { id: "critical", label: "Critical", desc: "Immediate attention needed" },
  ];

  const generateTrackingCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "TR-";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleSubmit = async () => {
    if (!selectedCategory || !description || !severity) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    const trackingCode = generateTrackingCode();

    try {
      const { error } = await supabase.from("submissions").insert([
        {
          tracking_code: trackingCode,
          category: selectedCategory,
          description: description,
          severity: severity,
          status: "new",
        },
      ]);

      if (error) {
        console.error("Error saving submission:", error);
        alert("Failed to submit. Please try again.");
        setIsSubmitting(false);
        return;
      }

      onSubmitSuccess(trackingCode);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit. Please try again.");
      setIsSubmitting(false);
    }
  };

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
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Share Your Voice</h1>
            <p className="text-slate-400">
              Your identity is completely protected. No login, no tracking, no way to trace this back to you.
            </p>
          </div>

          {/* Anonymous Badge */}
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4 mb-10 flex items-start gap-3">
            <svg className="w-6 h-6 text-teal-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div>
              <h3 className="font-semibold text-teal-400">Your submission is 100% anonymous</h3>
              <p className="text-slate-400 text-sm">We don't collect your name, email, IP address, or any identifying information.</p>
            </div>
          </div>

          {/* Category Selection */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-2">1. What type of concern is this?</h2>
            <p className="text-slate-400 text-sm mb-4">Select the category that best fits your situation</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
                    selectedCategory === cat.id
                      ? "border-teal-500 bg-teal-500/10"
                      : "border-slate-700 bg-slate-800/30 hover:border-slate-600"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    selectedCategory === cat.id ? "bg-teal-500/20 text-teal-400" : "bg-slate-700/50 text-slate-400"
                  }`}>
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{cat.title}</h3>
                    <p className="text-slate-500 text-sm">{cat.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-2">2. Describe your concern</h2>
            <p className="text-slate-400 text-sm mb-4">Share as much detail as you're comfortable with. The more context, the better we can help.</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What happened? When did it happen? How has it affected you or others?

You can include:
- Specific incidents or patterns
- How long this has been going on
- Impact on you or your team
- Any steps you've already taken"
              className="w-full h-48 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none"
            />
          </div>

          {/* Severity */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-2">3. How urgent is this?</h2>
            <p className="text-slate-400 text-sm mb-4">This helps prioritize the response</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {severityLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSeverity(level.id)}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    severity === level.id
                      ? "border-teal-500 bg-teal-500/10"
                      : "border-slate-700 bg-slate-800/30 hover:border-slate-600"
                  }`}
                >
                  <h3 className={`font-medium ${severity === level.id ? "text-teal-400" : "text-white"}`}>
                    {level.label}
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">{level.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !selectedCategory || !description || !severity}
              className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-6 text-lg rounded-xl disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Anonymously"}
            </Button>
            <Button
              variant="outline"
              onClick={onBack}
              className="border-slate-700 text-slate-400 hover:bg-slate-800 py-6 px-8 rounded-xl"
            >
              Cancel
            </Button>
          </div>

          {/* Privacy Note */}
          <p className="text-center text-slate-600 text-sm mt-6">
            By submitting, you acknowledge that this is a truthful account of your experience.
          </p>
        </div>
      </div>
    </div>
  );
}