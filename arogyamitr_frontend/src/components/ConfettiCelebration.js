import React, { useRef } from "react";
import confetti from "canvas-confetti";

const ConfettiCelebration = React.forwardRef(({ trigger, options, onComplete }, ref) => {
  // PUBLIC_INTERFACE
  /**
   * Triggers confetti animation whenever `trigger` prop changes to true.
   * Accepts customizable options.
   * @param {boolean} trigger - Whether to launch confetti.
   * @param {object} options - Canvas-confetti options (optional).
   * @param {function} onComplete - Callback after confetti animation (optional).
   */
  React.useImperativeHandle(ref, () => ({
    fire,
  }));

  const fired = useRef(false);

  React.useEffect(() => {
    if (trigger && !fired.current) {
      fire();
      fired.current = true;
    } else if (!trigger) {
      fired.current = false;
    }
    // eslint-disable-next-line
  }, [trigger]);

  // PUBLIC_INTERFACE
  function fire() {
    confetti(
      options || {
        particleCount: 80,
        spread: 75,
        origin: { y: 0.7 }
      }
    );
    if (onComplete) {
      setTimeout(onComplete, 900);
    }
  }

  // This component renders nothing, it just fires confetti.
  return null;
});

export default ConfettiCelebration;
