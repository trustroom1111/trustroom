import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "../supabase";

export default function CompanyAdminLogin({ onLogoClick, onLoginSuccess, onBack, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Debug: Log what we're searching for
      console.log("Searching for email:", email);
      console.log("Searching for password:", password);

      // First, let's find by email only
      const { data: allAdmins, error: fetchError } = await supabase
        .from("company_admins")
        .select("*, companies(*)")
        .eq("email", email.trim());

      console.log("Found admins:", allAdmins);
      console.log("Fetch error:", fetchError);

      if (fetchError) {
        setError("Database error. Please try again.");
        setIsLoading(false);
        return;
      }

      if (!allAdmins || allAdmins.length === 0) {
        setError("No account found with this email");
        setIsLoading(false);
        return;
      }

      // Check password manually
      const admin = allAdmins[0];
      console.log("Stored password:", admin.password);
      console.log("Entered password:", password);

      if (admin.password !== password.trim()) {
        setError("Incorrect password");
        setIsLoading(false);
        return;
      }

      // Success!
      onLoginSuccess(admin);

    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <button onClick={onLogoClick} className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
          </button>
          <h1 className="text-2xl font-bold mt-4">Company Admin Login</h1>
          <p className="text-slate-400 mt-2">Access your company dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
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
            {isLoading ? "Logging in..." : "Login"}
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

        {/* Register Link */}
        <div className="text-center mt-8 pt-8 border-t border-slate-800">
          <p className="text-slate-400">
            Don't have an account?{" "}
            <button onClick={onRegister} className="text-teal-400 hover:underline">
              Register your company
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}