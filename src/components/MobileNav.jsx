import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MobileNav({ 
  onAboutClick, 
  onForCompaniesClick, 
  onSubmitClick, 
  onTrackClick,
  onAdminClick 
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (action) => {
    setIsOpen(false);
    if (action) action();
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-400 hover:text-white transition-colors"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-semibold text-white">TrustRoom</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <nav className="px-6 py-8">
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => handleClick(onAboutClick)}
                  className="w-full text-left text-lg text-slate-300 hover:text-teal-400 py-3 border-b border-slate-800 transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleClick(onForCompaniesClick)}
                  className="w-full text-left text-lg text-slate-300 hover:text-teal-400 py-3 border-b border-slate-800 transition-colors"
                >
                  For Companies
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleClick(onTrackClick)}
                  className="w-full text-left text-lg text-slate-300 hover:text-teal-400 py-3 border-b border-slate-800 transition-colors"
                >
                  Track Submission
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleClick(onAdminClick)}
                  className="w-full text-left text-lg text-slate-300 hover:text-teal-400 py-3 border-b border-slate-800 transition-colors"
                >
                  Admin
                </button>
              </li>
            </ul>

            {/* CTA Button */}
            <div className="mt-8">
              <Button
                onClick={() => handleClick(onSubmitClick)}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-6 text-lg rounded-xl"
              >
                Share Your Voice →
              </Button>
            </div>
          </nav>

          {/* Footer */}
          <div className="absolute bottom-8 left-0 right-0 px-6 text-center">
            <p className="text-slate-600 text-sm">
              100% Anonymous • No Tracking
            </p>
          </div>
        </div>
      )}
    </div>
  );
}