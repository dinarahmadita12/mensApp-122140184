import React, { useState } from 'react';
import { Pill, PlusCircle, Edit, Trash2, CheckCircle } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import { Medication } from '../../types';
import MedicationForm from './MedicationForm';

const MedicationList: React.FC = () => {
  const { medications, deleteMedication, saveMedication } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);

  const handleEdit = (medication: Medication) => {
    setEditingMedication(medication);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this medication?')) {
      deleteMedication(id);
    }
  };

  const handleToggleTaken = (medication: Medication) => {
    saveMedication({
      ...medication,
      taken: !medication.taken
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Medications</h2>
        <button
          onClick={() => {
            setEditingMedication(null);
            setShowAddForm(true);
          }}
          className="flex items-center text-rose-500 hover:text-rose-600"
        >
          <PlusCircle className="w-5 h-5 mr-1" />
          <span>Add New</span>
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <MedicationForm 
            medication={editingMedication}
            onSave={() => setShowAddForm(false)}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {medications.length === 0 ? (
        <div className="text-center py-6">
          <Pill className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">No medications added yet.</p>
          <p className="text-gray-400 text-sm">
            Add medications to receive reminders.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {medications.map((medication) => (
            <div 
              key={medication.id}
              className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                medication.taken ? 'bg-green-50 border border-green-100' : 'bg-white border border-gray-100'
              }`}
            >
              <div className="flex items-start flex-1">
                <button
                  onClick={() => handleToggleTaken(medication)}
                  className={`mr-3 transition-colors ${medication.taken ? 'text-green-500' : 'text-gray-300 hover:text-gray-400'}`}
                >
                  <CheckCircle className="w-6 h-6" />
                </button>
                <div>
                  <h3 className={`font-medium ${medication.taken ? 'text-green-700' : 'text-gray-800'}`}>
                    {medication.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{medication.dosage}</p>
                  <p className="text-gray-500 text-sm">Time: {medication.time}</p>
                  {medication.notes && (
                    <p className="text-gray-500 text-sm mt-1">{medication.notes}</p>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(medication)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(medication.id)}
                  className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicationList;