import React, { useState, useMemo } from "react";
import { ChartCard, UserProgressChart } from "../components/Charts";
import { useFitnessDashboard } from "../api/fitness";
import ConfettiCelebration from "../components/ConfettiCelebration";
import CelebratePopup from "../components/CelebratePopup";
import anim from "../MicroAnimations.module.css";
import { calculateStreak, checkBadgeUnlock } from "../components/GamificationUtils";
import BadgeDisplay from "../components/BadgeDisplay";
import { ProgressCelebrate } from "../components/ProgressCelebrate";

// Avatar playful emoji for fitness
const AvatarIcon = () => (
  <span className="fitness-avatar" role="img" aria-label="fitness">🏃‍♂️</span>
);

const DEMO_VIDEO_URL = "https://www.youtube.com/embed/nmwgirgXLYM"; // Demo embedded exercise

const DEMO_WORKOUTS = [
  { date: daysAgo(0), type: "Walk", duration: 38, steps: 6700 },
  { date: daysAgo(0), type: "Yoga", duration: 22, steps: 1200 },
  { date: daysAgo(1), type: "Strength", duration: 41, steps: 3350 },
  { date: daysAgo(2), type: "Cycling", duration: 26, steps: 0 }
];

// PUBLIC_INTERFACE
function FitnessPage() {
  const { data, loading, error, refetch } = useFitnessDashboard();
  const [log, setLog] = useState(DEMO_WORKOUTS);
  const [newWorkout, setNewWorkout] = useState({ type:"", duration:"", steps:"" });
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

  // Add new workout handler
  function handleAddWorkout(e) {
    e.preventDefault();
    const date = new Date().toISOString().split("T")[0];
    setLog((old) => [
      ...old,
      {
        ...newWorkout,
        date,
        duration: Number(newWorkout.duration),
        steps: Number(newWorkout.steps)
      }
    ]);
    setNewWorkout({ type: "", duration: "", steps: "" });
    setShowCelebrate({ visible: true, type: "workout" });
  }

  return (
    <div className="container" style={{ margin: "3rem auto", maxWidth: 680 }}>
      {/* Gamification segment */}
      <section style={{marginTop:"0.7em"}}>
        <span>Move Streak: <b>{streak.daily}</b> days</span>
        <BadgeDisplay badges={unlocked} animate />
        {unlocked.length > 0 &&
          <ProgressCelebrate show={true} message={`Congrats! ${unlocked[unlocked.length-1]?.name}!`} milestoneIcon={unlocked[unlocked.length-1]?.icon} onDone={() => {}} />}
      </section>
      <ConfettiCelebration trigger={showCelebrate.visible} options={{
        colors: ["#38B3A7", "#FFC857", "#2C3E50"],
        particleCount: 74, spread: 100
      }} onComplete={() => setShowCelebrate({ visible: false, type: "" })} />
      <CelebratePopup open={showCelebrate.visible} icon="🤸" onClose={() => setShowCelebrate({ visible: false, type: "" })}>
        Workout logged, fitness boosted! 💪
      </CelebratePopup>
      {/* Progress chart */}
      <UserProgressChart data={
        log.map((w, idx) => ({
          name: w.date.slice(5),
          score: Math.min(100, Math.round((w.steps/7000)*100)) // Fake progress as % steps
        }))
      } />
      {/* Add workout form */}
      <ChartCard title="Add Workout" description="Log workouts to track streaks and health gains.">
        <form onSubmit={handleAddWorkout} style={{display:"flex",gap:13, flexWrap:"wrap", alignItems:"flex-end"}}>
          <select required value={newWorkout.type} onChange={e => setNewWorkout(w => ({...w, type: e.target.value}))}
            style={{borderRadius: 7, padding:6, minWidth:80}}
          >
            <option value="">Workout</option>
            <option>Walk</option>
            <option>Run</option>
            <option>Cycling</option>
            <option>Yoga</option>
            <option>Strength</option>
          </select>
          <input type="number" min={5} max={180} required placeholder="Duration (min)"
            value={newWorkout.duration}
            onChange={e => setNewWorkout(w => ({...w, duration: e.target.value.replace(/[^\d]/g,"")}))}
            style={{borderRadius:7, padding:6, minWidth:88}}
          />
          <input type="number" min={0} max={30000} placeholder="Steps"
            value={newWorkout.steps}
            onChange={e => setNewWorkout(w => ({...w, steps: e.target.value.replace(/[^\d]/g,"")}))}
            style={{borderRadius:7, padding:6, minWidth:82}}
          />
          <button className="btn" type="submit" style={{borderRadius:8}}>Add</button>
        </form>
      </ChartCard>
      {/* Workout log table */}
      <ChartCard title="Recent Workouts" description="Your moves this week:">
        <table style={{width:"100%",borderSpacing:0,fontSize:"1.07em"}}>
          <thead>
            <tr style={{color:"#38B3A7"}}><th>Date</th><th>Workout</th><th>Duration</th><th>Steps</th></tr>
          </thead>
          <tbody>
            {log.slice().reverse().slice(0,8).map((w,i) => (
              <tr key={i} style={{background:i%2?"#fff":"#f6fcec"}}>
                <td>{w.date}</td>
                <td>{w.type}</td>
                <td>{w.duration} min</td>
                <td>{w.steps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ChartCard>
      {/* Workout suggestion/AI tips */}
      <ChartCard title="Workout Suggestion" description="Try this for today's goal!">
        <div style={{padding:"1em 0",fontSize:"1.06em",display:"flex",gap:18,flexWrap:"wrap"}}>
          <div style={{background:"#f2fcff",borderRadius:8,padding:"1em 1.2em",flex:"1 1 170px"}}>
            <b>Walk/Run</b>: 7000 steps <span role="img" aria-label="steps">🚶‍♂️</span>
          </div>
          <div style={{background:"#fffbe8",borderRadius:8,padding:"1em 1.2em",flex:"1 1 170px"}}>
            <b>Yoga</b>: 25 minutes <span role="img" aria-label="yoga">🧘‍♂️</span>
          </div>
          <div style={{background:"#e7ffee",borderRadius:8,padding:"1em 1.2em",flex:"1 1 170px"}}>
            <b>Strength</b>: 30 pushups <span role="img" aria-label="strength">💪</span>
          </div>
        </div>
      </ChartCard>
      {/* Embedded exercise video (for engagement) */}
      <ChartCard title="Fitness Video Demo" description="Try this guided routine:">
        <div>
          <iframe
            width="100%"
            height="215"
            src={DEMO_VIDEO_URL}
            title="Demo Fitness Video"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{borderRadius:13}}
          />
        </div>
      </ChartCard>
      {/* Step goal progress */}
      <ChartCard title="Step Goal Progress" description="Today's steps vs. your goal">
        <div style={{ margin:"1em 0",display:"flex",alignItems:"center", gap:14}}>
          <div style={{height:18,width:120,background:"#e0efeb",borderRadius:9,overflow:"hidden",marginRight:9}}>
            <div style={{
              width:`${Math.min(100,(log[log.length-1]?.steps/7000)*100)}%`,
              height:"100%",
              background:"#38B3A7", borderRadius:9}}></div>
          </div>
          <span style={{fontWeight:700, color:"#38B3A7"}}>
            {log[log.length-1]?.steps || 0} / 7000
          </span>
        </div>
      </ChartCard>
      {/* Device sync, feedback notifications, CTAs */}
      <div style={{marginTop:"1.7em",display:"flex",gap:17,flexWrap:"wrap",justifyContent:"center"}}>
        <button className={"btn " + anim.microBtn} style={{
          background:"#FFC857",color:"#222",borderRadius:9, fontWeight:700,padding:"9px 22px"
        }}
        onClick={()=>window.alert("Device sync coming soon!")}
        >
          Sync Device <span role="img" aria-label="sync">🔄</span>
        </button>
        <button className={"btn " + anim.microBtn} style={{
          background:"#4CA65A",color:"#fff",borderRadius:9,fontWeight:700,padding:"9px 22px"
        }}
        onClick={()=>window.alert("Workout history coming soon!")}
        >
          View History <span role="img" aria-label="history">📈</span>
        </button>
        <button className={"btn " + anim.microBtn} style={{
          background:"#2C3E50",color:"#fff",borderRadius:9,fontWeight:700,padding:"9px 22px"
        }}
        onClick={()=>window.alert("Start Workout feature coming soon!")}
        >
          Start Workout <span role="img" aria-label="go">🚦</span>
        </button>
      </div>
    </div>
  );
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

export default FitnessPage;
