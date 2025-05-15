import React from 'react';
import { format, parseISO, isSameDay } from 'date-fns';
import { useAppContext } from '../../hooks/useAppContext';
import { Mood, Symptom } from '../../types';

const RecentTracking: React.FC = () => {
  const { cycleDays } = useAppContext();
  
  // Sort cycle days by date (most recent first)
  const sortedDays = [...cycleDays].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  // Take only the 7 most recent days
  const recentDays = sortedDays.slice(0, 7);
  
  // Format names for display
  const formatName = (name: string) => {
    return name.toLowerCase().split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (recentDays.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Tracking</h2>
        <p className="text-gray-600">
          You haven't tracked any days yet. Start tracking to see your data here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Tracking</h2>
      
      <div className="space-y-4">
        {recentDays.map(day => {
          const date = parseISO(day.date);
          const isToday = isSameDay(date, new Date());
          
          return (
            <div 
              key={day.date} 
              className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-800">
                  {isToday ? 'Today' : format(date, 'EEEE, MMM d')}
                </h3>
                <span className="text-sm text-gray-500">
                  {format(date, 'yyyy')}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* Flow */}
                {day.flow && day.flow !== 'none' && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-rose-500 mr-2"></div>
                    <span className="text-sm text-gray-700">
                      {formatName(day.flow)} flow
                    </span>
                  </div>
                )}
                
                {/* Moods */}
                {day.mood && day.mood.length > 0 && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-sm text-gray-700">
                      Feeling: {day.mood.map(m => formatName(m)).join(', ')}
                    </span>
                  </div>
                )}
                
                {/* Symptoms */}
                {day.symptoms && day.symptoms.length > 0 && (
                  <div className="flex items-center col-span-1 md:col-span-2">
                    <div className="w-2 h-2 rounded-full bg-sky-500 mr-2"></div>
                    <span className="text-sm text-gray-700">
                      Symptoms: {day.symptoms.map(s => formatName(s)).join(', ')}
                    </span>
                  </div>
                )}
                
                {/* Notes */}
                {day.notes && (
                  <div className="col-span-1 md:col-span-2 mt-1">
                    <p className="text-sm text-gray-600 italic">
                      "{day.notes}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentTracking;