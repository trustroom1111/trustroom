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

function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [trackingCode, setTrackingCode] = useState("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [registeredCompany, setRegisteredCompany] = useState({ code: "", name: "" });
  const [companyAdmin, setCompanyAdmin] = useState(null);

  useEffect(() => {
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

  const handleSubmitSuccess = (code) => {
    setTrackingCode(code);
    setCurrentPage("confirmation");
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("trustroom_admin");
    setIsAdminLoggedIn(false);
    setCurrentPage("landing");
  };

  const handleCompanyRegisterSuccess = (code, name) => {
    setRegisteredCompany({ code, name });
    setCurrentPage("company-register-success");
  };

  const handleCompanyAdminLogin = (adminData) => {
    setCompanyAdmin(adminData);
    localStorage.setItem("trustroom_company_admin", JSON.stringify(adminData));
    setCurrentPage("company-dashboard");
  };

  const handleCompanyAdminLogout = () => {
    setCompanyAdmin(null);
    localStorage.removeItem("trustroom_company_admin");
    setCurrentPage("landing");
  };

  const goHome = () => setCurrentPage("landing");
  const goAbout = () => setCurrentPage("about");
  const goForm = () => setCurrentPage("form");
  const goTrack = () => setCurrentPage("track");
  const goAdmin = () => setCurrentPage("admin");
  const goForCompanies = () => setCurrentPage("for-companies");
  const goCompanyRegister = () => setCurrentPage("company-register");
  const goCompanyLogin = () => setCurrentPage("company-login");

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
    />
  );
}

export default App;