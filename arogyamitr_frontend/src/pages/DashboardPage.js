import React from "react";
import { useAuth } from "../context/AuthContext";
import { useDashboardData } from "../api/dashboard";
import { ChartCard, UserProgressChart, WellnessInfographic, HealthTipsBar } from "../components/Charts";

/**
 * PUBLIC_INTERFACE
 * DashboardPage shows greeting and wellness analytics, charts, tips.
 */
function DashboardPage() {
  const { user, logout } = useAuth();
  const { data, loading, error } = useDashboardData();

  // Demo fallback (remove when backend returns data)
  const demoProgress = [
    { name: "Week 1", score: 48 },
    { name: "Week 2", score: 63 },
    { name: "Week 3", score: 78 },
    { name: "Week 4", score: 88 },
  ];
  const demoWellness = [
    { aspect: "Nutrition", value: 82 },
    { aspect: "Sleep", value: 73 },
    { aspect: "Mindfulness", value: 61 },
    { aspect: "Fitness", value: 68 },
    { aspect: "Hydration", value: 90 },
  ];
  const demoTips = [
    { tip: "Walk outdoors", users: 135 },
    { tip: "Morning meditation", users: 110 },
    { tip: "Drink water", users: 195 },
    { tip: "Eat fruit", users: 91 },
    { tip: "Track sleep", users: 67 }
  ];

  // Assume API data (show demo if not available)
  const userName = user?.email ? user.email.split("@")[0] : "User";

  return (
    <div className="container" style={{ margin: "2.5rem auto 1.7rem auto", maxWidth: 720 }}>
      <h2 style={{ marginBottom: 0 }}>Welcome to ArogyaMitr</h2>
      <div style={{ color: "var(--text-secondary)", marginBottom: "0.6rem" }}>
        <strong>Hello, {userName}</strong>
      </div>

      <div>
        <button className="btn" onClick={logout}>Logout</button>
      </div>

      <div style={{ margin: "1.5rem 0" }}>
        <span
          style={{
            background: "var(--bg-secondary)",
            color: "var(--text-primary)",
            borderRadius: "12px",
            padding: "0.7rem 1.1rem",
            fontWeight: 500,
            fontSize: "1rem",
            boxShadow: "0 1px 4px rgba(20,54,32,0.07)",
            display: "inline-block"
          }}
        >
          {loading
            ? "Loading insights..."
            : "Your holistic dashboard is ready!"}
        </span>
      </div>

      {error && <div style={{ color: "#EE4266", marginBottom: 12 }}>Error loading data: {error}</div>}

      {/* --- Progress Chart --- */}
      <UserProgressChart data={data?.progress || demoProgress} />

      {/* --- Wellness Radar --- */}
      <WellnessInfographic data={data?.wellness || demoWellness} />

      {/* --- Trending Health Tips Bar --- */}
      <HealthTipsBar data={data?.healthTips || demoTips} />

      {/* More charts/infographics can be added here */}
    </div>
  );
}

export default DashboardPage;
