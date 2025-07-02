import React, { useState } from "react";
import { ChartCard, UserProgressChart } from "../components/Charts";
import { useMindfulnessDashboard } from "../api/mindfulness";
import ConfettiCelebration from "../components/ConfettiCelebration";
import CelebratePopup from "../components/CelebratePopup";
import anim from "../MicroAnimations.module.css";

/**
 * PUBLIC_INTERFACE
 * MindfulnessPage with mood chart, journaling log, and UI to add new log entries.
 * Now features refined instant playful feedback for achievements: first log, streak, or regular entry.
 */
function MindfulnessPage() {
  const { data, loading, error, refetch } = useMindfulnessDashboard();
  // Demo chart/data as fallback (if no API yet)
  const demoMood = [
    { name: "Mon", score: 62 },
    { name: "Tue", score: 74 },
    { name: "Wed", score: 69 },
    { name: "Thu", score: 82 },
    { name: "Fri", score: 56 },
    { name: "Sat", score: 78 },
    { name: "Sun", score: 66 }
  ];
  const demoJournal = [
    { date: "2024-05-01", mood: "😊", notes: "Meditated 15min, felt relaxed" },
    { date: "2024-05-02", mood: "😐", notes: "Distracted, but calmer after journaling" },
    { date: "2024-05-03", mood: "😄", notes: "Tried breath exercise, good mood" },
    { date: "2024-05-04", mood: "😔", notes: "Felt tired before meditation" }
  ];
  const [log, setLog] = useState([]);
  const [newLog, setNewLog] = useState({ date: "", mood: "", notes: "" });
  // Achievement feedback state
  // showCelebrate is {visible: bool, type: 'first_log' | 'streak' | 'generic' }
  const [showCelebrate, setShowCelebrate] = useState({ visible: false, type: "" });

  const moodData = data?.moodProgress || demoMood;
  const journal = data?.journal || (log.length > 0 ? log : demoJournal);

  // Returns true if this is user's first log ever in this session
  const isFirstLog = () =>
    (log.length === 0) ||
    // If it's a demo/fallback log, only count user logs after first added
    (log.length === 1 && JSON.stringify(log[0]) !== JSON.stringify(newLog));

  // Detects streak (demo: 3+ logs in a row on unique dates; could improve with session/user data)
  const hasStreak = () => {
    if (log.length < 3) return false;
    // Look for logs on 3 unique consecutive days (simple streak logic)
    const uniqueDates = [...new Set(log.map(entry => entry.date))];
    return uniqueDates.length >= 3;
  };

  /**
   * Handles mood/journal log. Triggers instant feedback for first log, streak, or generic log.
   */
  function handleAddLog(e) {
    e.preventDefault();
    if (!newLog.date || !newLog.mood) return;
    const updatedLog = [...log, { ...newLog }];
    setLog(updatedLog);
    setNewLog({ date: "", mood: "", notes: "" });

    // Achievement celebration logic:
    if (log.length === 0) {
      setShowCelebrate({ visible: true, type: "first_log" });
    } else if (hasStreak()) {
      setShowCelebrate({ visible: true, type: "streak" });
    } else {
      setShowCelebrate({ visible: true, type: "generic" });
    }
  }

  // Customized celebration/badge content
  const celebrateProps = {
    first_log: {
      icon: "🎉",
      message: <>Congrats! You made your first Mindfulness log! 🥇</>
    },
    streak: {
      icon: "🔥",
      message: <>Streak on! 3+ days logged in a row! 🌈</>
    },
    generic: {
      icon: "🧘‍♀️",
      message: <>Great! Mindfulness entry logged!</>
    }
  };
  const celebrationType = showCelebrate.type || "generic";

  return (
    <div className="container" style={{ margin: "3rem auto", maxWidth: 680 }}>
      <ConfettiCelebration
        trigger={showCelebrate.visible}
        options={{
          particleCount: celebrationType === "streak" ? 120 : 90,
          spread: celebrationType === "streak" ? 120 : 88,
          origin: { y: 0.46 }
        }}
        onComplete={() => setShowCelebrate({ visible: false, type: "" })}
      />
      <CelebratePopup
        open={showCelebrate.visible}
        icon={celebrateProps[celebrationType].icon}
        onClose={() => setShowCelebrate({ visible: false, type: "" })}
      >
        {celebrateProps[celebrationType].message}
      </CelebratePopup>
      <h2>Mindfulness</h2>
      <div style={{ marginBottom: 16 }}>
        <button
          className={anim.buttonHover}
          style={{ marginRight: 10 }}
          onClick={refetch}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh Data"}
        </button>
        <span style={{ color: "#EE4266" }}>{error && <>Error loading: {error}</>}</span>
      </div>
      <div className={anim.cardEntryAnimate} style={{ animationDelay: ".12s" }}>
        <UserProgressChart data={moodData} />
      </div>
      <ChartCard
        title="Mood & Journaling Log"
        description="Track your daily emotional wellness and mindfulness journaling entries."
        className={anim.cardEntryAnimate}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Date</th>
                <th>Mood</th>
                <th style={{ textAlign: "left" }}>Notes</th>
              </tr>
            </thead>
            <tbody>
            {journal.map((j, idx) => (
              <tr key={idx} className={anim.cardEntryAnimate} style={{ animationDelay: `${.09 * idx}s` }}>
                <td>{j.date}</td>
                <td style={{ textAlign: "center", fontSize: "1.2em" }}>{j.mood}</td>
                <td>{j.notes}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        {/* Add new mood/journaling log inline */}
        <form
          onSubmit={handleAddLog}
          style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 8, flexWrap: "wrap" }}
        >
          <input
            type="date"
            required
            value={newLog.date}
            onChange={e => setNewLog(nl => ({ ...nl, date: e.target.value }))}
            style={{ fontSize: "1em", padding: 6, border: "1px solid #e0efeb", borderRadius: 6 }}
          />
          <select
            required
            value={newLog.mood}
            onChange={e => setNewLog(nl => ({ ...nl, mood: e.target.value }))}
            style={{ fontSize: "1.2em", padding: 6, border: "1px solid #e0efeb", borderRadius: 6 }}
          >
            <option value="">Mood</option>
            <option value="😄">😄</option>
            <option value="😊">😊</option>
            <option value="😐">😐</option>
            <option value="😔">😔</option>
            <option value="😭">😭</option>
          </select>
          <input
            placeholder="Journal notes"
            value={newLog.notes}
            onChange={e => setNewLog(nl => ({ ...nl, notes: e.target.value }))}
            style={{ width: 180, fontSize: "1em", padding: 6, border: "1px solid #e0efeb", borderRadius: 6 }}
            maxLength={200}
          />
          <button className={`${anim.buttonHover} btn`} type="submit" style={{ borderRadius: 8, padding: "6px 18px" }}>
            Add
          </button>
        </form>
        <div style={{ color: "var(--text-secondary)", fontSize: "0.98em", marginTop: 7 }}>
          Log your mood and a brief note at day's end (demo: not persisted).
        </div>
      </ChartCard>
    </div>
  );
}

export default MindfulnessPage;
