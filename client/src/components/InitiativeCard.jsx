/**
 * Initiative Card Component
 * Displays a single initiative as a card on the Kanban board
 */

import React from 'react';

const InitiativeCard = ({ initiative }) => {
  // Category badge colors - flat slate theme
  const categoryColors = {
    TECHNOLOGY: 'bg-slate-100 text-slate-700 border-slate-300',
    PROCESS: 'bg-zinc-100 text-zinc-700 border-zinc-300',
    PRODUCT: 'bg-slate-200 text-slate-800 border-slate-400',
    OTHER: 'bg-zinc-50 text-zinc-600 border-zinc-200'
  };

  // Category labels
  const categoryLabels = {
    TECHNOLOGY: 'Technology',
    PROCESS: 'Process',
    PRODUCT: 'Product',
    OTHER: 'Other'
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all cursor-pointer">
      {/* Title */}
      <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
        {initiative.title}
      </h3>

      {/* Category Badge */}
      <div className="mb-3">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${categoryColors[initiative.category]}`}>
          {categoryLabels[initiative.category]}
        </span>
      </div>

      {/* Description Preview */}
      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
        {initiative.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
        {/* Owner */}
        <div className="flex items-center gap-1">
          <span className="font-medium">👤</span>
          <span>{initiative.owner_name}</span>
        </div>

        {/* Created Date */}
        <div className="flex items-center gap-1">
          <span>📅</span>
          <span>{formatDate(initiative.created_at)}</span>
        </div>
      </div>
    </div>
  );
};

export default InitiativeCard;
