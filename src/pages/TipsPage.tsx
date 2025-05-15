import React from 'react';
import HealthTipsGrid from '../components/Tips/HealthTipsGrid';

const TipsPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Health Tips
        </h1>
        <p className="text-gray-600">
          Expert advice tailored to your cycle
        </p>
      </div>
      
      <HealthTipsGrid />
    </div>
  );
};

export default TipsPage;