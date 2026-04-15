import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import SubmissionForm from "./components/SubmissionForm";
import ConfirmationPage from "./components/ConfirmationPage";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import TrackSubmission from "./components/TrackSubmission";
import AboutPage from "./components/AboutPage";
import ForCompaniesPage from "./components/ForCompaniesPage";
import CompanyRegister from "./components/CompanyRegister";
import CompanyRegisterSuccess from "./components/CompanyRegisterSuccess";
import CompanyAdminLogin from "./components/CompanyAdminLogin";
import CompanyDashboard from "./components/CompanyDashboard";
import CompanySubmissionForm from "./components/CompanySubmissionForm";
import SignUpPage from "./components/SignUpPage";
import OnboardingPage from "./components/OnboardingPage";
import NewDashboard from "./components/NewDashboard";
import EmployeePortal from "./components/EmployeePortal";

function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [trackingCode, setTrackingCode] = useState("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [registeredCompany, setRegisteredCompany] = useState({ code: "", name: "" });
  const [companyAdmin, setCompanyAdmin] = useState(null);
  const [companyCode, setCompanyCode] = useState("");

  // Map page names to URL paths
  const getUrlForPage = (page, code) => {
    switch (page) {
      case "landing": return "/";
      case "signup": return "/signup";
      case "onboarding": return "/onboarding";
      case "new-dashboard": return "/dashboard";
      case "employee-portal": return `/portal/${code}`;
      case "company-submit": return `/submit/${code}`;
      case "about": return "/about";
      case "form": return "/form";
      case "track": return "/track";
      case "admin": return "/admin";
      case "for-companies": return "/for-companies";
      case "company-register": return "/company-register";
      case "company-login": return "/company-login";
      case "company-register-success": return "/company-register-success";
      case "company-dashboard": return "/company-dashboard";
      case "confirmation": return "/confirmation";
      default: return "/";
    }
  };

  // Resolve a URL path to { page, code }
  const resolvePathToPage = (path) => {
    const portalMatch = path.match(/^\/portal\/([A-Za-z0-9]+)$/);
    if (portalMatch) return { page: "employee-portal", code: portalMatch[1] };

    const submitMatch = path.match(/^\/submit\/([A-Za-z0-9]+)$/);
    if (submitMatch) return { page: "company-submit", code: submitMatch[1] };

    const simpleRoutes = {
      "/": "landing",
      "/signup": "signup",
      "/onboarding": "onboarding",
      "/dashboard": "new-dashboard",
      "/about": "about",
      "/form": "form",
      "/track": "track",
      "/admin": "admin",
      "/for-companies": "for-companies",
      "/company-register": "company-register",
      "/company-login": "company-login",
      "/company-register-success": "company-register-success",
      "/company-dashboard": "company-dashboard",
      "/confirmation": "confirmation",
    };

    return { page: simpleRoutes[path] || "landing", code: "" };
  };

  // Central navigation — pushes history state for every page change
  const navigateTo = (page, code) => {
    if (code) setCompanyCode(code);
    setCurrentPage(page);
    const url = getUrlForPage(page, code);
    window.history.pushState({ page, code: code || "" }, "", url);
  };

  // Apply a history state without pushing (used by popstate and initial load)
  const applyState = (page, code) => {
    if (code) setCompanyCode(code);
    setCurrentPage(page);
  };

  // Initial load: resolve URL and replace current history entry with state
  useEffect(() => {
    const { page, code } = resolvePathToPage(window.location.pathname);
    if (code) setCompanyCode(code);
    setCurrentPage(page);
    window.history.replaceState({ page, code: code || "" }, "", window.location.pathname);

    // Check super admin
    const adminStatus = localStorage.getItem("trustroom_admin");
    if (adminStatus === "true") {
      setIsAdminLoggedIn(true);
    }

    // Check company admin
    const savedCompanyAdmin = localStorage.getItem("trustroom_company_admin");
    if (savedCompanyAdmin) {
      setCompanyAdmin(JSON.parse(savedCompanyAdmin));
    }
  }, []);

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        applyState(event.state.page, event.state.code);
      } else {
        // Fallback: resolve from URL
        const { page, code } = resolvePathToPage(window.location.pathname);
        applyState(page, code);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSubmitSuccess = (code) => {
    setTrackingCode(code);
    navigateTo("confirmation");
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("trustroom_admin");
    setIsAdminLoggedIn(false);
    navigateTo("landing");
  };

  const handleCompanyRegisterSuccess = (code, name) => {
    setRegisteredCompany({ code, name });
    navigateTo("company-register-success");
  };

  const handleCompanyAdminLogin = (adminData) => {
    setCompanyAdmin(adminData);
    localStorage.setItem("trustroom_company_admin", JSON.stringify(adminData));
    navigateTo("company-dashboard");
  };

  const handleCompanyAdminLogout = () => {
    setCompanyAdmin(null);
    localStorage.removeItem("trustroom_company_admin");
    navigateTo("landing");
  };

  const goHome = () => navigateTo("landing");
  const goAbout = () => navigateTo("about");
  const goForm = () => navigateTo("form");
  const goTrack = () => navigateTo("track");
  const goAdmin = () => navigateTo("admin");
  const goForCompanies = () => navigateTo("for-companies");
  const goCompanyRegister = () => navigateTo("company-register");
  const goCompanyLogin = () => navigateTo("company-login");
  const goSignUp = () => navigateTo("signup");
  const goOnboarding = () => navigateTo("onboarding");
  const goNewDashboard = () => navigateTo("new-dashboard");
  const goEmployeePortal = (code) => navigateTo("employee-portal", code);

  const handleNavigate = (page, code) => {
    navigateTo(page, code);
  };

  // Sign Up Page
  if (currentPage === "signup") {
    return (
      <SignUpPage
        onNavigate={(page) => handleNavigate(page)}
        onLogoClick={goHome}
      />
    );
  }

  // Onboarding Page
  if (currentPage === "onboarding") {
    return (
      <OnboardingPage
        onComplete={(code) => {
          goNewDashboard();
        }}
        onLogoClick={goHome}
      />
    );
  }

  // New Dashboard
  if (currentPage === "new-dashboard") {
    return (
      <NewDashboard
        onLogout={goHome}
        onLogoClick={goHome}
        onNavigate={(page, code) => handleNavigate(page, code)}
      />
    );
  }

  // Employee Portal
  if (currentPage === "employee-portal" && companyCode) {
    return (
      <EmployeePortal
        companyCode={companyCode}
        onNavigate={(page, code) => handleNavigate(page, code)}
        onLogoClick={goHome}
      />
    );
  }

  // Company Submission Form (from URL)
  if (currentPage === "company-submit" && companyCode) {
    return (
      <CompanySubmissionForm
        companyCode={companyCode}
        onSuccess={handleSubmitSuccess}
        onLogoClick={goHome}
      />
    );
  }

  // Company Dashboard
  if (currentPage === "company-dashboard" && companyAdmin) {
    return (
      <CompanyDashboard
        companyAdmin={companyAdmin}
        onLogout={handleCompanyAdminLogout}
        onLogoClick={goHome}
      />
    );
  }

  // Company Admin Login
  if (currentPage === "company-login") {
    return (
      <CompanyAdminLogin
        onLogoClick={goHome}
        onLoginSuccess={handleCompanyAdminLogin}
        onBack={goHome}
        onRegister={goCompanyRegister}
      />
    );
  }

  // Company Register Success Page
  if (currentPage === "company-register-success") {
    return (
      <CompanyRegisterSuccess
        companyCode={registeredCompany.code}
        companyName={registeredCompany.name}
        onGoToDashboard={goCompanyLogin}
        onLogoClick={goHome}
      />
    );
  }

  // Company Register Page
  if (currentPage === "company-register") {
    return (
      <CompanyRegister
        onLogoClick={goHome}
        onSuccess={handleCompanyRegisterSuccess}
        onBack={goForCompanies}
      />
    );
  }

  // For Companies Page
  if (currentPage === "for-companies") {
    return (
      <ForCompaniesPage 
        onLogoClick={goHome}
        onAboutClick={goAbout}
        onGetStarted={goCompanyRegister}
        onCompanyLogin={goCompanyLogin}
      />
    );
  }

  // About Page
  if (currentPage === "about") {
    return (
      <AboutPage 
        onBackHome={goHome}
        onSubmitClick={goForm}
        onLogoClick={goHome}
      />
    );
  }

  // Track Submission Page
  if (currentPage === "track") {
    return (
      <TrackSubmission 
        onBackHome={goHome}
        onLogoClick={goHome}
      />
    );
  }

  // Super Admin Pages
  if (currentPage === "admin") {
    if (isAdminLoggedIn) {
      return (
        <AdminDashboard 
          onLogout={handleAdminLogout}
          onLogoClick={goHome}
        />
      );
    } else {
      return (
        <AdminLogin 
          onLoginSuccess={() => setIsAdminLoggedIn(true)}
          onBack={goHome}
          onLogoClick={goHome}
        />
      );
    }
  }

  // Confirmation Page
  if (currentPage === "confirmation") {
    return (
      <ConfirmationPage 
        trackingCode={trackingCode} 
        onBackHome={goHome}
        onLogoClick={goHome}
      />
    );
  }

  // Submission Form
  if (currentPage === "form") {
    return (
      <SubmissionForm 
        onBack={goHome} 
        onSubmitSuccess={handleSubmitSuccess}
        onLogoClick={goHome}
      />
    );
  }

  // Landing Page
  return (
    <LandingPage 
      onSubmitClick={goForm} 
      onAdminClick={goAdmin}
      onTrackClick={goTrack}
      onLogoClick={goHome}
      onAboutClick={goAbout}
      onForCompaniesClick={goForCompanies}
      onSignUpClick={goSignUp}
    />
  );
}

export default App;