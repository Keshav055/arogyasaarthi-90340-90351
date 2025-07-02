import React from "react";
import { WellnessInfographic, ChartCard } from "../components/Charts";

/**
 * PUBLIC_INTERFACE
 * WellnessPathPage gives overview and analytics about user's wellness journey.
 */
function WellnessPathPage() {
  // Demo data for radar chart (replace with API later)
  const demoWellness = [
    { aspect: "Nutrition", value: 88 },
    { aspect: "Sleep", value: 76 },
    { aspect: "Mindfulness", value: 66 },
    { aspect: "Fitness", value: 80 },
    { aspect: "Hydration", value: 95 }
  ];

  return (
    <div className="container" style={{ margin: "3rem auto", maxWidth: 680 }}>
      <h2>Wellness Path</h2>
      <div>
        <p>
          Your personalized wellness journey starts here. Choose focus areas and chart your holistic health path.
        </p>
        <WellnessInfographic data={demoWellness} />
        <ChartCard title="Goal Suggestions" description="Tailored focus areas to optimize your wellness.">
          <ul>
            <li>Boost fiber intake by 12g for digestive health</li>
            <li>Try 15 min morning mindfulness daily for a week</li>
            <li>Target 7+ hours quality sleep per night</li>
          </ul>
        </ChartCard>
      </div>
    </div>
  );
}

export default WellnessPathPage;
