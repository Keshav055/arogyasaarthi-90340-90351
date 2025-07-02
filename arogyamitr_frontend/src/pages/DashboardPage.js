import React, { useRef, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useDashboardData } from "../api/dashboard";
import { ChartCard, UserProgressChart, WellnessInfographic, HealthTipsBar } from "../components/Charts";
import ConfettiCelebration from "../components/ConfettiCelebration";
import CelebratePopup from "../components/CelebratePopup";
import styles from "../MicroAnimations.module.css";

function NotificationPanel({ notifications = [] }) {
  return (
    <ChartCard title="Notifications" description="Reminders & new activity">
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {notifications.length === 0 && (
          <li style={{ color: "#888" }}>No unread notifications.</li>
        )}
        {notifications.map((notif, idx) => (
          <li
            key={idx}
            className={`${styles.microCard} ${styles.animatedCardEntry} ${styles.cardHover} ${styles.cardTap}`}
            style={{
              background: notif.seen ? "#F8FFF7" : "#F1FFEB",
              padding: "8px 13px",
              borderRadius: 8,
              marginBottom: 5,
              fontWeight: notif.seen ? 400 : 600,
              color: notif.urgent ? "#EE4266" : undefined,
              borderLeft: notif.urgent ? "3px solid #EE4266" : "3px solid #4CA65A",
              transition: "all .15s"
            }}
            tabIndex={0}
          >
            <span style={{ marginRight: 6 }}>{notif.urgent ? "⚠️" : "🔔"}</span>
            <span>{notif.text}</span>
            <span style={{ float: "right", color: "#aaa", fontWeight: 400, fontSize: "0.9em" }}>{notif.time}</span>
          </li>
        ))}
      </ul>
    </ChartCard>
  );
}

function QuickCheckin({ onSubmit }) {
  const [mood, setMood] = useState("");
  const [energy, setEnergy] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!mood || !energy) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 1800);
    if (onSubmit) onSubmit({ mood, energy });
    setMood("");
    setEnergy("");
  }

  return (
    <ChartCard
      title="Quick Health Check-In"
      description="How are you feeling today?"
    >
      <form
        style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}
        onSubmit={handleSubmit}
      >
        <span style={{ fontSize: "1.18em", marginRight: 5 }}>Mood:</span>
        <select
          value={mood}
          required
          onChange={e => setMood(e.target.value)}
          style={{ padding: "5px 9px", borderRadius: 7, fontSize: "1em" }}
          className={`${styles.microCard} ${styles.animatedCardEntry} ${styles.cardHover} ${styles.cardTap}`}
        >
          <option value="">Select</option>
          <option value="😊">😊 Good</option>
          <option value="😌">😌 Calm</option>
          <option value="😐">😐 Okay</option>
          <option value="😟">😟 Stressed</option>
          <option value="😴">😴 Tired</option>
        </select>
        <span style={{ fontSize: "1.13em", marginLeft: 9, marginRight: 5 }}>Energy:</span>
        <select
          value={energy}
          required
          onChange={e => setEnergy(e.target.value)}
          style={{ padding: "5px 9px", borderRadius: 7, fontSize: "1em" }}
          className={`${styles.microCard} ${styles.animatedCardEntry} ${styles.cardHover} ${styles.cardTap}`}
        >
          <option value="">Select</option>
          <option value="High">High</option>
          <option value="Moderate">Moderate</option>
          <option value="Low">Low</option>
        </select>
        <button
          className={`btn ${styles.buttonAnim}`}
          type="submit"
          style={{ borderRadius: 8, padding: "6px 16px" }}
          disabled={submitted}
        >
          {submitted ? "✓ Saved" : "Submit"}
        </button>
      </form>
      {submitted && (
        <div className={styles.infoPanelEntry} style={{ color: "#38B3A7", marginTop: 9 }}>
          Thank you for checking in!
        </div>
      )}
    </ChartCard>
  );
}

function EventsCard({ events = [] }) {
  return (
    <ChartCard title="Upcoming Appointments & Events" description="Stay on track with your wellness schedule">
      {events.length === 0 && <span style={{ color: "#999" }}>No upcoming events.</span>}
      <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
        {events.map((ev, idx) => (
          <li
            key={idx}
            className={`${styles.microPopIn} ${styles.animatedCardEntry} ${styles.cardHover} ${styles.cardTap}`}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 7,
              borderLeft: "3px solid #38B3A7",
              paddingLeft: 10,
              fontWeight: 500
            }}
            tabIndex={0}
          >
            <span style={{ fontSize: "1.17em", marginRight: 8 }}>
              {ev.type === "appointment" ? "📅" : "🏃"}
            </span>
            <span>
              <span>{ev.title}</span>
              <span style={{ color: "#888", marginLeft: 10, fontWeight: 400, fontSize: "0.94em" }}>
                {ev.time}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </ChartCard>
  );
}

function CustomTilesPanel({ tiles, onOrderChange }) {
  return (
    <ChartCard title="Customizable Dashboard" description="Your prioritized wellness modules">
      <div
        style={{
          display: "flex",
          gap: 13,
          flexWrap: "wrap",
          justifyContent: "stretch"
        }}
      >
        {tiles.map((tile, idx) => (
          <div
            key={idx}
            className={`${styles.microCard} ${styles.animatedCardEntry} ${styles.cardHover} ${styles.cardTap}`}
            style={{
              background: "#F6FFF9",
              border: "1px solid #e0efeb",
              borderRadius: 13,
              padding: "1.1em 1.4em",
              minWidth: 130,
              marginBottom: 8,
              boxShadow: "0 2px 8px rgba(60,140,100,0.07)",
              cursor: "pointer",
              transition: "box-shadow 0.14s"
            }}
            tabIndex={0}
          >
            <div style={{ fontSize: "1.7em", marginBottom: 7 }}>{tile.icon}</div>
            <div style={{ fontWeight: 700 }}>{tile.label}</div>
            <div style={{ color: "#4CA65A", fontSize: "0.98em" }}>{tile.desc}</div>
          </div>
        ))}
      </div>
      <div className={styles.microFadeIn} style={{ color: "#bbb", fontSize: "0.93em", marginTop: 8 }}>
        (Drag & drop to re-order coming soon)
      </div>
    </ChartCard>
  );
}

function ActivityLogPanel({ activities }) {
  return (
    <ChartCard title="Recent Activity" description="Your latest wellness actions & logs">
      {activities.length === 0 ? (
        <span style={{ color: "#999" }}>No recent actions yet.</span>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {activities.map((act, i) => (
            <li
              key={i}
              className={`${styles.microCard} ${styles.animatedCardEntry} ${styles.cardHover} ${styles.cardTap}`}
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #e0efeb",
                padding: "7px 0"
              }}
              tabIndex={0}
            >
              <span style={{ fontSize: "1.25em", marginRight: 10 }}>{act.icon}</span>
              <span>
                {act.text}
                <span style={{ marginLeft: 11, color: "#aaa", fontSize: "0.93em" }}>{act.time}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </ChartCard>
  );
}

function AIInsightsPanel({ highlights }) {
  return (
    <ChartCard title="AI Health Insights" description="Personalized highlights & suggested actions">
      {highlights.length === 0 ? (
        <span style={{ color: "#aaa" }}>No AI insights available yet.</span>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {highlights.map((h, idx) => (
            <li
              key={idx}
              className={`${styles.microInfoPanelEntry} ${styles.animatedCardEntry}`}
              style={{
                background: "#FAFAFF",
                borderRadius: 9,
                borderLeft: "4px solid #E87A41",
                padding: "0.72em 1.15em",
                marginBottom: 6
              }}
              tabIndex={0}
            >
              <b>Insight:</b> {h.text}
              <span style={{ color: "#38B3A7", marginLeft: 9, fontWeight: 400 }}>{h.suggestedAction}</span>
            </li>
          ))}
        </ul>
      )}
    </ChartCard>
  );
}

// PUBLIC_INTERFACE
// DashboardPage shows greeting, wellness analytics, charts, and now celebratory animation on goals
function DashboardPage() {
  const { user, logout } = useAuth();
  const { data, loading, error } = useDashboardData();

  // Add state for demo daily goal button and celebration
  const [todayGoalDone, setTodayGoalDone] = useState(false);
  const [showCelebrate, setShowCelebrate] = useState(false);

  // Demo content
  const notifications = [
    { text: "Hydration reminder: Drink a glass of water.", time: "10m ago", urgent: false, seen: false },
    { text: "Upcoming appointment: Dr. Wellness at 4:30pm", time: "Today", urgent: true, seen: false },
    { text: "Congratulations! Streak: 7 days mindful journaling 👏", time: "Yesterday", urgent: false, seen: true }
  ];
  const events = [
    { title: "Teleconsult with Dr. Wellness", type: "appointment", time: "Today, 4:30pm" },
    { title: "Yoga for Mindful Living", type: "event", time: "Sat, 10:00am" }
  ];
  const aiHighlights = [
    { text: "You've improved your average sleep duration this week.", suggestedAction: "Maintain consistent bedtime!" },
    { text: "Step goal met 5 days in a row.", suggestedAction: "Aim for 8500 daily steps!" }
  ];
  const activityLog = [
    { icon: "💧", text: "Logged hydration (250ml).", time: "15m ago" },
    { icon: "😄", text: "Mood check-in: Feeling Good.", time: "1h ago" },
    { icon: "🥗", text: "Added healthy meal (South Indian Thali).", time: "2h ago" },
    { icon: "🏃", text: "Finished workout: 5km run.", time: "Yesterday" }
  ];
  const customizableTiles = [
    { icon: "🥕", label: "Nutrition", desc: "Meal plans & recipes" },
    { icon: "🏃‍♂️", label: "Fitness", desc: "Track activity" },
    { icon: "🧘", label: "Mindfulness", desc: "Journaling, meditation" },
    { icon: "🛌", label: "Sleep", desc: "Sleep analytics" }
  ];
  const demoProgress = [
    { name: "Week 1", score: 48 },
    { name: "Week 2", score: 63 },
    { name: "Week 3", score: 78 },
    { name: "Week 4", score: 88 }
  ];
  const demoWellness = [
    { aspect: "Nutrition", value: 82 },
    { aspect: "Sleep", value: 73 },
    { aspect: "Mindfulness", value: 61 },
    { aspect: "Fitness", value: 68 },
    { aspect: "Hydration", value: 90 }
  ];
  const demoTips = [
    { tip: "Walk outdoors", users: 135 },
    { tip: "Morning meditation", users: 110 },
    { tip: "Drink water", users: 195 },
    { tip: "Eat fruit", users: 91 },
    { tip: "Track sleep", users: 67 }
  ];

  const userName = user?.email ? user.email.split("@")[0] : "User";
  const containerRef = useRef();

  // Animate cards in
  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(`.${styles.microCard}`);
    cards.forEach(card => card.classList.add(styles.microCardEntry));
  }, []);

  // Demo "daily goal complete" with celebration effect
  function handleGoalComplete() {
    setTodayGoalDone(true);
    setShowCelebrate(true);
  }

  return (
    <div
      className="container"
      ref={containerRef}
      style={{ margin: "2.5rem auto 1.7rem auto", maxWidth: 820 }}
    >
      <ConfettiCelebration
        trigger={showCelebrate}
        options={{ particleCount: 120, spread: 95, origin: { y: 0.65 } }}
        onComplete={() => setShowCelebrate(false)}
      />
      <CelebratePopup
        open={showCelebrate}
        icon="🏅"
        onClose={() => setShowCelebrate(false)}
      >
        Awesome! 🥳 Daily Goal Completed!
      </CelebratePopup>
      <h2 style={{ marginBottom: 0 }}>Welcome to ArogyaMitr</h2>
      <div style={{ color: "var(--text-secondary)", marginBottom: "0.6rem" }}>
        <strong>Hello, {userName}</strong>
      </div>
      <div>
        <button className={`btn ${styles.buttonAnim}`} onClick={logout}>Logout</button>
      </div>
      <div style={{ margin: "1.5rem 0" }}>
        <span
          className={styles.infoPanelEntry}
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
          {loading ? "Loading insights..." : "Your holistic dashboard is ready!"}
        </span>
      </div>
      {error && <div style={{ color: "#EE4266", marginBottom: 12 }}>Error loading data: {error}</div>}

      {/* Notification panel */}
      <NotificationPanel notifications={data?.notifications || notifications} />

      {/* Quick Health Check-In */}
      <QuickCheckin />

      {/* Appointments/events card */}
      <EventsCard events={data?.events || events} />

      {/* AI Insights/suggested actions */}
      <AIInsightsPanel highlights={data?.aiHighlights || aiHighlights} />

      {/* Customizable dashboard tiles */}
      <CustomTilesPanel tiles={data?.tiles || customizableTiles} />

      {/* Mini demo goal celebration button */}
      <div style={{ margin: "1.6em 0 2.1em 0", textAlign: "center" }}>
        <button
          className={`btn ${styles.buttonAnim}`}
          style={{
            fontWeight: 700,
            color: todayGoalDone ? "#4CA65A" : "#fff",
            background: todayGoalDone ? "#E6FFD7" : "#4CA65A",
            border: todayGoalDone ? "1.5px solid #4CA65A" : "none",
            borderRadius: 13,
            fontSize: "1.13em",
            padding: "0.74em 1.40em"
          }}
          onClick={handleGoalComplete}
          disabled={todayGoalDone}
          aria-disabled={todayGoalDone}
        >
          {todayGoalDone ? "Today's Goal Completed 🏆" : "Mark Today's Goal Complete"}
        </button>
        {todayGoalDone && <span style={{ marginLeft: 10, color: "#41A64F", fontWeight: 700, fontSize: "1.07em" }}>Completed!</span>}
      </div>

      {/* Activity Log */}
      <ActivityLogPanel activities={data?.activityLog || activityLog} />

      {/* Progress Chart */}
      <div className={`${styles.microCard} ${styles.chartEntry}`}>
        <UserProgressChart data={data?.progress || demoProgress} />
      </div>

      {/* Wellness Radar */}
      <div className={`${styles.microCard} ${styles.chartEntry}`}>
        <WellnessInfographic data={data?.wellness || demoWellness} />
      </div>

      {/* Trending Health Tips Bar */}
      <div className={`${styles.microCard} ${styles.animatedCardEntry} ${styles.cardHover}`}>
        <HealthTipsBar data={data?.healthTips || demoTips} />
      </div>
    </div>
  );
}

export default DashboardPage;
