import React, { useState } from "react";
import { ChartCard, UserProgressChart } from "../components/Charts";
import { useFitnessDashboard } from "../api/fitness";
import anim from "../MicroAnimations.module.css";

/**
 * PUBLIC_INTERFACE
 * FitnessPage showing stats, dynamic chart, and interactive exercise log.
 */
function FitnessPage() {
  const { data, loading, error, refetch } = useFitnessDashboard();

  // Demo data (replace with API data if available)
  const demoProgress = [
    { name: "Mon", score: 43 },
    { name: "Tue", score: 57 },
    { name: "Wed", score: 62 },
    { name: "Thu", score: 74 },
    { name: "Fri", score: 68 },
    { name: "Sat", score: 80 },
    { name: "Sun", score: 52 }
  ];
  const demoWorkouts = [
    { date: "2024-05-01", type: "Yoga", duration: 30, steps: 2500, intensity: "Low" },
    { date: "2024-05-02", type: "Running", duration: 47, steps: 9200, intensity: "High" },
    { date: "2024-05-03", type: "Cycling", duration: 25, steps: 0, intensity: "Moderate" },
    { date: "2024-05-04", type: "Walking", duration: 60, steps: 5500, intensity: "Low" },
  ];
  const [log, setLog] = useState([]);
  const [newWorkout, setNewWorkout] = useState({ date: "", type: "", duration: "", steps: "", intensity: "" });

  const workouts = data?.recentWorkouts || log.length > 0 ? log : demoWorkouts;

  function handleAddWorkout(e) {
    e.preventDefault();
    if (!newWorkout.date || !newWorkout.type) return;
    setLog(l => [...l, { ...newWorkout }]);
    setNewWorkout({ date: "", type: "", duration: "", steps: "", intensity: "" });
  }

  return (
    <div className="container" style={{ margin: "3rem auto", maxWidth: 680 }}>
      <h2>Fitness</h2>
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
      <div className={anim.cardEntryAnimate} style={{ animationDelay: ".08s" }}>
        <UserProgressChart data={data?.progress || demoProgress} />
      </div>
      <ChartCard
        title="Physical Activity Log"
        description="Your recent workouts, daily step goal, and activity stats"
        className={anim.cardEntryAnimate}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Date</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Steps</th>
                <th>Intensity</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((w, idx) => (
                <tr key={idx} className={anim.cardEntryAnimate} style={{ animationDelay: `${.07 * idx}s` }}>
                  <td>{w.date}</td>
                  <td>{w.type}</td>
                  <td>{w.duration}</td>
                  <td>{w.steps}</td>
                  <td>{w.intensity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Add workout log - quick form (demo only) */}
        <form
          onSubmit={handleAddWorkout}
          style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 8, flexWrap: "wrap" }}
        >
          <input
            type="date"
            required
            value={newWorkout.date}
            onChange={e => setNewWorkout(nw => ({ ...nw, date: e.target.value }))}
            style={{ fontSize: "1em", padding: 6, border: "1px solid #e0efeb", borderRadius: 6 }}
          />
          <input
            placeholder="Type"
            value={newWorkout.type}
            required
            onChange={e => setNewWorkout(nw => ({ ...nw, type: e.target.value }))}
            style={{ width: 86, fontSize: "1em", padding: 6, border: "1px solid #e0efeb", borderRadius: 6 }}
          />
          <input
            type="number"
            placeholder="Duration"
            min="1"
            style={{ width: 64, fontSize: "1em", padding: 6, border: "1px solid #e0efeb", borderRadius: 6 }}
            value={newWorkout.duration}
            onChange={e => setNewWorkout(nw => ({ ...nw, duration: e.target.value }))}
          />
          <input
            type="number"
            placeholder="Steps"
            min="0"
            style={{ width: 74, fontSize: "1em", padding: 6, border: "1px solid #e0efeb", borderRadius: 6 }}
            value={newWorkout.steps}
            onChange={e => setNewWorkout(nw => ({ ...nw, steps: e.target.value }))}
          />
          <select
            value={newWorkout.intensity}
            onChange={e => setNewWorkout(nw => ({ ...nw, intensity: e.target.value }))}
            style={{ fontSize: "1em", padding: 6, border: "1px solid #e0efeb", borderRadius: 6 }}
          >
            <option value="">Intensity</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
          <button className={`${anim.buttonHover} btn`} type="submit" style={{ borderRadius: 8, padding: "6px 18px" }}>
            Add
          </button>
        </form>
        <div style={{ color: "var(--text-secondary)", fontSize: "0.98em", marginTop: 7 }}>
          Add today's workout for instant progress tracking (demo: managed on client only).
        </div>
      </ChartCard>
    </div>
  );
}

export default FitnessPage;
