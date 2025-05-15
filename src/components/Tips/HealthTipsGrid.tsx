import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { HealthTip } from '../../types';

const HealthTipsGrid: React.FC = () => {
  const { healthTips } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get all unique categories
  const categories = [...new Set(healthTips.map(tip => tip.category))];
  
  // Filter tips based on active category and search query
  const filteredTips = healthTips.filter(tip => {
    const matchesCategory = activeCategory ? tip.category === activeCategory : true;
    const matchesSearch = searchQuery
      ? tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.content.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return matchesCategory && matchesSearch;
  });
  
  // Function to get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'period':
        return 'bg-rose-100 text-rose-800';
      case 'nutrition':
        return 'bg-emerald-100 text-emerald-800';
      case 'fitness':
        return 'bg-blue-100 text-blue-800';
      case 'mental':
        return 'bg-purple-100 text-purple-800';
      case 'sleep':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Health Tips</h2>
      
      {/* Search input */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for tips..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
        />
      </div>
      
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1 rounded-full text-sm ${
            activeCategory === null
              ? 'bg-emerald-500 text-white'
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
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Tips grid */}
      {filteredTips.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No health tips found matching your criteria.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTips.map(tip => (
            <div key={tip.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryColor(tip.category)}`}>
                  {tip.category.charAt(0).toUpperCase() + tip.category.slice(1)}
                </span>
                {tip.relevantPhase && (
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ml-2 bg-gray-100 text-gray-700">
                    {tip.relevantPhase.charAt(0).toUpperCase() + tip.relevantPhase.slice(1)} phase
                  </span>
                )}
                <h3 className="font-medium text-gray-800">{tip.title}</h3>
                <p className="text-sm mt-2 text-gray-600">{tip.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthTipsGrid;