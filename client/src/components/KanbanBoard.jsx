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

  // Stage configuration (4 simplified stages for demo) - Progressive shading
  const stages = {
    IDEA: {
      label: 'Idea',
      icon: '💡',
      bgColor: 'bg-slate-100',
      bodyBgColor: 'bg-slate-100',
      countBg: 'bg-slate-200 border border-slate-300',
      countText: 'text-slate-800',
      description: 'Initial submission'
    },
    CONCEPT: {
      label: 'Concept',
      icon: '📋',
      bgColor: 'bg-slate-200',
      bodyBgColor: 'bg-slate-200',
      countBg: 'bg-slate-300 border border-slate-400',
      countText: 'text-slate-800',
      description: 'Being evaluated'
    },
    DEVELOPMENT: {
      label: 'Development',
      icon: '⚙️',
      bgColor: 'bg-slate-300',
      bodyBgColor: 'bg-slate-300',
      countBg: 'bg-slate-400 border border-slate-500',
      countText: 'text-slate-900',
      description: 'Being built'
    },
    DEPLOYED: {
      label: 'Deployed',
      icon: '🚀',
      bgColor: 'bg-slate-400',
      bodyBgColor: 'bg-slate-400',
      countBg: 'bg-slate-500 border border-slate-600',
      countText: 'text-white',
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
      <div className="mb-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">
              Innovation Board
            </h1>
            <p className="text-lg text-slate-600">
              Track all innovation initiatives across lifecycle stages
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-slate-900">{totalCount}</div>
            <div className="text-sm text-slate-600 font-medium mt-1">Total Initiatives</div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-slate-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-slate-600 font-medium">Loading initiatives...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-slate-900 border-l-4 border-slate-600 rounded-lg p-5 mb-6">
          <h3 className="text-white font-bold text-lg">Error</h3>
          <p className="text-slate-300 text-sm mt-1">{error}</p>
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
        <div className="overflow-x-auto pb-6">
          <div className="flex gap-4 justify-center">
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
