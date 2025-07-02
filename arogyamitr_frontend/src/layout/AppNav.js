import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../AppTheme.module.css";
import anim from "../MicroAnimations.module.css";

/**
 * PUBLIC_INTERFACE
 * AppNav renders the app's top navigation bar with responsive mobile/desktop behavior, theme colors, and accessibility, with playful micro-animations.
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

  function toggleDrawer() {
    setDrawerOpen((prev) => !prev);
  }

  function handleNavClick(path) {
    setDrawerOpen(false);
    navigate(path);
  }

  const getMobileActiveStyle = (to) =>
    window.location.pathname === to
      ? {
          background: "var(--accent)",
          color: "var(--primary-dark)",
          fontWeight: 700,
          borderRadius: 9,
        }
      : {
          background: "transparent",
          color: "var(--primary-text)",
        };

  return (
    <header
      className={styles.headerBar}
      style={{
        background: "var(--header-bg, #e7f5ec)",
        borderBottom: "1.5px solid var(--border)",
        minHeight: 62,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 20,
        padding: "0 1.5rem",
        boxShadow: "0 2px 10px rgba(30,90,50,0.05)",
      }}
    >
      <NavLink
        to="/"
        className={styles.logo}
        tabIndex={0}
        style={{
          fontFamily: "Poppins,Segoe UI,sans-serif",
          display: "flex",
          alignItems: "center",
          fontWeight: 700,
          fontSize: "1.26rem",
          letterSpacing: "0.01em",
          textDecoration: "none",
        }}
      >
        <span role="img" aria-label="ArogyaMitr heartbeat" style={{ fontSize: 23, marginRight: 3 }}>
          💚
        </span>
        <span style={{ color: "var(--primary)" }}>Arogya</span>
        <span style={{ color: "var(--secondary)" }}>Mitr</span>
      </NavLink>
      {/* Desktop nav */}
      <nav
        className={styles.nav}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 11,
        }}
      >
        {isAuthenticated &&
          NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `${isActive ? styles.navLinkActive : styles.navLink} ${anim.microBtn}`
              }
              style={({ isActive }) => ({
                color: isActive
                  ? "var(--primary)"
                  : "var(--primary-text)",
                background: isActive
                  ? "var(--surface)"
                  : "transparent",
                borderRadius: isActive ? 9 : 7,
                fontWeight: isActive ? 700 : 500,
                padding: "8px 17px",
                fontSize: "1.08rem",
                textDecoration: "none",
                lineHeight: 1.25,
                transition: "background 0.15s,color 0.11s",
                outline: "none",
                border: "none",
              })}
              tabIndex={0}
            >
              {item.label}
            </NavLink>
          ))}
        {!isAuthenticated && (
          <>
            <NavLink
              to="/login"
              className={`${styles.navLink} ${anim.microBtn}`}
              style={{
                color: "var(--primary-text)",
                fontWeight: 500,
                padding: "8px 17px",
                fontSize: "1.08rem",
                borderRadius: 7,
                background: "transparent",
                textDecoration: "none",
                lineHeight: 1.25,
              }}
              tabIndex={0}
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={`${styles.navLink} ${anim.microBtn}`}
              style={{
                color: "var(--primary-text)",
                fontWeight: 500,
                padding: "8px 17px",
                fontSize: "1.08rem",
                borderRadius: 7,
                background: "transparent",
                textDecoration: "none",
                lineHeight: 1.25,
              }}
              tabIndex={0}
            >
              Sign Up
            </NavLink>
          </>
        )}
        {isAuthenticated && (
          <button
            className={`${styles.cta} ${anim.microBtn}`}
            onClick={onLogout}
            tabIndex={0}
            style={{
              background: "var(--primary)",
              color: "#fff",
              borderRadius: 9,
              padding: "8px 18px",
              fontWeight: 700,
              border: "none",
              marginLeft: "13px",
              cursor: "pointer",
              fontSize: "1.05rem",
              boxShadow: "0 1px 5px rgba(44,166,90,0.08)",
              transition: "background 0.17s, color 0.10s",
            }}
          >
            Logout
          </button>
        )}
      </nav>
      {/* Mobile nav toggle */}
      <button
        className={styles.mobileNavToggle}
        aria-label={drawerOpen ? "Close menu" : "Open menu"}
        onClick={toggleDrawer}
        style={{
          display: "none",
          background: "none",
          border: "none",
          color: "var(--primary-text)",
          fontSize: 28,
          marginLeft: 14,
          cursor: "pointer",
        }}
      >
        ☰
      </button>
      <span
        className={styles.mobileNavToggle}
        aria-label={drawerOpen ? "Close menu" : "Open menu"}
        tabIndex={0}
        style={{
          display: "none", // Default hide on desktop, show via CSS below 900px
          background: "none",
          border: "none",
          fontSize: 32,
          lineHeight: 1,
          marginLeft: 16,
          color: "var(--primary-text)",
          cursor: "pointer",
        }}
        onClick={toggleDrawer}
        onKeyDown={e => (e.key === "Enter" || e.key === " ") && toggleDrawer()}
      >☰</span>
      {/* Responsive mobile nav drawer */}
      {drawerOpen && (
        <div
          className={styles.mobileNavDrawer}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "99vw",
            height: "100vh",
            background: "var(--background, #fff)",
            zIndex: 222,
            boxShadow: "0 5px 55px 0 rgba(20,30,50,0.22)",
            borderRight: "1.2px solid var(--border)",
            display: "flex",
            flexDirection: "column",
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles.mobileNavLinks}
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 27,
              width: "100%",
              alignItems: "center"
            }}
          >
            {/* Close button in drawer */}
            <button
              aria-label="Close menu"
              onClick={toggleDrawer}
              className={anim.microBtn}
              style={{
                position: "absolute",
                right: 16,
                top: 14,
                background: "none",
                color: "var(--primary-text)",
                border: "none",
                fontSize: 34,
                cursor: "pointer",
              }}
            >×</button>
            {isAuthenticated &&
              NAV_ITEMS.map((item) => (
                <div
                  key={item.to}
                  role="button"
                  tabIndex={0}
                  className={`${styles.mobileNavLink} ${anim.microBtn} ${anim.microPopIn}`}
                  onClick={() => handleNavClick(item.to)}
                  onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleNavClick(item.to)}
                  style={{
                    ...getMobileActiveStyle(item.to),
                    width: "82vw",
                    textAlign: "left",
                    padding: "16px 19px",
                    marginBottom: 6,
                    fontWeight: 600,
                    fontSize: "1.11rem",
                    outline: "none",
                    transition: "background 0.11s, color 0.13s",
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </div>
              ))}
            {!isAuthenticated && (
              <>
                <div
                  role="button"
                  tabIndex={0}
                  className={`${styles.mobileNavLink} ${anim.microBtn}`}
                  onClick={() => handleNavClick("/login")}
                  onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleNavClick("/login")}
                  style={{
                    ...getMobileActiveStyle("/login"),
                    width: "82vw",
                    textAlign: "left",
                    padding: "16px 19px",
                    marginBottom: 6,
                    fontWeight: 600,
                    fontSize: "1.11rem",
                  }}
                >
                  Login
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  className={`${styles.mobileNavLink} ${anim.microBtn}`}
                  onClick={() => handleNavClick("/signup")}
                  onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleNavClick("/signup")}
                  style={{
                    ...getMobileActiveStyle("/signup"),
                    width: "82vw",
                    textAlign: "left",
                    padding: "16px 19px",
                    marginBottom: 6,
                    fontWeight: 600,
                    fontSize: "1.11rem",
                  }}
                >
                  Sign Up
                </div>
              </>
            )}
            {isAuthenticated && (
              <button
                className={`${styles.cta} ${anim.microBtn}`}
                onClick={onLogout}
                style={{
                  width: "72vw",
                  margin: "1.3em auto 0",
                  display: "block",
                  background: "var(--primary)",
                  color: "#fff",
                  borderRadius: 12,
                  padding: "13px 0",
                  fontSize: "1.09rem",
                  fontWeight: 700,
                  boxShadow: "0 1px 5px rgba(44,166,90,0.07)",
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
      <style>{`
        @media (max-width: 900px) {
          .${styles.nav} {
            display: none !important;
          }
          .${styles.mobileNavToggle} {
            display: block !important;
          }
        }
        @media (min-width: 901px) {
          .${styles.mobileNavToggle} {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}

export default AppNav;
