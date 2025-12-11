import { BeerTimeConfig } from '../types';

/**
 * Generates a pseudo-random number based on a seed string.
 * This ensures all employees see the exact same time on the same day.
 */
function seededRandom(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  const x = Math.sin(hash) * 10000;
  return x - Math.floor(x);
}

export const getDailyBeerTime = (): BeerTimeConfig => {
  const now = new Date();
  const dateString = now.toISOString().split('T')[0]; // YYYY-MM-DD
  
  // Use the date string as a seed so it's consistent for everyone on this day
  const randomValue = seededRandom(dateString + "SmashStudiosBeer");

  const dayOfWeek = now.getDay(); // 0 = Sun, 1 = Mon, ..., 5 = Fri, 6 = Sat
  
  // Rules for determining the START time of the beer:
  // We want it to be random between office hours.
  // Standard: 11:00 - 17:00
  // Friday: 11:00 - 14:30
  
  const startHour = 11;
  const startMinute = 0;
  const startTimeInMinutes = startHour * 60 + startMinute;

  let generationEndHour = 17;
  let generationEndMinute = 0;
  
  if (dayOfWeek === 5) { // Friday
    generationEndHour = 14;
    generationEndMinute = 30;
  }
  
  const generationEndTimeInMinutes = generationEndHour * 60 + generationEndMinute;
  const totalDuration = generationEndTimeInMinutes - startTimeInMinutes;
  
  // Calculate random minutes added to start time
  const randomAddedMinutes = Math.floor(randomValue * totalDuration);
  const targetTimeInMinutes = startTimeInMinutes + randomAddedMinutes;
  
  const targetHour = Math.floor(targetTimeInMinutes / 60);
  const targetMinute = targetTimeInMinutes % 60;

  const targetDate = new Date(now);
  targetDate.setHours(targetHour, targetMinute, 0, 0);

  // The "End Timestamp" determines when the app switches to "Go Home".
  // Since "Er is geen specifieke tijd" (no specific time limit), we set this to the end of the day.
  // This ensures the "It Is Time" screen stays visible all evening.
  const endDate = new Date(now);
  endDate.setHours(23, 59, 59, 999);

  return {
    hour: targetHour,
    minute: targetMinute,
    timestamp: targetDate.getTime(),
    endTimestamp: endDate.getTime(),
  };
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

export const formatShortTime = (hour: number, minute: number): string => {
  const h = hour.toString().padStart(2, '0');
  const m = minute.toString().padStart(2, '0');
  return `${h}:${m}`;
};