import React from "react";

/**
 * PUBLIC_INTERFACE
 * BadgeDisplay renders a list of milestone badges with emoji/icon, name, and optional animation.
 * @param {Array} badges - array of {icon, name} badge objects to show
 * @param {boolean} animate - whether to animate badges (optional)
 */
function BadgeDisplay({ badges, animate }) {
  if (!badges || badges.length === 0) return null;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        margin: "0.5em 0 0.1em 0",
        flexWrap: "wrap",
      }}
      aria-label="Unlocked badges"
    >
      {badges.map((b, idx) => (
        <span
          key={b.name}
          style={{
            display: "flex",
            alignItems: "center",
            background: "#FFFBEA",
            color: "#27642f",
            borderRadius: "14px",
            padding: "0.18em 0.65em",
            fontWeight: 700,
            fontSize: "1.13em",
            letterSpacing: 0.01,
            boxShadow: animate
              ? "0 1.5px 7px #4CA65A55"
              : "0 1px 3px #E0E5DF",
            animation: animate
              ? "badgePopIn 0.57s cubic-bezier(.36,1.51,.56,0.97)"
              : undefined,
          }}
        >
          <span role="img" aria-label="badge-icon" style={{ fontSize: "1.4em", marginRight: 8 }}>
            {b.icon}
          </span>
          {b.name}
        </span>
      ))}
      <style>
        {`@keyframes badgePopIn {
            0% { transform:scale(.5) rotate(-7deg);}
            60%{transform:scale(1.14) rotate(3deg);}
            80%{transform:scale(0.97);}
            100%{transform:scale(1);}
        }`}
      </style>
    </div>
  );
}

export default BadgeDisplay;
