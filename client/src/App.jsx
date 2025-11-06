/**
 * Main Application Component
 * Root component with routing and layout
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import SubmitIdea from './components/SubmitIdea';
import KanbanBoard from './components/KanbanBoard';
import { checkHealth } from './services/api';

function AppContent() {
  const [apiStatus, setApiStatus] = useState('checking');
  const location = useLocation();

  useEffect(() => {
    // Test API connection on mount
    const testConnection = async () => {
      try {
        await checkHealth();
        setApiStatus('connected');
      } catch (error) {
        setApiStatus('error');
        console.error('API connection error:', error);
      }
    };

    testConnection();
  }, []);

  // Determine active nav item
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                Innovation Lifecycle Manager
              </h1>
              <p className="text-sm text-slate-600 mt-2 font-medium">
                Track innovation initiatives from ideation through deployment
              </p>
            </div>

            {/* API Status Indicator */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">API:</span>
              {apiStatus === 'checking' && (
                <span className="flex items-center text-slate-600 text-sm">
                  <span className="inline-block w-2 h-2 bg-slate-400 rounded-full mr-2 animate-pulse"></span>
                  Checking...
                </span>
              )}
              {apiStatus === 'connected' && (
                <span className="flex items-center text-slate-700 text-sm">
                  <span className="inline-block w-2 h-2 bg-slate-800 rounded-full mr-2"></span>
                  Connected
                </span>
              )}
              {apiStatus === 'error' && (
                <span className="flex items-center text-slate-600 text-sm">
                  <span className="inline-block w-2 h-2 bg-slate-400 rounded-full mr-2"></span>
                  Offline
                </span>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex gap-3">
            <Link
              to="/board"
              className={`px-5 py-2.5 rounded-lg font-semibold transition-colors ${
                isActive('/board')
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Board
            </Link>
            <Link
              to="/"
              className={`px-5 py-2.5 rounded-lg font-semibold transition-colors ${
                isActive('/')
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Submit Idea
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {apiStatus === 'error' ? (
          <div className="card max-w-2xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Backend Server Not Running
              </h2>
              <p className="text-slate-600 mb-6 text-lg">
                Please start the backend server to use this application.
              </p>
              <div className="bg-slate-900 rounded-lg p-5 text-left border-l-4 border-slate-700">
                <code className="text-sm text-slate-300 font-mono">
                  npm run dev:server
                </code>
              </div>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/board" element={<KanbanBoard />} />
            <Route path="/" element={<SubmitIdea />} />
          </Routes>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-500">
            Innovation Lifecycle Manager - Demo Application
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
