/**
 * Transition Modal Component
 * Modal dialog for confirming stage transitions with optional/required comments
 */

import React, { useState } from 'react';

const TransitionModal = ({
  isOpen,
  onClose,
  onConfirm,
  initiative,
  fromStage,
  toStage,
  isBackward,
  isSkipping
}) => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  // Stage labels for display
  const stageLabels = {
    IDEA: 'Idea',
    CONCEPT: 'Concept',
    DEVELOPMENT: 'Development',
    DEPLOYED: 'Deployed'
  };

  // Determine if comment is required
  const isCommentRequired = isBackward || isSkipping;
  const minCommentLength = 10;

  // Handle confirm
  const handleConfirm = () => {
    // Validate comment if required
    if (isCommentRequired && comment.trim().length < minCommentLength) {
      setError(`Comment is required (minimum ${minCommentLength} characters)`);
      return;
    }

    // Call parent confirm handler
    onConfirm(comment.trim());

    // Reset state
    setComment('');
    setError('');
  };

  // Handle cancel
  const handleCancel = () => {
    setComment('');
    setError('');
    onClose();
  };

  // Handle comment change
  const handleCommentChange = (e) => {
    setComment(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            {isBackward ? '⚠️ Move Initiative Backward?' : 'Move Initiative to New Stage?'}
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {/* Initiative Title */}
          <div className="mb-4">
            <h3 className="font-semibold text-slate-900 mb-2">{initiative?.title}</h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-600">From:</span>
              <span className="font-medium text-slate-900">{stageLabels[fromStage]}</span>
              <span className="text-slate-400">→</span>
              <span className="font-medium text-slate-900">{stageLabels[toStage]}</span>
            </div>
          </div>

          {/* Warning for backward moves */}
          {isBackward && (
            <div className="mb-4 p-3 bg-amber-50 border-l-4 border-amber-500 rounded">
              <p className="text-sm text-amber-800">
                <strong>Warning:</strong> Moving backward is unusual. Please provide a reason.
              </p>
            </div>
          )}

          {/* Info for skipping stages */}
          {isSkipping && !isBackward && (
            <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> You're skipping stages. Please explain why.
              </p>
            </div>
          )}

          {/* Comment/Justification Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Justification {isCommentRequired && <span className="text-red-500">*</span>}
              {isCommentRequired && (
                <span className="text-xs text-slate-500 ml-1">(min {minCommentLength} characters)</span>
              )}
            </label>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder={
                isCommentRequired
                  ? "Please provide a reason for this transition..."
                  : "Add an optional comment about this transition..."
              }
              className={`w-full rounded-lg border px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-500 transition-colors ${
                error ? 'border-red-500' : 'border-slate-300'
              }`}
              rows="3"
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
            {!error && comment.length > 0 && isCommentRequired && (
              <p className={`mt-1 text-xs ${comment.length >= minCommentLength ? 'text-green-600' : 'text-slate-500'}`}>
                {comment.length} / {minCommentLength} characters
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3 rounded-b-lg">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-white bg-slate-800 rounded-lg hover:bg-slate-700 font-medium transition-colors"
          >
            Confirm Transition
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransitionModal;
