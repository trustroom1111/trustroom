import { useState } from "react";
import LandingPage from "./components/LandingPage";
import SubmissionForm from "./components/SubmissionForm";
import ConfirmationPage from "./components/ConfirmationPage";
import AdminDashboard from "./components/AdminDashboard";
import TrackSubmission from "./components/TrackSubmission";

function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [trackingCode, setTrackingCode] = useState("");

  const handleSubmitSuccess = (code) => {
    setTrackingCode(code);
    setCurrentPage("confirmation");
  };

  // Track Submission Page
  if (currentPage === "track") {
    return (
      <TrackSubmission 
        onBackHome={() => setCurrentPage("landing")} 
      />
    );
  }

  // Admin Dashboard
  if (currentPage === "admin") {
    return (
      <AdminDashboard 
        onLogout={() => setCurrentPage("landing")} 
      />
    );
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