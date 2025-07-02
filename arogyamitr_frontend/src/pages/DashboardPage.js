import React from "react";
import { useAuth } from "../context/AuthContext";

/**
 * PUBLIC_INTERFACE
 * DashboardPage stub, protected. Greets user, shows logout.
 */
function DashboardPage() {
  const { user, logout } = useAuth();
  return (
    <div className="container" style={{ margin: "4rem auto", maxWidth: 600 }}>
      <h2>Welcome to ArogyaMitr</h2>
      <div>
        <strong>Hello, {user && user.email}</strong>
      </div>
      <p>
        You are now logged in!<br />
        <br />
        This is your dashboard (actual features/insights coming soon).
      </p>
      <button className="btn" onClick={logout}>Logout</button>
    </div>
  );
}

export default DashboardPage;
