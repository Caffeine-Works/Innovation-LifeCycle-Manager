/**
 * Submit Idea Component
 * Form for submitting new innovation ideas
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInitiative } from '../services/api';

const SubmitIdea = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    problemStatement: '',
    category: 'TECHNOLOGY'
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when user starts typing
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await createInitiative(formData);

      // Success!
      setSuccess(true);

      // Clear form
      setFormData({
        title: '',
        description: '',
        problemStatement: '',
        category: 'TECHNOLOGY'
      });

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Navigate to board after 2 seconds
      setTimeout(() => {
        navigate('/board');
      }, 2000);

    } catch (err) {
      // Handle validation errors
      if (err.response?.data?.details) {
        const errorMessages = err.response.data.details
          .map(detail => `${detail.field}: ${detail.message}`)
          .join(', ');
        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || 'Failed to submit idea. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          💡 Submit New Idea
        </h1>
        <p className="text-gray-600">
          Share your innovation idea to get it tracked and reviewed by the team.
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-green-600 text-xl mr-3">✓</span>
            <div>
              <h3 className="text-green-900 font-semibold">Idea Submitted Successfully!</h3>
              <p className="text-green-700 text-sm mt-1">
                Your innovation idea has been created and is now in the IDEA stage.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-red-600 text-xl mr-3">✕</span>
            <div>
              <h3 className="text-red-900 font-semibold">Submission Failed</h3>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="card">
        {/* Title */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            minLength={10}
            maxLength={200}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., AI-Powered Meeting Scheduler"
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.title.length}/200 characters (minimum 10)
          </p>
        </div>

        {/* Category */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="TECHNOLOGY">Technology Innovation</option>
            <option value="PROCESS">Process Improvement</option>
            <option value="PRODUCT">Product Development</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Problem Statement */}
        <div className="mb-6">
          <label htmlFor="problemStatement" className="block text-sm font-medium text-gray-700 mb-2">
            Problem Statement <span className="text-red-500">*</span>
          </label>
          <textarea
            id="problemStatement"
            name="problemStatement"
            value={formData.problemStatement}
            onChange={handleChange}
            required
            minLength={20}
            maxLength={2000}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="What problem does this innovation solve? Be specific about the pain points and current challenges..."
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.problemStatement.length}/2000 characters (minimum 20)
          </p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            minLength={50}
            maxLength={5000}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe your innovation idea in detail. What is it? How would it work? What benefits would it provide?"
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.description.length}/5000 characters (minimum 50)
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="text-red-500">*</span> Required fields
          </p>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Submit Idea
              </>
            )}
          </button>
        </div>
      </form>

      {/* Help Text */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 Tips for a Great Submission</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Be specific and clear about the problem you're trying to solve</li>
          <li>• Explain how your idea would benefit the organization</li>
          <li>• Include any relevant examples or use cases</li>
          <li>• Don't worry about perfection - ideas can be refined later!</li>
        </ul>
      </div>
    </div>
  );
};

export default SubmitIdea;
