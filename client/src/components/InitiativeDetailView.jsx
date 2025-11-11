/**
 * Initiative Detail View Component
 * Full-screen view showing comprehensive initiative information
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInitiativeById } from '../services/api';

const InitiativeDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initiative, setInitiative] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInitiative();
  }, [id]);

  const fetchInitiative = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getInitiativeById(id);
      setInitiative(response.data.initiative);
    } catch (err) {
      console.error('Error fetching initiative:', err);
      setError('Failed to load initiative details');
    } finally {
      setLoading(false);
    }
  };

  // Category colors
  const categoryColors = {
    TECHNOLOGY: 'bg-blue-100 text-blue-800 border-blue-300',
    PROCESS: 'bg-green-100 text-green-800 border-green-300',
    PRODUCT: 'bg-purple-100 text-purple-800 border-purple-300',
    OTHER: 'bg-gray-100 text-gray-800 border-gray-300'
  };

  // Priority colors
  const priorityColors = {
    CRITICAL: 'bg-red-100 text-red-800 border-red-300',
    HIGH: 'bg-orange-100 text-orange-800 border-orange-300',
    MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    LOW: 'bg-green-100 text-green-800 border-green-300'
  };

  // Stage labels
  const stageLabels = {
    IDEA: 'Idea',
    CONCEPT: 'Concept',
    DEVELOPMENT: 'Development',
    DEPLOYED: 'Deployed'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-slate-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-slate-600 font-medium">Loading initiative...</p>
        </div>
      </div>
    );
  }

  if (error || !initiative) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Error</h2>
          <p className="text-slate-600 mb-4">{error || 'Initiative not found'}</p>
          <button
            onClick={() => navigate('/board')}
            className="btn-primary"
          >
            Back to Board
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/board')}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium"
            >
              <span>←</span>
              <span>Back to Board</span>
            </button>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[initiative.category]}`}>
                {initiative.category}
              </span>
              {initiative.priority && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${priorityColors[initiative.priority]}`}>
                  {initiative.priority}
                </span>
              )}
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-800 border border-slate-300">
                {stageLabels[initiative.current_stage]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-slate-900 mb-6">
          {initiative.title}
        </h1>

        {/* Main Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Problem Statement */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Problem Statement</h2>
            <p className="text-slate-700 whitespace-pre-wrap">{initiative.problem_statement}</p>
          </div>

          {/* Meta Info */}
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">Owner</p>
                <p className="text-slate-900 font-medium">{initiative.owner_name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Submitter</p>
                <p className="text-slate-900">{initiative.submitter_name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Created</p>
                <p className="text-slate-900">{new Date(initiative.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg p-6 border border-slate-200 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Description</h2>
          <p className="text-slate-700 whitespace-pre-wrap">
            {initiative.detailed_description || initiative.description}
          </p>
        </div>

        {/* Business Owner & IT Owner */}
        {(initiative.business_owner_name || initiative.it_owner_name) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {initiative.business_owner_name && (
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Business Owner</h2>
                <div className="space-y-2">
                  <p className="text-slate-900 font-medium">{initiative.business_owner_name}</p>
                  {initiative.business_owner_function && (
                    <p className="text-sm text-slate-600">Function: {initiative.business_owner_function}</p>
                  )}
                  {initiative.business_owner_department && (
                    <p className="text-sm text-slate-600">Department: {initiative.business_owner_department}</p>
                  )}
                </div>
              </div>
            )}

            {initiative.it_owner_name && (
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">IT Owner</h2>
                <div className="space-y-2">
                  <p className="text-slate-900 font-medium">{initiative.it_owner_name}</p>
                  {initiative.it_owner_department && (
                    <p className="text-sm text-slate-600">Department: {initiative.it_owner_department}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Timeline */}
        {(initiative.timeline_start_date || initiative.timeline_end_date) && (
          <div className="bg-white rounded-lg p-6 border border-slate-200 mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Timeline</h2>
            <div className="flex items-center gap-4">
              {initiative.timeline_start_date && (
                <div>
                  <p className="text-sm text-slate-500 mb-1">Start Date</p>
                  <p className="text-slate-900">{new Date(initiative.timeline_start_date).toLocaleDateString()}</p>
                </div>
              )}
              {initiative.timeline_start_date && initiative.timeline_end_date && (
                <span className="text-slate-400">→</span>
              )}
              {initiative.timeline_end_date && (
                <div>
                  <p className="text-sm text-slate-500 mb-1">End Date</p>
                  <p className="text-slate-900">{new Date(initiative.timeline_end_date).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Placeholder sections for future implementation */}
        <div className="bg-white rounded-lg p-6 border border-slate-200 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Attachments</h2>
          <p className="text-slate-500 italic">No attachments yet. File upload coming soon...</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Contacts</h2>
          <p className="text-slate-500 italic">No contacts yet. Contact management coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default InitiativeDetailView;
