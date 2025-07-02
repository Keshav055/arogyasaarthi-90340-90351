import React, { useState, useMemo } from "react";
import { HydrationPie, NutrientRadar, ChartCard } from "../components/Charts";
import { fetchMealPlans } from "../api/dietNutrition";

// --- MOCK DATA & REGIONAL RECIPES (to be replaced by real backend) ---
const MOCK_MEAL_PLAN = [
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
  },
  {
    meal: "Lunch",
    title: "South Indian Thali (Sambar Rice, Poriyal, Curd)",
    calories: 550,
    macronutrients: { Protein: 14, Carbs: 88, Fat: 13, Fiber: 7 },
    recipeId: "south-indian-thali",
    ingredients: [
      "Rice - 1 cup",
      "Sambar - 1 bowl",
      "Cabbage poriyal - 1 cup",
      "Curd - 0.5 cup",
      "Papad, pickle (optional)",
    ],
    instructions: [
      "Prepare sambar (dal + veggies + spices).",
      "Serve rice with sambar, poriyal, curd, papad. Eat with pickle.",
    ],
    region: "Tamil Nadu",
  },
  {
    meal: "Dinner",
    title: "Phulka with Moong Dal & Bhindi",
    calories: 410,
    macronutrients: { Protein: 13, Carbs: 65, Fat: 7, Fiber: 9 },
    recipeId: "phulka-moong-bhindi",
    ingredients: [
      "Phulka (whole wheat roti) - 2",
      "Moong dal (cooked) - 1 cup",
      "Bhindi sabzi - 1 cup",
      "Salad",
    ],
    instructions: [
      "Make phulkas; cook moong dal (turmeric, salt); fry bhindi lightly.",
      "Serve hot with salad.",
    ],
    region: "North India",
  },
  {
    meal: "Snacks",
    title: "Sprouted Moong Salad",
    calories: 130,
    macronutrients: { Protein: 9, Carbs: 20, Fat: 0.5, Fiber: 4 },
    recipeId: "sprouted-salad",
    ingredients: [
      "Sprouted moong - 1/2 cup",
      "Tomato, onion, cucumber",
      "Lemon juice, coriander, salt, pepper",
    ],
    instructions: [
      "Mix moong, veggies, lemon, salt, and coriander.",
      "Toss and serve as a protein snack.",
    ],
    region: "All India",
  },
];

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
  {
    id: "idli-sambar",
    title: "Idli Sambar",
    region: "South India",
    calories: 320,
    macronutrients: { Protein: 8, Carbs: 60, Fat: 3, Fiber: 3 },
    ingredients: [
      "Idli - 3",
      "Sambar - 1 bowl",
      "Coconut chutney - optional",
    ],
    instructions: [
      "Steam idli batter in molds.",
      "Prepare sambar (dal + veggies).",
      "Serve idli with hot sambar, chutney.",
    ],
    tags: ["Vegetarian", "Fermented", "Breakfast"],
    meal: "Breakfast",
  },
  {
    id: "rajasthani-dal-baati",
    title: "Dal Baati",
    region: "Rajasthan",
    calories: 580,
    macronutrients: { Protein: 19, Carbs: 92, Fat: 12, Fiber: 11 },
    ingredients: [
      "Baati (baked wheat balls) - 3",
      "Panchmel dal - 1 bowl",
      "Ghee - 1 tsp",
    ],
    instructions: [
      "Knead & shape baati, bake.",
      "Cook mixed dal with spices.",
      "Crack open baati, drizzle ghee, pour dal.",
    ],
    tags: ["Vegetarian", "Lunch"],
    meal: "Lunch",
  },
  {
    id: "besan-chilla",
    title: "Besan Chilla",
    region: "North India",
    calories: 210,
    macronutrients: { Protein: 7, Carbs: 26, Fat: 8, Fiber: 3 },
    ingredients: [
      "Besan (gram flour) - 1/2 cup",
      "Onion, tomato, chili, coriander",
      "Spices, salt, water, oil",
    ],
    instructions: [
      "Mix besan, water, veggies, spices to batter.",
      "Spread on pan, shallow fry both sides.",
    ],
    tags: ["Vegetarian", "Snack"],
    meal: "Snacks",
  },
  {
    id: "sprouted-salad",
    title: "Sprouted Moong Salad",
    region: "All India",
    calories: 130,
    macronutrients: { Protein: 9, Carbs: 20, Fat: 0.5, Fiber: 4 },
    ingredients: [
      "Sprouted moong - 1/2 cup",
      "Tomato, onion, cucumber",
      "Lemon juice, coriander, salt, pepper",
    ],
    instructions: [
      "Mix moong, veggies, lemon, salt, and coriander.",
      "Toss and serve as a protein snack.",
    ],
    tags: ["High Protein", "Snack", "Vegan"],
    meal: "Snacks",
  },
];

// --- Personalized suggestion mock ---
const PERSONAL_SUGGESTION = {
  tip: "Based on your last meal log, try including a fermented food (like idli or dahi) for gut health!",
  color: "#FFC857",
};

const REGIONS = [
  "All India",
  "North India",
  "South India",
  "Maharashtra",
  "Tamil Nadu",
  "Rajasthan",
];

// --- Add Recipe Form Modal ---
function AddRecipeModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    region: "",
    meal: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    fiber: "",
    ingredients: [""],
    instructions: [""],
    tags: "",
  });
  const [error, setError] = useState("");

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleListChange(field, idx, val) {
    setForm((f) => {
      const arr = [...f[field]];
      arr[idx] = val;
      return { ...f, [field]: arr };
    });
  }
  function handleAddRow(field) {
    setForm((f) => ({ ...f, [field]: [...f[field], ""] }));
  }
  function handleRemoveRow(field, idx) {
    setForm((f) => {
      const arr = f[field].slice();
      arr.splice(idx, 1);
      return { ...f, [field]: arr };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.region || !form.meal) {
      setError("Title, region, and meal type are required");
      return;
    }
    if (onSave) onSave({
      ...form,
      calories: Number(form.calories || 0),
      macronutrients: {
        Protein: Number(form.protein || 0),
        Carbs: Number(form.carbs || 0),
        Fat: Number(form.fat || 0),
        Fiber: Number(form.fiber || 0),
      },
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    });
    onClose();
  }

  if (!open) return null;
  return (
    <div style={{
      position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh",
      zIndex: 120, background: "rgba(44,62,80,0.16)"
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          position: "absolute",
          left: "50%",
          top: "54%",
          minWidth: 310,
          width: "min(90vw,396px)",
          transform: "translate(-50%,-50%)",
          borderRadius: 13,
          padding: "2.2em 1.65em 1.15em 1.65em",
          boxShadow: "0 4px 32px rgba(44,62,80,0.21)",
          fontSize: "1.05em",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: "1.18em", marginBottom: 7 }}>
          Add Your Recipe
        </div>
        <label>Title*</label>
        <input name="title" required value={form.title} onChange={handleInput} style={{ width: "100%", marginBottom: 8 }} />
        <label>Region*</label>
        <select name="region" required value={form.region} onChange={handleInput} style={{ width: "100%", marginBottom: 8 }}>
          <option value="">-- Select Region --</option>
          {REGIONS.map((reg) => <option key={reg} value={reg}>{reg}</option>)}
        </select>
        <label>Meal*</label>
        <select name="meal" required value={form.meal} onChange={handleInput} style={{ width: "100%", marginBottom: 8 }}>
          <option value="">-- Select --</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snacks</option>
        </select>
        <div style={{ display: "flex", gap: 7 }}>
          <span style={{ flex: 1 }}>
            <label>Calories</label>
            <input name="calories" type="number" min={0} value={form.calories} onChange={handleInput} style={{ width: "100%" }} />
          </span>
          <span style={{ flex: 1 }}>
            <label>Protein</label>
            <input name="protein" type="number" min={0} value={form.protein} onChange={handleInput} style={{ width: "100%" }} />
          </span>
          <span style={{ flex: 1 }}>
            <label>Carbs</label>
            <input name="carbs" type="number" min={0} value={form.carbs} onChange={handleInput} style={{ width: "100%" }} />
          </span>
        </div>
        <div style={{ display: "flex", gap: 7, marginTop: 4 }}>
          <span style={{ flex: 1 }}>
            <label>Fat</label>
            <input name="fat" type="number" min={0} value={form.fat} onChange={handleInput} style={{ width: "100%" }} />
          </span>
          <span style={{ flex: 1 }}>
            <label>Fiber</label>
            <input name="fiber" type="number" min={0} value={form.fiber} onChange={handleInput} style={{ width: "100%" }} />
          </span>
        </div>
        <label style={{ marginTop: 9 }}>Ingredients*</label>
        {form.ingredients.map((ing, i) =>
          <div key={i} style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <input
              required
              value={ing}
              onChange={e => handleListChange("ingredients", i, e.target.value)}
              style={{ width: "87%" }}
            />
            {form.ingredients.length > 1 && (
              <button type="button" title="Remove" onClick={() => handleRemoveRow("ingredients", i)} style={{ color: "#EE4266" }}>×</button>
            )}
          </div>
        )}
        <button type="button" className="btn" onClick={() => handleAddRow("ingredients")} style={{ fontSize: 15, marginBottom: 7, marginTop: 3 }}>+ Ingredient</button>
        <label style={{ marginTop: 7 }}>Instructions*</label>
        {form.instructions.map((inst, i) =>
          <div key={i} style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <input
              required
              value={inst}
              onChange={e => handleListChange("instructions", i, e.target.value)}
              style={{ width: "87%" }}
            />
            {form.instructions.length > 1 && (
              <button type="button" title="Remove" onClick={() => handleRemoveRow("instructions", i)} style={{ color: "#EE4266" }}>×</button>
            )}
          </div>
        )}
        <button type="button" className="btn" onClick={() => handleAddRow("instructions")} style={{ fontSize: 15, marginBottom: 7, marginTop: 3 }}>+ Step</button>
        <label>Tags (comma separated)</label>
        <input name="tags" value={form.tags} onChange={handleInput} style={{ width: "100%" }} />
        {error && <div style={{ color: "#EE4266", marginTop: 6 }}>{error}</div>}
        <div style={{ display: "flex", gap: 9, marginTop: 18, justifyContent: "end" }}>
          <button className="btn" type="button" style={{ background: "#bbb", color: "#333" }} onClick={onClose}>Cancel</button>
          <button className="btn" type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

// --- Recipe Card Display ---
function RecipeCard({ recipe, onView }) {
  return (
    <div style={{
      background: "#f5fdf9",
      borderRadius: 11,
      boxShadow: "0 2px 10px rgba(60,140,100,0.07)",
      margin: "0.95em 0",
      padding: "1.0em 1.25em 0.8em 1em",
      border: "1.5px solid #e0efeb",
      maxWidth: 440,
      cursor: "pointer",
    }}
    tabIndex={0}
    onClick={() => onView(recipe)}
    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onView(recipe); }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{
          fontSize: "1.18em",
          fontWeight: 700,
          color: "#4CA65A",
          marginRight: 10,
          textTransform: "capitalize",
        }}>{recipe.title}</div>
        <span style={{
          marginLeft: "auto",
          background: "#E87A41",
          color: "#fff",
          borderRadius: 6,
          padding: "3px 13px",
          fontSize: "0.95em"
        }}>{recipe.region}</span>
      </div>
      <div style={{ fontSize: "0.95em", color: "#207761", margin: "2px 0 5px 1px" }}>
        <span style={{ marginRight: 10 }}>Meal: <b>{recipe.meal}</b></span>
        <span>Calories: {recipe.calories}</span>
      </div>
      <div style={{ color: "#555", fontSize: "0.92em", marginBottom: 3 }}>
        <span>{Object.entries(recipe.macronutrients || {})
          .map(([k, v]) => `${k}: ${v}g`)
          .join(" | ")}</span>
      </div>
      {Array.isArray(recipe.tags) && (
        <div style={{ fontSize: "0.89em", color: "#888" }}>
          Tags: {recipe.tags.join(", ")}
        </div>
      )}
    </div>
  );
}

// --- Recipe Modal Detail View ---
function RecipeDetailModal({ recipe, open, onClose }) {
  if (!open || !recipe) return null;
  return (
    <div style={{
      position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh", zIndex: 999,
      background: "rgba(44,62,80,0.18)"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 15,
        boxShadow: "0 3px 30px #38B3A7aa",
        position: "absolute",
        left: "50%",
        top: "53%",
        transform: "translate(-50%,-50%)",
        minWidth: 310,
        width: "min(91vw,420px)",
        maxHeight: "88vh",
        overflowY: "auto",
        padding: "2em 1.4em 1em 1.6em"
      }}>
        <div style={{ fontWeight: 700, fontSize: "1.35em", marginBottom: 7 }}>
          🍽️ {recipe.title} <span style={{
            background: "#E87A41", color: "#fff", borderRadius: 7, padding: "3px 12px", marginLeft: 7, fontSize: "0.98em"
          }}>{recipe.region}</span>
        </div>
        <div style={{ color: "#207761", fontSize: "1.06em", marginBottom: 4 }}>
          {recipe.meal} | Calories: {recipe.calories}
        </div>
        <div style={{ color: "#318", fontSize: "1.00em", marginBottom: 8 }}>
          {Object.entries(recipe.macronutrients || {}).map(([k, v]) => (<span key={k} style={{ marginRight: 9 }}>{k}: <b>{Number(v)}</b>g</span>))}
        </div>
        <div style={{ margin: "5px 0 0 1px" }}>
          <b>Ingredients:</b>
          <ul style={{ marginTop: 5 }}>
            {(recipe.ingredients || []).map((ing, i) => <li key={i}>{ing}</li>)}
          </ul>
        </div>
        <div>
          <b>Instructions:</b>
          <ol style={{ margin: 0 }}>
            {(recipe.instructions || []).map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </div>
        {Array.isArray(recipe.tags) && (
          <div style={{ fontSize: "0.98em", color: "#888", marginTop: 7 }}>
            Tags: {recipe.tags.join(", ")}
          </div>
        )}
        <div style={{ display: "flex", gap: 9, marginTop: 17, justifyContent: "end" }}>
          <button className="btn" style={{ background: "#bbb", color: "#333" }} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

// --- Search & Filter Bar ---
function RecipeSearchFilter({ value, setValue, region, setRegion }) {
  return (
    <div style={{ display: "flex", gap: 11, marginBottom: 12, flexWrap: "wrap" }}>
      <input
        style={{ flex: 2, minWidth: 120, padding: "7px 11px", borderRadius: 7, border: "1.5px solid #dcecef", fontSize: "1em" }}
        placeholder="Search recipe name / keyword"
        value={value}
        onChange={e => setValue(e.target.value)}
        maxLength={54}
      />
      <select
        style={{ flex: 1, minWidth: 110, padding: "7px 7px", borderRadius: 7, border: "1.5px solid #dcecef", fontSize: "1em" }}
        value={region}
        onChange={e => setRegion(e.target.value)}
      >
        <option value="">All Regions</option>
        {REGIONS.map((reg) => <option key={reg} value={reg}>{reg}</option>)}
      </select>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * DietNutritionPage shows charts for hydration and macro tracking, and implements meal/recipe UI.
 */
function DietNutritionPage() {
  // Demo data for hydration/nutrients (real: useNutritionDashboard API)
  const hydrationIntake = 1350;
  const hydrationGoal = 2000;
  const nutrientData = [
    { name: "Protein", intake: 77, goal: 90 },
    { name: "Carbs", intake: 210, goal: 250 },
    { name: "Fat", intake: 50, goal: 70 },
    { name: "Fiber", intake: 27, goal: 35 },
    { name: "Sugar", intake: 19, goal: 30 }
  ];

  // --- State for recipe browser, add new, filter/search ---
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewRecipe, setViewRecipe] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  // --- Combine meal plan, Indian regional, and user recipes ---
  const [userRecipes, setUserRecipes] = useState([]);
  const allRecipes = [
    ...INDIAN_REGIONAL_RECIPES,
    ...userRecipes.map((r, i) => ({ ...r, id: `user-${i}` })),
  ];

  // --- Basic recipe search/filter ---
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

  // --- Handle Add Recipe ---
  function handleAddRecipe(newRecipe) {
    setUserRecipes((old) => [...old, newRecipe]);
  }

  // Meal plan (from mock; in production: fetchMealPlans API/hook)
  const mealPlan = MOCK_MEAL_PLAN;

  return (
    <div className="container" style={{ margin: "3rem auto", maxWidth: 700 }}>
      <h2>Diet & Nutrition</h2>
      <p>
        Plan meals, browse Indian regional recipes, track hydration and nutrients, and add your own recipes. 
        <br />Personalized meal planning made for India.
      </p>
      <HydrationPie value={hydrationIntake} goal={hydrationGoal} />
      <NutrientRadar data={nutrientData} />

      {/* --- Personalized Suggestion --- */}
      <div style={{
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
      }}>
        <span role="img" aria-label="tip">💡</span> {PERSONAL_SUGGESTION.tip}
      </div>

      {/* --- Meal Plan Table/Card --- */}
      <ChartCard
        title="Today's Meal Plan"
        description="Calories, macronutrients, and meal details"
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 7 }}>
            <thead>
              <tr style={{ color: "#207761", fontWeight: 700 }}>
                <th>Meal</th>
                <th>Title</th>
                <th>Cals</th>
                <th>Macros</th>
                <th>Region</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {mealPlan.map((mp, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #e0efeb" }}>
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
                    >View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ color: "#4CA65A", fontSize: "0.99em", marginTop: 3 }}>
          Total calories: {mealPlan.reduce((a, m) => a + m.calories, 0)} kcal
          &
          Protein: {mealPlan.reduce((a, m) => a + (m.macronutrients.Protein || 0), 0)}g
        </div>
      </ChartCard>

      {/* --- Recipe Browser/Search/Filter --- */}
      <ChartCard
        title="Indian Regional Recipe Explorer"
        description="Browse curated, regional, and personal recipes for any meal type"
      >
        <RecipeSearchFilter value={searchText} setValue={setSearchText} region={regionFilter} setRegion={setRegionFilter} />
        <button
          className="btn"
          style={{ marginBottom: 11, borderRadius: 9 }}
          onClick={() => setAddModalOpen(true)}
        >+ Add Your Recipe</button>
        {filteredRecipes.length === 0 && <span style={{ color: "#E87A41" }}>No recipes found.</span>}
        <div>
          {filteredRecipes.map((r) =>
            <RecipeCard key={r.id} recipe={r} onView={setViewRecipe} />
          )}
        </div>
      </ChartCard>

      {/* --- Modal Portals --- */}
      <AddRecipeModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleAddRecipe}
      />
      <RecipeDetailModal
        recipe={viewRecipe}
        open={!!viewRecipe}
        onClose={() => setViewRecipe(null)}
      />

      {/* --- Nutrition logging, hydration log, barcode scanning, reminders, etc. can be added below --- */}
    </div>
  );
}

export default DietNutritionPage;
