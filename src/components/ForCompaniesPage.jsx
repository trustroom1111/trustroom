import { Button } from "@/components/ui/button";

export default function ForCompaniesPage({ onLogoClick, onGetStarted, onAboutClick, onCompanyLogin }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        <button onClick={onLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="text-xl font-semibold text-white">TrustRoom</span>
        </button>
        <div className="hidden md:flex items-center gap-8">
          <button onClick={onAboutClick} className="text-slate-400 hover:text-white transition-colors">About</button>
          <span className="text-teal-400 font-medium">For Companies</span>
          <a href="#pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</a>
          <a href="#contact" className="text-slate-400 hover:text-white transition-colors">Contact</a>
          <button onClick={onCompanyLogin} className="text-slate-400 hover:text-white transition-colors">Login</button>
          <Button 
            onClick={onGetStarted}
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-2 rounded-lg"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-2 mb-8">
            <span className="text-sm text-teal-400">For HR Leaders & Organizations</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Build a Workplace Where
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
              Employees Feel Safe to Speak
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            TrustRoom helps organizations create psychological safety — reducing attrition, 
            preventing crises, and supporting employee mental health.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-teal-500/20"
            >
              Start Free Trial →
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg rounded-xl"
            >
              Schedule Demo
            </Button>
          </div>

          <p className="text-slate-500 text-sm mt-6">
            No credit card required • Setup in 5 minutes • Cancel anytime
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-16 md:px-12 lg:px-20 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              The Silent Crisis in Your Organization
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Your best employees are suffering in silence. Here's what the data shows:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { stat: "76%", label: "stay silent about issues due to fear" },
              { stat: "82%", label: "don't trust HR to maintain confidentiality" },
              { stat: "67%", label: "have witnessed misconduct but didn't report" },
              { stat: "₹15L+", label: "average cost of replacing one employee" },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-teal-400 mb-2">{item.stat}</div>
                <p className="text-slate-400 text-sm">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8 text-center">
            <p className="text-slate-300 text-lg">
              When employees don't feel safe to speak up, small issues become big crises. 
              <span className="text-red-400 font-medium"> Toxic managers go unchecked. Top talent leaves quietly. 
              Legal risks grow in the shadows.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              TrustRoom: Your Early Warning System
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Give employees a safe, anonymous channel to speak up — before problems escalate.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Anonymous Reporting",
                desc: "Employees submit concerns without revealing identity. No login, no email, no tracking.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Company Dashboard",
                desc: "View all submissions in one place. Respond to employees. Track resolution status.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                ),
              },
              {
                title: "Culture Insights",
                desc: "Identify patterns and trends. Take proactive action before issues become crises.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/30 border border-slate-800 rounded-xl p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center text-teal-400">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 md:px-12 lg:px-20 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              How TrustRoom Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "You Register", desc: "Sign up your company in 2 minutes" },
              { step: "2", title: "Get Your Link", desc: "Receive a unique submission link" },
              { step: "3", title: "Share with Team", desc: "Employees submit anonymously" },
              { step: "4", title: "Take Action", desc: "View, respond & resolve issues" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Why Companies Choose TrustRoom
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Reduce Attrition",
                desc: "Employees who feel heard stay longer. Address concerns before they become resignations.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                title: "Prevent Legal Issues",
                desc: "Catch harassment, discrimination, and misconduct early — before they become lawsuits.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: "Support Mental Health",
                desc: "Show employees you care about their wellbeing. Reduce workplace anxiety and stress.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
              },
              {
                title: "Build Trust Culture",
                desc: "When employees see action being taken, trust in leadership grows.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                ),
              },
              {
                title: "POSH Compliance",
                desc: "Meet Prevention of Sexual Harassment Act requirements with proper reporting channels.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
              },
              {
                title: "Easy Implementation",
                desc: "No IT integration needed. Get started in minutes with just a shareable link.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl bg-slate-800/30 border border-slate-800">
                <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center text-teal-400 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-16 md:px-12 lg:px-20 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-slate-400 text-lg">
              Start free. Upgrade when you're ready.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-2">Starter</h3>
              <p className="text-slate-400 text-sm mb-6">For small teams trying it out</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">Free</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Up to 50 employees",
                  "Unlimited submissions",
                  "Basic dashboard",
                  "Email support",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-400 text-sm">
                    <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Button 
                onClick={onGetStarted}
                variant="outline"
                className="w-full border-slate-600 text-white hover:bg-slate-700 py-6 rounded-xl"
              >
                Get Started Free
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-b from-teal-500/10 to-slate-800/30 border border-teal-500/30 rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional</h3>
              <p className="text-slate-400 text-sm mb-6">For growing organizations</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹4,999</span>
                <span className="text-slate-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Up to 500 employees",
                  "Unlimited submissions",
                  "Advanced analytics",
                  "Multiple admins",
                  "Priority support",
                  "Custom branding",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-400 text-sm">
                    <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Button 
                onClick={onGetStarted}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-6 rounded-xl"
              >
                Start 14-Day Free Trial
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-slate-400 text-sm mb-6">For large organizations</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited employees",
                  "Unlimited submissions",
                  "Dedicated account manager",
                  "API access",
                  "SSO integration",
                  "Custom compliance reports",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-400 text-sm">
                    <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Button 
                variant="outline"
                className="w-full border-slate-600 text-white hover:bg-slate-700 py-6 rounded-xl"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-16 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Build a Safer Workplace?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Join forward-thinking companies who prioritize employee voice and wellbeing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-6 text-lg rounded-xl"
            >
              Get Started Free →
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg rounded-xl"
            >
              Schedule a Demo
            </Button>
          </div>
          <p className="text-slate-500 text-sm mt-6">
            Questions? Email us at <span className="text-teal-400">hello@trustroom.in</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 md:px-12 lg:px-20 border-t border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <button onClick={onLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-teal-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">T</span>
            </div>
            <span className="text-slate-400">TrustRoom</span>
          </button>
          <p className="text-slate-600 text-sm">
            Building psychological safety in Indian workplaces.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-300">Privacy</a>
            <a href="#" className="hover:text-slate-300">Terms</a>
            <a href="#" className="hover:text-slate-300">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}