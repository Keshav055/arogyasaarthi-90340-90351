import React, { useState, useMemo } from "react";
import { ChartCard, UserProgressChart } from "../components/Charts";
import { useFitnessDashboard } from "../api/fitness";
import ConfettiCelebration from "../components/ConfettiCelebration";
import CelebratePopup from "../components/CelebratePopup";
import anim from "../MicroAnimations.module.css";
import { calculateStreak, checkBadgeUnlock } from "../components/GamificationUtils";
import BadgeDisplay from "../components/BadgeDisplay";
import { ProgressCelebrate } from "../components/ProgressCelebrate";

// ...AvatarIcon, demo data as before...

function FitnessPage() {
  const { data, loading, error, refetch } = useFitnessDashboard();
  // ...domain demo data as before...
  const [log, setLog] = useState([]);
  const [showCelebrate, setShowCelebrate] = useState({ visible: false, type: "" });
  // Gamification demo
  const logDates = useMemo(() => log.map((w) => w.date), [log]);
  const milestones = [
    { type: "streak", name: "3 Day Fit Streak", streak: 3, icon: "🤸" },
    { type: "streak", name: "5 Day Energizer", streak: 5, icon: "⚡" },
  ];
  const streak = useMemo(() => calculateStreak(logDates), [logDates]);
  const userProgress = { dailyStreak: streak.daily };
  const unlocked = useMemo(() => checkBadgeUnlock(milestones, userProgress), [userProgress]);

  // ...rest of domain logic remains...
  return (
    <div className="container" style={{ margin: "3rem auto", maxWidth: 680 }}>
      <section style={{marginTop:"0.7em"}}>
        <span>Move Streak: <b>{streak.daily}</b> days</span>
        <BadgeDisplay badges={unlocked} animate />
        {unlocked.length > 0 &&
          <ProgressCelebrate show={true} message={`Congrats! ${unlocked[unlocked.length-1]?.name}!`} milestoneIcon={unlocked[unlocked.length-1]?.icon} onDone={() => {}} />}
      </section>
      {/* Original fitness analytics and chart/card UI as before... */}
    </div>
  );
}

export default FitnessPage;
