/**
 * Initiative Detail View Component
 * Full-screen view showing comprehensive initiative information
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInitiativeById, getContacts } from '../services/api';

const InitiativeDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initiative, setInitiative] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInitiative();
    fetchContacts();
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

  const fetchContacts = async () => {
    try {
      const response = await getContacts(id);
      setContacts(response.data.contacts || []);
    } catch (err) {
      console.error('Error fetching contacts:', err);
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
        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          {initiative.title}
        </h1>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Problem Statement */}
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Problem Statement
              </h2>
              <p className="text-slate-700 whitespace-pre-wrap">{initiative.problem_statement}</p>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                Description
              </h2>
              <p className="text-slate-700 whitespace-pre-wrap">
                {initiative.detailed_description || initiative.description}
              </p>
            </div>

            {/* Timeline */}
            {(initiative.idea_date || initiative.concept_date || initiative.project_start_date ||
              initiative.development_date || initiative.deployment_date || initiative.completion_date) && (
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">⏱️</span>
                  Timeline
                </h2>

                {/* Timeline visualization */}
                <div className="space-y-4">
                  {/* Full timeline with all milestones */}
                  <div className="relative">
                    <div className="flex items-start">
                      {/* Timeline milestones in order */}
                      {[
                        { key: 'idea', label: 'Idea', icon: '💡', date: initiative.idea_date },
                        { key: 'concept', label: 'Concept', icon: '📋', date: initiative.concept_date },
                        { key: 'project_start', label: 'Project Start', date: initiative.project_start_date, isLine: true },
                        { key: 'development', label: 'Development', icon: '⚙️', date: initiative.development_date },
                        { key: 'deployment', label: 'Deployment', icon: '🚀', date: initiative.deployment_date },
                        { key: 'completion', label: 'Completion', date: initiative.completion_date, isLine: true }
                      ].map((milestone, index, array) => {
                        if (!milestone.date) return null;

                        const milestoneDate = new Date(milestone.date);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const isPast = milestoneDate < today;
                        const isFuture = milestoneDate > today;
                        const isToday = milestoneDate.toDateString() === today.toDateString();

                        return (
                          <React.Fragment key={milestone.key}>
                            <div className="flex flex-col items-center flex-1 relative">
                              {/* Milestone marker */}
                              {milestone.isLine ? (
                                <div className={`w-1 h-10 mb-2 ${
                                  isToday
                                    ? 'bg-blue-600 ring-2 ring-blue-200'
                                    : isPast
                                    ? 'bg-slate-600'
                                    : 'bg-slate-300'
                                }`}></div>
                              ) : (
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl mb-2"
                                  style={{
                                    backgroundColor: isToday ? '#2563eb' : isPast ? '#475569' : '#e2e8f0'
                                  }}>
                                  {milestone.icon}
                                </div>
                              )}

                              {/* Label */}
                              <p className={`text-xs font-medium mb-1 text-center ${
                                isToday ? 'text-blue-900' : isPast ? 'text-slate-700' : 'text-slate-400'
                              }`}>
                                {milestone.label}
                              </p>

                              {/* Date */}
                              <p className={`text-xs ${
                                isToday ? 'text-blue-600 font-semibold' : isFuture ? 'text-slate-400 italic' : 'text-slate-600'
                              }`}>
                                {milestoneDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </p>

                              {/* Today marker */}
                              {isToday && (
                                <div className="absolute -bottom-4 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                                  TODAY
                                </div>
                              )}
                            </div>

                            {/* Arrow between milestones */}
                            {index < array.length - 1 && array[index + 1].date && (
                              <div className="flex items-center justify-center" style={{ paddingTop: '20px', minWidth: '40px' }}>
                                <div className={`h-0.5 w-full relative ${
                                  isPast ? 'bg-slate-600' : 'bg-slate-300'
                                }`}>
                                  <div className={`absolute right-0 w-0 h-0 border-l-[6px] border-y-[6px] border-y-transparent ${
                                    isPast ? 'border-l-slate-600' : 'border-l-slate-300'
                                  }`} style={{ top: '-5.5px' }}></div>
                                </div>
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - People & Details */}
          <div className="space-y-6">
            {/* People Section */}
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">👥</span>
                People
              </h2>
              <div className="space-y-2">
                {/* Group users by email to avoid duplicates */}
                {initiative.users && (() => {
                  // Group users by email/id
                  const userMap = new Map();

                  initiative.users.forEach(user => {
                    const key = user.email || `${user.first_name}_${user.last_name}`;
                    if (!userMap.has(key)) {
                      userMap.set(key, {
                        ...user,
                        roles: [user.type_name]
                      });
                    } else {
                      userMap.get(key).roles.push(user.type_name);
                    }
                  });

                  // Role badge configurations
                  const roleBadges = {
                    'SUBMITTER': { label: 'Submitter', color: 'bg-slate-400' },
                    'BUSINESS_OWNER': { label: 'Business Owner', color: 'bg-blue-600' },
                    'IT_OWNER': { label: 'IT Owner', color: 'bg-slate-600' },
                    'CONTACT': { label: 'Contact', color: 'bg-slate-500' },
                    'REVIEWER': { label: 'Reviewer', color: 'bg-purple-600' }
                  };

                  // Sort by role priority: Business Owner first, IT Owner second, then rest
                  const rolePriority = { 'BUSINESS_OWNER': 1, 'IT_OWNER': 2, 'SUBMITTER': 3, 'CONTACT': 4, 'REVIEWER': 5 };
                  const sortedUsers = Array.from(userMap.values()).sort((a, b) => {
                    const minRoleA = Math.min(...a.roles.map(r => rolePriority[r] || 99));
                    const minRoleB = Math.min(...b.roles.map(r => rolePriority[r] || 99));
                    return minRoleA - minRoleB;
                  });

                  // Separate owners from others
                  const owners = sortedUsers.filter(u => u.roles.includes('BUSINESS_OWNER') || u.roles.includes('IT_OWNER'));
                  const others = sortedUsers.filter(u => !u.roles.includes('BUSINESS_OWNER') && !u.roles.includes('IT_OWNER'));

                  return (
                    <>
                      {/* Owners */}
                      {owners.map((user, idx) => {
                        // Business Owner = Green, IT Owner = Blue, Rest = Gray
                        let cardBg = 'bg-slate-50 border-slate-200';
                        if (user.roles.includes('BUSINESS_OWNER')) {
                          cardBg = 'bg-green-50 border-green-200';
                        } else if (user.roles.includes('IT_OWNER')) {
                          cardBg = 'bg-blue-50 border-blue-200';
                        }

                        return (
                          <div key={idx} className={`p-3 rounded-lg border ${cardBg}`}>
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-semibold text-slate-900 text-sm">
                                {user.first_name} {user.last_name}
                              </p>
                              <div className="flex flex-wrap gap-1 justify-end">
                                {user.roles.map((role, roleIdx) => {
                                  const badge = roleBadges[role] || { label: role, color: 'bg-gray-500' };
                                  return (
                                    <span key={roleIdx} className={`text-xs ${badge.color} text-white px-2 py-0.5 rounded-full whitespace-nowrap`}>
                                      {badge.label}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                            {(user.function || user.department) && (
                              <p className="text-xs text-slate-600 mt-0.5">
                                {user.function}
                                {user.function && user.department && ' • '}
                                {user.department && `Dept: ${user.department}`}
                              </p>
                            )}
                            {(user.email || user.phone) && (
                              <div className="mt-2 space-y-1">
                                {user.email && (
                                  <p className="text-xs text-slate-600 flex items-center gap-1">
                                    <span>✉️</span>
                                    <a href={`mailto:${user.email}`} className="hover:text-blue-600">
                                      {user.email}
                                    </a>
                                  </p>
                                )}
                                {user.phone && (
                                  <p className="text-xs text-slate-600 flex items-center gap-1">
                                    <span>📱</span>
                                    <a href={`tel:${user.phone}`} className="hover:text-blue-600">
                                      {user.phone}
                                    </a>
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Separator between owners and others */}
                      {owners.length > 0 && others.length > 0 && (
                        <div className="border-t border-slate-300 my-3"></div>
                      )}

                      {/* Others (Submitter, Contacts, Reviewers) */}
                      {others.map((user, idx) => {
                        const cardBg = 'bg-slate-50 border-slate-200';

                        return (
                          <div key={`other-${idx}`} className={`p-3 rounded-lg border ${cardBg}`}>
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-semibold text-slate-900 text-sm">
                                {user.first_name} {user.last_name}
                              </p>
                              <div className="flex flex-wrap gap-1 justify-end">
                                {user.roles.map((role, roleIdx) => {
                                  const badge = roleBadges[role] || { label: role, color: 'bg-gray-500' };
                                  return (
                                    <span key={roleIdx} className={`text-xs ${badge.color} text-white px-2 py-0.5 rounded-full whitespace-nowrap`}>
                                      {badge.label}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                            {(user.function || user.department) && (
                              <p className="text-xs text-slate-600 mt-0.5">
                                {user.function}
                                {user.function && user.department && ' • '}
                                {user.department && `Dept: ${user.department}`}
                              </p>
                            )}
                            {(user.email || user.phone) && (
                              <div className="mt-2 space-y-1">
                                {user.email && (
                                  <p className="text-xs text-slate-600 flex items-center gap-1">
                                    <span>✉️</span>
                                    <a href={`mailto:${user.email}`} className="hover:text-blue-600">
                                      {user.email}
                                    </a>
                                  </p>
                                )}
                                {user.phone && (
                                  <p className="text-xs text-slate-600 flex items-center gap-1">
                                    <span>📱</span>
                                    <a href={`tel:${user.phone}`} className="hover:text-blue-600">
                                      {user.phone}
                                    </a>
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Visuals Placeholder */}
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🎨</span>
                Visuals
              </h2>
              <p className="text-slate-500 text-sm italic">No visuals attached yet</p>
            </div>
          </div>
        </div>

        {/* Bottom Section - Attachments */}
        <div className="mt-6">
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">📎</span>
              Attachments
            </h2>
            <p className="text-slate-500 text-sm italic">No attachments yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitiativeDetailView;
