import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import SubmissionForm from "./components/SubmissionForm";
import ConfirmationPage from "./components/ConfirmationPage";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import TrackSubmission from "./components/TrackSubmission";
import AboutPage from "./components/AboutPage";

function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [trackingCode, setTrackingCode] = useState("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem("trustroom_admin");
    if (adminStatus === "true") {
      setIsAdminLoggedIn(true);
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

  const goHome = () => setCurrentPage("landing");
  const goAbout = () => setCurrentPage("about");
  const goForm = () => setCurrentPage("form");
  const goTrack = () => setCurrentPage("track");
  const goAdmin = () => setCurrentPage("admin");

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

  // Admin Pages
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
    />
  );
}

export default App;