import React, { useState, useContext, useEffect } from "react";
import AddPaymentMethodModal from "./AddPaymentMethodModal";
import { PaymentApiData } from "../../../../context/payment/paymentContextApi";
import { userId } from "../../../../../globals/constants";
import Swal from "sweetalert2";

const FinancialSettings = () => {
  const {
    processStoreFinanceSettingInfo,
    paymentMethodList,
    financeSettingInfo,
  } = useContext(PaymentApiData);
  const [withdrawalAmount, setWithdrawalAmount] = useState("100");
  const [withdrawalFrequency, setWithdrawalFrequency] = useState("Weekly");
  const [autoWithdraw, setAutoWithdraw] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethods.find((p) => p.default)?.item_no || null
  );
  const [menuOpen, setMenuOpen] = useState(null);
  const [formData, setFormData] = useState({
    company_name: null,
    billing_address: null,
    city: null,
    state: null,
    zip_code: null,
    tax_id_or_vat_no: null,
    bill_country: null,
    tax_type: null,
    tax_country: null,
  });

  useEffect(() => {
    if (financeSettingInfo) {
      setPaymentMethods(paymentMethodList);
      setFormData({
        company_name: financeSettingInfo[0]?.company_name || "",
        billing_address: financeSettingInfo[0]?.billing_address || "",
        city: financeSettingInfo[0]?.city || "",
        state: financeSettingInfo[0]?.state || "",
        zip_code: financeSettingInfo[0]?.zip_code || "",
        tax_id_or_vat_no: financeSettingInfo[0]?.tax_id_or_vat_no || "",
        bill_country: financeSettingInfo[0]?.bill_country || "",
        tax_type: financeSettingInfo[0]?.tax_type || "",
        tax_country: financeSettingInfo[0]?.tax_country || "",
      });
      setSelectedPaymentMethod(
        paymentMethodList.find((p) => p.default)?.item_no || null
      );
      setWithdrawalAmount(financeSettingInfo[0]?.withdrawal_amount || "100");
      setWithdrawalFrequency(
        financeSettingInfo[0]?.withdrawal_frequency || "weekly"
      );
    }
    // console.log(selectedPaymentMethod);
  }, [paymentMethodList, financeSettingInfo]);

  const handleSetDefault = (id) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({ ...method, default: method.item_no === id }))
    );
    setSelectedPaymentMethod(id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    alert("Changes discarded.");
    // You can add logic to reset to initial state if needed.
  };

  const handleDelete = () => {
    alert("Delected successfully.");
    // You can add logic to reset to initial state if needed.
  };
  const handleSave = async () => {
    if (paymentMethods.length == 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Enter a payment method",
      });
    }
    let defaultInfo;
    let paymentData = paymentMethods.filter((item) => item.default == true)[0];
    if (!paymentData) {
      defaultInfo = paymentMethods[0];
    }
    console.log(paymentData);
    let newData = {
      ...formData,
      withdrawal_amount: withdrawalAmount,
      withdrawal_frequency: withdrawalFrequency,
      auto_withdraw: autoWithdraw,
      user_id: userId,
      payment_type: paymentData?.type || defaultInfo?.type,
      payment_item_no: paymentData?.item_no || defaultInfo?.item_no,
    };

    console.log(newData);

    let result = await processStoreFinanceSettingInfo(newData);
    if (result) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Settings Saved",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsModalOpen(false);
    } else {
      console.log("Error submitting finance setting");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong, try again",
      });
    }
  };

  return (
    <div className="tw-css p-6 md:p-12 space-y-8">
      <h1 className="text-2xl font-semibold">Financial Settings</h1>
      <p className="text-gray-500">
        Manage your payment methods, billing information and tax settings
      </p>
      {/* Payment Methods */}
      <div className="grid md:grid-cols-2 gap-4 mb-4 py-6">
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold">Payment Methods</h2>
          <div className="space-y-2 relative">
            {paymentMethods.map((method) => (
              <div
                key={method.item_no}
                className={`border p-4 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 ${
                  selectedPaymentMethod === method.item_no
                    ? "ring-2 ring-green-500"
                    : ""
                }`}
                onClick={() => handleSetDefault(method.item_no)}
              >
                <div>
                  <p className="font-medium">{method.type}</p>
                  <p className="text-sm text-gray-500">{method.details}</p>
                </div>

                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() =>
                      setMenuOpen(
                        menuOpen === method.item_no ? null : method.item_no
                      )
                    }
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ⋮
                  </button>
                  {method.default && (
                    <span className="text-green-600 font-medium ml-4">
                      Default
                    </span>
                  )}
                  {menuOpen === method.item_no && (
                    <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow z-10">
                      <button
                        onClick={() => {
                          handleDelete(method.item_no);
                          setMenuOpen(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
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
              name="company_name"
              onChange={(e) => {
                handleChange(e);
              }}
              value={formData.company_name}
            />
            <input
              className="border p-2 rounded"
              placeholder="Billing Address"
              name="billing_address"
              value={formData.billing_address}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <input
              className="border p-2 rounded"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <input
              className="border p-2 rounded"
              placeholder="State"
              name="state"
              value={formData.state}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <input
              className="border p-2 rounded"
              placeholder="ZIP Code"
              name="zip_code"
              value={formData.zip_code}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <select
              className="border p-2 rounded"
              name="bill_country"
              value={formData.bill_country}
              onChange={(e) => {
                handleChange(e);
              }}
            >
              <option>Ghana</option>
              {/* <option>Canada</option> */}
            </select>
          </div>
        </div>
      </div>

      {/* Tax Settings & Withdrawal */}
      <div className="grid md:grid-cols-1 gap-4 mb-4 py-3">
        {/* <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold">Tax Settings</h2>
          <input
            className="border p-2 rounded w-full"
            placeholder="Tax ID / VAT Number"
            name="tax_id_or_vat_no"
            value={formData.tax_id_or_vat_no}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <select
            className="border p-2 rounded w-full"
            name="tax_type"
            value={formData.tax_type}
            onChange={(e) => {
              handleChange(e);
            }}
          >
            <option>W-9 Form</option>
            <option>W-8BEN Form</option>
          </select>
          <select
            className="border p-2 rounded w-full"
            defaultValue="United States"
            name="tax_country"
            value={formData.tax_country}
            onChange={(e) => {
              handleChange(e);
            }}
          >
            <option>United States</option>
            <option>Canada</option>
          </select>
          <button className="text-green-600 hover:underline text-sm">
            Download Tax Documents
          </button>
        </div> */}

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
              <option key={method.item_no} value={method.item_no}>
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
        paymentItemsNo={paymentMethods.length}
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
