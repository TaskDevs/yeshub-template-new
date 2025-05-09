import React from 'react';

export default function ProfileCompletion({ completion, incompleteSections }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow border mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Profile Completion</h2>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full transition-all"
            style={{ width: `${completion}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">{completion}% complete</p>
      </div>

      {/* Checklist of incomplete sections */}
      {incompleteSections.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Incomplete Sections:</h3>
          <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
            {incompleteSections.map((section, idx) => (
              <li key={idx}>{section.replace(/([A-Z])/g, ' $1')}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
