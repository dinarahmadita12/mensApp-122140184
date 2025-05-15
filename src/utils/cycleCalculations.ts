import { CycleDay, CyclePrediction, FlowLevel, User } from '../types';

/**
 * Calculates cycle predictions based on past cycle data and user settings
 */
export const calculateCyclePredictions = (
  cycleDays: CycleDay[], 
  user: User
): CyclePrediction | null => {
  if (!user.cycleLength || cycleDays.length === 0) {
    return null;
  }

  // Find the most recent period start date
  const periodDays = cycleDays.filter(day => 
    day.flow && day.flow !== FlowLevel.NONE && day.flow !== FlowLevel.SPOTTING
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (periodDays.length === 0) return null;

  const lastPeriodStartDate = new Date(periodDays[0].date);
  
  // Calculate the next expected period start date
  const nextPeriodStartDate = new Date(lastPeriodStartDate);
  nextPeriodStartDate.setDate(nextPeriodStartDate.getDate() + user.cycleLength);
  
  // Calculate expected period end date
  const periodLength = user.periodLength || 5; // Default to 5 if not set
  const nextPeriodEndDate = new Date(nextPeriodStartDate);
  nextPeriodEndDate.setDate(nextPeriodEndDate.getDate() + periodLength - 1);
  
  // Calculate expected ovulation (typically 14 days before next period)
  const expectedOvulation = new Date(nextPeriodStartDate);
  expectedOvulation.setDate(nextPeriodStartDate.getDate() - 14);
  
  // Calculate fertile window (typically 5 days before ovulation + day of ovulation)
  const fertileWindowStart = new Date(expectedOvulation);
  fertileWindowStart.setDate(expectedOvulation.getDate() - 5);
  
  const fertileWindowEnd = new Date(expectedOvulation);
  
  return {
    expectedPeriodStart: nextPeriodStartDate.toISOString().split('T')[0],
    expectedPeriodEnd: nextPeriodEndDate.toISOString().split('T')[0],
    expectedOvulation: expectedOvulation.toISOString().split('T')[0],
    fertileWindowStart: fertileWindowStart.toISOString().split('T')[0],
    fertileWindowEnd: fertileWindowEnd.toISOString().split('T')[0]
  };
};

/**
 * Gets the cycle phase for a given date
 */
export const getCyclePhase = (
  date: string, 
  prediction: CyclePrediction | null
): 'menstrual' | 'follicular' | 'ovulation' | 'luteal' | 'unknown' => {
  if (!prediction) return 'unknown';
  
  const dateObj = new Date(date);
  const periodStart = new Date(prediction.expectedPeriodStart);
  const periodEnd = new Date(prediction.expectedPeriodEnd);
  const ovulationDate = new Date(prediction.expectedOvulation);
  const fertileStart = new Date(prediction.fertileWindowStart);
  const fertileEnd = new Date(prediction.fertileWindowEnd);
  
  // Check if in menstrual phase
  if (dateObj >= periodStart && dateObj <= periodEnd) {
    return 'menstrual';
  }
  
  // Check if in ovulation phase (fertile window)
  if (dateObj >= fertileStart && dateObj <= fertileEnd) {
    return 'ovulation';
  }
  
  // Check if in follicular phase (after period, before ovulation)
  if (dateObj > periodEnd && dateObj < fertileStart) {
    return 'follicular';
  }
  
  // Luteal phase (after ovulation, before next period)
  if (dateObj > fertileEnd && dateObj < periodStart) {
    return 'luteal';
  }
  
  return 'unknown';
};

/**
 * Get relevant health tips based on cycle phase
 */
export const getRelevantTipsByPhase = (
  date: string,
  prediction: CyclePrediction | null,
  allTips: any[]
) => {
  const phase = getCyclePhase(date, prediction);
  
  if (phase === 'unknown') {
    return allTips.slice(0, 3); // Return some generic tips
  }
  
  // Filter tips relevant to the current phase
  const relevantTips = allTips.filter(tip => 
    tip.relevantPhase === phase || !tip.relevantPhase
  );
  
  return relevantTips.slice(0, 3); // Return top 3 relevant tips
};