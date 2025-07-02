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
      <h3 style={{ margin: "0 0 0.4rem 0", color: "var(--primary-text)" }}>{title}</h3>
      {description && <div style={{ marginBottom: 12, color: "var(--inactive-gray)" }}>{description}</div>}
      <div style={{ width: "100%", height: 240 }}>{children}</div>
    </div>
  );
}

/**
 * DonutChart: Accessible donut chart following theme variables.
 * Main overlay and legends use high-contrast text for readability.
 */
export const DonutChart = ({ consumed, total }) => {
  const percent = Math.round((consumed / total) * 100);

  const arcConsumed = "var(--accent-green)";
  const arcRemaining = "var(--chart-inactive-bg)";

  const r = 42, stroke = 12, c = 54;
  const circumference = 2 * Math.PI * r;
  const arc1 = (circumference * percent) / 100;

  return (
    <div style={{ position: "relative", width: 140, height: 140 }}>
      <svg width="140" height="140">
        <circle
          r={r}
          cx={c}
          cy={c}
          fill="none"
          stroke={arcRemaining}
          strokeWidth={stroke}
        />
        <circle
          r={r}
          cx={c}
          cy={c}
          fill="none"
          stroke={arcConsumed}
          strokeWidth={stroke}
          strokeDasharray={`${arc1},${circumference - arc1}`}
          strokeLinecap="round"
        />
      </svg>
      {/* Overlay percentage - always readable */}
      <div className="chart-label-overlay">
        {percent}%
      </div>
      {/* Legends */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
        <div style={{ display: "flex", alignItems: "center", marginRight: 18 }}>
          <span style={{
            width: 16, height: 16,
            display: "inline-block",
            background: "var(--accent-green)",
            borderRadius: 3, marginRight: 6
          }}></span>
          <span className="chart-legend-active">Consumed</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{
            width: 16, height: 16,
            display: "inline-block",
            background: "var(--chart-inactive-bg)",
            borderRadius: 3, marginRight: 6
          }}></span>
          <span className="chart-legend">Remaining</span>
        </div>
      </div>
    </div>
  );
};

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
          <XAxis dataKey="name" tick={{ fill: "var(--primary-text)" }} />
          <YAxis domain={[0,100]} tick={{ fill: "var(--primary-text)" }} />
          <Tooltip
            contentStyle={{
              background: "var(--card-bg)",
              color: "var(--primary-text)",
              border: "1px solid var(--border)"
            }}
            itemStyle={{ color: "var(--primary-text)" }}
            labelStyle={{ color: "var(--inactive-gray)" }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="var(--primary)"
            strokeWidth={3}
            dot={{ r: 5, fill: "var(--accent)" }}
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
          <PolarAngleAxis dataKey="aspect" tick={{ fill: "var(--primary-text)" }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={ { fill: "var(--text-muted)" }} tickCount={6} />
          <Tooltip contentStyle={{ background: "var(--card-bg)", color: "var(--primary-text)", border: "1px solid var(--border)" }} />
          <Radar dataKey="value" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.35} />
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
          <XAxis dataKey="tip" tick={{ fill: "var(--inactive-gray)", fontSize: 11 }} />
          <YAxis allowDecimals={false} tick={{ fill: "var(--inactive-gray)" }} />
          <Tooltip
            contentStyle={{
              background: "var(--card-bg)",
              color: "var(--primary-text)",
              border: "1px solid var(--border)",
            }}
            itemStyle={{ color: "var(--primary-text)" }}
            labelStyle={{ color: "var(--inactive-gray)" }}
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
                fill={idx === 0 ? "var(--primary)" : "var(--chart-inactive-bg)"}
              />
            )}
          </Pie>
          <Tooltip contentStyle={{ background: "var(--card-bg)", color: "var(--primary-text)", border: "1px solid var(--border)" }} />
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
          <PolarAngleAxis dataKey="name" tick={{ fill: "var(--primary-text)" }}/>
          <PolarRadiusAxis angle={25}
            domain={[0, data.reduce((a, b) => Math.max(a, b.goal), 0)]}
            tick={{ fill: "var(--text-muted)" }}
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
          <Tooltip contentStyle={{ background: "var(--card-bg)", color: "var(--primary-text)", border: "1px solid var(--border)" }} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
