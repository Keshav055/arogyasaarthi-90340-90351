import React, { useContext, useEffect, useState, useMemo } from "react";
import "../App.css";
import { AuthContext } from "../context/AuthContext";
import DragAndDropSortable from "../components/DragAndDropSortable";
import { calculateStreak, checkBadgeUnlock } from "../components/GamificationUtils";
import BadgeDisplay from "../components/BadgeDisplay";
import { ProgressCelebrate } from "../components/ProgressCelebrate";

function DashboardPage() {
  const { user } = useContext(AuthContext);

  // Demo log dates for streak/badge demo
  const [logDates, setLogDates] = useState([
    ...Array.from({ length: 8 }, (_, i) => daysAgo(i)).reverse()
  ]);
  const [celebrate, setCelebrate] = useState(false);
  const streakMilestones = [
    { type: "streak", name: "7 Day Streak", streak: 7, icon: "🔥" },
    { type: "streak", name: "5 Day Streak", streak: 5, icon: "🌟" },
    { type: "streak", name: "3 Day Streak", streak: 3, icon: "💪" },
    { type: "weekly", name: "2 Week Streak", streak: 2, icon: "🏆" }
  ];
  const streak = useMemo(() => calculateStreak(logDates), [logDates]);
  const userProgress = { dailyStreak: streak.daily, weeklyStreak: streak.weekly };
  const unlocked = useMemo(() => checkBadgeUnlock(streakMilestones, userProgress), [userProgress]);

  useEffect(() => {
    document.title = "Dashboard - ArogyaMitr";
    if (unlocked.length > 0) setCelebrate(true);
  // eslint-disable-next-line
  }, [unlocked.length]);

  // Load personalized tile order from localStorage if available
  const defaultTiles = [
    { id: "progress", label: "Your Progress", icon: "📊" },
    { id: "healthTip", label: "Health Tip", icon: "💡" },
    { id: "wellnessPath", label: "Wellness Path", icon: "🧭" },
    { id: "shortcuts", label: "Shortcuts", icon: "⚡" }
  ];

  const [dashboardTiles, setDashboardTiles] = useState(() => {
    const saved = window.localStorage.getItem("dashboardTilesOrder");
    if (saved) {
      try {
        const ids = JSON.parse(saved);
        let fromSaved = ids
          .map(id => defaultTiles.find(tile => tile.id === id))
          .filter(Boolean);
        fromSaved = fromSaved.concat(defaultTiles.filter(t => !ids.includes(t.id)));
        return fromSaved;
      } catch {
        return defaultTiles;
      }
    }
    return defaultTiles;
  });

  useEffect(() => {
    window.localStorage.setItem(
      "dashboardTilesOrder",
      JSON.stringify(dashboardTiles.map(t => t.id))
    );
  }, [dashboardTiles]);

  return (
    <div className="dashboard-page">
      <h1>Welcome, {user?.name || "ArogyaMitr User"}!</h1>
      <section style={{ margin: "1.2em 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
          <span role="img" aria-label="flame" style={{ fontSize: "2em" }}>🔥</span>
          <b>Daily Streak:</b> <span>{streak.daily} days</span>
          <span role="img" aria-label="trophy" style={{ fontSize: "2em" }}>🏆</span>
          <b>Weekly Streak:</b> <span>{streak.weekly} weeks</span>
        </div>
        <BadgeDisplay badges={unlocked} animate />
      </section>
      {celebrate && <ProgressCelebrate show={celebrate} message={`Congrats! ${unlocked[unlocked.length-1]?.name ?? ""} 🚀`} onDone={() => setCelebrate(false)} />}
      <div className="dashboard-tiles" style={{ marginBottom: 16 }}>
        <DragAndDropSortable
          items={dashboardTiles}
          setItems={setDashboardTiles}
          direction="horizontal"
          renderItem={tile => (
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
                transition: "background 0.15s"
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
      {/* ...other dashboard content... */}
    </div>
  );
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

export default DashboardPage;
