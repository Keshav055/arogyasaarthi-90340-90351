import React from "react";
import { ChartCard } from "../components/Charts";

/**
 * PUBLIC_INTERFACE
 * FitnessPage showing physical activity stats chart placeholder.
 */
function FitnessPage() {
  return (
    <div className="container" style={{ margin: "3rem auto", maxWidth: 600 }}>
      <h2>Fitness</h2>
      <ChartCard
        title="Physical Activity Stats"
        description="View your step count, workout intensity, and weekly progress (coming soon)."
      >
        <div style={{ color: "var(--text-secondary)", fontSize: "1.08rem" }}>
          <em>Exercise progress chart will appear here.</em>
        </div>
      </ChartCard>
    </div>
  );
}

export default FitnessPage;
