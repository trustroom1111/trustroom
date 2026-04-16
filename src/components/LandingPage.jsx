import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  UserPlus,
  Link,
  MessageCircle,
  CheckCircle,
  Heart,
  BarChart3,
  Paperclip,
  ClipboardList,
  Search,
  Eye,
  EyeOff,
  Server,
  MapPin,
  ArrowRight,
  Menu,
  X,
  Smartphone,
  Users,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

export default function LandingPage({ onSubmitClick, onAdminClick, onTrackClick, onLogoClick, onAboutClick, onForCompaniesClick, onSignUpClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const sectionClass = (id) =>
    `transition-all duration-700 ${visibleSections.has(id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`;

  return (
    <div className="min-h-screen bg-slate-950 text-white scroll-smooth">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-16">
            <button onClick={onLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-semibold text-white">TrustRoom</span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollTo("how-it-works")} className="text-slate-400 hover:text-white transition-colors text-sm">How It Works</button>
              <button onClick={() => scrollTo("features")} className="text-slate-400 hover:text-white transition-colors text-sm">Features</button>
              <button onClick={() => scrollTo("pricing")} className="text-slate-400 hover:text-white transition-colors text-sm">Pricing</button>
              <button onClick={() => scrollTo("contact")} className="text-slate-400 hover:text-white transition-colors text-sm">Contact</button>
              <button
                onClick={onSignUpClick}
                className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-5 py-2 rounded-lg transition-colors text-sm"
              >
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 px-6 py-4 space-y-3">
            <button onClick={() => scrollTo("how-it-works")} className="block w-full text-left text-slate-300 hover:text-white py-2">How It Works</button>
            <button onClick={() => scrollTo("features")} className="block w-full text-left text-slate-300 hover:text-white py-2">Features</button>
            <button onClick={() => scrollTo("pricing")} className="block w-full text-left text-slate-300 hover:text-white py-2">Pricing</button>
            <button onClick={() => scrollTo("contact")} className="block w-full text-left text-slate-300 hover:text-white py-2">Contact</button>
            <button
              onClick={() => { setMobileMenuOpen(false); onSignUpClick(); }}
              className="block w-full bg-teal-500 hover:bg-teal-600 text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-center"
            >
              Sign Up
            </button>
          </div>
        )}
      </nav>

      {/* ============================================ */}
      {/* HERO */}
      {/* ============================================ */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 lg:px-20">
        <div
          id="hero"
          ref={(el) => (sectionRefs.current.hero = el)}
          className={`max-w-4xl mx-auto text-center ${sectionClass("hero")}`}
        >
          <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300">100% Anonymous &middot; No Tracking &middot; Your Identity Protected</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Your Employees Are Silent.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
              Not Because They Have Nothing to Say.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            TrustRoom gives your workforce a safe, anonymous space to speak up — so you can fix problems before they become crises.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={onSignUpClick}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-teal-500/20"
            >
              Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollTo("how-it-works")}
              className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg rounded-xl"
            >
              See How It Works
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-teal-400" />
              <span>End-to-End Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-teal-400" />
              <span>No Login Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-teal-400" />
              <span>Identity Never Stored</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* THE PROBLEM */}
      {/* ============================================ */}
      <section className="px-6 py-20 md:px-12 lg:px-20 bg-slate-900/30">
        <div
          id="problem"
          ref={(el) => (sectionRefs.current.problem = el)}
          className={`max-w-5xl mx-auto ${sectionClass("problem")}`}
        >
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Silent Workforce Problem</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { stat: "70%", text: "of employees stay silent about workplace issues due to fear of retaliation" },
              { stat: "45%", text: "of companies discover toxic culture only after top talent leaves" },
              { stat: "3x", text: "higher attrition in companies without anonymous reporting channels" },
            ].map((item, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
                <p className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 mb-4">
                  {item.stat}
                </p>
                <p className="text-slate-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <p className="text-slate-400 text-center max-w-3xl mx-auto text-lg leading-relaxed">
            Traditional HR channels don't work when employees fear the very people they need to report to. Suggestion boxes collect dust. Annual surveys come too late. Your employees need a voice — and your company needs to listen.
          </p>
        </div>
      </section>

      {/* ============================================ */}
      {/* HOW IT WORKS */}
      {/* ============================================ */}
      <section id="how-it-works" className="px-6 py-20 md:px-12 lg:px-20">
        <div
          id="how-it-works-inner"
          ref={(el) => (sectionRefs.current["how-it-works-inner"] = el)}
          className={`max-w-5xl mx-auto ${sectionClass("how-it-works-inner")}`}
        >
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Up and Running in 5 Minutes</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, icon: <UserPlus className="w-7 h-7" />, title: "Sign Up", desc: "Create your company account in seconds" },
              { step: 2, icon: <Link className="w-7 h-7" />, title: "Share the Link", desc: "Give your employees the portal link" },
              { step: 3, icon: <MessageCircle className="w-7 h-7" />, title: "Employees Speak Up", desc: "They submit concerns anonymously — no login, no tracking" },
              { step: 4, icon: <CheckCircle className="w-7 h-7" />, title: "You Take Action", desc: "Review, respond, and resolve from your dashboard" },
            ].map((item, i) => (
              <div key={i} className="relative text-center group">
                {/* Connector line */}
                {i < 3 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-slate-700 to-slate-800"></div>
                )}
                <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400 group-hover:border-teal-500/40 transition-colors">
                  {item.icon}
                </div>
                <div className="text-teal-400 text-xs font-semibold tracking-widest mb-2">STEP {item.step}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* WHY TRUSTROOM */}
      {/* ============================================ */}
      <section className="px-6 py-20 md:px-12 lg:px-20 bg-slate-900/30">
        <div
          id="why"
          ref={(el) => (sectionRefs.current.why = el)}
          className={`max-w-6xl mx-auto ${sectionClass("why")}`}
        >
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Employees First.
              <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400"> Designed for Companies That Care.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Differentiators */}
            <div className="space-y-6">
              {[
                {
                  icon: <Heart className="w-5 h-5" />,
                  title: "Employee-First, Not Compliance-First",
                  desc: "Unlike tools built for legal checkboxes, TrustRoom puts the employee experience at the center.",
                },
                {
                  icon: <MessageSquare className="w-5 h-5" />,
                  title: "Two-Way Anonymous Messaging",
                  desc: "Respond to reports without ever knowing who filed them. Real dialogue, real anonymity.",
                },
                {
                  icon: <Users className="w-5 h-5" />,
                  title: "Built for Indian Workplaces",
                  desc: "Designed with the cultural nuances of Indian organizations in mind.",
                },
                {
                  icon: <Smartphone className="w-5 h-5" />,
                  title: "No App Download Required",
                  desc: "Employees access it via a link. Works on any phone or computer.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center text-teal-400 flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dashboard Mockup */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              {/* Title bar */}
              <div className="px-5 py-3 border-b border-slate-800 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                <span className="ml-3 text-xs text-slate-500 font-mono">TrustRoom Dashboard</span>
              </div>
              {/* Stats row */}
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Total Reports", val: "24", color: "text-white" },
                    { label: "Open Cases", val: "8", color: "text-yellow-400" },
                    { label: "Resolved", val: "16", color: "text-green-400" },
                  ].map((s, i) => (
                    <div key={i} className="bg-slate-800/50 rounded-lg p-3 text-center">
                      <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
                      <p className="text-slate-500 text-xs mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
                {/* Fake submissions */}
                <div className="space-y-2">
                  {[
                    { cat: "Toxic Behaviour", sev: "High", sevColor: "text-red-400 bg-red-500/10", time: "2h ago" },
                    { cat: "Workload Issues", sev: "Medium", sevColor: "text-yellow-400 bg-yellow-500/10", time: "5h ago" },
                    { cat: "Manager Feedback", sev: "Low", sevColor: "text-green-400 bg-green-500/10", time: "1d ago" },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-800/30 rounded-lg px-4 py-3">
                      <div>
                        <p className="text-sm text-white font-medium">{r.cat}</p>
                        <p className="text-xs text-slate-500">{r.time}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${r.sevColor}`}>{r.sev}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FEATURES */}
      {/* ============================================ */}
      <section id="features" className="px-6 py-20 md:px-12 lg:px-20">
        <div
          id="features-inner"
          ref={(el) => (sectionRefs.current["features-inner"] = el)}
          className={`max-w-5xl mx-auto ${sectionClass("features-inner")}`}
        >
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Build a Speak-Up Culture</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <EyeOff className="w-6 h-6" />, title: "Anonymous Reporting", desc: "Employees submit concerns without revealing their identity. No login, no tracking." },
              { icon: <BarChart3 className="w-6 h-6" />, title: "Real-Time Dashboard", desc: "Track submissions, monitor trends, and manage cases from one place." },
              { icon: <MessageSquare className="w-6 h-6" />, title: "Two-Way Messaging", desc: "Communicate with reporters anonymously. Up to 10 messages per case." },
              { icon: <Paperclip className="w-6 h-6" />, title: "Evidence Attachments", desc: "Employees can upload images and voice notes to support their reports." },
              { icon: <ClipboardList className="w-6 h-6" />, title: "Case Management", desc: "Mark credibility, update status, close or reopen conversations." },
              { icon: <Search className="w-6 h-6" />, title: "Tracking System", desc: "Employees track their report status using a unique code. Full transparency." },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-teal-500/30 transition-colors group"
              >
                <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400 mb-4 group-hover:bg-teal-500/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PRICING */}
      {/* ============================================ */}
      <section id="pricing" className="px-6 py-20 md:px-12 lg:px-20 bg-slate-900/30">
        <div
          id="pricing-inner"
          ref={(el) => (sectionRefs.current["pricing-inner"] = el)}
          className={`max-w-5xl mx-auto ${sectionClass("pricing-inner")}`}
        >
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-400 text-lg">Start free. Upgrade when you're ready.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {/* Starter */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-lg font-semibold mb-1">Starter</h3>
              <p className="text-slate-400 text-sm mb-6">For small teams getting started</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">Free</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["Up to 50 employees", "Anonymous reporting", "Basic dashboard", "5 active cases", "Email support"].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={onSignUpClick}
                variant="outline"
                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 py-5 rounded-xl"
              >
                Get Started Free
              </Button>
            </div>

            {/* Professional */}
            <div className="bg-slate-900 border-2 border-teal-500/50 rounded-2xl p-8 relative md:-mt-4 md:mb-[-16px] shadow-lg shadow-teal-500/5">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="text-lg font-semibold mb-1">Professional</h3>
              <p className="text-slate-400 text-sm mb-6">For growing organizations</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{"\u20B9"}4,999</span>
                <span className="text-slate-400 text-sm">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Up to 500 employees",
                  "Everything in Starter",
                  "Unlimited active cases",
                  "Two-way messaging",
                  "Evidence attachments",
                  "Analytics & trends",
                  "Priority support",
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={onSignUpClick}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-5 rounded-xl"
              >
                Start Free Trial
              </Button>
            </div>

            {/* Enterprise */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-lg font-semibold mb-1">Enterprise</h3>
              <p className="text-slate-400 text-sm mb-6">For large organizations</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited employees",
                  "Everything in Professional",
                  "Custom integrations",
                  "Dedicated account manager",
                  "HRMS integration",
                  "Custom branding",
                  "SLA guarantee",
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={onSignUpClick}
                variant="outline"
                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 py-5 rounded-xl"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TRUST & SECURITY */}
      {/* ============================================ */}
      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div
          id="trust"
          ref={(el) => (sectionRefs.current.trust = el)}
          className={`max-w-5xl mx-auto ${sectionClass("trust")}`}
        >
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Trust is Our Foundation</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Eye className="w-7 h-7" />,
                title: "Complete Anonymity",
                desc: "We never store IP addresses, device info, or any identifying data. Your employees are truly anonymous.",
              },
              {
                icon: <Server className="w-7 h-7" />,
                title: "Data Security",
                desc: "All data is encrypted and stored on enterprise-grade infrastructure. We take security seriously.",
              },
              {
                icon: <MapPin className="w-7 h-7" />,
                title: "Indian Data Residency",
                desc: "Your data stays in India. Compliant with Indian IT Act and data protection regulations.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
                <div className="w-14 h-14 mx-auto mb-5 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA */}
      {/* ============================================ */}
      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div
          id="cta"
          ref={(el) => (sectionRefs.current.cta = el)}
          className={`max-w-4xl mx-auto ${sectionClass("cta")}`}
        >
          <div className="bg-gradient-to-br from-teal-900/40 to-slate-900 border border-teal-500/20 rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Give Your Employees a Voice?</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Join companies building healthier, more transparent workplaces.
            </p>
            <Button
              size="lg"
              onClick={onSignUpClick}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-10 py-7 text-xl rounded-xl shadow-lg shadow-teal-500/25"
            >
              Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer id="contact" className="px-6 py-10 md:px-12 lg:px-20 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-teal-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">T</span>
            </div>
            <span className="text-slate-400 text-sm">&copy; 2026 TrustRoom. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <button onClick={onAboutClick} className="hover:text-slate-300 transition-colors">About</button>
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
          <a href="mailto:hello@trustroom.com" className="text-slate-400 text-sm hover:text-teal-400 transition-colors">
            hello@trustroom.com
          </a>
        </div>
      </footer>
    </div>
  );
}
