/**
 * Stage Column Component
 * Represents a single stage column in the Kanban board
 */

import React from 'react';
import InitiativeCard from './InitiativeCard';

const StageColumn = ({ stage, initiatives, stageInfo }) => {
  return (
    <div className="flex-shrink-0 w-80">
      {/* Column Header */}
      <div className={`rounded-t-lg p-4 ${stageInfo.bgColor}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{stageInfo.icon}</span>
            <h2 className="font-semibold text-gray-900">{stageInfo.label}</h2>
          </div>
          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium ${stageInfo.countBg} ${stageInfo.countText}`}>
            {initiatives.length}
          </span>
        </div>
        <p className="text-xs text-gray-600 mt-1">{stageInfo.description}</p>
      </div>

      {/* Column Body */}
      <div className={`${stageInfo.bodyBgColor} rounded-b-lg p-4 min-h-[500px] max-h-[calc(100vh-300px)] overflow-y-auto`}>
        <div className="space-y-3">
          {initiatives.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
              No initiatives in this stage
            </div>
          ) : (
            initiatives.map((initiative) => (
              <InitiativeCard key={initiative.id} initiative={initiative} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StageColumn;
