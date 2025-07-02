import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WellnessInfographic, ChartCard } from "../components/Charts";
import styles from "../MicroAnimations.module.css";

// Core wellness focus modules configuration
const MODULES = [
  {
    key: "nutrition",
    title: "Diet & Nutrition",
    route: "/diet-nutrition",
    icon: "🥗",
    color: "#4CA65A",
    desc: "Meal plans, hydration, Indian recipes",
    statusKey: "nutrition",
  },
  {
    key: "fitness",
    title: "Fitness",
    route: "/fitness",
    icon: "🏃‍♂️",
    color: "#38B3A7",
    desc: "Workout, step goals, activity log",
    statusKey: "fitness",
  },
  {
    key: "mindfulness",
    title: "Mindfulness",
    route: "/mindfulness",
    icon: "🧘",
    color: "#8D72E1",
    desc: "Meditation, journaling, breathwork",
    statusKey: "mindfulness",
  },
  {
    key: "sleep",
    title: "Sleep",
    route: "/sleep",
    icon: "🛌",
    color: "#FFC857",
    desc: "Sleep log, analytics, smart tips",
    statusKey: "sleep",
  },
];

// Demo/mock status/progress data for modules
const DEMO_STATUS = {
  nutrition: {
    progress: 74,
    goal: "Log 1 healthy Indian meal",
    nextAction: "Add meal",
    completed: false,
  },
  fitness: {
    progress: 55,
    goal: "7000 steps today",
    nextAction: "Add workout",
    completed: false,
  },
  mindfulness: {
    progress: 90,
    goal: "15 min guided meditation",
    nextAction: "Start session",
    completed: true,
  },
  sleep: {
    progress: 65,
    goal: "Sleep 7h+ tonight",
    nextAction: "Log sleep",
    completed: false,
  },
};

// Focus area icons and label mapping
const FOCUS_AREAS = [
  { key: "nutrition", label: "Nutrition", icon: "🥗" },
  { key: "fitness", label: "Fitness", icon: "🏃‍♂️" },
  { key: "mindfulness", label: "Mindfulness", icon: "🧘" },
  { key: "sleep", label: "Sleep", icon: "🛌" },
];

/**
 * PUBLIC_INTERFACE
 * WellnessPathPage — main page visualizing user's overall wellness path, focus area selector,
 * navigation/CTA cards for each module, and current progress/status.
 */
function WellnessPathPage() {
  // Track selected focus area (default: Nutrition)
  const [focus, setFocus] = useState("nutrition");
  const navigate = useNavigate();

  // Demo wellness radar data, could be swapped out with API later using useWellnessPath
  const demoWellness = [
    { aspect: "Nutrition", value: 88 },
    { aspect: "Sleep", value: 76 },
    { aspect: "Mindfulness", value: 66 },
    { aspect: "Fitness", value: 80 },
    { aspect: "Hydration", value: 95 },
  ];

  // Progress timeline visualization (static for demo)
  function PathProgressBar({ progress }) {
    return (
      <div className={`${styles.infoPanelEntry}`} style={{
        background: "#f5fdf9",
        borderRadius: 10,
        padding: "14px 18px 10px 18px",
        margin: "1.2rem 0 2.1rem 0",
        boxShadow: "0 1px 6px rgba(44,166,90,0.07)",
        display: "flex",
        gap: 16,
        alignItems: "center"
      }}>
        <span style={{ fontSize: "1.8em", marginRight: 14 }}>🛤️</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "1.09em", fontWeight: 500 }}>
            Your overall progress along the wellness path
          </div>
          <div
            className={styles.progressBarAnimated}
            style={{
              marginTop: 8,
              background: "#e0efeb",
              borderRadius: 6,
              overflow: "hidden",
              height: 14,
              width: "100%",
              position: "relative"
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg,var(--primary,#4CA65A),#38B3A7)",
                height: "100%",
                borderRadius: 6,
                transition: "width 0.7s",
              }}
            />
            <span style={{
              position: "absolute",
              left: `${progress}%`,
              top: 0,
              fontSize: "0.97em",
              color: "#4CA65A",
              fontWeight: 700,
              paddingLeft: 5,
            }}>
              {progress || 0}%
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Module navigation/card component
  function ModuleCard({ module, status, focusActive, onFocus }) {
    const handleModuleClick = () => {
      navigate(module.route);
    };
    return (
      <div className={`wp-module-card ${styles.animatedCardEntry} ${styles.cardHover} ${styles.cardTap}`}
        style={{
          background: focusActive ? "#f2fff4" : "var(--card-bg, #fff)",
          border: focusActive ? "2.6px solid var(--primary,#4CA65A)" : "1.5px solid #e0efeb",
          borderRadius: 16,
          boxShadow: "0 2px 12px rgba(44,166,90,0.04)",
          cursor: "pointer",
          padding: "1.05em 1.1em",
          margin: "0.7em 0",
          minWidth: 245,
          flex: "1 1 237px",
          transition: "box-shadow 0.2s, border 0.2s",
          position: "relative",
          outline: focusActive ? "2px solid #38B3A7" : undefined,
        }}
        tabIndex={0}
        aria-label={`Go to ${module.title}`}
        onClick={handleModuleClick}
        onKeyDown={e => { if (e.key === "Enter" || e.key === " ") handleModuleClick(); }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <span style={{
            fontSize: "2.0em",
            marginRight: 13,
            color: module.color,
            filter: focusActive ? "" : "grayscale(0.2)"
          }}>
            {module.icon}
          </span>
          <div>
            <div style={{
              fontWeight: 700,
              fontSize: "1.17em",
              color: focusActive ? "var(--primary)" : "#247BA0"
            }}>
              {module.title}
            </div>
            <div style={{ color: "#38B3A7", fontSize: "0.97em", marginTop: 2 }}>{module.desc}</div>
          </div>
        </div>
        {/* Progress visualization & CTAs */}
        <div style={{ marginTop: 10, marginBottom: 0 }}>
          <div style={{
            fontSize: "1.09em",
            color: status.completed ? "#4CA65A" : "#888",
            fontWeight: 500
          }}>
            {status.completed ? "🎉 Goal completed!" : `Today's Goal: ${status.goal}`}
          </div>
          <div className={styles.progressBarAnimated}
            style={{
              marginTop: 6, marginBottom: 2,
              display: "flex", alignItems: "center",
              gap: 8
            }}>
            <div style={{
              height: 17,
              width: 97,
              background: "#e0efeb",
              borderRadius: 7,
              overflow: "hidden",
              marginRight: 7,
              position: "relative"
            }}>
              <div style={{
                width: `${Math.min(100, status.progress)}%`,
                height: "100%",
                background: module.color,
                borderRadius: 7,
                transition: "width 0.5s"
              }}></div>
            </div>
            <span style={{ color: module.color, fontWeight: 700, fontSize: "1.01em" }}>
              {status.progress}%
            </span>
          </div>
        </div>
        {/* Next Action/CTA */}
        <button
          className={`btn ${styles.buttonAnim}`}
          style={{
            marginTop: 10,
            background: module.color,
            borderRadius: 9,
            fontWeight: 600,
            color: "#fff",
            padding: "8px 18px",
            fontSize: "1em",
            boxShadow: "0 1px 5px rgba(60,180,80,0.08)",
            border: "none"
          }}
          onClick={e => {
            e.stopPropagation();
            navigate(module.route);
          }}
          tabIndex={0}
        >
          {status.completed ? "View Summary" : status.nextAction}
        </button>
        {/* Toggle focus area */}
        <button
          className={styles.buttonAnim}
          style={{
            position: "absolute",
            top: 14,
            right: 18,
            background: focusActive ? "#38B3A7" : "#F5FEFF",
            color: focusActive ? "#fff" : "#197A73",
            border: "none",
            borderRadius: 8,
            fontSize: "0.97em",
            fontWeight: 500,
            padding: "3px 11px",
            cursor: "pointer",
          }}
          aria-pressed={focusActive}
          onClick={(e) => { e.stopPropagation(); onFocus(module.key); }}
          tabIndex={0}
        >
          {focusActive ? "Focused" : "Set Focus"}
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ margin: "3rem auto", maxWidth: 700 }}>
      <h2 className={styles.infoPanelEntry}>Wellness Path</h2>
      <div className={styles.infoPanelEntry} style={{ color: "var(--text-secondary)", marginBottom: 7 }}>
        Personalize your journey – select daily focus areas, visualize progress, and access health modules below.
      </div>
      {/* Focus area selector (toggle) */}
      <div style={{
        display: "flex",
        gap: 9,
        flexWrap: "wrap",
        marginBottom: "1.3rem"
      }}>
        {FOCUS_AREAS.map(fa => (
          <button
            key={fa.key}
            onClick={() => setFocus(fa.key)}
            aria-pressed={focus === fa.key}
            className={`btn ${styles.buttonAnim}`}
            style={{
              background: focus === fa.key ? "var(--primary)" : "var(--bg-dark)",
              color: focus === fa.key ? "#fff" : "#247BA0",
              borderRadius: 9,
              fontWeight: 600,
              fontSize: "1.02em",
              padding: "7px 18px",
              boxShadow: focus === fa.key ? "0 2px 6px rgba(44,166,90,0.13)" : "none",
              border: "none",
              outline: focus === fa.key ? "2px solid #FFC857" : undefined,
              transition: "background 0.16s",
              cursor: "pointer"
            }}
          >
            <span style={{ fontSize: "1.3em", marginRight: 7 }}>{fa.icon}</span>{fa.label}
          </button>
        ))}
      </div>
      {/* Progress Path Visualization */}
      <PathProgressBar progress={
        Math.round(
          MODULES.reduce((a, m) => a + (DEMO_STATUS[m.key].progress), 0) / MODULES.length
        )
      } />
      {/* Animated module navigation cards */}
      <div style={{
        display: "flex",
        gap: 18,
        flexWrap: "wrap",
        justifyContent: "stretch",
        marginBottom: "2.3rem"
      }}>
        {MODULES.map(mod => (
          <ModuleCard
            key={mod.key}
            module={mod}
            status={DEMO_STATUS[mod.statusKey]}
            focusActive={focus === mod.key}
            onFocus={setFocus}
          />
        ))}
      </div>
      {/* Wellness overview radar and goal suggestions */}
      <div className={styles.chartEntry}>
        <WellnessInfographic data={demoWellness} />
      </div>
      <ChartCard title="Goal Suggestions"
        description="Personalized focus goals to elevate your wellness this week.">
        <ul style={{ fontSize: "1.07em", marginBottom: 0 }}>
          <li>
            <b>Nutrition:</b> Boost fiber intake by 12g (try dosa with sambar, moong salad)
          </li>
          <li>
            <b>Mindfulness:</b> 15 min morning meditation for 3 days
          </li>
          <li>
            <b>Sleep:</b> Target 7+ hours quality rest per night
          </li>
          <li>
            <b>Fitness:</b> Walk 7k steps, 4/7 days this week
          </li>
        </ul>
      </ChartCard>
      {/* Onboarding/walkthrough wizard placeholder */}
      <div className={styles.infoPanelEntry} style={{
        marginTop: "2.3rem",
        background: "#F1FFE2",
        borderRadius: 13,
        padding: "0.9em 1.3em",
        color: "#197A73",
        fontWeight: 500,
        fontSize: "1.08em",
        textAlign: "center"
      }}>
        <span role="img" aria-label="info">💡</span> Not sure where to begin? Start with one focus area. Full onboarding coming soon!
      </div>
    </div>
  );
}

export default WellnessPathPage;
