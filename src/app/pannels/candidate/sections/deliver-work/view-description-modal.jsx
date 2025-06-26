import React from "react";

export default function SubmittedDataInfoModal({
  isOpen,
  onClose,
  description,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-6">Submitted Data Info</h2>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm text-gray-500">Description</label>
          <p className="mt-1 text-gray-700 whitespace-pre-wrap">
            {description || "—"}
          </p>
        </div>

        {/* Close button */}
        <div className="flex justify-end pt-4 border-t">
          <button
            onClick={onClose}
            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
