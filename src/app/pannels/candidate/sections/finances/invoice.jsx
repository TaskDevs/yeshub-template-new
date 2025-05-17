import React, { useState, useEffect, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { userId } from "../../../../../globals/constants";
import { PaymentApiData } from "../../../../context/payment/paymentContextApi";
import { EmployerApiData } from "../../../../context/employers/employerContextApi";
import { generateInvoiceNumber } from "../../../../../utils/invoice";
import Swal from "sweetalert2";

const CreateInvoice = () => {
  const { processAddInvoice, processGetTotalInvoice } =
    useContext(PaymentApiData);
  const { processCheckIfCompanyExist } = useContext(EmployerApiData);
  const previewData = JSON.parse(localStorage.getItem("invoice_preview"));

  const onDrop = useCallback((acceptedFiles) => {
    const filesWithPreview = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setAttachments((prev) => [...prev, ...filesWithPreview]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
      "image/png": [],
      "image/jpeg": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const today = new Date();
  const due = new Date();
  due.setDate(due.getDate() + 14);
  const dueDate = due.toISOString().split("T")[0];
  const [attachments, setAttachments] = useState(
    previewData?.attachments || []
  );
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState({
    client: previewData?.client || "",
    invoiceNumber: previewData?.invoiceNumber || "",
    issueDate: previewData?.issueData || today.toISOString().split("T")[0],
    dueDate: previewData?.dueData || dueDate,
    items: previewData?.items || [{ description: "", quantity: 1, rate: 0 }],
    taxRate: previewData?.taxRate || "",
    discount: previewData?.discount || 5,
    discountType: previewData?.discount || "amount", // or 'percent'
    notes: previewData?.notes || "",
    terms:
      "1. Payment is due within the specified payment term.\n2. Late payments may be subject to a 1.5% monthly interest charge.\n3. All deliverables remain the property of the service provider until payment is received in full.",
    paymentTerms: previewData?.paymentTerms || "Due in 30 days",
  });

  useEffect(() => {
    const fetchData = async () => {
      let response = await processGetTotalInvoice();
      const newInvoiceNumber = generateInvoiceNumber(response);

      setInvoice((prev) => ({
        ...prev,
        invoiceNumber: newInvoiceNumber,
      }));
    };

    fetchData();
  }, []);

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoice.items];
    newItems[index][field] = value;
    setInvoice({ ...invoice, items: newItems });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { description: "", quantity: 1, rate: 0 }],
    });
  };

  const removeItem = (index) => {
    const newItems = [...invoice.items];
    newItems.splice(index, 1);
    setInvoice({ ...invoice, items: newItems });
  };

  const calculateSubtotal = () => {
    return invoice.items.reduce(
      (sum, item) => sum + item.quantity * item.rate,
      0
    );
  };

  const calculateDiscount = (subtotal) => {
    return invoice.discountType === "percent"
      ? (subtotal * invoice.discount) / 100
      : invoice.discount;
  };

  const calculateTax = (subtotal) => {
    return (subtotal * invoice.taxRate) / 100;
  };

  const handleSubmit = async (type) => {
    setLoading(true);

    let checkCompanyExist = await processCheckIfCompanyExist(
      invoice.client.toLowerCase()
    );
    if (!checkCompanyExist.data) {
      Swal.fire({
        icon: "error",
        title: "Company not found",
        text: "Please verify client name",
      });
      setLoading(false);
      return false;
    }

    const formData = new FormData();

    // Basic invoice fields
    formData.append("user_id", userId);
    formData.append("invoice_number", invoice.invoiceNumber);
    formData.append("client_name", invoice.client);
    formData.append("issue_date", invoice.issueDate);
    formData.append("due_date", invoice.dueDate);
    formData.append("status", type);
    formData.append("tax_rate", invoice.taxRate);
    formData.append("discount", invoice.discount);
    formData.append("discount_type", invoice.discountType);
    formData.append("payment_terms", invoice.paymentTerms);
    formData.append("note", invoice.notes);
    formData.append("sub_total", subtotal);
    formData.append("discount_cal", discount);
    formData.append("tax_cal", tax);
    formData.append("total_amount", total);
    formData.append("client_id", checkCompanyExist.data);
    formData.append("payment_status", "pending");

    // billing_item must be stringified (because it's an array of objects)
    formData.append("billing_item", JSON.stringify(invoice.items));

    // Extract and append raw File from your attachment objects
    attachments.forEach((fileWrapper) => {
      if (fileWrapper instanceof File) {
        formData.append("attachments[]", fileWrapper); // already a File object
      } else if (fileWrapper.file) {
        formData.append("attachments[]", fileWrapper.file); // fileWrapper.file must be a File object
      } else {
        // fallback in case your fileWrapper is structured like Dropzone's accepted files
        formData.append(
          "attachments[]",
          new File([fileWrapper], fileWrapper.name, { type: fileWrapper.type })
        );
      }
    });

    let response = await processAddInvoice(formData);
    if (response.status == "success") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (response.status == "error") {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: response.message,
      });
    }
    setLoading(false);
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount(subtotal);
  const tax = calculateTax(subtotal - discount);
  const total = subtotal - discount + tax;

  const naviateTo = (path) => {
    window.location.href = path;
  };

  const handlePreview = () => {
    let newData = {
      ...invoice,
      total_amount: total,
      attachments: attachments,
      sub_total: subtotal,
      discount_cal: discount,
      tax_cal: tax,
    };
    console.log(newData);
    localStorage.setItem("invoice_preview", JSON.stringify(newData));
    naviateTo("/dashboard-candidate/invoice-preview/1");
  };

  const handleClear = () => {
    localStorage.removeItem("invoice_preview");
    naviateTo("/dashboard-candidate/billings");
  };

  return (
    <div className="tw-css p-6 bg-white rounded shadow max-w-6xl mx-auto mt-2">
      <div className="flex items-center justify-between mb-6">
        {/* Breadcrumbs and Heading */}
        <div>
          <nav className="text-sm text-gray-500 mb-1">
            <ol className="list-reset flex">
              <li className="flex items-center">
                <span className="mr-1">🏠</span>
                <span className="text-gray-600">Billing & Earnings</span>
              </li>
              <li>
                <span className="mx-2">{">"}</span>
              </li>
              <li className="text-gray-400">Create New Invoice</li>
            </ol>
          </nav>
          <h1 className="text-2xl font-semibold text-gray-900">
            Create New Invoice
          </h1>
          <p className="text-gray-500 text-sm">
            Fill in the details to create a new invoice for your client
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 border rounded text-gray-700 border-gray-300 hover:bg-gray-100"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={() => handleSubmit("draft")}
          >
            {loading ? "Saving..." : "Save Draft"}
          </button>
        </div>
      </div>

      {/* Client Info */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Client Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Client */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter client name"
              value={invoice.client}
              onChange={(e) =>
                setInvoice({ ...invoice, client: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Invoice Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Invoice Number
            </label>
            <input
              type="text"
              readOnly
              value={invoice.invoiceNumber}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-100"
            />
          </div>

          {/* Issue Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issue Date
            </label>
            <input
              type="date"
              value={invoice.issueDate}
              onChange={(e) =>
                setInvoice({ ...invoice, issueDate: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          {/* Due Date — takes full row */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={invoice.dueDate}
              onChange={(e) =>
                setInvoice({ ...invoice, dueDate: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Itemized Billing */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold mb-2">Itemized Billing</h2>
        <div className="grid grid-cols-5 gap-2 text-sm font-medium">
          <span>Description</span>
          <span>Quantity</span>
          <span>Rate</span>
          <span>Amount</span>
          <span>Action</span>
        </div>
        {invoice.items.map((item, idx) => (
          <div key={idx} className="grid grid-cols-5 gap-2 mt-2">
            <input
              className="border rounded px-2 py-1"
              value={item.description}
              onChange={(e) =>
                handleItemChange(idx, "description", e.target.value)
              }
              placeholder="Item description"
            />
            <input
              type="number"
              className="border rounded px-2 py-1"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(idx, "quantity", parseFloat(e.target.value))
              }
            />
            <input
              type="number"
              className="border rounded px-2 py-1"
              value={item.rate}
              onChange={(e) =>
                handleItemChange(idx, "rate", parseFloat(e.target.value))
              }
            />
            <div className="py-2">
              ${(item.quantity * item.rate).toFixed(2)}
            </div>
            <button className="text-red-600" onClick={() => removeItem(idx)}>
              Remove
            </button>
          </div>
        ))}
        <button onClick={addItem} className="text-blue-600 mt-2">
          + Add Item
        </button>
      </div>

      {/* Additional & Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
        <h2 className="text-lg font-semibold mb-4">Additional Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Additional Inputs */}
          <div className="space-y-4">
            {/* Tax Rate */}
            <div>
              <label className="block text-sm font-medium">Tax Rate (%)</label>
              <input
                type="number"
                className="mt-1 w-full border rounded px-3 py-2"
                value={invoice.taxRate}
                onChange={(e) =>
                  setInvoice({
                    ...invoice,
                    taxRate: parseFloat(e.target.value),
                  })
                }
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm font-medium">Discount</label>
              <div className="flex space-x-2 mt-1">
                <input
                  type="number"
                  className="border rounded px-3 py-2 w-full"
                  value={invoice.discount}
                  onChange={(e) =>
                    setInvoice({
                      ...invoice,
                      discount: parseFloat(e.target.value),
                    })
                  }
                />
                <select
                  value={invoice.discountType}
                  onChange={(e) =>
                    setInvoice({ ...invoice, discountType: e.target.value })
                  }
                  className="border rounded px-2 py-2"
                >
                  <option value="amount">Amount</option>
                  <option value="percent">Percent</option>
                </select>
              </div>
            </div>

            {/* Payment Terms */}
            <div>
              <label className="block text-sm font-medium">Payment Terms</label>
              <select
                className="mt-1 w-full border rounded px-3 py-2"
                value={invoice.paymentTerms}
                onChange={(e) =>
                  setInvoice({ ...invoice, paymentTerms: e.target.value })
                }
              >
                <option>Due in 30 days</option>
                <option>Due in 15 days</option>
                <option>Due on receipt</option>
              </select>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="bg-gray-50 p-4 rounded border h-fit">
            <h3 className="text-md font-medium mb-3">Invoice Summary</h3>
            <div className="flex justify-between text-sm mb-1">
              <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Tax ({invoice.taxRate}%):</span>{" "}
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Discount:</span> <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-md mt-3">
              <span>Total:</span> <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes and Terms */}
      <div className="grid md:grid-cols-2 gap-4 md:grid-cols-2 mb-6 bg-white p-6 rounded-lg shadow-sm border">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Notes & Terms
          </label>
          <textarea
            className="w-full border rounded px-3 py-2 h-32"
            placeholder="Add any notes or payment instructions here..."
            value={invoice.notes}
            onChange={(e) => setInvoice({ ...invoice, notes: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Terms & Conditions
          </label>
          <textarea
            className="w-full border rounded px-3 py-2 h-32 bg-gray-100"
            readOnly
            value={invoice.terms}
          />
        </div>
      </div>
      {/* Attached */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold mb-2">Attachments</h2>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded p-6 text-center cursor-pointer ${
            isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-gray-500">
            {isDragActive
              ? "Drop the files here..."
              : "Click to upload or drag and drop"}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            PDF, PNG, JPG or DOCX (Max. 10MB)
          </p>
        </div>

        {attachments.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {attachments.map((file, idx) => (
              <div
                key={idx}
                className="border rounded p-2 text-sm text-center bg-white shadow-sm"
              >
                {file.type?.startsWith("image/") ? (
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="w-full h-32 object-contain mb-1"
                  />
                ) : (
                  <div className="h-32 flex items-center justify-center bg-gray-100">
                    <p className="text-xs">{file.name}</p>
                  </div>
                )}
                <p className="truncate text-xs">{file.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center">
        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
          onClick={() => handleSubmit("draft")}
        >
          Save Draft
        </button>
        <div className="flex space-x-2">
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded"
            onClick={handlePreview}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 00-1 1v4.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Preview
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => handleSubmit("sent")}
          >
            {loading ? "Sending..." : "Send Invoice"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
