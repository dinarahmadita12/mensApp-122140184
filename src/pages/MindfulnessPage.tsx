import React from 'react';
import ExerciseList from '../components/Mindfulness/ExerciseList';

const MindfulnessPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Mindfulness Exercises
        </h1>
        <p className="text-gray-600">
          Find relief with breathing and relaxation techniques
        </p>
      </div>
      
      <ExerciseList />
    </div>
  );
};

export default MindfulnessPage;