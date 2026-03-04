import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import SubmissionForm from "./components/SubmissionForm";
import ConfirmationPage from "./components/ConfirmationPage";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import TrackSubmission from "./components/TrackSubmission";

function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [trackingCode, setTrackingCode] = useState("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Check if admin is already logged in
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

  // Track Submission Page
  if (currentPage === "track") {
    return (
      <TrackSubmission 
        onBackHome={() => setCurrentPage("landing")} 
      />
    );
  }

  // Admin Pages
  if (currentPage === "admin") {
    if (isAdminLoggedIn) {
      return (
        <AdminDashboard 
          onLogout={handleAdminLogout} 
        />
      );
    } else {
      return (
        <AdminLogin 
          onLoginSuccess={() => setIsAdminLoggedIn(true)}
          onBack={() => setCurrentPage("landing")}
        />
      );
    }
  }

  // Confirmation Page
  if (currentPage === "confirmation") {
    return (
      <ConfirmationPage 
        trackingCode={trackingCode} 
        onBackHome={() => setCurrentPage("landing")} 
      />
    );
  }

  // Submission Form
  if (currentPage === "form") {
    return (
      <SubmissionForm 
        onBack={() => setCurrentPage("landing")} 
        onSubmitSuccess={handleSubmitSuccess}
      />
    );
  }

  // Landing Page
  return (
    <LandingPage 
      onSubmitClick={() => setCurrentPage("form")} 
      onAdminClick={() => setCurrentPage("admin")}
      onTrackClick={() => setCurrentPage("track")}
    />
  );
}

export default App;