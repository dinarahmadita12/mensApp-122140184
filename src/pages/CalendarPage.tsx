import React from 'react';
import CycleCalendar from '../components/Calendar/CycleCalendar';

const CalendarPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Cycle Calendar
        </h1>
        <p className="text-gray-600">
          Track your cycle, symptoms, and mood
        </p>
      </div>
      
      <CycleCalendar />
    </div>
  );
};

export default CalendarPage;