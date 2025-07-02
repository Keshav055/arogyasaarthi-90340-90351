import React, { useState, useMemo } from "react";
import { ChartCard, UserProgressChart } from "../components/Charts";
import { useSleepDashboard } from "../api/sleep";
import anim from "../MicroAnimations.module.css";
import { calculateStreak, checkBadgeUnlock } from "../components/GamificationUtils";
import BadgeDisplay from "../components/BadgeDisplay";
import { ProgressCelebrate } from "../components/ProgressCelebrate";

// Avatar for playful UI
const AvatarIcon = () => (
  <span className="sleep-avatar" role="img" aria-label="sleep">🛌</span>
);

const DEMO_SLEEP_LOG = [
  { date: daysAgo(0), hours: 7.2, mood: "Rested" },
  { date: daysAgo(1), hours: 6.5, mood: "Tired" },
  { date: daysAgo(2), hours: 7.9, mood: "Great" },
  { date: daysAgo(3), hours: 5.8, mood: "Sleepy" },
  { date: daysAgo(4), hours: 8.2, mood: "Refreshed" },
];

// PUBLIC_INTERFACE
function SleepPage() {
  const { data, loading, error, refetch } = useSleepDashboard();
  const [log, setLog] = useState(DEMO_SLEEP_LOG);
  const [entry, setEntry] = useState({ hours: "", mood: "" });

  // Gamification badges/streak
  const logDates = useMemo(() => log.map((r) => r.date), [log]);
  const milestones = [
    { type: "streak", name: "Sleep 3 Nights", streak: 3, icon: "🌙" },
    { type: "streak", name: "6 Deep Sleep", streak: 6, icon: "😴" },
  ];
  const streak = useMemo(() => calculateStreak(logDates), [logDates]);
  const userProgress = { dailyStreak: streak.daily };
  const unlocked = useMemo(() => checkBadgeUnlock(milestones, userProgress), [userProgress]);

  // Add a sleep log handler
  function handleAddSleep(e) {
    e.preventDefault();
    const date = new Date().toISOString().split("T")[0];
    setLog((old) => [
      ...old,
      {
        ...entry,
        date,
        hours: Number(entry.hours)
      }
    ]);
    setEntry({ hours: "", mood: "" });
  }

  return (
    <div className="container" style={{ margin: "3rem auto", maxWidth: 680 }}>
      <section style={{ margin: "0.8em 0" }}>
        <span>Sleep Log Streak: <b>{streak.daily}</b> nights</span>
        <BadgeDisplay badges={unlocked} animate />
        {unlocked.length > 0 &&
          <ProgressCelebrate show={true} message={`Great! ${unlocked[unlocked.length-1]?.name}`} milestoneIcon={unlocked[unlocked.length-1]?.icon} onDone={() => {}} />}
      </section>
      {/* Entry form for new log */}
      <ChartCard title="Add Sleep Log" description="Track sleep duration for insights and tips!">
        <form onSubmit={handleAddSleep} style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"flex-end"}}>
          <input type="number" step="0.1" min="3" max="12"
            placeholder="Hours"
            value={entry.hours}
            onChange={e => setEntry(re => ({...re, hours: e.target.value.replace(/[^0-9.]/g,"")}))}
            required style={{borderRadius:7,padding:6,minWidth:85}}
          />
          <select value={entry.mood} required onChange={e=>setEntry(re=>({...re,mood:e.target.value}))}
            style={{borderRadius:7,padding:6,minWidth:85}}>
            <option value="">Mood</option>
            <option>Refreshed</option>
            <option>Rested</option>
            <option>Great</option>
            <option>Tired</option>
            <option>Sleepy</option>
          </select>
          <button className="btn" type="submit" style={{borderRadius:8}}>Add</button>
        </form>
      </ChartCard>
      {/* Sleep log history table */}
      <ChartCard title="Sleep Logs" description="Your past week:">
        <table style={{width:"100%",borderSpacing:0,fontSize:"1.07em"}}>
          <thead>
            <tr style={{color:"#FFC857"}}><th>Date</th><th>Hours</th><th>Mood</th></tr>
          </thead>
          <tbody>
            {log.slice().reverse().slice(0,8).map((l,i) => (
              <tr key={i} style={{background:i%2?"#fff":"#e3faff"}}>
                <td>{l.date}</td>
                <td>{l.hours}</td>
                <td>{l.mood}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ChartCard>
      {/* Sleep progress bar */}
      <ChartCard title="Sleep Analytics"
        description="Sleep hours vs. recommended (7h/night)">
        <div style={{margin:"1em 0",display:"flex",alignItems:"center",gap:17}}>
          <div style={{
            height:16,width:120,background:"#e0efeb",borderRadius:8,overflow:"hidden",marginRight:7
          }}>
            <div style={{
              width:`${Math.min(100,
                ((log[0]?.hours || 0)/7)*100)}%`,
              height:"100%",background:"#FFC857",borderRadius:8
            }}></div>
          </div>
          <span style={{fontWeight:700,color:"#FFC857",fontSize:"1.08em"}}>
            {log[0]?.hours || 0}h / 7h
          </span>
        </div>
      </ChartCard>
      {/* Circadian cycle visualization (stub) */}
      <ChartCard title="Circadian Rhythm" description="Your natural sleep-wake cycle (visual demo)">
        <div style={{
          padding:"1.1em",textAlign:"center",fontWeight:500,
          color:"#247BA0",borderRadius:13,background:"#fffbe6"
        }}>
          🌙🛌<br/>
          <span style={{fontSize:"1.2em"}}>Circadian analytics coming soon! Upload your sleep device data for detailed graphs.</span>
        </div>
      </ChartCard>
      {/* AI Tip & summary */}
      <ChartCard title="AI Sleep Tips" description="">
        <ul style={{fontSize:"1.07em"}}>
          <li>Target bedtime: 22:00 – wake at 6:00 for best rhythm</li>
          <li>Avoid screens 40min before sleep</li>
          <li>Keep a dark, cool room for deeper rest</li>
        </ul>
      </ChartCard>
      {/* Device import C T A area (stub) */}
      <div style={{marginTop:"1.2em",textAlign:"center"}}>
        <button
          className={"btn " + anim.microBtn}
          style={{background:"#FFC857",color:"#222",fontWeight:700,borderRadius:11,fontSize:"1.08em"}}
          onClick={()=>window.alert("Device import & analytics coming soon!")}
        >
          Sync Sleep Device <span role="img" aria-label="upload">📲</span>
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

export default SleepPage;
