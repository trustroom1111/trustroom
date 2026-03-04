import { Button } from "@/components/ui/button";

export default function AboutPage({ onBackHome, onSubmitClick }) {
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

      {/* Hero Section */}
      <section className="px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">TrustRoom</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            We're building a world where every employee feels safe to speak up — without fear, without hesitation, without consequences.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="px-6 py-12 md:px-12 lg:px-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                TrustRoom exists to give every employee a voice — especially those who feel they can't speak up.
              </p>
              <p className="text-slate-400 leading-relaxed mb-4">
                We believe that when employees feel psychologically safe, they perform better, stay longer, and contribute more meaningfully to their organizations.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Our platform removes every barrier that keeps people silent: fear of retaliation, distrust in systems, and lack of anonymity.
              </p>
            </div>
            <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
              <p className="text-slate-400">
                A workplace where speaking up is celebrated, not feared. Where every voice matters, and every concern leads to positive change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is Psychological Safety */}
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              What is Psychological Safety?
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Psychological safety is the shared belief that a team or workplace is safe for interpersonal risk-taking.
            </p>
          </div>

          <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8 mb-10">
            <div className="flex items-start gap-4">
              <svg className="w-10 h-10 text-teal-400/50 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <div>
                <p className="text-slate-300 text-lg leading-relaxed mb-4">
                  "Psychological safety isn't about being nice. It's about giving candid feedback, openly admitting mistakes, and learning from each other."
                </p>
                <p className="text-slate-500">— Dr. Amy Edmondson, Harvard Business School</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-teal-400">When employees feel safe, they:</h3>
              <ul className="space-y-3">
                {[
                  "Share ideas without fear of ridicule",
                  "Report problems before they escalate",
                  "Ask questions without feeling stupid",
                  "Admit mistakes and learn from them",
                  "Challenge the status quo constructively",
                  "Bring their authentic selves to work",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-400">
                    <svg className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-red-400">When they don't feel safe, they:</h3>
              <ul className="space-y-3">
                {[
                  "Stay silent about critical issues",
                  "Hide mistakes until they become crises",
                  "Avoid taking any risks",
                  "Disengage and do minimum work",
                  "Leave without explaining why",
                  "Suffer mental health issues in silence",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-400">
                    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem - Statistics */}
      <section className="px-6 py-16 md:px-12 lg:px-20 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              The Reality in Indian Workplaces
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Our research across Indian organizations reveals a troubling pattern of silence.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { stat: "76%", label: "stay silent about workplace issues due to fear" },
              { stat: "82%", label: "don't trust HR to maintain confidentiality" },
              { stat: "91%", label: "report mental health impact from work issues" },
              { stat: "67%", label: "have witnessed misconduct but didn't report it" },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-teal-400 mb-2">{item.stat}</div>
                <p className="text-slate-400 text-sm">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "The Fear Factor",
                desc: "Employees fear retaliation, career damage, and social isolation if they speak up about issues.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                ),
              },
              {
                title: "The Trust Gap",
                desc: "Traditional grievance systems are seen as protecting the company, not the employee.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: "The Mental Toll",
                desc: "Unexpressed workplace stress leads to anxiety, burnout, and declining mental health.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                <div className="w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What TrustRoom Provides */}
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              What TrustRoom Provides
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              A comprehensive solution for creating psychological safety in your workplace.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* For Employees */}
            <div className="bg-teal-500/5 border border-teal-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6 text-teal-400">For Employees</h3>
              <ul className="space-y-4">
                {[
                  {
                    title: "100% Anonymous Reporting",
                    desc: "No login, no email, no IP tracking. Your identity is completely protected.",
                  },
                  {
                    title: "Safe Space to Speak",
                    desc: "Report workplace issues without fear of retaliation or judgment.",
                  },
                  {
                    title: "Track Your Submission",
                    desc: "Use your unique code to see what action is being taken.",
                  },
                  {
                    title: "Mental Health Support",
                    desc: "Access to resources and guidance for work-related stress.",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Organizations */}
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6 text-cyan-400">For Organizations</h3>
              <ul className="space-y-4">
                {[
                  {
                    title: "Early Warning System",
                    desc: "Catch issues before they become crises or legal problems.",
                  },
                  {
                    title: "Anonymous Feedback Channel",
                    desc: "Understand what employees really think and feel.",
                  },
                  {
                    title: "Admin Dashboard",
                    desc: "Manage, respond, and track submissions in one place.",
                  },
                  {
                    title: "Culture Insights",
                    desc: "Identify patterns and take action to improve workplace culture.",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="px-6 py-16 md:px-12 lg:px-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Our Core Values
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Anonymity First",
                desc: "Your identity is sacred. We've built every feature around protecting it.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Employee-Centric",
                desc: "We serve employees first. Our platform protects them, not companies.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ),
              },
              {
                title: "Transparency",
                desc: "Employees can track their submissions and see that action is taken.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ),
              },
              {
                title: "Mental Wellbeing",
                desc: "We care about the whole person, not just the workplace issue.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/30 border border-slate-700 rounded-xl p-5 text-center">
                <div className="w-12 h-12 mx-auto bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400 mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Speak Up?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Your voice matters. Your concerns deserve to be heard. And with TrustRoom, no one has to know it's you.
          </p>
          <Button 
            size="lg" 
            onClick={onSubmitClick}
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-10 py-7 text-xl rounded-xl shadow-lg shadow-teal-500/25"
          >
            Share Your Voice Anonymously →
          </Button>
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
          </div>
        </div>
      </footer>
    </div>
  );
}