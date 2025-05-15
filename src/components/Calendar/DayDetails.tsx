import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import { FlowLevel, Symptom, Mood, CycleDay } from '../../types';
import { useAppContext } from '../../hooks/useAppContext';

interface DayDetailsProps {
  date: Date;
  onClose: () => void;
}

const DayDetails: React.FC<DayDetailsProps> = ({ date, onClose }) => {
  const { saveCycleDay, cycleDays } = useAppContext();
  const dateString = format(date, 'yyyy-MM-dd');
  
  // Find existing data for this day
  const existingData = cycleDays.find(day => day.date === dateString);
  
  // State for form
  const [flow, setFlow] = useState<FlowLevel>(existingData?.flow || FlowLevel.NONE);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>(existingData?.symptoms || []);
  const [selectedMoods, setSelectedMoods] = useState<Mood[]>(existingData?.mood || []);
  const [notes, setNotes] = useState(existingData?.notes || '');
  
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
    onClose();
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

  // Trap focus in the modal for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {format(date, 'MMMM d, yyyy')}
          </h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Flow tracking */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Flow</h3>
            <div className="flex flex-wrap gap-2">
              {flowOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  className={`px-3 py-2 rounded-full text-sm ${
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
          
          {/* Symptom tracking */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Symptoms</h3>
            <div className="flex flex-wrap gap-2">
              {allSymptoms.map(symptom => (
                <button
                  key={symptom}
                  type="button"
                  className={`px-3 py-2 rounded-full text-sm ${
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
          
          {/* Mood tracking */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Mood</h3>
            <div className="flex flex-wrap gap-2">
              {allMoods.map(mood => (
                <button
                  key={mood}
                  type="button"
                  className={`px-3 py-2 rounded-full text-sm ${
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
          
          {/* Notes */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
              rows={3}
              placeholder="Add any notes about how you're feeling today..."
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DayDetails;