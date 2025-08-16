import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons CSS
import './custom.css'; // Your custom CSS for Standard Chartered theme

// Import all necessary components
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
// import AdminDashboard from "./components/AdminDashboard"; // Placeholder for future
import OpsDashboard from "./components/OpsDashboard";
import UserDashboard from "./components/UserDashboard";

export default function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          <Routes>
            {/* Default route → Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Login route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Dashboards */}
            <Route path="/ops" element={<OpsDashboard />} />
            <Route path="/user" element={<UserDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
