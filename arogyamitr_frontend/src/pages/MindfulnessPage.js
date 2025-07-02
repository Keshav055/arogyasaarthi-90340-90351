import React from "react";
import { ChartCard } from "../components/Charts";

/**
 * PUBLIC_INTERFACE
 * MindfulnessPage with mood/journaling analytics chart placeholder.
 */
function MindfulnessPage() {
  return (
    <div className="container" style={{ margin: "3rem auto", maxWidth: 600 }}>
      <h2>Mindfulness</h2>
      <ChartCard
        title="Mood & Journaling Analytics"
        description="Visualize your mindfulness sessions and daily mood log trends (chart coming soon)."
      >
        <div style={{ color: "var(--text-secondary)", fontSize: "1.08rem" }}>
          <em>Mood/mindfulness chart will appear here.</em>
        </div>
      </ChartCard>
    </div>
  );
}

export default MindfulnessPage;
