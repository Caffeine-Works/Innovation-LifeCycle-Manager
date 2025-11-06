/**
 * Kanban Board Component
 * Main board view displaying initiatives across lifecycle stages
 */

import React, { useState, useEffect } from 'react';
import { getAllInitiatives } from '../services/api';
import StageColumn from './StageColumn';

const KanbanBoard = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stage configuration (4 simplified stages for demo)
  const stages = {
    IDEA: {
      label: 'Idea',
      icon: '💡',
      bgColor: 'bg-yellow-50',
      countBg: 'bg-yellow-100',
      countText: 'text-yellow-800',
      description: 'Initial submission'
    },
    CONCEPT: {
      label: 'Concept',
      icon: '📋',
      bgColor: 'bg-blue-50',
      countBg: 'bg-blue-100',
      countText: 'text-blue-800',
      description: 'Being evaluated'
    },
    DEVELOPMENT: {
      label: 'Development',
      icon: '⚙️',
      bgColor: 'bg-purple-50',
      countBg: 'bg-purple-100',
      countText: 'text-purple-800',
      description: 'Being built'
    },
    DEPLOYED: {
      label: 'Deployed',
      icon: '🚀',
      bgColor: 'bg-green-50',
      countBg: 'bg-green-100',
      countText: 'text-green-800',
      description: 'Live in production'
    }
  };

  // Fetch initiatives on component mount
  useEffect(() => {
    fetchInitiatives();
  }, []);

  const fetchInitiatives = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllInitiatives();
      setInitiatives(response.data.initiatives);
    } catch (err) {
      console.error('Error fetching initiatives:', err);
      setError('Failed to load initiatives. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Group initiatives by stage
  const groupedInitiatives = Object.keys(stages).reduce((acc, stage) => {
    acc[stage] = initiatives.filter(i => i.current_stage === stage);
    return acc;
  }, {});

  // Calculate total count
  const totalCount = initiatives.length;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              📊 Innovation Board
            </h1>
            <p className="text-gray-600">
              Track all innovation initiatives across lifecycle stages
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">{totalCount}</div>
            <div className="text-sm text-gray-600">Total Initiatives</div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600">Loading initiatives...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <span className="text-red-600 text-xl mr-3">✕</span>
            <div>
              <h3 className="text-red-900 font-semibold">Error Loading Initiatives</h3>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchInitiatives}
            className="mt-3 btn-secondary text-sm"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Kanban Board */}
      {!loading && !error && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max">
            {Object.entries(stages).map(([stageKey, stageInfo]) => (
              <StageColumn
                key={stageKey}
                stage={stageKey}
                initiatives={groupedInitiatives[stageKey]}
                stageInfo={stageInfo}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && totalCount === 0 && (
        <div className="text-center py-20">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Initiatives Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start by submitting your first innovation idea!
          </p>
          <a href="/" className="btn-primary inline-block">
            Submit New Idea
          </a>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
