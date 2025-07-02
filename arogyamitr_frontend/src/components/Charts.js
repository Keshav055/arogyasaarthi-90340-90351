import React from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell
} from "recharts";

/**
 * ChartCard wraps each chart with header and description styling.
 */
export function ChartCard({ title, description, children }) {
  return (
    <div style={{
      background: "var(--card-bg, #232c3c)",
      borderRadius: "16px",
      padding: "1.5rem",
      margin: "1.2rem 0",
      boxShadow: "0 2px 16px 0 rgba(15,18,34,0.15)",
      border: "1.2px solid var(--border, #232b3b)",
      transition: "background 0.21s, color 0.15s",
    }}>
      <h3 style={{ margin: "0 0 0.4rem 0", color: "var(--text-primary,#f2f5fd)" }}>{title}</h3>
      {description && <div style={{ marginBottom: 12, color: "var(--text-secondary,#A6AFCF)" }}>{description}</div>}
      <div style={{ width: "100%", height: 240 }}>{children}</div>
    </div>
  );
}

/** Modern accessible chart palette for both light/dark */
export const chartPalette = [
  "var(--primary,#7ec583)",      // green
  "var(--accent,#3451b2)",       // blue
  "var(--secondary,#FFC857)",    // gold
  "var(--accent-alt,#2296ce)",   // highlight blue
  "#45d885",                     // positive green
  "#e66a86",                     // pink/danger
  "#ffdf8f",                     // soft yellow
  "#25325c"                      // muted dark blue-gray
];

/**
 * PUBLIC_INTERFACE
 * UserProgressChart - Plots user's progress (e.g. over weeks) for dashboard.
 */
export function UserProgressChart({ data }) {
  // data: [{ name: "Week 1", score: 60 }, ...]
  return (
    <ChartCard title="Your Progress" description="Weekly improvement towards your wellness goal">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="name" tick={{ fill: "var(--text-primary)" }}/>
          <YAxis domain={[0, 100]} tick={{ fill: "var(--text-primary)" }} />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#4CA65A" strokeWidth={3} dot={{ r: 5, fill: "#4CA65A" }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/**
 * PUBLIC_INTERFACE
 * WellnessInfographic - Shows multi-aspect wellness analytics in a radar chart.
 */
export function WellnessInfographic({ data }) {
  // data: [{ aspect: "Nutrition", value: 88 }, ...]
  return (
    <ChartCard title="Wellness Overview" description="Your balance across core wellness areas">
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="aspect" tick={{ fill: "var(--text-primary)" }}/>
          <PolarRadiusAxis angle={30} domain={[0, 100]} tickCount={6} />
          <Tooltip />
          <Radar dataKey="value" stroke="#38B3A7" fill="#38B3A7" fillOpacity={0.4} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/**
 * PUBLIC_INTERFACE
 * HealthTipsBar - Bar chart to illustrate health tips' popularity or completion.
 */
export function HealthTipsBar({ data }) {
  // data: [{ tip: "Walk outdoors", users: 135 }, ...]
  return (
    <ChartCard title="Trending Health Tips" description="Most followed wellness actions this month">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tip" tick={{ fill: "var(--text-primary)", fontSize: 11 }}/>
          <YAxis allowDecimals={false} tick={{ fill: "var(--text-primary)" }}/>
          <Tooltip />
          <Bar dataKey="users" fill="#FFC857" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/**
 * PUBLIC_INTERFACE
 * HydrationPie - Pie chart for hydration tracking (intake vs. goal).
 */
export function HydrationPie({ value, goal }) {
  let percent = Math.min(100, Math.round((value / goal) * 100));
  let data = [
    { name: "Consumed", value },
    { name: "Remaining", value: Math.max(0, goal - value) }
  ];
  return (
    <ChartCard title="Hydration Tracker" description={`Today: ${value} mL / ${goal} mL`}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={55}
            outerRadius={95}
            fill="#4CA65A"
            label={({ name }) => name}
          >
            {data.map((entry, idx) =>
              <Cell key={`cell-${idx}`} fill={idx === 0 ? "#4CA65A" : "#EFEFEF"} />
            )}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div style={{
        marginTop: "-40px", 
        textAlign: "center", 
        color: "#4CA65A", 
        fontWeight: "bold", 
        fontSize: "1.5rem"
      }}>
        {percent}%
      </div>
    </ChartCard>
  );
}

/**
 * PUBLIC_INTERFACE
 * NutrientRadar - Shows macronutrient intake (protein, carbs, fats, fiber, etc) compared to goal.
 */
export function NutrientRadar({ data }) {
  // data: [{ name: "Protein", intake: 77, goal: 90 }, ...]
  return (
    <ChartCard title="Nutrient Intake" description="Macronutrient distribution vs. recommended goals">
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis angle={25} domain={[0, data.reduce((a, b) => Math.max(a, b.goal), 0)]} />
          <Radar name="Intake" dataKey="intake" stroke="#2C3E50" fill="#2C3E50" fillOpacity={0.5} />
          <Radar name="Goal" dataKey="goal" stroke="#FFC857" fill="#FFC857" fillOpacity={0.25} />
          <Legend />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
