import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "../supabase";

export default function CompanyRegister({ onLogoClick, onSuccess, onBack }) {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    industry: "",
    employeeCount: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const industries = [
    "Information Technology",
    "Finance & Banking",
    "Healthcare",
    "Manufacturing",
    "Retail & E-commerce",
    "Education",
    "Consulting",
    "Media & Entertainment",
    "Real Estate",
    "Other",
  ];

  const employeeCounts = [
    "1-50",
    "51-200",
    "201-500",
    "501-1000",
    "1000+",
  ];

  const generateCompanyCode = (companyName) => {
    const cleanName = companyName.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 4);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${cleanName}${randomNum}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.companyName || !formData.email || !formData.password || !formData.industry || !formData.employeeCount) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const companyCode = generateCompanyCode(formData.companyName);

      // Create company
      const { data: companyData, error: companyError } = await supabase
        .from("companies")
        .insert([
          {
            name: formData.companyName,
            code: companyCode,
            email: formData.email,
            industry: formData.industry,
            employee_count: formData.employeeCount,
          },
        ])
        .select()
        .single();

      if (companyError) {
        console.error("Company error:", companyError);
        setError("Failed to register company. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Create company admin
      const { error: adminError } = await supabase
        .from("company_admins")
        .insert([
          {
            company_id: companyData.id,
            email: formData.email,
            password: formData.password, // In production, hash this!
            name: "Admin",
            role: "owner",
          },
        ]);

      if (adminError) {
        console.error("Admin error:", adminError);
        setError("Failed to create admin account. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Success!
      onSuccess(companyCode, formData.companyName);

    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="px-6 py-4 md:px-12 lg:px-20 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <button onClick={onLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-semibold text-white">TrustRoom</span>
          </button>
          <Button
            onClick={onBack}
            variant="outline"
            className="border-slate-700 text-slate-400 hover:bg-slate-800"
          >
            ← Back
          </Button>
        </div>
      </header>

      {/* Form */}
      <div className="px-6 py-12 md:px-12 lg:px-20">
        <div className="max-w-xl mx-auto">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Register Your Company</h1>
            <p className="text-slate-400">
              Get started in 2 minutes. No credit card required.
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g., Acme Technologies"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">Work Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>

            {/* Password */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">Industry</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              >
                <option value="">Select your industry</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            {/* Employee Count */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">Number of Employees</label>
              <div className="grid grid-cols-5 gap-2">
                {employeeCounts.map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setFormData({ ...formData, employeeCount: count })}
                    className={`py-3 px-2 rounded-lg border text-sm transition-all ${
                      formData.employeeCount === count
                        ? "border-teal-500 bg-teal-500/10 text-teal-400"
                        : "border-slate-700 bg-slate-800/30 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
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
              {isSubmitting ? "Creating Your Account..." : "Create Account →"}
            </Button>

            {/* Terms */}
            <p className="text-center text-slate-500 text-sm">
              By registering, you agree to our{" "}
              <a href="#" className="text-teal-400 hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-teal-400 hover:underline">Privacy Policy</a>
            </p>
          </form>

          {/* Already have account */}
          <div className="text-center mt-8 pt-8 border-t border-slate-800">
            <p className="text-slate-400">
              Already have an account?{" "}
              <button className="text-teal-400 hover:underline">Sign in here</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}