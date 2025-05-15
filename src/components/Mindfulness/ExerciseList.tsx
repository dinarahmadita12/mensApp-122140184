import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { MindfulnessExercise } from '../../types';
import ExerciseCard from './ExerciseCard';

const ExerciseList: React.FC = () => {
  const { mindfulnessExercises } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get all unique categories
  const categories = [...new Set(mindfulnessExercises.map(ex => ex.category))];
  
  // Filter exercises based on search and category
  const filteredExercises = mindfulnessExercises.filter(exercise => {
    const matchesCategory = activeCategory ? exercise.category === activeCategory : true;
    const matchesSearch = searchQuery
      ? exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Mindfulness Exercises</h2>
      
      {/* Search input */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search exercises..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
      </div>
      
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1 rounded-full text-sm ${
            activeCategory === null
              ? 'bg-purple-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1 rounded-full text-sm ${
              activeCategory === category
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Exercise cards */}
      {filteredExercises.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No exercises found matching your criteria.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredExercises.map(exercise => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseList;