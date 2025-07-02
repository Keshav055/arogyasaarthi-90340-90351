import React, { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * ProgressCelebrate overlays a brief animated milestone/celebration popup.
 * @param {boolean} show - Controls visibility
 * @param {string} message - Main message to show
 * @param {string} [milestoneIcon] - Optional emoji or icon
 * @param {function} [onDone] - Callback invoked when celebration ends
 * @param {number} [duration=1550] - Duration to display in ms
 */
export function ProgressCelebrate({ show, message, milestoneIcon = "🎉", onDone, duration = 1550 }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const to = setTimeout(() => {
        setVisible(false);
        if (onDone) onDone();
      }, duration);
      return () => clearTimeout(to);
    } else {
      setVisible(false);
    }
  }, [show, onDone, duration]);

  if (!visible) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: "18%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 3100,
        background: "#FFFDE8",
        border: "2.1px solid #FFC857",
        borderRadius: 24,
        padding: "1.2rem 2.3rem",
        boxShadow: "0 6px 27px rgba(44,166,90,0.13), 0 0 0 4px #FFC85722",
        color: "#27642F",
        fontSize: "1.35rem",
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        animation: "celebrateFade 0.7s cubic-bezier(.57,1.65,.56,0.88)"
      }}
      role="alert"
      aria-live="polite"
    >
      <span style={{fontSize:"2em",marginRight: "0.28em"}}>{milestoneIcon}</span>
      <span>{message}</span>
      <style>
        {`@keyframes celebrateFade {
          0% { opacity:0; transform:translateX(-50%) scale(.7);}
          60%{opacity:.94; transform:translateX(-50%) scale(1.14);}
          100%{opacity:1; transform:translateX(-50%) scale(1);}
        }`}
      </style>
    </div>
  );
}
