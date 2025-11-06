/**
 * Main Application Component
 * Root component with routing and layout
 */

import React, { useState, useEffect } from 'react';
import SubmitIdea from './components/SubmitIdea';
import { checkHealth } from './services/api';

function App() {
  const [apiStatus, setApiStatus] = useState('checking');

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                🚀 Innovation Lifecycle Manager
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Track innovation initiatives from ideation through deployment
              </p>
            </div>

            {/* API Status Indicator */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">API:</span>
              {apiStatus === 'checking' && (
                <span className="flex items-center text-yellow-600 text-sm">
                  <span className="inline-block w-2 h-2 bg-yellow-600 rounded-full mr-2 animate-pulse"></span>
                  Checking...
                </span>
              )}
              {apiStatus === 'connected' && (
                <span className="flex items-center text-green-600 text-sm">
                  <span className="inline-block w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Connected
                </span>
              )}
              {apiStatus === 'error' && (
                <span className="flex items-center text-red-600 text-sm">
                  <span className="inline-block w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                  Offline
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {apiStatus === 'error' ? (
          <div className="card max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Backend Server Not Running
              </h2>
              <p className="text-gray-600 mb-4">
                Please start the backend server to use this application.
              </p>
              <div className="bg-gray-50 rounded p-4 text-left">
                <code className="text-sm text-gray-800">
                  npm run dev:server
                </code>
              </div>
            </div>
          </div>
        ) : (
          <SubmitIdea />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Innovation Lifecycle Manager - Demo Application
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
