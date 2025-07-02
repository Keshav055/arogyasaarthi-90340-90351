import React, { useState, useMemo } from "react";
import { ChartCard, UserProgressChart } from "../components/Charts";
import { useMindfulnessDashboard } from "../api/mindfulness";
import ConfettiCelebration from "../components/ConfettiCelebration";
import CelebratePopup from "../components/CelebratePopup";
import anim from "../MicroAnimations.module.css";
import { calculateStreak, checkBadgeUnlock } from "../components/GamificationUtils";
import BadgeDisplay from "../components/BadgeDisplay";
import { ProgressCelebrate } from "../components/ProgressCelebrate";

// Playful avatar
const AvatarIcon = () => (
  <span className="mindfulness-avatar" role="img" aria-label="mindfulness">🧘</span>
);

// Demo guided meditation audio sample
const DEMO_AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3";

// Demo log/journal entries
const DEMO_LOGS = [
  { date: daysAgo(0), mood: "Calm", note: "Meditated in the morning" },
  { date: daysAgo(0), mood: "Content", note: "Did pranayama-later" },
  { date: daysAgo(1), mood: "Restless", note: "Skipped session" },
  { date: daysAgo(2), mood: "Happy", note: "Grateful journaling" }
];

// PUBLIC_INTERFACE
function MindfulnessPage() {
  const { data, loading, error, refetch } = useMindfulnessDashboard();
  const [log, setLog] = useState(DEMO_LOGS);
  const [journal, setJournal] = useState({ mood: "", note: "" });
  const [showCelebrate, setShowCelebrate] = useState({ visible: false, type: "" });
  const [audioPlaying, setAudioPlaying] = useState(false);

  // Gamification integration
  const logDates = useMemo(() => log.map((entry) => entry.date), [log]);
  const milestones = [
    { type: "streak", name: "3 Mindful Days", streak: 3, icon: "🧘" },
    { type: "streak", name: "5 Calm Days", streak: 5, icon: "☀️" }
  ];
  const streak = useMemo(() => calculateStreak(logDates), [logDates]);
  const userProgress = { dailyStreak: streak.daily };
  const unlocked = useMemo(() => checkBadgeUnlock(milestones, userProgress), [userProgress]);

  // Handler to add mood log
  function handleAddLog(e) {
    e.preventDefault();
    const date = new Date().toISOString().split("T")[0];
    setLog((old) => [...old, { ...journal, date }]);
    setJournal({ mood: "", note: "" });
    setShowCelebrate({ visible: true, type: "mindfulness" });
  }

  // Pranayama timer
  const [breatheTime, setBreatheTime] = useState(0);
  const [breatheActive, setBreatheActive] = useState(false);
  function startPranayama() {
    setBreatheActive(true);
    setBreatheTime(0);
    const id = setInterval(() => {
      setBreatheTime((t) => {
        if (t >= 60) {
          clearInterval(id);
          setBreatheActive(false);
          setShowCelebrate({ visible: true, type: "pranayama" });
          return t;
        }
        return t + 1;
      });
    }, 1000);
  }

  return (
    <div className="container" style={{ margin: "3rem auto", maxWidth: 680 }}>
      <section style={{margin:"0.8em 0"}}>
        <span>Meditation Streak: <b>{streak.daily}</b> days</span>
        <BadgeDisplay badges={unlocked} animate />
        {unlocked.length > 0 &&
          <ProgressCelebrate show={true} message={`Wohoo! ${unlocked[unlocked.length-1]?.name}`} milestoneIcon={unlocked[unlocked.length-1]?.icon} onDone={() => {}} />}
      </section>
      <ConfettiCelebration trigger={showCelebrate.visible} options={{
        colors:["#8D72E1","#FFC857","#38B3A7"], particleCount:54, spread:70
      }} onComplete={()=>setShowCelebrate({visible:false,type:""})}/>
      <CelebratePopup open={showCelebrate.visible} icon={showCelebrate.type==="mindfulness"?"🧘":"🌤️"} onClose={()=>setShowCelebrate({visible:false,type:""})}>
        {showCelebrate.type==="pranayama" ? <>Breathe session complete!</> : <>Great journaling!</>}
      </CelebratePopup>
      {/* Meditation audio player */}
      <ChartCard title="Guided Meditation" description="Relax with a 1-min meditation audio:">
        <audio
          src={DEMO_AUDIO_URL}
          controls
          onPlay={() => setAudioPlaying(true)}
          onPause={() => setAudioPlaying(false)}
          style={{width:"97%"}}
        />
        {audioPlaying && <span style={{ marginLeft: 12, color: "#8D72E1" }}>🧘‍♂️ Focusing...</span>}
      </ChartCard>
      {/* Pranayama (breathe timer) */}
      <ChartCard title="Breathe Exercise (Pranayama)" description="1-minute focus breathing">
        <button className={"btn " + anim.microBtn} style={{borderRadius:8}} disabled={breatheActive} onClick={startPranayama}>
          {breatheActive ? `Breathing... (${breatheTime}s)` : "Start 1-min Session"}
        </button>
        {breatheActive && (
          <div style={{ marginTop: 17 }}>
            <span style={{fontSize:"1.4em",color:"#38B3A7"}}>🫁</span>
            <span style={{marginLeft:8,fontWeight:500}}>Inhale... Exhale...</span>
          </div>
        )}
      </ChartCard>
      {/* Mood/journal log (form) */}
      <ChartCard title="Mood Journal" description="Log your mood and a brief note">
        <form onSubmit={handleAddLog} style={{display:"flex",gap:11, flexWrap:"wrap", alignItems:"flex-end"}}>
          <select value={journal.mood} required onChange={e=>setJournal(j=>({...j,mood:e.target.value}))}
            style={{borderRadius:8,padding:6,minWidth:80}}>
            <option value="">Mood</option>
            <option>Calm</option>
            <option>Happy</option>
            <option>Restless</option>
            <option>Content</option>
            <option>Tired</option>
          </select>
          <input type="text" required placeholder="Note" value={journal.note}
            style={{borderRadius:8,padding:6,minWidth:125}}
            onChange={e=>setJournal(j=>({...j,note:e.target.value}))}
            maxLength={52}
          />
          <button className="btn" type="submit" style={{borderRadius:8}}>Add</button>
        </form>
      </ChartCard>
      {/* Mood/journal history */}
      <ChartCard title="Mood Log (7 days)" description="">
        <table style={{width:"100%",borderSpacing:0,fontSize:"1.07em"}}>
          <thead>
            <tr style={{color:"#38B3A7"}}><th>Date</th><th>Mood</th><th>Note</th></tr>
          </thead>
          <tbody>
            {log.slice().reverse().slice(0,8).map((l,i) => (
              <tr key={i} style={{background:i%2?"#fff":"#f6f7fa"}}>
                <td>{l.date}</td>
                <td>{l.mood}</td>
                <td>{l.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ChartCard>
      {/* Streak/insight */}
      <ChartCard title="Insights & Trends" description="Your mindfulness stats (coming soon)">
        <ul style={{fontSize:"1.06em"}}>
          <li>You meditated {streak.daily} days in a row</li>
          <li>Longest streak: {Math.max(streak.daily, 5)} days</li>
        </ul>
      </ChartCard>
      {/* Reminder/notifications toggle (stub) */}
      <div style={{marginTop:"1.2em",textAlign:"center"}}>
        <button
          className={"btn " + anim.microBtn}
          style={{background:"#8D72E1",color:"#fff",fontWeight:700,borderRadius:11,fontSize:"1.07em"}}
          onClick={()=>window.alert("Mindfulness reminders coming soon!")}
        >
          Set Calming Reminders <span role="img" aria-label="bell">🔔</span>
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

export default MindfulnessPage;
