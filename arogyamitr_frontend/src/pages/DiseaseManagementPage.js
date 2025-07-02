import React from "react";
import { ChartCard } from "../components/Charts";

/**
 * PUBLIC_INTERFACE
 * DiseaseManagementPage with health metrics chart placeholder.
 */
function DiseaseManagementPage() {
  return (
    <div className="container" style={{ margin: "3rem auto", maxWidth: 600 }}>
      <h2>Disease Management</h2>
      <ChartCard
        title="Health Metrics & Vitals"
        description="Monitor vitals trends (BP, glucose, etc.) and logs (chart coming soon)."
      >
        <div style={{ color: "var(--text-secondary)", fontSize: "1.08rem" }}>
          <em>Disease/vital analytics chart will appear here.</em>
        </div>
      </ChartCard>
    </div>
  );
}

export default DiseaseManagementPage;
