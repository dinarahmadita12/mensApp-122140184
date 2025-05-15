import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { useAppContext } from '../../hooks/useAppContext';

const AppLayout: React.FC = () => {
  const { isAuthenticated } = useAppContext();

  return (
    <div className="flex h-screen bg-gray-50">
      <Navigation />
      
      <main className={`flex-1 overflow-y-auto p-0 ${isAuthenticated ? 'md:p-8 pb-20 md:pb-8 md:ml-64' : 'p-0'}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;