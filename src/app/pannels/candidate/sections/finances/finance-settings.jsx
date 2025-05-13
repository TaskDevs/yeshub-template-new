import React, { useState } from "react";
import AddPaymentMethodModal from "./AddPaymentMethodModal";

const FinancialSettings = () => {
  const [withdrawalAmount, setWithdrawalAmount] = useState("100");
  const [withdrawalFrequency, setWithdrawalFrequency] = useState("Weekly");
  const [autoWithdraw, setAutoWithdraw] = useState(true);
   const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "Bank Account (US)",
      details: "Chase Bank ****4532",
      default: true,
    },
    {
      id: 2,
      type: "Mobile Money",
      details: "+233 54 123 4567",
      default: false,
    },
  ]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethods.find((p) => p.default)?.id || null
  );

  const handleSetDefault = (id) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({ ...method, default: method.id === id }))
    );
    setSelectedPaymentMethod(id);
  };



  const handleCancel = () => {
    alert("Changes discarded.");
    // You can add logic to reset to initial state if needed.
  };

  const handleSave = () => {
    alert("Settings saved!");
    console.log("Saved settings:", {
      withdrawalAmount,
      withdrawalFrequency,
      autoWithdraw,
      selectedPaymentMethod,
    });
  };

  return (
    <div className="tw-css p-6 md:p-12 space-y-8">
      <h1 className="text-2xl font-semibold">Financial Settings</h1>
      <p className="text-gray-500">
        Manage your payment methods, billing information and tax settings
      </p>

      {/* Payment Methods */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold">Payment Methods</h2>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`border p-4 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 ${
                  selectedPaymentMethod === method.id
                    ? "ring-2 ring-green-500"
                    : ""
                }`}
                onClick={() => handleSetDefault(method.id)}
              >
                <div>
                  <p className="font-medium">{method.type}</p>
                  <p className="text-sm text-gray-500">{method.details}</p>
                </div>
                {method.default && (
                  <span className="text-green-600 font-medium">Default</span>
                )}
              </div>
            ))}
            <button
            onClick={() => setIsModalOpen(true)}
              className="text-green-600 hover:underline text-sm"
            >
              + Add Payment Method
            </button>
          </div>
        </div>

        {/* Billing Information */}
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold">Billing Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="border p-2 rounded"
              placeholder="Company Name"
              defaultValue="Acme Corporation"
            />
            <input
              className="border p-2 rounded"
              placeholder="Billing Address"
              defaultValue="123 Business Street"
            />
            <input
              className="border p-2 rounded"
              placeholder="City"
              defaultValue="San Francisco"
            />
            <input
              className="border p-2 rounded"
              placeholder="State"
              defaultValue="California"
            />
            <input
              className="border p-2 rounded"
              placeholder="ZIP Code"
              defaultValue="94105"
            />
            <select className="border p-2 rounded">
              <option>United States</option>
              <option>Canada</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tax Settings & Withdrawal */}
      <div className="grid md:grid-cols-2 gap-4 mb-4 py-3">
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold">Tax Settings</h2>
          <input
            className="border p-2 rounded w-full"
            placeholder="Tax ID / VAT Number"
            defaultValue="US123456789"
          />
          <select className="border p-2 rounded w-full" defaultValue="W-9 Form">
            <option>W-9 Form</option>
            <option>W-8BEN Form</option>
          </select>
          <select
            className="border p-2 rounded w-full"
            defaultValue="United States"
          >
            <option>United States</option>
            <option>Canada</option>
          </select>
          <button className="text-green-600 hover:underline text-sm">
            Download Tax Documents
          </button>
        </div>

        {/* Withdrawal Options */}
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold">Withdrawal Options</h2>
          <input
            type="number"
            className="border p-2 rounded w-full"
            placeholder="Minimum Withdrawal Amount"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(e.target.value)}
          />
          <select
            className="border p-2 rounded w-full"
            value={withdrawalFrequency}
            onChange={(e) => setWithdrawalFrequency(e.target.value)}
          >
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
          <select
            className="border p-2 rounded w-full"
            value={selectedPaymentMethod}
          >
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.type} - {method.details}
              </option>
            ))}
          </select>
          <div className="flex items-center justify-between">
            <label htmlFor="autoWithdraw">Automatic Withdrawals</label>
            <input
              id="autoWithdraw"
              type="checkbox"
              checked={autoWithdraw}
              onChange={() => setAutoWithdraw(!autoWithdraw)}
              className="form-checkbox h-5 w-5 text-green-600"
            />
          </div>
        </div>
      </div>
      {/* Payment methos modal */}
      <AddPaymentMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {/* Save / Cancel Buttons */}
      <div className="flex justify-end gap-2 py-3">
        <button
          onClick={handleCancel}
          className="border px-4 py-2 rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default FinancialSettings;
