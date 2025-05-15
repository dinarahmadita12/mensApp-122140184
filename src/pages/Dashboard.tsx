import React from 'react';
import CycleSummary from '../components/Dashboard/CycleSummary';
import RecentTracking from '../components/Dashboard/RecentTracking';
import DailyTips from '../components/Dashboard/DailyTips';
import { useAppContext } from '../hooks/useAppContext';

const Dashboard: React.FC = () => {
  const { user } = useAppContext();

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Welcome back, {user?.name?.split(' ')[0] || 'there'}!
        </h1>
        <p className="text-gray-600">
          Here's your personalized health tracker overview
        </p>
      </div>
      
      <div className="space-y-6">
        <CycleSummary />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentTracking />
          <DailyTips />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;