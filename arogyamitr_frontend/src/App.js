import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./MicroAnimations.module.css";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./layout/MainLayout";
import AppNav from "./layout/AppNav";
import { useAuth } from "./context/AuthContext";
import styles from "./AppTheme.module.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from 'react-hot-toast';

// THEME CONTEXT FOR SPA-WIDE LIVE SWITCHING
const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
});
export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * PUBLIC_INTERFACE
 * ThemeProvider handles persistent theme state and <html data-theme> sync.
 */
function ThemeProvider({ children }) {
  const getInitialTheme = () => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("color-theme");
      if (saved === "dark" || saved === "light") return saved;
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    }
    return "light";
  };
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { window.localStorage.setItem("color-theme", theme); } catch (e) {}
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// PUBLIC_INTERFACE
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: '14px',
              background: '#f8ffe5',
              color: '#222',
              fontWeight: "bold",
              fontSize: "1.15rem",
              boxShadow: "0 4px 20px -4px #8ab66155"
            },
            duration: 2700,
          }}
        />
        <Router>
          <ThemedAppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

// PUBLIC_INTERFACE
function ThemedAppContent() {
  const { isAuthenticated, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.appContainer}>
      <AppNav isAuthenticated={isAuthenticated} onLogout={logout} />
      <button
        className="theme-toggle"
        onClick={() => setTheme(t => (t === "light" ? "dark" : "light"))}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        style={{ position: "fixed", top: 17, right: 16, zIndex: 100 }}
        tabIndex={0}
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
                {React.createElement(require("./pages/WellnessPathPage").default)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/diet-nutrition"
            element={
              <ProtectedRoute>
                {React.createElement(require("./pages/DietNutritionPage").default)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/fitness"
            element={
              <ProtectedRoute>
                {React.createElement(require("./pages/FitnessPage").default)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/mindfulness"
            element={
              <ProtectedRoute>
                {React.createElement(require("./pages/MindfulnessPage").default)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/sleep"
            element={
              <ProtectedRoute>
                {React.createElement(require("./pages/SleepPage").default)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/product-scanner"
            element={
              <ProtectedRoute>
                {React.createElement(require("./pages/ProductScannerPage").default)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/ethical-business-directory"
            element={
              <ProtectedRoute>
                {React.createElement(require("./pages/EthicalBusinessDirectoryPage").default)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/disease-management"
            element={
              <ProtectedRoute>
                {React.createElement(require("./pages/DiseaseManagementPage").default)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/teleconsultation"
            element={
              <ProtectedRoute>
                {React.createElement(require("./pages/TeleconsultationPage").default)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/forums"
            element={
              <ProtectedRoute>
                {React.createElement(require("./pages/ForumsPage").default)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <ProtectedRoute>
                {React.createElement(require("./pages/LocalResourcesPage").default)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/education"
            element={
              <ProtectedRoute>
                {React.createElement(require("./pages/EducationHubPage").default)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-chat"
            element={
              <ProtectedRoute>
                {React.createElement(require("./pages/AiChatPage").default)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                {React.createElement(require("./pages/ProfileSettingsPage").default)}
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
