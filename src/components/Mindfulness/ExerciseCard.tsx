import React, { useState } from 'react';
import { Clock, PlayCircle, XCircle } from 'lucide-react';
import { MindfulnessExercise } from '../../types';

interface ExerciseCardProps {
  exercise: MindfulnessExercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Function to get category icon or color
  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'breathing':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'meditation':
        return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'stretching':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'relaxation':
        return 'bg-amber-50 border-amber-200 text-amber-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <>
      <div 
        className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className={`p-4 ${getCategoryStyle(exercise.category)}`}>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-medium uppercase">
                {exercise.category}
              </span>
              <h3 className="font-medium mt-1">{exercise.title}</h3>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span className="text-sm">{exercise.duration} min</span>
            </div>
          </div>
          <p className="text-sm mt-2 text-gray-600">{exercise.description}</p>
          <button
            className="mt-3 flex items-center text-sm font-medium hover:underline"
          >
            <PlayCircle className="w-4 h-4 mr-1" />
            Begin Exercise
          </button>
        </div>
      </div>
      
      {/* Exercise Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className={`p-6 ${getCategoryStyle(exercise.category)}`}>
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold">{exercise.title}</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex items-center mt-2 mb-4">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">{exercise.duration} minutes</span>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Instructions:</h4>
                <p className="text-gray-700 whitespace-pre-line">{exercise.content}</p>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 mr-2"
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                >
                  Start Timer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExerciseCard;