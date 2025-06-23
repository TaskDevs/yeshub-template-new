import React from "react";

export default function ReceiptModal({ isOpen, onClose, receiptData }) {
  if (!isOpen || !receiptData) return null;

  const { ref_no, freelance_name, amount, milestone_completed } = receiptData;

  const handleDownload = () => {
    const content = `
      Receipt Ref No: ${ref_no}
      Freelancer: ${freelance_name}
      Amount Paid: GHS ${amount}
      Milestone: ${milestone_completed.name}
      Due Date: ${milestone_completed.due_date}
      Description: ${milestone_completed.description}
      Tasks:
      ${milestone_completed.deliverables.map((d) => `  - ${d}`).join("\n")}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${ref_no}_receipt.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Payment Receipt
        </h2>

        <p className="text-sm text-gray-700 mb-2">
          <strong>Receipt Ref No:</strong> {ref_no}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <strong>Freelancer:</strong> {freelance_name}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <strong>Amount Paid:</strong> GHS {amount}
        </p>

        <hr className="my-4" />

        <p className="text-sm text-gray-700 mb-1">
          <strong>Milestone:</strong> {milestone_completed.name}
        </p>
        <p className="text-sm text-gray-700 mb-1">
          <strong>Due Date:</strong> {milestone_completed.due_date}
        </p>
        <p className="text-sm text-gray-700 mb-3">
          <strong>Description:</strong> {milestone_completed.description}
        </p>

        <h4 className="text-sm font-semibold text-gray-600 mb-1">
          Tasks Completed:
        </h4>
        <ul className="list-disc list-inside text-sm text-gray-600 mb-6 space-y-1">
          {milestone_completed.deliverables.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>

        <div className="flex justify-end gap-2">
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
          >
            Download Receipt
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
