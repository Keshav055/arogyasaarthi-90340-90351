import React, { useState, useMemo } from "react";
import { ChartCard, UserProgressChart } from "../components/Charts";
import { useMindfulnessDashboard } from "../api/mindfulness";
import ConfettiCelebration from "../components/ConfettiCelebration";
import CelebratePopup from "../components/CelebratePopup";
import anim from "../MicroAnimations.module.css";
import { calculateStreak, checkBadgeUnlock } from "../components/GamificationUtils";
import BadgeDisplay from "../components/BadgeDisplay";
import { ProgressCelebrate } from "../components/ProgressCelebrate";

// ...AvatarIcon, demo data as before...

function MindfulnessPage() {
  const { data, loading, error, refetch } = useMindfulnessDashboard();
  // ...domain demo data as before...
  const [log, setLog] = useState([]);
  const [showCelebrate, setShowCelebrate] = useState({ visible: false, type: "" });
  // Gamification integration
  const logDates = useMemo(() => log.map((entry) => entry.date), [log]);
  const milestones = [
    { type: "streak", name: "3 Mindful Days", streak: 3, icon: "🧘" },
    { type: "streak", name: "5 Calm Days", streak: 5, icon: "☀️" }
  ];
  const streak = useMemo(() => calculateStreak(logDates), [logDates]);
  const userProgress = { dailyStreak: streak.daily };
  const unlocked = useMemo(() => checkBadgeUnlock(milestones, userProgress), [userProgress]);

  // ...rest of domain logic as before...
  return (
    <div className="container" style={{ margin: "3rem auto", maxWidth: 680 }}>
      <section style={{margin:"0.8em 0"}}>
        <span>Meditation Streak: <b>{streak.daily}</b> days</span>
        <BadgeDisplay badges={unlocked} animate />
        {unlocked.length > 0 &&
          <ProgressCelebrate show={true} message={`Wohoo! ${unlocked[unlocked.length-1]?.name}`} milestoneIcon={unlocked[unlocked.length-1]?.icon} onDone={() => {}} />}
      </section>
      {/* Original mindfulness UI as before... */}
    </div>
  );
}

export default MindfulnessPage;
