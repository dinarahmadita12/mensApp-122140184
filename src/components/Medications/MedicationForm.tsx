import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import { Medication } from '../../types';

interface MedicationFormProps {
  medication: Medication | null;
  onSave: () => void;
  onCancel: () => void;
}

const MedicationForm: React.FC<MedicationFormProps> = ({ medication, onSave, onCancel }) => {
  const { saveMedication } = useAppContext();
  const [formData, setFormData] = useState<Omit<Medication, 'id'> & { id?: string }>({
    name: '',
    dosage: '',
    time: '',
    taken: false,
    notes: ''
  });

  // If editing, load existing data
  useEffect(() => {
    if (medication) {
      setFormData({
        ...medication
      });
    }
  }, [medication]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!formData.name || !formData.time) {
      alert('Please fill in required fields');
      return;
    }
    
    const medicationData: Medication = {
      id: formData.id || Date.now().toString(),
      name: formData.name,
      dosage: formData.dosage,
      time: formData.time,
      taken: formData.taken || false,
      notes: formData.notes
    };
    
    saveMedication(medicationData);
    onSave();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">
          {medication ? 'Edit Medication' : 'Add New Medication'}
        </h3>
        <button 
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 mb-1">
            Medication Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
            placeholder="e.g., Birth Control Pill"
            required
          />
        </div>
        
        <div>
          <label htmlFor="dosage" className="block text-gray-700 mb-1">
            Dosage
          </label>
          <input
            type="text"
            id="dosage"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
            placeholder="e.g., 20mg"
          />
        </div>
        
        <div>
          <label htmlFor="time" className="block text-gray-700 mb-1">
            Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
            required
          />
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
            rows={2}
            placeholder="Any additional information"
          ></textarea>
        </div>
        
        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors"
          >
            {medication ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicationForm;