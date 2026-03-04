import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage({ onSubmitClick, onAdminClick, onTrackClick, onLogoClick }) {
  
  const categories = [
    { 
      title: "Unfair Treatment", 
      desc: "Favouritism, bias, or discrimination",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      )
    },
    { 
      title: "Toxic Behaviour", 
      desc: "Bullying, harassment, or disrespect",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    { 
      title: "Workload Issues", 
      desc: "Unrealistic expectations or burnout",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    { 
      title: "Office Politics", 
      desc: "Power plays affecting your career",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      title: "Mental Health", 
      desc: "Work-related stress or anxiety",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    { 
      title: "Manager Feedback", 
      desc: "Issues with leadership behaviour",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    { 
      title: "Policy Violations", 
      desc: "Rules being broken or ignored",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      )
    },
    { 
      title: "Suggestions", 
      desc: "Ideas to improve the workplace",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
  ];

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
          <a href="#psychological-safety" className="text-slate-400 hover:text-white transition-colors">Why It Matters</a>
          <a href="#how-it-works" className="text-slate-400 hover:text-white transition-colors">How It Works</a>
          <a href="#features" className="text-slate-400 hover:text-white transition-colors">Features</a>
          <a href="#submit" className="text-slate-400 hover:text-white transition-colors">Submit</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300">100% Anonymous • No Tracking • Your Identity Protected</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Your Voice Matters.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
              Even When No One Knows It's Yours.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            A safe, anonymous space for employees to speak up about workplace issues — 
            without fear of judgement, retaliation, or consequences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={onSubmitClick}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-teal-500/20"
            >
              Share Your Voice →
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={onTrackClick}
              className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg rounded-xl"
            >
              Track Your Submission
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>End-to-End Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>No Login Required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Identity Never Stored</span>
            </div>
          </div>
        </div>
      </section>

      {/* Psychological Safety Section */}
      <section id="psychological-safety" className="px-6 py-16 md:px-12 lg:px-20 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              What is Psychological Safety?
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Psychological safety is the belief that you won't be punished or humiliated for speaking up with ideas, questions, concerns, or mistakes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Without Psychological Safety */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-red-400">Without Psychological Safety</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Employees stay silent about problems",
                  "Issues escalate until they're crises",
                  "Good people leave without explaining why",
                  "Innovation dies — no one takes risks",
                  "Mental health suffers in silence",
                  "Toxic behaviours go unreported",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                    <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* With Psychological Safety */}
            <div className="bg-teal-500/5 border border-teal-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-teal-400">With Psychological Safety</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Employees speak up about concerns early",
                  "Problems are caught before they grow",
                  "Talent stays and thrives",
                  "Teams innovate and take smart risks",
                  "People bring their whole selves to work",
                  "A culture of trust and respect grows",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                    <svg className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quote */}
          <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 md:p-8 text-center">
            <svg className="w-10 h-10 text-teal-400/30 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-4">
              "In a psychologically safe workplace, employees feel confident that they can speak up without fear of embarrassment, rejection, or punishment."
            </p>
            <p className="text-slate-500 text-sm">
              — Dr. Amy Edmondson, Harvard Business School
            </p>
          </div>
        </div>
      </section>

      {/* Why Employees Stay Silent */}
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Why Employees Stay Silent
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              It's not that employees don't care. It's that the risks of speaking up feel too high.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                title: "Fear of Retaliation", 
                desc: "Worried about losing their job, missing promotions, or being sidelined",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )
              },
              { 
                title: "Distrust in HR", 
                desc: "Belief that HR protects the company, not employees",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                )
              },
              { 
                title: "Social Pressure", 
                desc: "Fear of being seen as a troublemaker or not a team player",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )
              },
              { 
                title: "Past Experience", 
                desc: "Previous attempts to speak up were ignored or backfired",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
            ].map((item, i) => (
              <div 
                key={i} 
                className="bg-slate-800/30 border border-slate-800 rounded-xl p-5"
              >
                <div className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 mb-3">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Cost of Silence - Statistics */}
      <section className="px-6 py-16 md:px-12 lg:px-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            The Cost of Silence
          </h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
            When employees can't speak up safely, everyone pays the price — individuals, teams, and organizations.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { stat: "76%", label: "of employees have stayed silent about a workplace issue out of fear" },
              { stat: "82%", label: "don't trust HR to handle concerns confidentially" },
              { stat: "91%", label: "say workplace issues affect their mental health" },
            ].map((item, i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700">
                <CardContent className="pt-6 pb-6">
                  <div className="text-4xl font-bold text-teal-400 mb-2">{item.stat}</div>
                  <p className="text-slate-400 text-sm">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <p className="text-slate-500 text-sm mt-6">
            *Based on workplace research across Indian organizations
          </p>
        </div>
      </section>

      {/* How TrustRoom Creates Safety */}
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              How TrustRoom Creates Safety
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              We remove every barrier that keeps employees from speaking up.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Complete Anonymity",
                desc: "No login, no email, no IP tracking. We literally cannot know who you are — and that's by design.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Independent Platform",
                desc: "TrustRoom is not controlled by your HR or management. We exist to serve employees, not protect companies.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
              },
              {
                title: "Transparent Follow-up",
                desc: "Track your submission's progress with a code. See that your voice led to action — without revealing yourself.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
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

      {/* Categories Section */}
      <section className="px-6 py-16 md:px-12 lg:px-20 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              What Can You Report?
            </h2>
            <p className="text-slate-400">
              Anything that affects your work experience. Here are some common categories:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((item, i) => (
              <div 
                key={i} 
                className="bg-slate-800/30 border border-slate-800 rounded-xl p-5 hover:border-teal-500/50 hover:bg-slate-800/50 transition-all"
              >
                <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center text-teal-400 mb-3">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-16 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-slate-400">
              Three simple steps. No accounts. No identity. Just your voice.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Share Anonymously",
                desc: "Describe your concern. Choose a category. No name, no email, no login required.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Get a Tracking Code",
                desc: "Receive a unique code. Use it to check your submission status anytime — still anonymous.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Action Is Taken",
                desc: "Your concern reaches the right people. Track progress. See that your voice made a difference.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center text-teal-400">
                  {item.icon}
                </div>
                <div className="text-teal-400 text-sm font-semibold mb-2">{item.step}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section id="features" className="px-6 py-16 md:px-12 lg:px-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Your Privacy Is Not Negotiable
            </h2>
            <p className="text-slate-400">
              We built TrustRoom with one principle: your identity stays yours.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "No Login Required",
                desc: "No email. No phone number. No account. Just open and share.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: "Zero Data Collection",
                desc: "We don't store IP addresses, device info, or any identifying data.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                ),
              },
              {
                title: "End-to-End Encryption",
                desc: "Your submission is encrypted. Only authorized reviewers can read it.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
              },
              {
                title: "Anonymous Tracking",
                desc: "Follow up on your submission using a code — without ever revealing who you are.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                ),
              },
              {
                title: "Third-Party Managed",
                desc: "TrustRoom operates independently, not controlled by your HR or management.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
              },
              {
                title: "Transparent Process",
                desc: "See what happens to reports. Know that action is being taken.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div 
                key={i} 
                className="flex gap-4 p-5 rounded-xl bg-slate-800/30 border border-slate-800"
              >
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

      {/* Trust Statement */}
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Our Promise to You
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            "We will never know who you are. We will never try to find out. 
            Your submission cannot be traced back to you — not by us, not by your company, not by anyone. 
            <span className="text-teal-400 font-medium"> Your courage to speak deserves complete protection.</span>"
          </p>
          <p className="text-slate-500 mt-6 text-sm">
            — The TrustRoom Team
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section id="submit" className="px-6 py-20 md:px-12 lg:px-20 bg-slate-900/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Be Heard?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Your voice can change things. And no one has to know it was you.
          </p>
          <Button 
            size="lg" 
            onClick={onSubmitClick}
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-10 py-7 text-xl rounded-xl shadow-lg shadow-teal-500/25"
          >
            Share Your Voice Anonymously →
          </Button>
          <p className="text-slate-600 text-sm mt-6">
            No login • No email • No tracking • Just your truth
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 md:px-12 lg:px-20 border-t border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-teal-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">T</span>
            </div>
            <span className="text-slate-400">TrustRoom</span>
          </div>
          <p className="text-slate-600 text-sm">
            Because every employee deserves to be heard.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-300">Privacy</a>
            <a href="#" className="hover:text-slate-300">Terms</a>
            <a href="#" className="hover:text-slate-300">Contact</a>
            <button onClick={onAdminClick} className="hover:text-slate-300">Admin</button>
          </div>
        </div>
      </footer>
    </div>
  );
}