import React from "react";

const ShareInvoiceModal = ({ invoiceId, isOpen, onClose }) => {
  if (!isOpen) return null;

  const shareLink = `https://invoice.example.com/share/${invoiceId}`;

  return (
    <div className="fixed inset-0 z-100 bg-black bg-opacity-30 flex items-start justify-center pt-24 px-4 pb-10">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Share Invoice {invoiceId}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 text-lg hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        {/* Share via Email */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Share via Email
          </label>
          <input
            type="email"
            placeholder="Enter recipient's email"
            className="w-full border rounded px-3 py-2 mb-2"
          />
          <textarea
            placeholder="Add a message (optional)"
            className="w-full border rounded px-3 py-2 mb-3"
            rows={2}
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Send Email
          </button>
        </div>

        {/* Share Link */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Share Link</label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={shareLink}
              className="w-full border rounded px-3 py-2"
            />
            <button
              onClick={() => navigator.clipboard.writeText(shareLink)}
              className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Permissions */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Permission Settings
          </label>
          <div className="flex flex-row gap-1 text-sm">
            <label className="flex items-center">
              <input type="radio" name="permission" defaultChecked />
              View only
            </label>
            <label className="flex items-center">
              <input type="radio" name="permission" />
              View and edit
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareInvoiceModal;
