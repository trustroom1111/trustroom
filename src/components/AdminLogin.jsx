import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AdminLogin({ onLoginSuccess, onBack }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Set your admin password here
  const ADMIN_PASSWORD = "trustroom2024";

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem("trustroom_admin", "true");
        onLoginSuccess();
      } else {
        setError("Incorrect password. Please try again.");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <h1 className="text-2xl font-bold">TrustRoom Admin</h1>
          <p className="text-slate-400 mt-2">Enter password to access dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-6 text-lg rounded-xl"
          >
            {isLoading ? "Checking..." : "Login"}
          </Button>
        </form>

        {/* Back Link */}
        <div className="text-center mt-6">
          <button
            onClick={onBack}
            className="text-slate-500 hover:text-slate-300 text-sm"
          >
            ← Back to Home
          </button>
        </div>

        {/* Security Note */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 text-xs">
            🔒 This area is for authorized administrators only
          </p>
        </div>
      </div>
    </div>
  );
}