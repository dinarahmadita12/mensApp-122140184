import React, { useState } from 'react';
import { User, Edit, Save } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';

const UserProfile: React.FC = () => {
  const { user, register, refreshPredictions } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    birthDate: user?.birthDate || '',
    cycleLength: user?.cycleLength || 28,
    periodLength: user?.periodLength || 5
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) || '' : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    const updatedUser = {
      ...user,
      name: formData.name,
      birthDate: formData.birthDate,
      cycleLength: formData.cycleLength,
      periodLength: formData.periodLength
    };
    
    register(updatedUser);
    refreshPredictions();
    setIsEditing(false);
  };

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Profile header */}
      <div className="bg-gradient-to-r from-rose-500 to-rose-400 p-6 rounded-t-lg text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Profile</h2>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm hover:bg-opacity-30 transition-colors"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-1" />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-1" />
                <span>Edit</span>
              </>
            )}
          </button>
        </div>
        <div className="flex items-center mt-4">
          <div className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="opacity-90">{user.email}</p>
          </div>
        </div>
      </div>
      
      {/* Profile content */}
      <div className="p-6">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>
            
            <div>
              <label htmlFor="birthDate" className="block text-gray-700 mb-1">
                Birth Date
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>
            
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="cycleLength" className="block text-gray-700 mb-1">
                  Cycle Length (days)
                </label>
                <input
                  type="number"
                  id="cycleLength"
                  name="cycleLength"
                  min="21"
                  max="45"
                  value={formData.cycleLength}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>
              
              <div className="flex-1">
                <label htmlFor="periodLength" className="block text-gray-700 mb-1">
                  Period Length (days)
                </label>
                <input
                  type="number"
                  id="periodLength"
                  name="periodLength"
                  min="1"
                  max="10"
                  value={formData.periodLength}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-100 rounded-lg">
                <h3 className="text-sm uppercase text-gray-500 mb-1">Birth Date</h3>
                <p className="text-gray-800">
                  {user.birthDate ? new Date(user.birthDate).toLocaleDateString() : 'Not set'}
                </p>
              </div>
              
              <div className="p-4 border border-gray-100 rounded-lg">
                <h3 className="text-sm uppercase text-gray-500 mb-1">Average Cycle Length</h3>
                <p className="text-gray-800">
                  {user.cycleLength} days
                </p>
              </div>
              
              <div className="p-4 border border-gray-100 rounded-lg">
                <h3 className="text-sm uppercase text-gray-500 mb-1">Average Period Length</h3>
                <p className="text-gray-800">
                  {user.periodLength} days
                </p>
              </div>
            </div>
            
            <div className="p-4 border border-gray-100 rounded-lg mt-4">
              <h3 className="text-sm uppercase text-gray-500 mb-2">About Cycle Settings</h3>
              <p className="text-gray-700 text-sm">
                These settings help us calculate your cycle predictions more accurately. 
                Updating your cycle and period length will improve predictions based on your personal patterns.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;