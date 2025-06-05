import React, { useState, useContext } from "react";
import { userId } from "../../../../../globals/constants";
import { PaymentApiData } from "../../../../context/payment/paymentContextApi";
import Swal from "sweetalert2";

export default function AddPaymentMethodModal({
  isOpen,
  onClose,
  paymentItemsNo,
}) {
  const { processAddPaymentMethod } = useContext(PaymentApiData);
  const [method, setMethod] = useState("card"); // card | bank | momo
  const role = sessionStorage.getItem("userRole")
  const [formData, setFormData] = useState({
    default: true,
    expiry_date: null,
    account_name: null,
    bank_name: null,
    account_number: null,
    routing_number: null,
    network_type: null,
    mobile_number: null,
    card_holder_name: null,
    card_number: null,
    cvv: null,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    let newData;
    switch (method) {
      case "card":
        newData = {
          type: "card",
          user_id: userId,
          card_holder_name: formData.card_holder_name,
          card_number: formData.card_number,
          cvv: formData.cvv,
          expiry_date: formData.expiry_date,
          default: false,
          item_number: paymentItemsNo + 1,
        };
        break;
      case "bank":
        newData = {
          type: "bank",
          user_id: userId,
          account_name: formData.account_name,
          bank_name: formData.bank_name,
          account_number: formData.account_number,
          routing_number: formData.routing_number,
          default: false,
          item_number: paymentItemsNo + 1,
        };
        break;
      case "momo":
        newData = {
          type: "momo",
          user_id: userId,
          account_name: formData.account_name,
          network_type: formData.network_type,
          mobile_number: formData.mobile_number,
          default: false,
          item_number: paymentItemsNo + 1,
        };
        break;
      default:
        return null;
    }

    let result = await processAddPaymentMethod(newData);
    if (result) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Payent method saved",
        showConfirmButton: false,
        timer: 1500,
      });
      onClose();
    } else {
      console.log("Error submitting proposal");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong, try again",
      });
    }
  };

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
         {["card", "bank", "momo"]
  .filter((type) => role !== "freelancer" || type !== "card")
  .map((type) => (
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
              <Input
                label="Cardholder Name"
                name="card_holder_name"
                placeholder="John Doe"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <Input
                label="Card Number"
                name="card_number"
                placeholder="1234 5678 9012 3456"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <div className="flex gap-4">
                <Input
                  label="Expiry Date"
                  name="expiry_date"
                  placeholder="MM/YY"
                  className="w-1/2"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <Input
                  label="CVV"
                  name="cvv"
                  placeholder="123"
                  className="w-1/2"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
            </>
          )}

          {method === "bank" && (
            <>
              <Input
                label="Account Holder Name"
                name="account_name"
                placeholder="John Doe"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <Input
                label="Bank Name"
                name="bank_name"
                placeholder="Chase Bank"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <Input
                label="Account Number"
                name="account_number"
                placeholder="0123456789"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <Input
                label="Routing Number"
                name="routing_number"
                placeholder="110000"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </>
          )}

          {method === "momo" && (
            <>
              <Input
                label="Account Name"
                name="account_name"
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="John Doe"
              />

              {/* Dropdown for Network Provider */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Network Provider
                </label>
                <select
                  name="network_type"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
                  defaultValue=""
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option value="" disabled>
                    Select provider
                  </option>
                  <option value="MTN">MTN</option>
                  <option value="Airtel/Tigo">Airtel/Tigo</option>
                  <option value="Telecel">Telecel</option>
                </select>
              </div>

              <Input
                label="Mobile Number"
                name="mobile_number"
                placeholder="+233 24 000 0000"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
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
              type="button"
              onClick={handleSubmit}
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
const Input = ({ label, placeholder, name, onChange, className = "" }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
    />
  </div>
);
