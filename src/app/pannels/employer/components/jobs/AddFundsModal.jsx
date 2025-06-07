import React, { useState } from "react";

const AddFundsModal = ({ currentBalance = 3200, onClose, onAddFunds }) => {
  const [amount, setAmount] = useState(1000);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [notes, setNotes] = useState("");

  const newBalance = currentBalance + Number(amount || 0);

  return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-100 mt-10 pt-5">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add Funds to Escrow</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">&times;</button>
        </div>

        {/* Form Fields */}
        <div className="space-y-1">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount to Add</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₵</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Credit Card</option>
              <option>Bank Transfer</option>
              <option>PayPal</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border rounded-md px-3 py-2 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add notes for this transaction"
            />
          </div>

          {/* Summary */}
          <div className="bg-gray-50 p-4 rounded-md text-sm">
            <div className="flex justify-between py-1">
              <span>Current Escrow Balance:</span>
              <span className="font-medium">₵{currentBalance.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Amount to Add:</span>
              <span className="font-medium">₵{Number(amount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>New Escrow Balance:</span>
              <span className="font-semibold text-green-600">₵{newBalance.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onAddFunds({ amount, paymentMethod, notes })}
            className="px-5 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
          >
            Add Funds
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFundsModal;
