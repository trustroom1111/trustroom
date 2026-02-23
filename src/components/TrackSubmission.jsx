import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "../supabase";

export default function TrackSubmission({ onBackHome }) {
  const [trackingCode, setTrackingCode] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const categoryLabels = {
    "unfair-treatment": { label: "Unfair Treatment", icon: "⚖️" },
    "toxic-behaviour": { label: "Toxic Behaviour", icon: "😰" },
    "workload": { label: "Workload Issues", icon: "📊" },
    "politics": { label: "Office Politics", icon: "🎭" },
    "mental-health": { label: "Mental Health", icon: "🧠" },
    "manager": { label: "Manager Feedback", icon: "💬" },
    "policy": { label: "Policy Violations", icon: "🚫" },
    "suggestion": { label: "Suggestions", icon: "💡" },
  };

  const statusInfo = {
    new: {
      label: "New",
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      description: "Your submission has been received and is waiting to be reviewed.",
    },
    "in-review": {
      label: "In Review",
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      description: "Your submission is being actively reviewed by the team.",
    },
    resolved: {
      label: "Resolved",
      color: "bg-green-500/20 text-green-400 border-green-500/30",
      description: "Action has been taken on your submission.",
    },
    dismissed: {
      label: "Dismissed",
      color: "bg-slate-500/20 text-slate-400 border-slate-500/30",
      description: "Your submission has been reviewed but no action will be taken.",
    },
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const code = trackingCode.trim().toUpperCase();

    if (!code) {
      setError("Please enter a tracking code.");
      return;
    }

    setIsSearching(true);

    // Search in Supabase
    const { data, error: searchError } = await supabase
      .from('submissions')
      .select('*')
      .eq('tracking_code', code)
      .single();

    if (searchError || !data) {
      setError("No submission found with this tracking code. Please check and try again.");
      setIsSearching(false);
      return;
    }

    setResult(data);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="px-6 py-4 md:px-12 lg:px-20 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-semibold text-white">TrustRoom</span>
          </div>
          <Button
            onClick={onBackHome}
            variant="outline"
            className="border-slate-700 text-slate-400 hover:bg-slate-800"
          >
            ← Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-12 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Track Your Submission
            </h1>
            <p className="text-slate-400">
              Enter your tracking code to check the status of your anonymous submission.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                placeholder="Enter tracking code (e.g., TR-X7K9M2)"
                className="flex-1 px-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 font-mono text-lg tracking-wider"
              />
              <Button
                type="submit"
                disabled={isSearching}
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-4 text-lg rounded-xl"
              >
                {isSearching ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Searching...
                  </span>
                ) : (
                  "Track"
                )}
              </Button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-8">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-400">{error}</p>
              </div>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="bg-slate-800/30 border border-slate-700 rounded-2xl overflow-hidden">
              {/* Status Header */}
              <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Tracking Code</p>
                    <code className="text-xl font-mono font-bold text-teal-400">{result.tracking_code}</code>
                  </div>
                  <div className={`px-4 py-2 rounded-full border ${statusInfo[result.status]?.color || statusInfo.new.color}`}>
                    {statusInfo[result.status]?.label || "New"}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 space-y-6">
                {/* Status Description */}
                <div className="flex items-start gap-3 bg-slate-800/30 rounded-xl p-4">
                  <svg className="w-5 h-5 text-teal-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-slate-300 text-sm">{statusInfo[result.status]?.description || statusInfo.new.description}</p>
                </div>

                {/* Category & Submitted */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Category</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{categoryLabels[result.category]?.icon || "📝"}</span>
                      <span className="text-white">{categoryLabels[result.category]?.label || result.category}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Submitted On</p>
                    <p className="text-white">{formatDate(result.created_at)}</p>
                  </div>
                </div>

                {/* Admin Response */}
                {result.admin_response ? (
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Response from Review Team</p>
                    <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4">
                      <p className="text-slate-300 text-sm leading-relaxed">{result.admin_response}</p>
                      {result.updated_at && (
                        <p className="text-slate-500 text-xs mt-3">Responded on {formatDate(result.updated_at)}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-800/30 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-slate-400 text-sm">No response yet. Please check back later.</p>
                    </div>
                  </div>
                )}

                {/* Anonymity Reminder */}
                <div className="flex items-center gap-3 bg-slate-800/50 rounded-xl p-4">
                  <span className="text-xl">🔒</span>
                  <p className="text-slate-400 text-sm">
                    Your identity remains completely anonymous. This tracking code is the only link to your submission.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Help Text */}
          {!result && !error && (
            <div className="mt-8 text-center">
              <p className="text-slate-500 text-sm">
                You received a tracking code when you submitted your concern. Enter it above to see updates.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}