import React, { useState } from "react";

export default function AddPaymentMethodModal({ isOpen, onClose }) {
  const [method, setMethod] = useState("card"); // card | bank | momo

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Add Payment Method
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mb-4 border-b">
          {["card", "bank", "momo"].map((type) => (
            <button
              key={type}
              className={`flex-1 py-2 text-sm font-medium capitalize ${
                method === type
                  ? "border-b-2 border-green-600 text-green-600"
                  : "text-gray-500 hover:text-indigo-600"
              }`}
              onClick={() => setMethod(type)}
            >
              {type === "card"
                ? "Credit Card"
                : type === "bank"
                ? "Bank"
                : "MoMo"}
            </button>
          ))}
        </div>

        {/* Form based on method */}
        <form className="space-y-4">
          {method === "card" && (
            <>
              <Input label="Cardholder Name" placeholder="John Doe" />
              <Input label="Card Number" placeholder="1234 5678 9012 3456" />
              <div className="flex gap-4">
                <Input
                  label="Expiry Date"
                  placeholder="MM/YY"
                  className="w-1/2"
                />
                <Input label="CVV" placeholder="123" className="w-1/2" />
              </div>
            </>
          )}

          {method === "bank" && (
            <>
              <Input label="Account Holder Name" placeholder="John Doe" />
              <Input label="Bank Name" placeholder="Chase Bank" />
              <Input label="Account Number" placeholder="0123456789" />
              <Input label="Routing Number" placeholder="110000" />
            </>
          )}

          {method === "momo" && (
            <>
              <Input label="Account Name" placeholder="John Doe" />

              {/* Dropdown for Network Provider */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Network Provider
                </label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select provider
                  </option>
                  <option value="MTN">MTN</option>
                  <option value="Airtel/Tigo">Airtel/Tigo</option>
                  <option value="Telecel">Telecel</option>
                </select>
              </div>

              <Input label="Mobile Number" placeholder="+233 24 000 0000" />
            </>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-green-600 rounded"
            >
              Add{" "}
              {method === "card" ? "Card" : method === "bank" ? "Bank" : "MoMo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reusable Input component
const Input = ({ label, placeholder, className = "" }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
    />
  </div>
);
