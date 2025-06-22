import React from "react";

export default function CautionModal({ isOpen, onClose, onRedirect }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold text-yellow-600 mb-4">Notice</h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          Please make sure your wallet has enough funds to support this project.
          If your balance is insufficient, you may not be able to create the
          project, and there’s a risk of losing any unsaved project data.
          Consider topping up before proceeding.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onRedirect}
            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
          >
            Top Up Wallet
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm"
          >
            Continue Anyway
          </button>
        </div>
      </div>
    </div>
  );
}
