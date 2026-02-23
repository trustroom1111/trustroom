import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ConfirmationPage({ trackingCode, onBackHome }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(trackingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

      {/* Main Content */}
      <main className="px-6 py-16 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Your Voice Has Been Heard
          </h1>
          <p className="text-slate-400 text-lg mb-10">
            Thank you for speaking up. Your submission has been received and will be reviewed.
          </p>

          {/* Tracking Code Box */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-8">
            <p className="text-slate-400 text-sm mb-3">Your Anonymous Tracking Code</p>
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <code className="text-3xl md:text-4xl font-mono font-bold text-teal-400 tracking-wider">
                {trackingCode}
              </code>
            </div>

            <Button
              onClick={handleCopy}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              {copied ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Code
                </span>
              )}
            </Button>
          </div>

          {/* Important Note */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-10 text-left">
            <div className="flex gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <p className="text-yellow-400 font-medium text-sm mb-1">Save this code!</p>
                <p className="text-slate-400 text-sm">
                  This is the only way to check the status of your submission. We don't store any information that could identify you, so we cannot recover this code.
                </p>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="text-left mb-10">
            <h2 className="text-xl font-semibold mb-4">What Happens Next?</h2>
            <div className="space-y-4">
              {[
                { icon: "👁️", text: "Your submission will be reviewed within 48-72 hours" },
                { icon: "🔒", text: "Your identity remains completely anonymous throughout" },
                { icon: "📊", text: "Use your tracking code to check for updates anytime" },
                { icon: "✅", text: "You'll see status updates as action is taken" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <p className="text-slate-400 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Anonymity Reminder */}
          <div className="flex items-center gap-3 bg-teal-500/10 border border-teal-500/30 rounded-xl p-4 mb-10">
            <div className="text-2xl">🛡️</div>
            <div className="text-left">
              <p className="text-teal-400 font-medium text-sm">You're still anonymous</p>
              <p className="text-slate-400 text-sm">
                We have no way of knowing who submitted this. Your tracking code is the only link to your submission.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onBackHome}
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-6 text-lg rounded-xl"
            >
              Back to Home
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg rounded-xl"
            >
              Track Another Submission
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}