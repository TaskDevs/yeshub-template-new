import React, { useState } from "react";
import axios from "axios";
import { REACT_BASE_URL } from "../../../../../globals/constants";
import { userId } from "../../../../../globals/constants";

const AddFundsModal = ({
  currentBalance = 0,
  onClose,
  // userEmail = "user@example.com",
  // publicKey = "pk_test_4f271cd3393b42fad1fd0da6ca762aef8ed4f898", // use your actual PUBLIC key here
  // onSuccess, // callback to refresh wallet balance after top-up
}) => {
  const [amount, setAmount] = useState(1000);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const newBalance = currentBalance + Number(amount || 0);

  // const getPaystackChannels = (method) => {
  //   switch (method) {
  //     case "Credit Card":
  //       return ["card"];
  //     case "Bank Transfer":
  //       return ["bank"];
  //     case "Mobile Money":
  //       return ["mobile_money"];
  //     default:
  //       return ["card"];
  //   }
  // };

  const handlePaystackPayment = async () => {
    setLoading(true); // Start loading
    try {
      // Prepare payload
      const payload = {
        user_id: userId, // Get this from auth context or props
        amount: amount,
      };

      const res = await axios.post(`${REACT_BASE_URL}wallet/add`, payload);

      if (res.data.status && res.data.paymentUrl) {
        window.location.href = res.data.paymentUrl; // Redirect to Paystack
      } else {
        alert("Failed to initiate payment: " + res.data.message);
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Something went wrong initiating payment.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-100 mt-10 pt-5">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add Funds to Wallet</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm">Amount (GHS)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md"
            />
          </div>

          <div>
            <label className="text-sm">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md"
            >
              <option>Credit Card</option>
              <option>Bank Transfer</option>
              <option>Mobile Money</option>
            </select>
          </div>

          <div>
            <label className="text-sm">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mt-1 resize-none"
              placeholder="Add notes for this transaction"
            />
          </div>

          <div className="text-sm bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between">
              <span>Current Balance:</span>
              <span>₵{currentBalance.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>New Balance:</span>
              <span className="text-green-600 font-semibold">
                ₵{newBalance.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-600"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handlePaystackPayment}
              className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Processing..." : "Add Funds"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFundsModal;
