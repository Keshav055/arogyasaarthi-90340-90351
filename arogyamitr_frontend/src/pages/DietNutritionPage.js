import React, { useState, useMemo } from "react";
import { HydrationPie, NutrientRadar, ChartCard } from "../components/Charts";
import { fetchMealPlans } from "../api/dietNutrition";
import ConfettiCelebration from "../components/ConfettiCelebration";
import CelebratePopup from "../components/CelebratePopup";
import anim from "../MicroAnimations.module.css";

/**
 * AvatarIcon - playful avatar or emoji for headings and widgets
 */
const AvatarIcon = ({ label, emoji }) => (
  <span
    role="img"
    aria-label={label}
    style={{
      fontSize: "2.2rem",
      verticalAlign: "middle",
      marginRight: "0.7rem",
      filter: "drop-shadow(1px 2px 1px #ffde9c7a)"
    }}
  >
    {emoji}
  </span>
);

const INDIAN_REGIONAL_RECIPES = [
  {
    id: "poha",
    title: "Poha",
    region: "Maharashtra",
    calories: 320,
    macronutrients: { Protein: 7, Carbs: 58, Fat: 4, Fiber: 3 },
    ingredients: [
      "Flattened rice (poha) - 1 cup",
      "Onion - 1 small",
      "Peanuts - 2 tbsp",
      "Green chili - 1",
      "Mustard seeds, curry leaves",
      "Lemon juice, coriander, salt",
    ],
    instructions: [
      "Rinse poha in water; drain.",
      "Heat oil, add mustard, curry leaves, chili, onion, peanuts.",
      "Add poha, turmeric, salt. Toss and finish with coriander, lemon juice.",
    ],
    tags: ["Vegetarian", "Quick", "Breakfast"],
    meal: "Breakfast",
  },
];

const PERSONAL_SUGGESTION = {
  tip: "Based on your last meal log, try including a fermented food (like idli or dahi) for gut health!",
  color: "#FFC857",
};

/** PUBLIC_INTERFACE
 * DietNutritionPage shows charts, meal/recipe UI, and playful celebration for meal log.
 */
function DietNutritionPage() {
  // Demo data for hydration/nutrients
  const hydrationIntake = 1350;
  const hydrationGoal = 2000;
  const nutrientData = [
    { name: "Protein", intake: 77, goal: 90 },
    { name: "Carbs", intake: 210, goal: 250 },
    { name: "Fat", intake: 50, goal: 70 },
    { name: "Fiber", intake: 27, goal: 35 },
    { name: "Sugar", intake: 19, goal: 30 }
  ];

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewRecipe, setViewRecipe] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [userRecipes, setUserRecipes] = useState([]);
  const [mealLogs, setMealLogs] = useState([]);
  const [showCelebrate, setShowCelebrate] = useState({ visible: false, type: "" });

  const allRecipes = [
    ...INDIAN_REGIONAL_RECIPES,
    ...userRecipes.map((r, i) => ({ ...r, id: `user-${i}` })),
  ];

  const filteredRecipes = useMemo(() =>
    allRecipes.filter((r) => {
      if (regionFilter && r.region !== regionFilter) return false;
      const txt = searchText.trim().toLowerCase();
      if (!txt) return true;
      let match =
        r.title.toLowerCase().includes(txt) ||
        (r.tags && r.tags.some((tag) => tag.toLowerCase().includes(txt))) ||
        (r.ingredients && r.ingredients.some((ing) => ing.toLowerCase().includes(txt)));
      return match;
    }), [allRecipes, searchText, regionFilter]);

  function handleAddRecipe(newRecipe) {
    setUserRecipes((old) => [...old, newRecipe]);
  }

  // Enhanced: Meal log achievement detection (first log, streak demo, generic)
  function handleLogMeal() {
    const updatedMealLogs = [...mealLogs, { date: new Date().toISOString().split("T")[0] }];
    setMealLogs(updatedMealLogs);
    if (mealLogs.length === 0) {
      setShowCelebrate({ visible: true, type: "first_log" });
    } else if (updatedMealLogs.length >= 3) {
      setShowCelebrate({ visible: true, type: "streak" });
    } else {
      setShowCelebrate({ visible: true, type: "generic" });
    }
  }

  // Meal log disables button after log (demo session)
  const mealLogged = mealLogs.length > 0;

  const celebrateProps = {
    first_log: { icon: "🍚", message: <>First healthy meal logged! 🏅</> },
    streak: { icon: "🌟", message: <>Meal log streak! Consistent nutrition! 🎉</> },
    generic: { icon: "🥗", message: <>Healthy Choice! +1 wellness point 🌱</> },
  };
  const celebrationType = showCelebrate.type || "generic";

  const mealPlan = [
    {
      meal: "Breakfast",
      title: "Poha with Chai",
      calories: 320,
      macronutrients: { Protein: 7, Carbs: 58, Fat: 4, Fiber: 3 },
      recipeId: "poha",
      ingredients: [
        "Flattened rice (poha) - 1 cup",
        "Onion - 1 small",
        "Peanuts - 2 tbsp",
        "Green chili - 1",
        "Mustard seeds, curry leaves",
        "Lemon juice, coriander, salt",
      ],
      instructions: [
        "Rinse poha. In oil, temper mustard/curry leaves/chili/onion/peanuts.",
        "Add poha, turmeric, salt; toss gently. Finish with coriander & lemon.",
      ],
      region: "Maharashtra",
    }
  ];

  return (
    <div className="container" style={{ margin: "3rem auto", maxWidth: 700 }}>
      <ConfettiCelebration
        trigger={showCelebrate.visible}
        options={{
          colors: celebrationType === "streak" ? ["#FFC857", "#4CA65A", "#2C3E50"] : ["#4CA65A", "#FFC857", "#2C3E50"],
          particleCount: celebrationType === "streak" ? 85 : 56,
          spread: celebrationType === "streak" ? 111 : 77
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
      <h2>
        <AvatarIcon label="nutrition" emoji="🥗" />
        Diet & Nutrition
      </h2>
      <div style={{
        display: "flex",
        gap: "1.3rem",
        marginBottom: "1.6rem",
        flexWrap: "wrap",
        justifyContent: "space-around"
      }}>
        <div
          className="nutrition-card calories-card"
          aria-label="Calories Consumed"
          style={{
            background: "#fff8ee",
            borderRadius: "1rem",
            boxShadow: "0 2px 10px #ffd8b066",
            minWidth: 135,
            padding: "1rem 1.2rem",
            flex: "1"
          }}>
          <AvatarIcon label="Bowl with Spoon" emoji="🥣" />
          <div>
            <div style={{ fontSize: "1.13em", fontWeight: 600 }}>{mealLogged ? "✔️" : "0"} kcal</div>
            <span style={{ color: "#E87A41", fontWeight: 500, fontSize: "0.95em" }}>Calories Consumed</span>
          </div>
        </div>
        <div
          className="nutrition-card water-card"
          aria-label="Water Intake"
          style={{
            background: "#f1faff",
            borderRadius: "1rem",
            boxShadow: "0 2px 10px #bcebff33",
            minWidth: 135,
            padding: "1rem 1.2rem",
            flex: "1"
          }}>
          <AvatarIcon label="Water Glass" emoji="💧" />
          <div>
            <div style={{ fontSize: "1.13em", fontWeight: 600 }}>{hydrationIntake / 250} cups</div>
            <span style={{ color: "#66bbff", fontWeight: 500, fontSize: "0.95em" }}>Water Intake</span>
          </div>
        </div>
        <div
          className="nutrition-card meal-card"
          aria-label="Today's Meal"
          style={{
            background: "#eefff0",
            borderRadius: "1rem",
            boxShadow: "0 2px 10px #b0f1a233",
            minWidth: 135,
            padding: "1rem 1.2rem",
            flex: "1"
          }}>
          <AvatarIcon label="Food" emoji="🍛" />
          <div>
            <div style={{ fontSize: "1.13em", fontWeight: 600 }}>{mealLogged ? mealPlan[0].title : "--"}</div>
            <span style={{ color: "#4CA65A", fontWeight: 500, fontSize: "0.95em" }}>Today's Meal</span>
          </div>
        </div>
      </div>
      <p>
        Plan meals, browse Indian regional recipes, track hydration and nutrients, and add your own recipes.
        <br />Personalized meal planning made for India.
      </p>
      {/* Demo playful log/achievement trigger */}
      <div style={{ margin: "1em 0 1.4em 0" }}>
        <button
          className={`${anim.buttonHover} btn`}
          style={{
            background: "#4CA65A",
            color: "#fff",
            borderRadius: 14,
            fontWeight: 700,
            padding: "0.67em 1.25em",
            fontSize: "1.11em"
          }}
          disabled={mealLogged}
          onClick={handleLogMeal}
        >
          {mealLogged ? <>Healthy Meal Logged! <AvatarIcon label="party" emoji="🥳" /></> : <>Log Healthy Meal <AvatarIcon label="plus" emoji="➕" /></>}
        </button>
        {mealLogged && <span style={{ marginLeft: 11, color: "#4CA65A", fontWeight: 700 }}>Meal Logged!</span>}
      </div>
      <div className={anim.cardEntryAnimate} style={{ animationDelay: ".05s" }}>
        <HydrationPie value={hydrationIntake} goal={hydrationGoal} />
      </div>
      <div className={anim.cardEntryAnimate} style={{ animationDelay: ".12s" }}>
        <NutrientRadar data={nutrientData} />
      </div>
      <div
        className={`${anim.infoPanelEntry}`}
        style={{
          background: PERSONAL_SUGGESTION.color,
          color: "#2C3E50",
          borderRadius: 11,
          fontWeight: 500,
          margin: "1.2rem 0 0.7rem 0",
          padding: "0.89em 1.6em",
          boxShadow: "0 2px 11px rgba(180,160,70,0.06)",
          fontSize: "1.1em",
          maxWidth: 545,
          textAlign: "center"
        }}
      >
        <span role="img" aria-label="tip">💡</span> {PERSONAL_SUGGESTION.tip}
      </div>
      <ChartCard
        title={<><AvatarIcon label="meal plan" emoji="🍽️" /> Today's Meal Plan</>}
        description="Calories, macronutrients, and meal details"
        className={anim.cardEntryAnimate}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 7 }}>
            <thead>
              <tr style={{ color: "#207761", fontWeight: 700 }}>
                <th>
                  <AvatarIcon label="meal" emoji="🍴" />Meal
                </th>
                <th>
                  <AvatarIcon label="dish" emoji="🍲" />Title
                </th>
                <th>
                  <AvatarIcon label="calories" emoji="🔥" />Cals
                </th>
                <th>
                  <AvatarIcon label="nutrients" emoji="🌾" />Macros
                </th>
                <th>
                  <AvatarIcon label="region" emoji="🗺️" />Region
                </th>
                <th>
                  <AvatarIcon label="details" emoji="🔎" />Details
                </th>
              </tr>
            </thead>
            <tbody>
              {mealPlan.map((mp, idx) => (
                <tr key={idx} className={anim.cardEntryAnimate} style={{ animationDelay: `${.08 * idx}s`, borderBottom: "1px solid #e0efeb" }}>
                  <td style={{ fontWeight: 700, color: "#4CA65A" }}>{mp.meal}</td>
                  <td>{mp.title}</td>
                  <td>{mp.calories}</td>
                  <td>
                    <span style={{ fontSize: "0.96em" }}>
                      {Object.entries(mp.macronutrients).map(([k, v]) => (
                        <span key={k} style={{ marginRight: 7 }}>
                          {k.charAt(0)}:{v}
                        </span>
                      ))}
                    </span>
                  </td>
                  <td>{mp.region}</td>
                  <td>
                    <button
                      className={anim.buttonHover}
                      style={{
                        background: "#38B3A7",
                        color: "#fff",
                        borderRadius: 8,
                        border: "none",
                        padding: "5px 10px",
                        fontSize: "0.95em",
                        cursor: "pointer"
                      }}
                      onClick={() => setViewRecipe({ ...mp, id: mp.recipeId })}
                    >
                      <AvatarIcon label="view" emoji="👀" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ color: "#4CA65A", fontSize: "0.99em", marginTop: 3 }}>
          Total calories: {mealPlan.reduce((a, m) => a + m.calories, 0)} kcal
          & Protein: {mealPlan.reduce((a, m) => a + (m.macronutrients.Protein || 0), 0)}g
        </div>
      </ChartCard>
      {/* --- Recipe browser section omitted for brevity (would follow playful UI pattern) --- */}
    </div>
  );
}

export default DietNutritionPage;
