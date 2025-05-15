// Utility functions for local storage

import { User, CycleDay, Medication, MindfulnessExercise, HealthTip } from '../types';

// User Functions
export const saveUser = (user: User): void => {
  localStorage.setItem('luna_user', JSON.stringify(user));
};

export const getUser = (): User | null => {
  const user = localStorage.getItem('luna_user');
  return user ? JSON.parse(user) : null;
};

export const logoutUser = (): void => {
  localStorage.removeItem('luna_user');
};

// Authentication
export const authenticateUser = (email: string, password: string): User | null => {
  const users = getAllUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    saveUser(user);
    return user;
  }
  return null;
};

export const registerUser = (user: User): boolean => {
  const users = getAllUsers();
  const existingUser = users.find(u => u.email === user.email);
  if (existingUser) return false;
  
  users.push(user);
  localStorage.setItem('luna_users', JSON.stringify(users));
  saveUser(user);
  return true;
};

export const getAllUsers = (): User[] => {
  const users = localStorage.getItem('luna_users');
  return users ? JSON.parse(users) : [];
};

// Cycle Days Functions
export const saveCycleDay = (cycleDay: CycleDay): void => {
  const cycleDays = getCycleDays();
  const existingIndex = cycleDays.findIndex(day => day.date === cycleDay.date);
  
  if (existingIndex >= 0) {
    cycleDays[existingIndex] = cycleDay;
  } else {
    cycleDays.push(cycleDay);
  }
  
  localStorage.setItem('luna_cycle_days', JSON.stringify(cycleDays));
};

export const getCycleDays = (): CycleDay[] => {
  const cycleDays = localStorage.getItem('luna_cycle_days');
  return cycleDays ? JSON.parse(cycleDays) : [];
};

export const getCycleDay = (date: string): CycleDay | undefined => {
  return getCycleDays().find(day => day.date === date);
};

// Medication Reminders
export const saveMedication = (medication: Medication): void => {
  const medications = getMedications();
  const existingIndex = medications.findIndex(m => m.id === medication.id);
  
  if (existingIndex >= 0) {
    medications[existingIndex] = medication;
  } else {
    medications.push(medication);
  }
  
  localStorage.setItem('luna_medications', JSON.stringify(medications));
};

export const getMedications = (): Medication[] => {
  const medications = localStorage.getItem('luna_medications');
  return medications ? JSON.parse(medications) : [];
};

export const deleteMedication = (id: string): void => {
  const medications = getMedications().filter(m => m.id !== id);
  localStorage.setItem('luna_medications', JSON.stringify(medications));
};

// Mindfulness Exercises
export const getMindfulnessExercises = (): MindfulnessExercise[] => {
  const exercises = localStorage.getItem('luna_mindfulness');
  return exercises ? JSON.parse(exercises) : defaultMindfulnessExercises;
};

// Health Tips
export const getHealthTips = (): HealthTip[] => {
  const tips = localStorage.getItem('luna_health_tips');
  return tips ? JSON.parse(tips) : defaultHealthTips;
};

// Default data
const defaultMindfulnessExercises: MindfulnessExercise[] = [
  {
    id: '1',
    title: 'Deep Breathing Exercise',
    description: 'A simple breathing technique to reduce stress and ease cramps',
    duration: 5,
    category: 'breathing',
    content: 'Find a comfortable position. Breathe in slowly through your nose for 4 counts. Hold your breath for 2 counts. Exhale slowly through your mouth for 6 counts. Repeat for 5 minutes.'
  },
  {
    id: '2',
    title: 'Body Scan Meditation',
    description: 'A gentle meditation to release tension during your cycle',
    duration: 10,
    category: 'meditation',
    content: 'Lie down comfortably. Close your eyes. Beginning at your toes, slowly scan up through your body, noticing any areas of tension or discomfort. Breathe into these areas, visualizing tension melting away with each exhale.'
  },
  {
    id: '3',
    title: 'Gentle Stretching Routine',
    description: 'Easy stretches to relieve period discomfort',
    duration: 7,
    category: 'stretching',
    content: 'Child\'s pose: Kneel and sit back on your heels, then extend arms forward and rest your forehead on the floor. Hold for 30 seconds. Cat-cow stretch: On hands and knees, alternate between arching and rounding your back. Repeat 10 times. Butterfly stretch: Sit with soles of feet together, knees out to sides. Hold for 30 seconds.'
  },
  {
    id: '4',
    title: 'Progressive Muscle Relaxation',
    description: 'Systematically relax your entire body',
    duration: 15,
    category: 'relaxation',
    content: 'Starting with your toes, tense each muscle group for 5 seconds, then release for 10 seconds. Work your way up through your body to your face. Notice the difference between tension and relaxation.'
  },
  {
    id: '5',
    title: 'Mindful Walking Meditation',
    description: 'A gentle walking meditation to ease cramps and boost mood',
    duration: 10,
    category: 'meditation',
    content: 'Find a quiet space to walk slowly. Focus on each step, feeling your feet connect with the ground. Notice the movement of your body, the rhythm of your breath. If your mind wanders, gently bring it back to the sensation of walking.'
  },
  {
    id: '6',
    title: 'Calming Breath Work',
    description: 'Advanced breathing technique for stress relief',
    duration: 8,
    category: 'breathing',
    content: 'Sit comfortably. Inhale for 4 counts through your nose, hold for 4 counts, exhale for 8 counts through your mouth. Feel your belly rise and fall. Continue for 8 minutes.'
  }
];

const defaultHealthTips: HealthTip[] = [
  {
    id: '1',
    title: 'Stay Hydrated During Your Period',
    content: 'Drinking plenty of water can help reduce bloating and cramps during menstruation. Aim for 8-10 glasses daily. Consider warm water or herbal teas like chamomile or ginger tea for additional benefits. Staying hydrated can also help with headaches and fatigue commonly experienced during menstruation.',
    category: 'period',
    relevantPhase: 'menstrual'
  },
  {
    id: '2',
    title: 'Iron-Rich Foods for Menstruation',
    content: 'During your period, include iron-rich foods like leafy greens, beans, and lean meats to help replenish iron lost through bleeding. Combine these with vitamin C-rich foods to enhance iron absorption. Good combinations include spinach salad with citrus dressing or beans with bell peppers.',
    category: 'nutrition',
    relevantPhase: 'menstrual'
  },
  {
    id: '3',
    title: 'Exercise During Ovulation',
    content: 'Your energy levels are naturally higher during ovulation. This is a great time for more intense workouts or trying new activities. Consider high-intensity interval training (HIIT), dance classes, or strength training. Listen to your body and stay hydrated during workouts.',
    category: 'fitness',
    relevantPhase: 'ovulation'
  },
  {
    id: '4',
    title: 'Supporting Mood During Luteal Phase',
    content: 'The week before your period, serotonin levels may drop. Activities like gentle exercise, sunlight exposure, and complex carbohydrates can help support your mood. Practice self-care activities and consider meditation or journaling to manage emotional changes.',
    category: 'mental',
    relevantPhase: 'luteal'
  },
  {
    id: '5',
    title: 'Sleep Hygiene Tips',
    content: 'Quality sleep is crucial for hormonal balance. Create a relaxing bedtime routine, avoid screens before bed, and keep your bedroom cool and dark. Consider using a sleep tracking app to understand your patterns and optimize your rest.',
    category: 'sleep',
    relevantPhase: null
  },
  {
    id: '6',
    title: 'Natural Pain Management',
    content: 'For menstrual cramps, try natural remedies like heat therapy, gentle yoga, or acupressure. A warm bath with Epsom salts can help relax muscles. Some find relief with herbal teas like red raspberry leaf or chamomile. Always consult your healthcare provider about persistent pain.',
    category: 'period',
    relevantPhase: 'menstrual'
  }
];