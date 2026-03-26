import { Button } from "@/components/ui/button";

export default function SignUpPage({ onNavigate, onLogoClick }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <button onClick={onLogoClick} className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
          </button>
          <h1 className="text-3xl font-bold mb-3">Get Started with TrustRoom</h1>
          <p className="text-slate-400">Create your company's safe space for employee voice</p>
        </div>

        {/* Auth Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4">
          {/* Google Button */}
          <button
            onClick={() => onNavigate("onboarding")}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-medium py-4 px-6 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          {/* Microsoft Button */}
          <button
            onClick={() => onNavigate("onboarding")}
            className="w-full flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-white font-medium py-4 px-6 rounded-xl border border-slate-700 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <rect x="1" y="1" width="10" height="10" fill="#F25022" />
              <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
              <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
              <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
            </svg>
            Continue with Microsoft
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-slate-700"></div>
            <span className="text-slate-500 text-sm">or</span>
            <div className="flex-1 h-px bg-slate-700"></div>
          </div>

          {/* Email Link */}
          <button
            onClick={() => onNavigate("onboarding")}
            className="w-full text-center text-teal-400 hover:text-teal-300 font-medium py-2 transition-colors"
          >
            Continue with email
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-slate-500 text-sm mt-6">
          Already have an account?{" "}
          <button
            onClick={() => onNavigate("company-login")}
            className="text-teal-400 hover:text-teal-300 transition-colors"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
