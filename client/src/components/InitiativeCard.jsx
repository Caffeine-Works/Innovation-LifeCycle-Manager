/**
 * Initiative Card Component
 * Displays a single initiative as a card on the Kanban board
 */

import React from 'react';

const InitiativeCard = ({ initiative }) => {
  // Category badge colors
  const categoryColors = {
    TECHNOLOGY: 'bg-blue-100 text-blue-800',
    PROCESS: 'bg-green-100 text-green-800',
    PRODUCT: 'bg-purple-100 text-purple-800',
    OTHER: 'bg-gray-100 text-gray-800'
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
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      {/* Title */}
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
        {initiative.title}
      </h3>

      {/* Category Badge */}
      <div className="mb-3">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[initiative.category]}`}>
          {categoryLabels[initiative.category]}
        </span>
      </div>

      {/* Description Preview */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {initiative.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
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
