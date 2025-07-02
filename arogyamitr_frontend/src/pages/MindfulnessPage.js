import React, { useState } from "react";
import { ChartCard, UserProgressChart } from "../components/Charts";
import { useMindfulnessDashboard } from "../api/mindfulness";

/**
 * PUBLIC_INTERFACE
 * MindfulnessPage with mood chart, journaling log, and UI to add new log entries.
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
  // For demo/mock-add log UI
  const [log, setLog] = useState([]);
  const [newLog, setNewLog] = useState({ date: "", mood: "", notes: "" });

  const moodData = data?.moodProgress || demoMood;
  const journal = data?.journal || log.length > 0 ? log : demoJournal;

  function handleAddLog(e) {
    e.preventDefault();
    if (!newLog.date || !newLog.mood) return;
    setLog(lgs => [...lgs, { ...newLog }]);
    setNewLog({ date: "", mood: "", notes: "" });
  }
  return (
    <div className="container" style={{ margin: "3rem auto", maxWidth: 680 }}>
      <h2>Mindfulness</h2>
      <div style={{ marginBottom: 16 }}>
        <button className="btn" style={{ marginRight: 10 }} onClick={refetch} disabled={loading}>{loading ? "Refreshing..." : "Refresh Data"}</button>
        <span style={{ color: "#EE4266" }}>{error && <>Error loading: {error}</>}</span>
      </div>
      <UserProgressChart data={moodData} />
      <ChartCard
        title="Mood & Journaling Log"
        description="Track your daily emotional wellness and mindfulness journaling entries."
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
              <tr key={idx}>
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
          <button className="btn" type="submit" style={{ borderRadius: 8, padding: "6px 18px" }}>
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
