import React from "react";

export default function ConfirmPaymentModal({
  isOpen,
  onClose,
  onConfirm,
  paymentInfo,
}) {
  if (!isOpen) return null;

  const handlePayment = () => {
    onConfirm(paymentInfo.item);
    onClose();
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

        <h2 className="text-xl font-semibold text-yellow-600 mb-4">Notice</h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          By this action, you are agreeing to pay{" "}
          <strong>{paymentInfo.fullName}</strong> an amount of{" "}
          <strong>GHS {paymentInfo.salary}</strong> for completing the following
          tasks:
        </p>

        <ul className="list-disc list-inside text-sm text-gray-600 mb-6 space-y-1">
          {paymentInfo?.task?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <div className="flex justify-end gap-2">
          <button
            onClick={handlePayment}
            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
          >
            Confirm Payment
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
