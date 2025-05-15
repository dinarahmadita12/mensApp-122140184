import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { getRelevantTipsByPhase } from '../../utils/cycleCalculations';

const DailyTips: React.FC = () => {
  const { prediction, healthTips } = useAppContext();
  const today = new Date().toISOString().split('T')[0];
  
  // Get relevant tips based on current cycle phase
  const relevantTips = getRelevantTipsByPhase(today, prediction, healthTips);
  const [expandedTipId, setExpandedTipId] = useState<string | null>(null);
  
  if (relevantTips.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Daily Tips</h2>
        <p className="text-gray-600">No tips available right now.</p>
      </div>
    );
  }

  // Get a category color
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
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Daily Tips</h2>
      
      <div className="space-y-4">
        {relevantTips.map(tip => (
          <div 
            key={tip.id} 
            className="border border-gray-100 rounded-lg p-4 transition-all hover:shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryColor(tip.category)}`}>
                  {tip.category.charAt(0).toUpperCase() + tip.category.slice(1)}
                </span>
                <h3 className="font-medium text-gray-800">{tip.title}</h3>
              </div>
              <button
                onClick={() => setExpandedTipId(expandedTipId === tip.id ? null : tip.id)}
                className="text-rose-500 text-sm font-medium hover:underline"
              >
                {expandedTipId === tip.id ? 'Show less' : 'Read more'}
              </button>
            </div>
            
            {expandedTipId === tip.id && (
              <p className="text-gray-600 mt-2 text-sm">
                {tip.content}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyTips;