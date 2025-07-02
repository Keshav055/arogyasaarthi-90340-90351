import React, { createContext, useState, useEffect, useContext } from "react";

/**
 * AuthContext provides authentication status and user data,
 * as well as login, logout, signup, and OAuth sign-in actions.
 */
const AuthContext = createContext();

/**
 * PUBLIC_INTERFACE
 * AuthProvider wraps the application and exposes authentication state/functions.
 */
export function AuthProvider({ children }) {
  // In-memory state. For production, consider using cookies/localStorage/refresh tokens.
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulating a persisted user: in real app, fetch from backend or localStorage on page load.
  useEffect(() => {
    // TODO: Load user from persisted storage if present, verify via backend if JWT/session.
    setLoading(false);
  }, []);

  // PUBLIC_INTERFACE
  const login = async (email, password) => {
    // In real app, call backend API for authentication
    // Simulate login
    if (email && password) {
      setUser({ email });
      return { success: true };
    }
    return { success: false, message: "Email and password required" };
  };

  // PUBLIC_INTERFACE
  const signup = async (email, password) => {
    // Simulate registration
    if (email && password) {
      setUser({ email });
      return { success: true };
    }
    return { success: false, message: "Email and password required" };
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    setUser(null);
  };

  // PUBLIC_INTERFACE
  const loginWithOAuthProvider = async (provider) => {
    // Simulate social OAuth (Google/Apple)
    setUser({ email: `${provider}_user@example.com`, oauthProvider: provider });
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        loginWithOAuthProvider,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * PUBLIC_INTERFACE
 * useAuth is a convenience hook to consume AuthContext.
 */
export function useAuth() {
  return useContext(AuthContext);
}
