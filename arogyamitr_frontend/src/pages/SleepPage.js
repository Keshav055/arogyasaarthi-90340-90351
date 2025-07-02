import React, { useState, useMemo } from "react";
import { ChartCard, UserProgressChart } from "../components/Charts";
import { useSleepDashboard } from "../api/sleep";
import anim from "../MicroAnimations.module.css";
import { calculateStreak, checkBadgeUnlock } from "../components/GamificationUtils";
import BadgeDisplay from "../components/BadgeDisplay";
import { ProgressCelebrate } from "../components/ProgressCelebrate";

// ...AvatarIcon, demo/mock data as before...

function SleepPage() {
  const { data, loading, error, refetch } = useSleepDashboard();
  // ...domain/mock data as before...
  const [log, setLog] = useState([]);
  // Gamification badges/streak
  const logDates = useMemo(() => log.map((r) => r.date), [log]);
  const milestones = [
    { type: "streak", name: "Sleep 3 Nights", streak: 3, icon: "🌙" },
    { type: "streak", name: "6 Deep Sleep", streak: 6, icon: "😴" },
  ];
  const streak = useMemo(() => calculateStreak(logDates), [logDates]);
  const userProgress = { dailyStreak: streak.daily };
  const unlocked = useMemo(() => checkBadgeUnlock(milestones, userProgress), [userProgress]);

  return (
    <div className="container" style={{ margin: "3rem auto", maxWidth: 680 }}>
      <section style={{ margin: "0.8em 0" }}>
        <span>Sleep Log Streak: <b>{streak.daily}</b> nights</span>
        <BadgeDisplay badges={unlocked} animate />
        {unlocked.length > 0 &&
          <ProgressCelebrate show={true} message={`Great! ${unlocked[unlocked.length-1]?.name}`} milestoneIcon={unlocked[unlocked.length-1]?.icon} onDone={() => {}} />}
      </section>
      {/* Original sleep analytics/log input and visualization */}
    </div>
  );
}

export default SleepPage;
