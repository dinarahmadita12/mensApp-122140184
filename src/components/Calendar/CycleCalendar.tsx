import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import { FlowLevel, CycleDay } from '../../types';
import DayDetails from './DayDetails';

const CycleCalendar: React.FC = () => {
  const { cycleDays, prediction } = useAppContext();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Generate days for the month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Days of the week
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Helper function to check if a date has period data
  const getDayData = (date: Date): CycleDay | undefined => {
    const dateString = format(date, 'yyyy-MM-dd');
    return cycleDays.find(day => day.date === dateString);
  };

  // Helper function to determine the status of a day
  const getDayStatus = (date: Date) => {
    if (!prediction) return { isPeriod: false, isFertile: false, isOvulation: false };
    
    const dateString = format(date, 'yyyy-MM-dd');
    const dayData = getDayData(date);
    
    // Check recorded data first
    if (dayData && dayData.flow && dayData.flow !== FlowLevel.NONE) {
      return { isPeriod: true, isFertile: false, isOvulation: false };
    }
    
    // Check predictions
    const isPeriod = dateString >= prediction.expectedPeriodStart && dateString <= prediction.expectedPeriodEnd;
    const isFertile = dateString >= prediction.fertileWindowStart && dateString <= prediction.fertileWindowEnd;
    const isOvulation = dateString === prediction.expectedOvulation;
    
    return { isPeriod, isFertile, isOvulation };
  };

  // Handler for day click
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  // Helper function to get background color class based on day status
  const getDayColorClass = (date: Date) => {
    const { isPeriod, isFertile, isOvulation } = getDayStatus(date);
    
    if (isPeriod) return 'bg-rose-100';
    if (isOvulation) return 'bg-purple-100';
    if (isFertile) return 'bg-purple-50';
    return '';
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {/* Day names */}
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-semibold text-gray-500 py-2">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {days.map(day => {
          const dateString = format(day, 'yyyy-MM-dd');
          const dayData = getDayData(day);
          const { isPeriod, isFertile, isOvulation } = getDayStatus(day);
          
          return (
            <button
              key={dateString}
              onClick={() => handleDayClick(day)}
              className={`
                p-1 h-12 md:h-16 rounded-md flex flex-col items-center justify-center
                hover:bg-gray-50 border border-transparent
                ${getDayColorClass(day)}
                ${isToday(day) ? 'border-rose-400' : ''}
              `}
            >
              <span className={`text-sm md:text-base ${isToday(day) ? 'font-semibold' : ''}`}>
                {format(day, 'd')}
              </span>
              <div className="flex mt-1 space-x-1">
                {isPeriod && <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>}
                {isFertile && <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>}
                {isOvulation && <div className="w-1.5 h-1.5 rounded-full bg-purple-600"></div>}
                {dayData?.mood && dayData.mood.length > 0 && (
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                )}
                {dayData?.symptoms && dayData.symptoms.length > 0 && (
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400"></div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="mt-4 flex flex-wrap gap-3">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-rose-500 mr-2"></div>
          <span className="text-sm text-gray-600">Period</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
          <span className="text-sm text-gray-600">Fertile Window</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-purple-600 mr-2"></div>
          <span className="text-sm text-gray-600">Ovulation</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
          <span className="text-sm text-gray-600">Mood</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-sky-400 mr-2"></div>
          <span className="text-sm text-gray-600">Symptoms</span>
        </div>
      </div>
      
      {/* Day details modal */}
      {isModalOpen && selectedDate && (
        <DayDetails 
          date={selectedDate} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default CycleCalendar;