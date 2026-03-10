import { Button } from "@/components/ui/button";

export default function CompanyRegisterSuccess({ companyCode, companyName, onGoToDashboard, onLogoClick }) {
  const submissionLink = `trustroom.vercel.app/submit/${companyCode}`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
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

      {/* Success Content */}
      <div className="px-6 py-16 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to TrustRoom! 🎉
          </h1>
          <p className="text-xl text-slate-400 mb-8">
            <span className="text-white font-semibold">{companyName}</span> is now registered.
          </p>

          {/* Company Code Box */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-8">
            <p className="text-slate-400 text-sm mb-3">Your Company Code</p>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-4xl font-bold text-teal-400 tracking-wider">{companyCode}</span>
              <button
                onClick={() => copyToClipboard(companyCode)}
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Submission Link Box */}
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl p-6 mb-8">
            <p className="text-teal-400 font-semibold mb-2">Share This Link With Your Employees</p>
            <div className="flex items-center justify-center gap-3 bg-slate-900/50 rounded-xl p-4">
              <code className="text-white text-lg">{submissionLink}</code>
              <button
                onClick={() => copyToClipboard(`https://${submissionLink}`)}
                className="p-2 bg-teal-500/20 hover:bg-teal-500/30 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <p className="text-slate-400 text-sm mt-3">
              Employees can submit anonymous concerns using this link. No login required for them.
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-white mb-4">What's Next?</h3>
            <ul className="space-y-3">
              {[
                "Share the submission link with your team via email or Slack",
                "Log into your dashboard to view and respond to submissions",
                "Set up additional admin users if needed",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-400">
                  <div className="w-6 h-6 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-teal-400 text-sm font-semibold">{i + 1}</span>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <Button
            onClick={onGoToDashboard}
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-6 text-lg rounded-xl"
          >
            Go to Your Dashboard →
          </Button>

          <p className="text-slate-500 text-sm mt-6">
            We've sent a confirmation email with these details.
          </p>
        </div>
      </div>
    </div>
  );
}