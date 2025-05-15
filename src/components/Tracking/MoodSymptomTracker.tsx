import React, { useState } from 'react';
import { format, subDays } from 'date-fns';
import { useAppContext } from '../../hooks/useAppContext';
import { Mood, Symptom, FlowLevel, CycleDay } from '../../types';

const MoodSymptomTracker: React.FC = () => {
  const { saveCycleDay, cycleDays } = useAppContext();
  
  // State for the selected date
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const dateString = format(selectedDate, 'yyyy-MM-dd');
  
  // Find existing data for this day
  const existingData = cycleDays.find(day => day.date === dateString);
  
  // State for form
  const [flow, setFlow] = useState<FlowLevel>(existingData?.flow || FlowLevel.NONE);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>(existingData?.symptoms || []);
  const [selectedMoods, setSelectedMoods] = useState<Mood[]>(existingData?.mood || []);
  const [notes, setNotes] = useState(existingData?.notes || '');
  
  // Update form data when date changes
  React.useEffect(() => {
    const dayData = cycleDays.find(day => day.date === dateString);
    if (dayData) {
      setFlow(dayData.flow || FlowLevel.NONE);
      setSelectedSymptoms(dayData.symptoms || []);
      setSelectedMoods(dayData.mood || []);
      setNotes(dayData.notes || '');
    } else {
      // Reset form if no data for this day
      setFlow(FlowLevel.NONE);
      setSelectedSymptoms([]);
      setSelectedMoods([]);
      setNotes('');
    }
  }, [dateString, cycleDays]);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const dayData: CycleDay = {
      date: dateString,
      flow,
      symptoms: selectedSymptoms,
      mood: selectedMoods,
      notes
    };
    
    saveCycleDay(dayData);
    // Show success message or feedback
  };
  
  // Handle date change
  const changeDate = (days: number) => {
    setSelectedDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    });
  };
  
  // Toggle symptom selection
  const toggleSymptom = (symptom: Symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };
  
  // Toggle mood selection
  const toggleMood = (mood: Mood) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter(m => m !== mood));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };
  
  // All symptoms and moods for selection
  const allSymptoms = Object.values(Symptom);
  const allMoods = Object.values(Mood);
  
  // Flow level options with labels
  const flowOptions = [
    { value: FlowLevel.NONE, label: 'None' },
    { value: FlowLevel.SPOTTING, label: 'Spotting' },
    { value: FlowLevel.LIGHT, label: 'Light' },
    { value: FlowLevel.MEDIUM, label: 'Medium' },
    { value: FlowLevel.HEAVY, label: 'Heavy' }
  ];
  
  // Format symptom and mood names for display
  const formatName = (name: string) => {
    return name.toLowerCase().split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Mood & Symptom Tracker</h2>
      
      {/* Date selector */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => changeDate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
        >
          ←
        </button>
        
        <h3 className="text-lg font-medium">
          {format(selectedDate, 'EEEE, MMMM d, yyyy')}
        </h3>
        
        <button 
          onClick={() => changeDate(1)}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
          disabled={format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')}
        >
          →
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Flow tracking */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">Flow</h3>
          <div className="flex flex-wrap gap-2">
            {flowOptions.map(option => (
              <button
                key={option.value}
                type="button"
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  flow === option.value 
                    ? 'bg-rose-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setFlow(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Mood tracking */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">Mood</h3>
          <div className="flex flex-wrap gap-3">
            {allMoods.map(mood => (
              <button
                key={mood}
                type="button"
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedMoods.includes(mood) 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => toggleMood(mood)}
              >
                {formatName(mood)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Symptom tracking */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">Symptoms</h3>
          <div className="flex flex-wrap gap-3">
            {allSymptoms.map(symptom => (
              <button
                key={symptom}
                type="button"
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedSymptoms.includes(symptom) 
                    ? 'bg-sky-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => toggleSymptom(symptom)}
              >
                {formatName(symptom)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Notes */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
            rows={4}
            placeholder="Add any notes about how you're feeling today..."
          ></textarea>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default MoodSymptomTracker;