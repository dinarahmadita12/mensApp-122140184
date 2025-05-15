import React from 'react';
import MedicationList from '../components/Medications/MedicationList';

const MedicationsPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Medications
        </h1>
        <p className="text-gray-600">
          Track and schedule your medications
        </p>
      </div>
      
      <MedicationList />
    </div>
  );
};

export default MedicationsPage;