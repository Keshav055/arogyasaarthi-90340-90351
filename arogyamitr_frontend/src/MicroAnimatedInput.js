import React, { useRef } from "react";
import styles from "./MicroAnimations.module.css";

/**
 * PUBLIC_INTERFACE
 * MicroAnimatedInput - A reusable input component with:
 * - Animated focus (glow, scale, or bounce)
 * - Input validation pop (shake on error, pop on success)
 * - Optional sound/tactile feedback on valid/invalid input
 * 
 * Props:
 *  - value: string (input value)
 *  - onChange: function (input event)
 *  - placeholder: string
 *  - validate: function (returns true/false based on input validity)
 *  - feedbackSound: bool (default true)
 *  - type: string (e.g. "text", "number", "password")
 *  - ...rest: any additional props
 */
const MicroAnimatedInput = ({
  value,
  onChange,
  placeholder,
  validate,
  feedbackSound = true,
  type = "text",
  ...rest
}) => {
  const [focused, setFocused] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const [valid, setValid] = React.useState(undefined);
  const inputRef = useRef();

  const playFeedback = (ok) => {
    if (!feedbackSound) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = ok ? 880 : 220;
    gain.gain.value = 0.12;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
    osc.onended = () => ctx.close();
  };

  const handleBlur = () => {
    setFocused(false);
    if (touched && validate) {
      const validNow = validate(value);
      setValid(validNow);
      playFeedback(validNow);
    }
  };

  const handleFocus = () => {
    setFocused(true);
    setTouched(true);
  };

  const handleChange = (e) => {
    onChange(e);
    if (validate && touched) {
      const validNow = validate(e.target.value);
      setValid(validNow);
      if (feedbackSound) playFeedback(validNow);
    }
  };

  let stateClass = "";
  if (focused) stateClass = styles.focusedInput;
  if (valid === true) stateClass = styles.validInput;
  if (valid === false) stateClass = styles.invalidInput;

  return (
    <div className={styles.inputWrapper}>
      <input
        className={`${styles.baseInput} ${stateClass}`}
        ref={inputRef}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={placeholder}
        type={type}
        aria-invalid={valid === false}
        {...rest}
      />
      {valid === true && (
        <span className={styles.emojiBounce} role="img" aria-label="check">
          🎉
        </span>
      )}
      {valid === false && (
        <span className={styles.emojiShake} role="img" aria-label="cross">
          ❌
        </span>
      )}
    </div>
  );
};

export default MicroAnimatedInput;
