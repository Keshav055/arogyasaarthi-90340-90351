import React from "react";
import { HydrationPie, NutrientRadar, ChartCard } from "../components/Charts";

/**
 * PUBLIC_INTERFACE
 * DietNutritionPage shows charts for hydration and macro tracking.
 */
function DietNutritionPage() {
  // In future, wire with useNutritionDashboard API:
  // const { data, loading, error } = useNutritionDashboard();

  // Demo data for hydration (actual fetch from API)
  const hydrationIntake = 1350;
  const hydrationGoal = 2000;
  const nutrientData = [
    { name: "Protein", intake: 77, goal: 90 },
    { name: "Carbs", intake: 210, goal: 250 },
    { name: "Fat", intake: 50, goal: 70 },
    { name: "Fiber", intake: 27, goal: 35 },
    { name: "Sugar", intake: 19, goal: 30 }
  ];

  return (
    <div className="container" style={{ margin: "3rem auto", maxWidth: 680 }}>
      <h2>Diet & Nutrition</h2>
      <p>
        Plan meals, browse Indian regional recipes, track hydration and nutrients.
      </p>
      <HydrationPie value={hydrationIntake} goal={hydrationGoal} />
      <NutrientRadar data={nutrientData} />
      <ChartCard title="Meal Plan & Recipes" description="Explore Indian regional meal suggestions, add your own.">
        <div>Coming soon: Personalized meal planner and recipe browser...</div>
      </ChartCard>
    </div>
  );
}

export default DietNutritionPage;
