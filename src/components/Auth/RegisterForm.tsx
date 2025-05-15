import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import { User } from '../../types';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    cycleLength: 28,
    periodLength: 5
  });
  const [error, setError] = useState('');
  
  const { register } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) || '' : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { name, email, password, confirmPassword, birthDate, cycleLength, periodLength } = formData;
    
    // Validation
    if (!name || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Create user object with required fields
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
      birthDate,
      cycleLength: cycleLength || 28,
      periodLength: periodLength || 5
    };

    const success = register(newUser);
    if (success) {
      navigate('/');
    } else {
      setError('Email is already in use');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-rose-50 to-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Heart className="w-12 h-12 text-rose-500 mx-auto mb-2" />
          <h1 className="text-3xl font-bold text-gray-800">Create an Account</h1>
          <p className="text-gray-600 mt-2">Join Luna to track your cycle</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
                required
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
                required
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
            
            <button
              type="submit"
              className="w-full bg-rose-500 text-white py-2 px-4 rounded-md hover:bg-rose-600 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-300 mt-6"
            >
              Create Account
            </button>
          </form>
          
          <p className="text-gray-600 text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-rose-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;