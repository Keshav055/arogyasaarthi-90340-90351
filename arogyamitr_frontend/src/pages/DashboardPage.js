import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import { AuthContext } from "../context/AuthContext";
import DragAndDropSortable from "../components/DragAndDropSortable";
import {
  AiOutlineRobot,
} from "react-icons/ai";
import { GiMeal, GiMeditation, GiHealthNormal } from "react-icons/gi";
import { RiMedal2Fill } from "react-icons/ri";
import { MdConnectWithoutContact } from "react-icons/md";

// Style tokens for info panel (per design notes)
const infoPanelStyles = {
  borderRadius: "14px",
  background: "#DBF6E1", // --accent-green
  border: "1.5px solid #8DC89B",
  margin: "0 auto 2.6rem auto",
  marginTop: "1.5rem",
  padding: "2.4rem 2.1rem 2.1rem 2.2rem",
  boxShadow: "0 3px 18px 0 rgba(140,200,155,0.11)",
  maxWidth: 1100,
  display: "flex",
  flexDirection: "row",
  gap: "2.6rem",
  zIndex: 1,
  position: "relative",
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
};
const infoPanelMobile = {
  flexDirection: "column",
  gap: "2.1rem",
  padding: "2rem 1rem 1.5rem 1rem",
};

const infoLeftStyles = {
  flex: 1.26,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: "1.4rem",
  justifyContent: "flex-start",
};

const infoTitle = {
  fontWeight: 800,
  fontSize: "2rem",
  color: "#152310", // --main-text
  marginBottom: "0.4rem",
  letterSpacing: "-0.01em",
};
const infoDesc = {
  color: "#4B4B4B",
  fontSize: "1.15rem",
  marginBottom: "0.7rem",
  lineHeight: 1.6,
  fontWeight: 500,
};

const useCaseBox = {
  background: "#FFFABA",
  borderLeft: "6px solid #8DC89B",
  padding: "1.02rem 1.30rem",
  borderRadius: "0.85rem",
  color: "#38563e",
  fontSize: "1.08rem",
  fontStyle: "italic",
  margin: "0.2rem 0 0.4rem 0",
  boxShadow: "0 1px 7px 0 #f6eaad38"
};

const panelDivider = {
  width: 2,
  background: "#cdeed2",
  opacity: 0.6,
  margin: "0 2.6rem",
  border: "none",
  alignSelf: "stretch",
  display: "block"
};

const featuresBlock = {
  flex: "1 1 370px",
  minWidth: 270,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const featuresGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(142px,1fr))",
  gap: "1.25rem",
  marginTop: "1.03rem",
  marginBottom: "0.4rem",
  width: "100%",
};

const featureCard = {
  background: "#FAFFFC",
  border: "1.5px solid #DBF6E1",
  boxShadow: "0 2px 8px 0 #C8E6C978",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: "1.07rem 0.5rem 1.12rem 0.5rem",
  minHeight: "130px",
  transition: "transform 0.14s",
  outline: "none",
  textAlign: "center",
};

const featureLabel = {
  fontWeight: 600,
  color: "#28513c",
  fontSize: "1.09rem",
  marginTop: "0.39rem",
};
const featureDesc = {
  fontSize: "0.98rem",
  color: "#607D8B",
  textAlign: "center",
  marginTop: "0.10rem"
};

function DashboardPage() {
  const { user } = useContext(AuthContext);

  // Responsive info panel: collapse to stacked on small screens
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // App Features per new requirements (matching icons & text)
  const featureList = [
    {
      icon: <AiOutlineRobot size={36} color="#4CA65A" />,
      label: "AI Insights",
      desc: "Personalized guidance and smart recommendations"
    },
    {
      icon: <GiMeal size={36} color="#FFC857" />,
      label: "Regional Meal Plans",
      desc: "Culturally authentic & healthy Indian meal planning"
    },
    {
      icon: <GiMeditation size={36} color="#6bbe9c" />,
      label: "Mindfulness Tools",
      desc: "Track mood, meditate, and reduce stress"
    },
    {
      icon: <RiMedal2Fill size={36} color="#FDC500" />,
      label: "Gamified Progress",
      desc: "Earn badges, celebrate streaks, and level up"
    },
    {
      icon: <MdConnectWithoutContact size={36} color="#2C3E50" />,
      label: "Care & Connect",
      desc: "Peer groups, tele-consults, events, and chat"
    },
    {
      icon: <GiHealthNormal size={36} color="#4CA65A" />,
      label: "Comprehensive Health",
      desc: "Fitness, sleep, and vitals in one holistic app"
    }
  ];

  // Personalized dashboard tile logic
  const defaultTiles = [
    {
      id: "progress",
      label: "Your Progress",
      icon: "📊",
    },
    {
      id: "healthTip",
      label: "Health Tip",
      icon: "💡",
    },
    {
      id: "wellnessPath",
      label: "Wellness Path",
      icon: "🧭",
    },
    {
      id: "shortcuts",
      label: "Shortcuts",
      icon: "⚡",
    },
  ];

  const [dashboardTiles, setDashboardTiles] = useState(() => {
    const saved = window.localStorage.getItem("dashboardTilesOrder");
    if (saved) {
      try {
        const ids = JSON.parse(saved);
        let fromSaved = ids
          .map((id) => defaultTiles.find((tile) => tile.id === id))
          .filter(Boolean);
        // Append any new tiles that weren't in saved order
        fromSaved = fromSaved.concat(defaultTiles.filter((t) => !ids.includes(t.id)));
        return fromSaved;
      } catch {
        return defaultTiles;
      }
    }
    return defaultTiles;
  });

  // Save personalized order if changed
  useEffect(() => {
    window.localStorage.setItem(
      "dashboardTilesOrder",
      JSON.stringify(dashboardTiles.map((t) => t.id))
    );
  }, [dashboardTiles]);

  return (
    <div
      className="dashboard-page"
      style={{
        maxWidth: 1100,
        minHeight: "calc(100vh - 62px)",
        margin: "0 auto",
        padding: "0 1.2rem 70px 1.2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "transparent"
      }}
    >
      {/* SECTION: Info Panel */}
      <section
        aria-label="About ArogyaMitr"
        style={{
          ...(windowWidth < 820 ? { ...infoPanelStyles, ...infoPanelMobile } : infoPanelStyles),
          width: "100%",
          marginBottom: "2.5rem"
        }}
        className="dashboard-info-panel"
      >
        <div style={infoLeftStyles} className="info-content">
          <div style={infoTitle}>
            Meet <span style={{ color: "#4CA65A" }}>ArogyaMitr</span>
          </div>
          <div style={infoDesc}>
            ArogyaMitr is a holistic digital wellness companion built for a modern, health-conscious lifestyle.
            Combining <b>AI-driven guidance</b>, culturally relevant Indian meal planning, and personalized trackers,
            it guides you toward healthy, sustainable habits with joy and gamification.
          </div>
          <div style={useCaseBox}>
            <b>Example Use-case: </b>
            <span>
              Priya, a busy professional, uses ArogyaMitr every day to check her morning dashboard,
              plan her South Indian meals, track meditation streaks, and book a quick tele-consultation.
              She enjoys the playful rewards and insightful nudges that help her stay motivated and empowered.
            </span>
          </div>
        </div>
        {windowWidth >= 600 && <hr style={panelDivider} className="info-panel-divider" />}
        <div style={featuresBlock}>
          <div
            style={{
              fontWeight: 700,
              fontSize: "1.13rem",
              marginBottom: "0.2rem",
              color: "#4CA65A",
              letterSpacing: "0.012em",
              alignSelf: "center"
            }}
          >
            Key Features
          </div>
          <div style={featuresGrid} className="feature-grid">
            {featureList.map(({ icon, label, desc }, idx) => (
              <div
                key={label + idx}
                style={{
                  ...featureCard,
                  boxShadow: idx % 2 === 1 ? "0 1.5px 9px 0 #b3fad7ad" : featureCard.boxShadow,
                  cursor: "pointer",
                  margin: "0 auto"
                }}
                tabIndex={0}
                aria-label={label}
              >
                <div>{icon}</div>
                <div style={featureLabel}>{label}</div>
                <div style={featureDesc}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* SECTION: Dashboard Title & Tiles */}
      <section
        className="dashboard-greeting-section"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto 2rem auto"
        }}
      >
        <h1
          style={{
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontWeight: 800,
            color: "#152310",
            fontSize: "2.1rem",
            letterSpacing: "-0.02em",
            margin: 0,
            marginBottom: 8,
            alignSelf: "center",
            textAlign: "center"
          }}
        >
          Welcome, {user?.name || "ArogyaMitr User"}!
        </h1>
        <div
          className="dashboard-tiles"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.7rem",
            width: "100%",
            marginTop: 10,
            marginBottom: 8
          }}
        >
          <DragAndDropSortable
            items={dashboardTiles}
            setItems={setDashboardTiles}
            direction="horizontal"
            renderItem={(tile) => (
              <div
                key={tile.id}
                className="dashboard-tile"
                style={{
                  background: "#F7FFF7",
                  border: "2px solid #E0E5DF",
                  borderRadius: 16,
                  padding: "18px 24px",
                  minWidth: 130,
                  minHeight: 90,
                  boxShadow: "0 2px 8px rgba(76,166,90,0.09)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: "1.3rem",
                  fontWeight: 500,
                  cursor: "grab",
                  touchAction: "manipulation",
                  userSelect: "none",
                  transition: "background 0.15s",
                  margin: "0 .5rem"
                }}
              >
                <span className="tile-icon" aria-label={tile.label} style={{ fontSize: "2rem" }}>
                  {tile.icon}
                </span>
                <div className="tile-label" style={{ marginTop: 5, fontSize: "1rem" }}>
                  {tile.label}
                </div>
              </div>
            )}
          />
        </div>
      </section>
      {/* Add further dashboard sections below as needed */}
    </div>
  );
}

export default DashboardPage;
