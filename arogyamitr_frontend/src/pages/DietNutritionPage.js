import React, { useState, useMemo } from "react";
import { HydrationPie, NutrientRadar, ChartCard } from "../components/Charts";
import { fetchMealPlans } from "../api/dietNutrition";
import ConfettiCelebration from "../components/ConfettiCelebration";
import CelebratePopup from "../components/CelebratePopup";
import MicroAnimatedInput from "../MicroAnimatedInput";
import anim from "../MicroAnimations.module.css";
import { calculateStreak, checkBadgeUnlock } from "../components/GamificationUtils";
import BadgeDisplay from "../components/BadgeDisplay";
import { ProgressCelebrate } from "../components/ProgressCelebrate";

// Static playful avatar/icon for nutrition
const AvatarIcon = () => (
  <span className="nutrition-avatar" role="img" aria-label="nutrition">🥗</span>
);
// Sample Indian regional recipe explorer
const INDIAN_REGIONAL_RECIPES = [
  { id: 1, name: "Masala Dosa", region: "South", desc: "Fermented rice and lentil crepe", emoji: "🌯" },
  { id: 2, name: "Khichdi", region: "All", desc: "Rice, dal, easy digest", emoji: "🍲" },
  { id: 3, name: "Thepla", region: "West", desc: "Whole wheat methi flatbread", emoji: "🫓" },
  { id: 4, name: "Baingan Bharta", region: "North", desc: "Smoky roasted eggplant", emoji: "🍆" },
];

const MEAL_TIPS = [
  { tip: "Drink 8+ glasses of water", emoji: "💧" },
  { tip: "Add one green veggie per meal", emoji: "🥦" },
  { tip: "Choose whole grains over refined", emoji: "🌾" },
  { tip: "Limit fried foods this week", emoji: "🍟" }
];

// PUBLIC_INTERFACE
/**
 * DietNutritionPage shows charts, meal/recipe UI, and playful celebration for meal log + gamified streak/badges UI.
 */
function DietNutritionPage() {
  // Hydration and nutrition summary (can be API-connected)
  const [hydration, setHydration] = useState(1500); // mL today
  const HYDRATION_GOAL = 2200;

  const [nutrients, setNutrients] = useState([
    { name: "Protein", intake: 54, goal: 65 },
    { name: "Carbs", intake: 214, goal: 225 },
    { name: "Fats", intake: 47, goal: 50 },
    { name: "Fiber", intake: 17, goal: 25 },
    { name: "Iron", intake: 4.1, goal: 6.5 }
  ]);

  // Demo meal log state (can be API-connected)
  const [mealLogs, setMealLogs] = useState([
    { date: daysAgo(0), meal: "Breakfast", food: "Poha, curd", calories: 350 },
    { date: daysAgo(0), meal: "Lunch", food: "Dal rice, sabzi, salad", calories: 500 },
    { date: daysAgo(1), meal: "Dinner", food: "Chapatti, baingan bharta", calories: 480 },
    { date: daysAgo(2), meal: "Lunch", food: "Khichdi", calories: 390 }
  ]);
  // Input state for new log
  const [newLog, setNewLog] = useState({ meal: "", food: "", calories: "" });
  const [showCelebrate, setShowCelebrate] = useState({ visible: false, type: "" });

  // Streak, badge gamification, celebration
  const logDates = useMemo(() => mealLogs.map((ml) => ml.date), [mealLogs]);
  const streakMilestones = [
    { type: "streak", name: "Meal Log 3-Day Streak", streak: 3, icon: "🥗" },
    { type: "streak", name: "5 Days Foodie", streak: 5, icon: "🥕" },
  ];
  const streak = useMemo(() => calculateStreak(logDates), [logDates]);
  const userProgress = { dailyStreak: streak.daily };
  const unlocked = useMemo(() => checkBadgeUnlock(streakMilestones, userProgress), [userProgress]);
  const [popCelebrate, setPopCelebrate] = useState(false);

  // Handler to add new meal log + playful celebration!
  function handleAddLog(e) {
    e.preventDefault();
    const date = new Date().toISOString().split("T")[0];
    setMealLogs((old) => [
      ...old,
      { ...newLog, calories: Number(newLog.calories), date }
    ]);
    setNewLog({ meal: "", food: "", calories: "" });
    setShowCelebrate({ visible: true, type: "nutrition" });
  }

  return (
    <div className="container" style={{ margin: "3rem auto", maxWidth: 700 }}>
      {/* Confetti and celebration popup */}
      <ConfettiCelebration
        trigger={showCelebrate.visible}
        options={{
          colors: ["#FFC857", "#4CA65A", "#2C3E50"],
          particleCount: showCelebrate.type === "streak" ? 85 : 56,
          spread: showCelebrate.type === "streak" ? 111 : 77
        }}
        onComplete={() => setShowCelebrate({ visible: false, type: "" })}
      />
      <CelebratePopup
        open={showCelebrate.visible}
        icon={showCelebrate.type === "streak" ? "🥗" : "🥕"}
        onClose={() => setShowCelebrate({ visible: false, type: "" })}
      >
        {showCelebrate.type === "streak"
          ? <>Meal log streak! Consistent nutrition! 🎉</>
          : <>Healthy Choice! +1 wellness point 🌱</>
        }
      </CelebratePopup>
      <h2>
        <AvatarIcon />
        Diet & Nutrition
      </h2>
      <section style={{margin: "1em 0 1.5em 0"}}>
        <span>Meal Log Streak: <b>{streak.daily}</b> days</span>
        <BadgeDisplay badges={unlocked} animate />
        {unlocked.length > 0 &&
          <ProgressCelebrate show={true} message={`Congrats! ${unlocked[unlocked.length-1]?.name}`} milestoneIcon={unlocked[unlocked.length-1]?.icon} onDone={() => {}} />}
      </section>
      {/* Hydration Pie */}
      <div style={{display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 10}}>
        <div style={{flex: 1, minWidth: 240}}>
          <HydrationPie value={hydration} goal={HYDRATION_GOAL} />
          <button
            className={"btn " + anim.microBtn}
            style={{marginTop: 7}}
            onClick={() => {
              setHydration(Math.min(hydration + 250, HYDRATION_GOAL));
              setShowCelebrate({ visible: true, type: "hydration" });
            }}
          >
            +250mL Hydrate
          </button>
        </div>
        <div style={{flex: 1, minWidth: 260}}>
          <NutrientRadar data={nutrients} />
        </div>
      </div>
      {/* Meal log input form */}
      <ChartCard title="Add Meal/Food Log" description="Track your food and calories – small steps, big wins!">
        <form onSubmit={handleAddLog} style={{display:"flex", gap:14, flexWrap:"wrap", alignItems:"flex-end"}}>
          <select
            required
            value={newLog.meal}
            onChange={e => setNewLog(l => ({...l, meal: e.target.value}))}
            style={{borderRadius: 8, padding:6, minWidth:85}}
          >
            <option value="">Meal</option>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>
          <MicroAnimatedInput
            value={newLog.food}
            onChange={e => setNewLog(l => ({ ...l, food: e.target.value }))}
            placeholder="Food (idli + sambar)"
            validate={v => v.length > 1}
            style={{minWidth: 140}}
          />
          <MicroAnimatedInput
            value={newLog.calories}
            type="number"
            onChange={e => setNewLog(l => ({ ...l, calories: e.target.value.replace(/[^\d]/g,"")}))}
            placeholder="Calories"
            validate={v => /^\d{1,4}$/.test(v)}
            style={{minWidth: 92}}
          />
          <button className="btn" type="submit" style={{borderRadius: 9}}>Add</button>
        </form>
      </ChartCard>
      {/* Meal log table */}
      <ChartCard title="Recent Meal Logs" description="What you tracked this week:">
        <table style={{ width:"100%", borderSpacing: 0, fontSize:"1.07em"}}>
          <thead>
            <tr style={{color:"#38B3A7"}}>
              <th>Date</th><th>Meal</th><th>Food</th><th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {mealLogs.slice().reverse().slice(0,8).map((log,i) => (
              <tr key={i} style={{ background:i%2?"#fff":"#f8fbef" }}>
                <td>{log.date}</td>
                <td>{log.meal}</td>
                <td>{log.food}</td>
                <td>{log.calories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ChartCard>
      {/* Indian regional recipe browser */}
      <ChartCard title="Indian Recipes Explorer" description="Discover healthful, regional recipes:">
        <div style={{display:"flex",gap:18,flexWrap:"wrap"}}>
          {INDIAN_REGIONAL_RECIPES.map((rec) => (
            <div key={rec.id} className={anim.microCard + " " + anim.microCardEntry}
              style={{padding: "1.15em 1.09em",borderRadius:13, background:"#fafcf8",
                minWidth:140, minHeight:98, display:"flex", flexDirection:"column",alignItems:"center"}}
            >
              <span style={{fontSize:"2.1em",marginBottom:6}}>{rec.emoji}</span>
              <b>{rec.name}</b>
              <span style={{fontSize:"0.98em",color:"#38B3A7"}}>{rec.region}</span>
              <span style={{fontSize:"0.90em",color:"#888",marginTop:2}}>{rec.desc}</span>
            </div>
          ))}
        </div>
      </ChartCard>
      {/* Nutrition/AI suggestions/tips */}
      <ChartCard title="Today's Nutrition Tips" description="">
        <ul style={{listStyle:"none",padding:0,margin:0,display:"flex",gap:13,flexWrap:"wrap"}}>
          {MEAL_TIPS.map((t, i) => (
            <li key={i} style={{
              padding:"0.65em 1.15em",background:"#f3fff6",borderRadius:8,display:"flex",alignItems:"center",
              fontSize:"1.06em",color:"#197A73"}}>
              <span style={{fontSize:"1.37em",marginRight:8}}>{t.emoji}</span>{t.tip}
            </li>
          ))}
        </ul>
      </ChartCard>
      {/* Barcode/product scan - navigation CTA */}
      <div style={{marginTop:"1.8em",textAlign:"center"}}>
        <a href="/product-scanner"
          className={"btn " + anim.microBtn}
          style={{ fontSize:"1.1em", borderRadius:9, margin:"0 auto", background:"#38B3A7", color:"#fff", fontWeight:700}}>
          Scan Product Barcode
        </a>
      </div>
    </div>
  );
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

export default DietNutritionPage;
