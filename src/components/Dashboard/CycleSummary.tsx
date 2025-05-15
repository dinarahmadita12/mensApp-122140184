import React from 'react';
import { format, addDays } from 'date-fns';
import { Calendar, Droplets, Heart } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import { getCyclePhase } from '../../utils/cycleCalculations';

const CycleSummary: React.FC = () => {
  const { user, prediction } = useAppContext();
  
  if (!prediction) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Cycle</h2>
        <p className="text-gray-600">
          Start tracking your period to see predictions about your cycle.
        </p>
      </div>
    );
  }
  
  const today = new Date().toISOString().split('T')[0];
  const cyclePhase = getCyclePhase(today, prediction);
  
  // Helper function to get user-friendly phase name and description
  const getPhaseInfo = (phase: string) => {
    switch (phase) {
      case 'menstrual':
        return {
          name: 'Menstrual Phase',
          description: 'Your period is happening now. Take care of yourself and rest if needed.',
          icon: <Droplets className="w-8 h-8 text-rose-500" />,
          color: 'bg-rose-100'
        };
      case 'follicular':
        return {
          name: 'Follicular Phase',
          description: 'Your body is preparing for ovulation. Energy levels may be increasing.',
          icon: <Calendar className="w-8 h-8 text-emerald-500" />,
          color: 'bg-emerald-100'
        };
      case 'ovulation':
        return {
          name: 'Ovulation Phase',
          description: 'You\'re in your fertile window. Energy and mood are typically at their highest.',
          icon: <Heart className="w-8 h-8 text-purple-500" />,
          color: 'bg-purple-100'
        };
      case 'luteal':
        return {
          name: 'Luteal Phase',
          description: 'Your body is preparing for your next period. You might experience PMS symptoms.',
          icon: <Calendar className="w-8 h-8 text-amber-500" />,
          color: 'bg-amber-100'
        };
      default:
        return {
          name: 'Unknown Phase',
          description: 'We don\'t have enough data to determine your current cycle phase.',
          icon: <Calendar className="w-8 h-8 text-gray-500" />,
          color: 'bg-gray-100'
        };
    }
  };
  
  const phaseInfo = getPhaseInfo(cyclePhase);
  
  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM d');
  };
  
  // Calculate days until next period
  const today2 = new Date();
  const nextPeriodDate = new Date(prediction.expectedPeriodStart);
  const daysUntilPeriod = Math.round((nextPeriodDate.getTime() - today2.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className={`${phaseInfo.color} rounded-lg shadow p-6 mb-6 transition-all`}>
      <div className="flex items-start">
        <div className="mr-4">
          {phaseInfo.icon}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            {phaseInfo.name}
          </h2>
          <p className="text-gray-600 mb-4">
            {phaseInfo.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white bg-opacity-60 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-1">Next Period</h3>
              <p className="text-rose-500 font-semibold">
                {formatDate(prediction.expectedPeriodStart)} - {formatDate(prediction.expectedPeriodEnd)}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {daysUntilPeriod > 0 
                  ? `In ${daysUntilPeriod} day${daysUntilPeriod !== 1 ? 's' : ''}` 
                  : daysUntilPeriod === 0 
                    ? 'Today' 
                    : 'Currently happening'}
              </p>
            </div>
            
            <div className="bg-white bg-opacity-60 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-1">Fertile Window</h3>
              <p className="text-purple-500 font-semibold">
                {formatDate(prediction.fertileWindowStart)} - {formatDate(prediction.fertileWindowEnd)}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Ovulation: {formatDate(prediction.expectedOvulation)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleSummary;