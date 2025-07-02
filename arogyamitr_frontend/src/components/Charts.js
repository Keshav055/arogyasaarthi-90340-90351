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
      background: "var(--card-bg)",
      borderRadius: "16px",
      padding: "1.5rem",
      margin: "1.2rem 0",
      boxShadow: "var(--box-shadow)",
      border: "1.2px solid var(--border)",
      transition: "background 0.21s, color 0.15s",
    }}>
      <h3 style={{ margin: "0 0 0.4rem 0", color: "var(--text-primary)" }}>{title}</h3>
      {description && <div style={{ marginBottom: 12, color: "var(--text-secondary)" }}>{description}</div>}
      <div style={{ width: "100%", height: 240 }}>{children}</div>
    </div>
  );
}

/** Modern accessible chart palette for both light/dark; always uses theme variables for backgrounds/lines for contrast. */
export const chartPalette = [
  "var(--primary)",
  "var(--accent)",
  "var(--secondary)",
  "var(--accent-alt)",
  "var(--success)",
  "var(--danger)",
  "var(--secondary-light)",
  "var(--bg-secondary)" // fallback/neutral
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
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="name" tick={{ fill: "var(--text-primary)" }} />
          <YAxis domain={[0,100]} tick={{ fill: "var(--text-primary)" }} />
          <Tooltip
            contentStyle={{
              background: "var(--card-bg)",
              color: "var(--text-primary)",
              border: "1px solid var(--border)"
            }}
            itemStyle={{ color: "var(--text-primary)" }}
            labelStyle={{ color: "var(--text-secondary)" }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="var(--primary)"
            strokeWidth={3}
            dot={{ r: 5, fill: "var(--accent-alt)" }}
          />
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
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis dataKey="aspect" tick={{ fill: "var(--text-primary)" }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={ { fill: "var(--text-soft)" }} tickCount={6} />
          <Tooltip contentStyle={{ background: "var(--card-bg)", color: "var(--text-primary)", border: "1px solid var(--border)" }} />
          <Radar dataKey="value" stroke="var(--accent-alt)" fill="var(--accent-alt)" fillOpacity={0.35} />
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
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="tip" tick={{ fill: "var(--text-secondary)", fontSize: 11 }} />
          <YAxis allowDecimals={false} tick={{ fill: "var(--text-secondary)" }} />
          <Tooltip
            contentStyle={{
              background: "var(--card-bg)",
              color: "var(--text-primary)",
              border: "1px solid var(--border)",
            }}
            itemStyle={{ color: "var(--text-primary)" }}
            labelStyle={{ color: "var(--text-secondary)" }}
          />
          <Bar dataKey="users" fill="var(--secondary)" />
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
            fill="var(--primary)"
            label={({ name }) => name}
          >
            {data.map((entry, idx) =>
              <Cell
                key={`cell-${idx}`}
                fill={idx === 0 ? "var(--primary)" : "var(--bg-secondary)"}
              />
            )}
          </Pie>
          <Tooltip contentStyle={{ background: "var(--card-bg)", color: "var(--text-primary)", border: "1px solid var(--border)" }} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div style={{
        marginTop: "-40px",
        textAlign: "center",
        color: "var(--primary)",
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
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis dataKey="name" tick={{ fill: "var(--text-primary)" }}/>
          <PolarRadiusAxis angle={25}
            domain={[0, data.reduce((a, b) => Math.max(a, b.goal), 0)]}
            tick={{ fill: "var(--text-soft)" }}
          />
          <Radar name="Intake"
            dataKey="intake"
            stroke="var(--primary)"
            fill="var(--primary)"
            fillOpacity={0.40}
          />
          <Radar name="Goal"
            dataKey="goal"
            stroke="var(--secondary)"
            fill="var(--secondary)"
            fillOpacity={0.23}
          />
          <Legend />
          <Tooltip contentStyle={{ background: "var(--card-bg)", color: "var(--text-primary)", border: "1px solid var(--border)" }} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
