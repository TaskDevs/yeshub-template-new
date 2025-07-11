import React, { useState } from "react";

const SalaryModal = ({ onClose, candidateData, action }) => {
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("Milestones");

  const handleSubmit = () => {
    if (!amount || isNaN(amount)) {
      alert("Please enter a valid amount");
      return;
    }

    const salaryData = {
      amount,
      payment_type: paymentType,
    };

    if (candidateData.job_id == 0) {
      action[1]({ ...candidateData, ...salaryData }); // Callback to parent
    } else {
      action[0]({ ...candidateData, ...salaryData }); // Callback to parent
    }
    onClose(); // Close modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-100">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Set Salary</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm">Amount (GHS)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="text-sm">Payment Type</label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md"
            >
              {/* <option value="Monthly">Monthly</option>
              <option value="Per Project">Per Project</option> */}
              <option value="Milestone">Milestone</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryModal;
