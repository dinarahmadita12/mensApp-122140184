import React from 'react';
import MoodSymptomTracker from '../components/Tracking/MoodSymptomTracker';

const TrackingPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Track Mood & Symptoms
        </h1>
        <p className="text-gray-600">
          Log how you're feeling throughout your cycle
        </p>
      </div>
      
      <MoodSymptomTracker />
    </div>
  );
};

export default TrackingPage;