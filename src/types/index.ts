// Define TypeScript interfaces for our app

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, never store plain text passwords
  birthDate?: string;
  cycleLength?: number; // Average cycle length in days
  periodLength?: number; // Average period length in days
}

export interface CycleDay {
  date: string; // ISO format date string
  flow?: FlowLevel;
  symptoms: Symptom[];
  mood: Mood[];
  notes?: string;
  medications?: Medication[];
}

export interface CyclePrediction {
  expectedPeriodStart: string; // ISO date string
  expectedPeriodEnd: string; // ISO date string
  expectedOvulation: string; // ISO date string
  fertileWindowStart: string; // ISO date string
  fertileWindowEnd: string; // ISO date string
}

export enum FlowLevel {
  NONE = "none",
  LIGHT = "light",
  MEDIUM = "medium",
  HEAVY = "heavy",
  SPOTTING = "spotting"
}

export enum Symptom {
  CRAMPS = "cramps",
  HEADACHE = "headache",
  BLOATING = "bloating",
  FATIGUE = "fatigue",
  BREAST_TENDERNESS = "breast_tenderness",
  BACKACHE = "backache",
  NAUSEA = "nausea",
  ACNE = "acne",
  INSOMNIA = "insomnia",
  CRAVINGS = "cravings",
  DIZZINESS = "dizziness"
}

export enum Mood {
  HAPPY = "happy",
  CALM = "calm",
  SAD = "sad",
  ANXIOUS = "anxious",
  IRRITABLE = "irritable",
  SENSITIVE = "sensitive",
  ENERGETIC = "energetic",
  TIRED = "tired"
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
  notes?: string;
}

export interface MindfulnessExercise {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  category: "breathing" | "meditation" | "stretching" | "relaxation";
  content: string;
}

export interface HealthTip {
  id: string;
  title: string;
  content: string;
  category: "period" | "nutrition" | "fitness" | "mental" | "sleep";
  relevantPhase?: "menstrual" | "follicular" | "ovulation" | "luteal";
}