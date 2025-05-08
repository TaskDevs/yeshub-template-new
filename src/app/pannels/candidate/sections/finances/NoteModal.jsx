import React from 'react';

const NoteModal = ({ isOpen, onClose, onConfirm, note, setNote }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Add a Note</h3>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 text-sm mb-4"
          rows="4"
          placeholder="Reason or reference for this withdrawal..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-green-600 text-white rounded"
          >
            Confirm Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
