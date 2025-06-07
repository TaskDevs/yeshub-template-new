import React, { useState } from "react";

export default function ReleasePaymentModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState(1000);
  const [milestone, setMilestone] = useState("Frontend Development");
  const [notes, setNotes] = useState("");

  const escrowBalance = 3200;
  const remainingEscrow = escrowBalance - amount;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 mt-10 pt-5">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Release Payment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Payment Amount</label>
          <div className="flex items-center border border-gray-300 rounded-md">
            <span className="px-3 text-gray-600">₵</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-2 py-2 rounded-r-md focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Associated Milestone</label>
          <select
            value={milestone}
            onChange={(e) => setMilestone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          >
            <option value="Frontend Development">Frontend Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Final Delivery">Final Delivery</option>
          </select>
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Add notes for this payment"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-md mb-4 text-sm">
          <div className="flex justify-between mb-1">
            <span>Current Escrow Balance:</span>
            <span>₵{escrowBalance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Payment Amount:</span>
            <span>₵{amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Remaining Escrow:</span>
            <span>₵{remainingEscrow.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => alert("Payment Released")}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Release Payment
          </button>
        </div>
      </div>
    </div>
  );
}
