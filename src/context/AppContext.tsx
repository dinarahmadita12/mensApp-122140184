import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, CycleDay, CyclePrediction, Medication, MindfulnessExercise, HealthTip } from '../types';
import * as ls from '../utils/localStorage';
import { calculateCyclePredictions } from '../utils/cycleCalculations';

interface AppContextType {
  user: User | null;
  cycleDays: CycleDay[];
  prediction: CyclePrediction | null;
  medications: Medication[];
  mindfulnessExercises: MindfulnessExercise[];
  healthTips: HealthTip[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (userData: User) => boolean;
  logout: () => void;
  saveCycleDay: (day: CycleDay) => void;
  saveMedication: (medication: Medication) => void;
  deleteMedication: (id: string) => void;
  refreshPredictions: () => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cycleDays, setCycleDays] = useState<CycleDay[]>([]);
  const [prediction, setPrediction] = useState<CyclePrediction | null>(null);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [mindfulnessExercises, setMindfulnessExercises] = useState<MindfulnessExercise[]>([]);
  const [healthTips, setHealthTips] = useState<HealthTip[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedUser = ls.getUser();
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
      
      // Load user-specific data
      const storedCycleDays = ls.getCycleDays();
      setCycleDays(storedCycleDays);
      
      const storedMedications = ls.getMedications();
      setMedications(storedMedications);
      
      // Calculate predictions
      const predictions = calculateCyclePredictions(storedCycleDays, storedUser);
      setPrediction(predictions);
    }
    
    // Load general data
    setMindfulnessExercises(ls.getMindfulnessExercises());
    setHealthTips(ls.getHealthTips());
  }, []);

  const login = (email: string, password: string): boolean => {
    const authenticatedUser = ls.authenticateUser(email, password);
    if (authenticatedUser) {
      setUser(authenticatedUser);
      setIsAuthenticated(true);
      
      // Load user data
      const storedCycleDays = ls.getCycleDays();
      setCycleDays(storedCycleDays);
      
      const storedMedications = ls.getMedications();
      setMedications(storedMedications);
      
      // Calculate predictions
      const predictions = calculateCyclePredictions(storedCycleDays, authenticatedUser);
      setPrediction(predictions);
      
      return true;
    }
    return false;
  };

  const register = (userData: User): boolean => {
    const success = ls.registerUser(userData);
    if (success) {
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = (): void => {
    ls.logoutUser();
    setUser(null);
    setIsAuthenticated(false);
    setCycleDays([]);
    setPrediction(null);
    setMedications([]);
  };

  const saveCycleDay = (day: CycleDay): void => {
    ls.saveCycleDay(day);
    
    // Update state
    const updatedCycleDays = [...cycleDays];
    const existingIndex = updatedCycleDays.findIndex(d => d.date === day.date);
    
    if (existingIndex >= 0) {
      updatedCycleDays[existingIndex] = day;
    } else {
      updatedCycleDays.push(day);
    }
    
    setCycleDays(updatedCycleDays);
    
    // Recalculate predictions
    if (user) {
      const predictions = calculateCyclePredictions(updatedCycleDays, user);
      setPrediction(predictions);
    }
  };

  const saveMedication = (medication: Medication): void => {
    ls.saveMedication(medication);
    
    // Update state
    const updatedMedications = [...medications];
    const existingIndex = updatedMedications.findIndex(m => m.id === medication.id);
    
    if (existingIndex >= 0) {
      updatedMedications[existingIndex] = medication;
    } else {
      updatedMedications.push(medication);
    }
    
    setMedications(updatedMedications);
  };

  const deleteMedication = (id: string): void => {
    ls.deleteMedication(id);
    setMedications(medications.filter(m => m.id !== id));
  };

  const refreshPredictions = (): void => {
    if (user) {
      const predictions = calculateCyclePredictions(cycleDays, user);
      setPrediction(predictions);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        cycleDays,
        prediction,
        medications,
        mindfulnessExercises,
        healthTips,
        isAuthenticated,
        login,
        register,
        logout,
        saveCycleDay,
        saveMedication,
        deleteMedication,
        refreshPredictions
      }}
    >
      {children}
    </AppContext.Provider>
  );
};