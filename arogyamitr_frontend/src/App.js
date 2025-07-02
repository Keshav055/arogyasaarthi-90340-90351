import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./layout/MainLayout";
import AppNav from "./layout/AppNav";
import { useAuth } from "./context/AuthContext";
import styles from "./AppTheme.module.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <AuthProvider>
      <Router>
        <ThemedAppContent />
      </Router>
    </AuthProvider>
  );
}

// PUBLIC_INTERFACE
function ThemedAppContent() {
  const { isAuthenticated, logout } = useAuth();
  // Universal, persistent theme state
  const getInitialTheme = () => {
    const saved = window.localStorage.getItem("color-theme");
    return saved === "dark" || saved === "light" ? saved : "light";
  };
  const [theme, setTheme] = React.useState(getInitialTheme);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("color-theme", theme);
  }, [theme]);

  // Desktop: nav sits at top; demo: add theme toggle in nav bar
  return (
    <div className={styles.appContainer}>
      <AppNav isAuthenticated={isAuthenticated} onLogout={logout} />
      <button
        className="theme-toggle"
        onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        style={{ position: "fixed", top: 17, right: 16, zIndex: 100 }}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          {/* App core protected routes */}
          <Route
            path="/wellness-path"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  {React.createElement(require("./pages/WellnessPathPage").default)}
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/diet-nutrition"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  {React.createElement(require("./pages/DietNutritionPage").default)}
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/fitness"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  {React.createElement(require("./pages/FitnessPage").default)}
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/mindfulness"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  {React.createElement(require("./pages/MindfulnessPage").default)}
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sleep"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  {React.createElement(require("./pages/SleepPage").default)}
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/product-scanner"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  {React.createElement(require("./pages/ProductScannerPage").default)}
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ethical-business-directory"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  {React.createElement(require("./pages/EthicalBusinessDirectoryPage").default)}
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/disease-management"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  {React.createElement(require("./pages/DiseaseManagementPage").default)}
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teleconsultation"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  {React.createElement(require("./pages/TeleconsultationPage").default)}
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/forums"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  {React.createElement(require("./pages/ForumsPage").default)}
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  {React.createElement(require("./pages/LocalResourcesPage").default)}
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/education"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  {React.createElement(require("./pages/EducationHubPage").default)}
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-chat"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  {React.createElement(require("./pages/AiChatPage").default)}
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  {React.createElement(require("./pages/ProfileSettingsPage").default)}
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;
