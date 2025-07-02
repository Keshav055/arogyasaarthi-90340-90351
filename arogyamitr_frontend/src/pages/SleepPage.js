import React from "react";
import { ChartCard } from "../components/Charts";

/**
 * PUBLIC_INTERFACE
 * SleepPage with sleep analytics chart placeholder.
 */
function SleepPage() {
  return (
    <div className="container" style={{ margin: "3rem auto", maxWidth: 600 }}>
      <h2>Sleep Optimizer</h2>
      <ChartCard
        title="Sleep Analytics"
        description="Track your sleep quality, cycles, and circadian alignment (coming soon)."
      >
        <div style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
          <em>Sleep chart visualization will appear here.</em>
        </div>
      </ChartCard>
    </div>
  );
}

export default SleepPage;
