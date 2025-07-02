//
// PUBLIC_INTERFACE
// GamificationUtils provides common utility functions for calculating user streaks
// and checking badge/achievement unlocks for gamified features.
//

/**
 * Calculate consecutive daily (and weekly) streak based on sorted date strings (YYYY-MM-DD).
 * @param {string[]} logDates - Array of ISO date strings, most recent last.
 * @returns {{daily: number, weekly: number}}
 */
export function calculateStreak(logDates) {
  if (!logDates || logDates.length === 0) return { daily: 0, weekly: 0 };
  // Sort and dedupe
  const uniqueDates = [...new Set(logDates)].sort();
  let daily = 1;
  for (let i = uniqueDates.length - 1; i > 0; i--) {
    const today = new Date(uniqueDates[i]);
    const prev = new Date(uniqueDates[i - 1]);
    const diff = (today - prev) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      daily++;
    } else if (diff > 1) {
      break;
    }
  }
  // Weekly (count full 7-day streaks)
  let weekly = 0;
  if (uniqueDates.length >= 7) {
    let streak = 1, max = 0;
    for (let i = uniqueDates.length - 1; i > 0; i--) {
      const today = new Date(uniqueDates[i]);
      const prev = new Date(uniqueDates[i - 1]);
      const diff = (today - prev) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        streak++;
      } else if (diff > 1) {
        streak = 1;
      }
      if (streak >= 7 && streak % 7 === 0) {
        max = Math.max(max, streak / 7);
      }
    }
    weekly = max;
  }
  return { daily, weekly };
}

/**
 * Check which milestone badges user has unlocked based on streak/progress.
 * @param {Array} milestones - List of badges {type, name, streak, icon}
 * @param {Object} userProgress - e.g. {dailyStreak, weeklyStreak}
 * @returns {Array} of unlocked milestone badges
 */
export function checkBadgeUnlock(milestones, userProgress) {
  if (!milestones || milestones.length === 0) return [];
  return milestones.filter((m) => {
    if (m.type === "streak" && userProgress.dailyStreak >= m.streak) return true;
    if (m.type === "weekly" && userProgress.weeklyStreak >= m.streak) return true;
    return false;
  });
}
