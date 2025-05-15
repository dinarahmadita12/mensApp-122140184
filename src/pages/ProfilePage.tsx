import React from 'react';
import UserProfile from '../components/Profile/UserProfile';

const ProfilePage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Profile Settings
        </h1>
        <p className="text-gray-600">
          Manage your personal information and cycle settings
        </p>
      </div>
      
      <UserProfile />
    </div>
  );
};

export default ProfilePage;