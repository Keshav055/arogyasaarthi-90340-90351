import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../AppTheme.module.css";

/**
 * PUBLIC_INTERFACE
 * AppNav renders the app's top navigation bar with responsive mobile/desktop behavior.
 */
const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/wellness-path", label: "Wellness Path" },
  { to: "/diet-nutrition", label: "Nutrition" },
  { to: "/fitness", label: "Fitness" },
  { to: "/mindfulness", label: "Mindfulness" },
  { to: "/sleep", label: "Sleep" },
];

function AppNav({ isAuthenticated, onLogout }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // Mobile nav toggle
  function toggleDrawer() {
    setDrawerOpen((prev) => !prev);
  }
  function handleNavClick(path) {
    setDrawerOpen(false);
    navigate(path);
  }

  return (
    <header className={styles.headerBar}>
      <NavLink to="/" className={styles.logo} tabIndex={0} style={{ fontFamily: "Poppins,Segoe UI,sans-serif" }}>
        <span role="img" aria-label="ArogyaMitr heartbeat">💚</span>
        <span style={{color: "var(--primary)"}}>Arogya</span><span style={{color: "var(--secondary)"}}>Mitr</span>
      </NavLink>

      {/* Desktop nav */}
      <nav className={styles.nav}>
        {isAuthenticated &&
          NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}
            >
              {item.label}
            </NavLink>
          ))}
        {!isAuthenticated && (
          <>
            <NavLink to="/login" className={styles.navLink}>
              Login
            </NavLink>
            <NavLink to="/signup" className={styles.navLink}>
              Sign Up
            </NavLink>
          </>
        )}
        {isAuthenticated && (
          <button
            className={styles.cta}
            onClick={onLogout}
            tabIndex={0}
          >
            Logout
          </button>
        )}
      </nav>

      {/* Mobile nav toggle (hamburger) */}
      <button
        className={styles.mobileNavToggle}
        aria-label={drawerOpen ? "Close menu" : "Open menu"}
        onClick={toggleDrawer}
        style={{
          display: "none"
        }}
      >
        ☰
      </button>
      <span
        className={styles.mobileNavToggle}
        aria-label={drawerOpen ? "Close menu" : "Open menu"}
        style={{ display: "block", background: "none", border: "none" }}
        onClick={toggleDrawer}
      >☰</span>

      {drawerOpen && (
        <div className={styles.mobileNavDrawer}>
          <div className={styles.mobileNavLinks}>
            {isAuthenticated &&
              NAV_ITEMS.map((item) => (
                <div
                  key={item.to}
                  role="button"
                  tabIndex={0}
                  className={styles.mobileNavLink}
                  onClick={() => handleNavClick(item.to)}
                  style={{ background: window.location.pathname === item.to ? "var(--accent)" : ""}}
                >
                  {item.label}
                </div>
              ))}
            {!isAuthenticated && (
              <>
                <div
                  role="button"
                  tabIndex={0}
                  className={styles.mobileNavLink}
                  onClick={() => handleNavClick("/login")}
                  style={{ background: window.location.pathname === "/login" ? "var(--accent)" : ""}}
                >
                  Login
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  className={styles.mobileNavLink}
                  onClick={() => handleNavClick("/signup")}
                  style={{ background: window.location.pathname === "/signup" ? "var(--accent)" : ""}}
                >
                  Sign Up
                </div>
              </>
            )}
            {isAuthenticated && (
              <button
                className={styles.cta}
                onClick={onLogout}
                style={{ width: "70%", margin: "0.6em auto 0", display: "block" }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default AppNav;
