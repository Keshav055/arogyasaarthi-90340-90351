import React, { useState } from "react";
import { ChartCard, UserProgressChart } from "../components/Charts";
import { useSleepDashboard } from "../api/sleep";
import anim from "../MicroAnimations.module.css";

/**
 * PUBLIC_INTERFACE
 * SleepPage with weekly sleep analytics chart, interactive sleep log, and user input.
 */
function SleepPage() {
  const { data, loading, error, refetch } = useSleepDashboard();

  // Demo/mock sleep data
  const demoSleep = [
    { name: "Mon", score: 79 },
    { name: "Tue", score: 86 },
    { name: "Wed", score: 83 },
    { name: "Thu", score: 72 },
    { name: "Fri", score: 91 },
    { name: "Sat", score: 77 },
    { name: "Sun", score: 65 }
  ];
  const demoNights = [
    { date: "2024-05-01", hours: 7.1, quality: "Good", notes: "Slept early, no interruptions" },
    { date: "2024-05-02", hours: 6.3, quality: "Fair", notes: "Late dinner, woke up once" },
    { date: "2024-05-03", hours: 8.0, quality: "Great", notes: "Deep sleep, well rested" },
    { date: "2024-05-04", hours: 5.6, quality: "Poor", notes: "High stress, took long to fall asleep" }
  ];

  const [log, setLog] = useState([]);
  const [newSleep, setNewSleep] = useState({ date: "", hours: "", quality: "", notes: "" });

  const sleepData = data?.weekTrend || demoSleep;
  const nightRecords = data?.nights || log.length > 0 ? log : demoNights;

  function handleAddSleep(e) {
    e.preventDefault();
    if (!newSleep.date || !newSleep.hours) return;
    setLog(lg => [...lg, { ...newSleep }]);
    setNewSleep({ date: "", hours: "", quality: "", notes: "" });
  }

  return (
    <div className="container" style={{ margin: "3rem auto", maxWidth: 680 }}>
      <h2>Sleep Optimizer</h2>
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
      <div className={anim.cardEntryAnimate} style={{ animationDelay: ".06s" }}>
        <UserProgressChart data={sleepData} />
      </div>
      <ChartCard
        title="Sleep Log (Past Week)"
        description="Review your nightly sleep duration, quality, and notes. Add nightly records for trending analytics."
        className={anim.cardEntryAnimate}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Date</th>
                <th>Hours</th>
                <th>Quality</th>
                <th style={{ textAlign: "left" }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {nightRecords.map((r, idx) => (
                <tr key={idx} className={anim.cardEntryAnimate} style={{ animationDelay: `${.06 * idx}s` }}>
                  <td>{r.date}</td>
                  <td style={{ textAlign: "center" }}>{r.hours}</td>
                  <td style={{ textAlign: "center" }}>{r.quality}</td>
                  <td>{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Add nightly sleep row form */}
        <form
          onSubmit={handleAddSleep}
          style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 8, flexWrap: "wrap" }}
        >
          <input
            type="date"
            required
            value={newSleep.date}
            onChange={e => setNewSleep(ns => ({ ...ns, date: e.target.value }))}
            style={{ fontSize: "1em", padding: 6, border: "1px solid #e0efeb", borderRadius: 6 }}
          />
          <input
            type="number"
            required
            min="0"
            step="0.1"
            placeholder="Hours"
            value={newSleep.hours}
            onChange={e => setNewSleep(ns => ({ ...ns, hours: e.target.value }))}
            style={{ width: 68, fontSize: "1em", padding: 6, border: "1px solid #e0efeb", borderRadius: 6 }}
          />
          <select
            value={newSleep.quality}
            onChange={e => setNewSleep(ns => ({ ...ns, quality: e.target.value }))}
            style={{ fontSize: "1em", padding: 6, border: "1px solid #e0efeb", borderRadius: 6 }}
          >
            <option value="">Quality</option>
            <option value="Great">Great</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
          <input
            placeholder="Notes (optional)"
            value={newSleep.notes}
            onChange={e => setNewSleep(ns => ({ ...ns, notes: e.target.value }))}
            style={{ width: 180, fontSize: "1em", padding: 6, border: "1px solid #e0efeb", borderRadius: 6 }}
            maxLength={180}
          />
          <button className={`${anim.buttonHover} btn`} type="submit" style={{ borderRadius: 8, padding: "6px 18px" }}>
            Add
          </button>
        </form>
        <div style={{ color: "var(--text-secondary)", fontSize: "0.98em", marginTop: 7 }}>
          Enter your last night's sleep for daily progress (demo: not persisted).
        </div>
      </ChartCard>
    </div>
  );
}

export default SleepPage;
