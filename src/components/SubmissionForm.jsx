import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "../supabase";

export default function SubmissionForm({ onBack, onSubmitSuccess }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: "unfair-treatment", icon: "⚖️", title: "Unfair Treatment", desc: "Favouritism, bias, or discrimination" },
    { id: "toxic-behaviour", icon: "😰", title: "Toxic Behaviour", desc: "Bullying, harassment, or disrespect" },
    { id: "workload", icon: "📊", title: "Workload Issues", desc: "Unrealistic expectations or burnout" },
    { id: "politics", icon: "🎭", title: "Office Politics", desc: "Power plays affecting your career" },
    { id: "mental-health", icon: "🧠", title: "Mental Health", desc: "Work-related stress or anxiety" },
    { id: "manager", icon: "💬", title: "Manager Feedback", desc: "Issues with leadership behaviour" },
    { id: "policy", icon: "🚫", title: "Policy Violations", desc: "Rules being broken or ignored" },
    { id: "suggestion", icon: "💡", title: "Suggestions", desc: "Ideas to improve the workplace" },
  ];

  const generateTrackingCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "TR-";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedCategory || !description.trim()) {
      alert("Please select a category and describe your concern.");
      return;
    }

    setIsSubmitting(true);
    
    const code = generateTrackingCode();
    
    // Save to Supabase
    const { data, error } = await supabase
      .from('submissions')
      .insert([
        {
          tracking_code: code,
          category: selectedCategory,
          description: description,
          severity: severity || null,
          status: 'new',
        }
      ]);

    if (error) {
      console.error('Error saving submission:', error);
      alert('Something went wrong. Please try again.');
      setIsSubmitting(false);
      return;
    }

    console.log('Submission saved:', code);
    onSubmitSuccess(code);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="px-6 py-4 md:px-12 lg:px-20 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="text-xl font-semibold text-white">TrustRoom</span>
        </div>
      </header>

      {/* Main Form */}
      <main className="px-6 py-12 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Share Your Voice
            </h1>
            <p className="text-slate-400">
              Your identity is completely protected. No login, no tracking, no way to trace this back to you.
            </p>
          </div>

          {/* Anonymity Reminder */}
          <div className="flex items-center gap-3 bg-teal-500/10 border border-teal-500/30 rounded-xl p-4 mb-10">
            <div className="text-2xl">🔒</div>
            <div>
              <p className="text-teal-400 font-medium text-sm">Your submission is 100% anonymous</p>
              <p className="text-slate-400 text-sm">We don't collect your name, email, IP address, or any identifying information.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Category Selection */}
            <div className="mb-10">
              <label className="block text-lg font-semibold mb-2">
                1. What type of concern is this?
              </label>
              <p className="text-slate-400 text-sm mb-4">Select the category that best fits your situation</p>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedCategory === cat.id
                        ? "bg-teal-500/20 border-teal-500"
                        : "bg-slate-800/30 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <h3 className="font-semibold text-white">{cat.title}</h3>
                        <p className="text-slate-400 text-sm">{cat.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Description */}
            <div className="mb-10">
              <label className="block text-lg font-semibold mb-2">
                2. Describe your concern
              </label>
              <p className="text-slate-400 text-sm mb-4">
                Share as much detail as you're comfortable with. The more context, the better we can help.
              </p>
              
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What happened? When did it happen? How has it affected you or others?

You can include:
- Specific incidents or patterns
- How long this has been going on
- Who is involved (no need to name names if you're not comfortable)
- How this has impacted your work or wellbeing"
                className="w-full h-48 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none"
              />
              
              <p className="text-slate-500 text-xs mt-2">
                💡 Tip: Avoid including information that could identify you, like your exact job title or specific dates only you would know.
              </p>
            </div>

            {/* Step 3: Severity (Optional) */}
            <div className="mb-10">
              <label className="block text-lg font-semibold mb-2">
                3. How urgent is this? <span className="text-slate-500 font-normal text-sm">(optional)</span>
              </label>
              <p className="text-slate-400 text-sm mb-4">Help us prioritize — but all concerns are taken seriously</p>
              
              <div className="flex flex-wrap gap-3">
                {[
                  { id: "low", label: "Just sharing", color: "slate" },
                  { id: "medium", label: "Needs attention", color: "yellow" },
                  { id: "high", label: "Urgent", color: "orange" },
                  { id: "critical", label: "Critical / Safety issue", color: "red" },
                ].map((level) => (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => setSeverity(level.id)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      severity === level.id
                        ? level.id === "low"
                          ? "bg-slate-500/20 border-slate-500 text-slate-300"
                          : level.id === "medium"
                          ? "bg-yellow-500/20 border-yellow-500 text-yellow-300"
                          : level.id === "high"
                          ? "bg-orange-500/20 border-orange-500 text-orange-300"
                          : "bg-red-500/20 border-red-500 text-red-300"
                        : "bg-slate-800/30 border-slate-700 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t border-slate-800 pt-8">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <p className="text-slate-500 text-sm">
                  🔐 Your submission will be encrypted and cannot be traced to you.
                </p>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-teal-500/20 w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Anonymously →"
                  )}
                </Button>
              </div>
            </div>
          </form>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-slate-500 text-sm">
              After submitting, you'll receive a unique tracking code to check the status of your concern — still completely anonymous.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}