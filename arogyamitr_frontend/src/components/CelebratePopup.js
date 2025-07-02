import React from "react";
import "./../AppCelebrate.css";

// PUBLIC_INTERFACE
function CelebratePopup({ open, icon = "🎉", children, duration = 1800, onClose }) {
  /**
   * Temporarily displays a badge popup for celebrations.
   * @param {boolean} open - Whether to show the popup.
   * @param {string} icon - Emoji or icon to show.
   * @param {ReactNode} children - Message to show.
   * @param {number} duration - Popup duration in ms.
   * @param {function} onClose - Close handler (triggered after duration).
   */
  React.useEffect(() => {
    if (open && onClose) {
      const to = setTimeout(onClose, duration);
      return () => clearTimeout(to);
    }
    // eslint-disable-next-line
  }, [open]);

  if (!open) return null;
  return (
    <div className="celebrate-badge-popup" role="status" aria-live="polite">
      <span className="celebrate-badge-icon">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

export default CelebratePopup;
