import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppLayout from './components/Layout/AppLayout';
import Dashboard from './pages/Dashboard';
import CalendarPage from './pages/CalendarPage';
import TrackingPage from './pages/TrackingPage';
import MedicationsPage from './pages/MedicationsPage';
import MindfulnessPage from './pages/MindfulnessPage';
import TipsPage from './pages/TipsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useAppContext } from './hooks/useAppContext';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAppContext();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// App wrapper with context
const AppWrapper: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

// App content with routes
const AppContent: React.FC = () => {
  const { isAuthenticated } = useAppContext();
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Protected routes */}
          <Route 
            index 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="calendar" 
            element={
              <ProtectedRoute>
                <CalendarPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="tracking" 
            element={
              <ProtectedRoute>
                <TrackingPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="medications" 
            element={
              <ProtectedRoute>
                <MedicationsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="mindfulness" 
            element={
              <ProtectedRoute>
                <MindfulnessPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="tips" 
            element={
              <ProtectedRoute>
                <TipsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          
          {/* Public routes */}
          <Route 
            path="login" 
            element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} 
          />
          <Route 
            path="register" 
            element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />} 
          />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

function App() {
  return <AppWrapper />;
}

export default App;