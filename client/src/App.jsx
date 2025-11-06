/**
 * Main Application Component
 * Root component that sets up routing and global state
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [apiStatus, setApiStatus] = useState('checking');
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    // Test API connection
    const checkAPI = async () => {
      try {
        const response = await axios.get('http://localhost:3000/health');
        setApiStatus('connected');
        setApiData(response.data);
      } catch (error) {
        setApiStatus('error');
        console.error('API connection error:', error);
      }
    };

    checkAPI();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            🚀 Innovation Lifecycle Manager
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Track innovation initiatives from ideation through deployment
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="card max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            ✅ Project Scaffolding Complete!
          </h2>

          {/* API Status */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Backend API Status:
            </h3>
            <div className="flex items-center gap-2">
              {apiStatus === 'checking' && (
                <span className="flex items-center text-yellow-600">
                  <span className="inline-block w-2 h-2 bg-yellow-600 rounded-full mr-2 animate-pulse"></span>
                  Checking connection...
                </span>
              )}
              {apiStatus === 'connected' && (
                <span className="flex items-center text-green-600">
                  <span className="inline-block w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Connected
                </span>
              )}
              {apiStatus === 'error' && (
                <span className="flex items-center text-red-600">
                  <span className="inline-block w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                  Not connected (Make sure backend is running)
                </span>
              )}
            </div>
            {apiData && (
              <div className="mt-2 p-3 bg-gray-50 rounded text-sm">
                <pre className="text-gray-700">
                  {JSON.stringify(apiData, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Setup Complete Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-blue-900 mb-3">
              🎉 Setup Complete
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start">
                <span className="mr-2">✅</span>
                <span>Database: SQLite with schema and seed data</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✅</span>
                <span>Backend: Express.js API server on port 3000</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✅</span>
                <span>Frontend: React with Vite and Tailwind CSS</span>
              </li>
            </ul>
          </div>

          {/* Next Steps */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              📋 Next Steps:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li>Test the database (check data directory)</li>
              <li>Verify API endpoints are working</li>
              <li>Commit the scaffolding to Git</li>
              <li>Start building features! 🚀</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
