/**
 * Kanban Board Component
 * Main board view displaying initiatives across lifecycle stages
 */

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DragDropContext } from '@hello-pangea/dnd';
import { getAllInitiatives, updateInitiative } from '../services/api';
import StageColumn from './StageColumn';
import TransitionModal from './TransitionModal';

const KanbanBoard = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Get selected category from URL or default to 'ALL'
  const selectedCategory = searchParams.get('category') || 'ALL';

  // Modal state for transition confirmation
  const [modalState, setModalState] = useState({
    isOpen: false,
    initiative: null,
    fromStage: null,
    toStage: null,
    isBackward: false,
    isSkipping: false
  });

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

  // Category configuration
  const categories = {
    ALL: { label: 'All', icon: '📋', color: 'bg-slate-800' },
    TECHNOLOGY: { label: 'Technology', icon: '💻', color: 'bg-blue-600' },
    PROCESS: { label: 'Process', icon: '⚙️', color: 'bg-green-600' },
    PRODUCT: { label: 'Product', icon: '📦', color: 'bg-purple-600' },
    OTHER: { label: 'Other', icon: '🔖', color: 'bg-gray-600' }
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

  /**
   * Handle category filter change
   * @param {string} category - Category to filter by
   */
  const handleCategoryChange = (category) => {
    if (category === 'ALL') {
      setSearchParams({}); // Remove category param
    } else {
      setSearchParams({ category });
    }
  };

  // Filter initiatives by selected category
  const filteredInitiatives = selectedCategory === 'ALL'
    ? initiatives
    : initiatives.filter(i => i.category === selectedCategory);

  // Group filtered initiatives by stage
  const groupedInitiatives = Object.keys(stages).reduce((acc, stage) => {
    acc[stage] = filteredInitiatives.filter(i => i.current_stage === stage);
    return acc;
  }, {});

  // Calculate counts
  const totalCount = initiatives.length;
  const filteredCount = filteredInitiatives.length;
  const categoryCounts = Object.keys(categories).reduce((acc, cat) => {
    if (cat === 'ALL') {
      acc[cat] = totalCount;
    } else {
      acc[cat] = initiatives.filter(i => i.category === cat).length;
    }
    return acc;
  }, {});

  // Get stage order for detecting backward/skipping moves
  const stageOrder = ['IDEA', 'CONCEPT', 'DEVELOPMENT', 'DEPLOYED'];

  /**
   * Handle drag end - called when user drops a card
   * @param {Object} result - Drag result from react-beautiful-dnd
   */
  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // Dropped outside a valid droppable area
    if (!destination) return;

    // Dropped in same position
    if (source.droppableId === destination.droppableId) return;

    // Find the initiative being dragged
    const initiative = initiatives.find(i => i.id.toString() === draggableId);
    if (!initiative) return;

    const fromStage = source.droppableId;
    const toStage = destination.droppableId;

    // Determine if this is a backward or skipping move
    const fromIndex = stageOrder.indexOf(fromStage);
    const toIndex = stageOrder.indexOf(toStage);
    const isBackward = toIndex < fromIndex;
    const isSkipping = Math.abs(toIndex - fromIndex) > 1;

    // Show confirmation modal
    setModalState({
      isOpen: true,
      initiative,
      fromStage,
      toStage,
      isBackward,
      isSkipping
    });
  };

  /**
   * Handle transition confirmation from modal
   * @param {string} comment - Optional comment from user
   */
  const handleConfirmTransition = async (comment) => {
    const { initiative, toStage } = modalState;

    try {
      // Update initiative stage via API
      await updateInitiative(initiative.id, {
        current_stage: toStage,
        transition_comment: comment || null
      });

      // Update local state
      setInitiatives(prevInitiatives =>
        prevInitiatives.map(i =>
          i.id === initiative.id
            ? { ...i, current_stage: toStage }
            : i
        )
      );

      // Close modal
      setModalState({
        isOpen: false,
        initiative: null,
        fromStage: null,
        toStage: null,
        isBackward: false,
        isSkipping: false
      });

    } catch (err) {
      console.error('Error updating initiative stage:', err);
      setError('Failed to update initiative stage. Please try again.');

      // Close modal
      setModalState({
        isOpen: false,
        initiative: null,
        fromStage: null,
        toStage: null,
        isBackward: false,
        isSkipping: false
      });
    }
  };

  /**
   * Handle modal close/cancel
   */
  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      initiative: null,
      fromStage: null,
      toStage: null,
      isBackward: false,
      isSkipping: false
    });
  };

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
            <div className="text-5xl font-bold text-slate-900">{filteredCount}</div>
            <div className="text-sm text-slate-600 font-medium mt-1">
              {selectedCategory === 'ALL' ? 'Total' : categories[selectedCategory]?.label} Initiatives
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-700">Filter by Category:</span>
          <div className="flex gap-2">
            {Object.entries(categories).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => handleCategoryChange(key)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                  selectedCategory === key
                    ? `${cat.color} text-white shadow-md`
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full text-xs font-bold ${
                  selectedCategory === key
                    ? 'bg-white bg-opacity-30 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {categoryCounts[key]}
                </span>
              </button>
            ))}
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
        <DragDropContext onDragEnd={handleDragEnd}>
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
        </DragDropContext>
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

      {/* Transition Confirmation Modal */}
      <TransitionModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmTransition}
        initiative={modalState.initiative}
        fromStage={modalState.fromStage}
        toStage={modalState.toStage}
        isBackward={modalState.isBackward}
        isSkipping={modalState.isSkipping}
      />
    </div>
  );
};

export default KanbanBoard;
