import React, { useState } from "react";
import toast from "react-hot-toast";
const InvoicePreview = () => {
  const invoiceData = {
    company: {
      name: "Your Company Name",
      address: "123 Business Street, New York, NY 10001, United States",
      email: "contact@yourcompany.com",
      phone: "+1 (555) 123-4567",
    },
    client: {
      name: "Acme Corporation",
      contact: "John Smith",
      address: "456 Client Avenue, Suite 789, San Francisco, CA 94107",
      email: "john.smith@acmecorp.com",
      phone: "+1 (555) 987-6543",
    },
    invoice: {
      number: "INV-2025-0043",
      issueDate: "May 8, 2025",
      dueDate: "May 22, 2025",
      terms: "Due in 14 days",
    },
    items: [
      { description: "Website Design and Development", qty: 1, rate: 2500 },
      { description: "Logo Design", qty: 1, rate: 750 },
      { description: "Content Writing (500 words)", qty: 5, rate: 100 },
    ],
    taxRate: 0.075,
    discount: 250,
    bankDetails: {
      bankName: "International Bank",
      accountName: "Your Company Name",
      accountNumber: "123456789",
      routingNumber: "987654321",
    },
  };
  const [isSending, setIsSending] = useState(false);

  const subtotal = invoiceData.items.reduce(
    (sum, item) => sum + item.qty * item.rate,
    0
  );
  const tax = subtotal * invoiceData.taxRate;
  const total = subtotal + tax - invoiceData.discount;
const handleSendInvoice = async () => {
  setIsSending(true);

  const payload = {
    ...invoiceData,
    subtotal,
    tax,
    total,
  };

  try {
    console.log("Sending invoice:", payload);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success("Invoice has been sent!");
  } catch (error) {
    console.error("Failed to send invoice", error);
    toast.error("Failed to send invoice.");
  } finally {
    setIsSending(false);
  }
};
 const naviateTo = (path) => {
    window.location.href = path;
  }
  return (
    <div className="tw-css max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button className="text-sm text-blue-600 hover:underline" onClick={() => naviateTo("/dashboard-candidate/create-invoice")}>
          ← Back to Edit
        </button>
        <h1 className="text-xl font-bold">Invoice Preview</h1>
        <div className="space-x-2">
          <button className="bg-white border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-50">
            Download PDF
          </button>
          <button
            className={`${
              isSending
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600"
            } text-white px-4 py-2 rounded text-sm`}
            onClick={handleSendInvoice}
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send Invoice"}
          </button>
        </div>
      </div>

      {/* Invoice Container */}
      <div className="bg-white shadow-md rounded-lg p-8">
        {/* Company & Invoice Info */}
        <div className="flex justify-between mb-8">
          <div>
            <h2 className="text-green-600 font-bold text-xl mb-1">
              {invoiceData.company.name}
            </h2>
            <p>{invoiceData.company.address}</p>
            <p>{invoiceData.company.email}</p>
            <p>{invoiceData.company.phone}</p>
          </div>
          <div className="text-right">
            <p className="font-bold">INVOICE</p>
            <p>Invoice #: {invoiceData.invoice.number}</p>
            <p>Issue Date: {invoiceData.invoice.issueDate}</p>
            <p>Due Date: {invoiceData.invoice.dueDate}</p>
            <p>Payment Terms: {invoiceData.invoice.terms}</p>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-6">
          <p className="font-bold mb-1">BILL TO</p>
          <p>{invoiceData.client.name}</p>
          <p>Attn: {invoiceData.client.contact}</p>
          <p>{invoiceData.client.address}</p>
          <p>{invoiceData.client.email}</p>
          <p>{invoiceData.client.phone}</p>
        </div>

        {/* Items Table */}
        <table className="w-full mb-6 border-t border-b text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">DESCRIPTION</th>
              <th>QTY</th>
              <th>RATE</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{item.description}</td>
                <td>{item.qty}</td>
                <td>${item.rate.toFixed(2)}</td>
                <td>${(item.qty * item.rate).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-6">
          <div className="w-full sm:w-1/2">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax (7.5%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount:</span>
              <span>${invoiceData.discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Notes and Terms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6 text-sm">
          <div>
            <p className="font-bold mb-2">NOTES</p>
            <p>
              Thank you for your business! Payment is expected within 14 days of
              invoice date. Please make payment to the bank account specified
              below.
            </p>
          </div>
          <div>
            <p className="font-bold mb-2">TERMS & CONDITIONS</p>
            <p>1. Payment is due within the specified payment terms.</p>
            <p>
              2. Late payments may be subject to a 1.5% monthly interest charge.
            </p>
            <p>
              3. All deliverables remain the property of the service provider
              until payment is received in full.
            </p>
          </div>
        </div>

        {/* Payment Info */}
        <div className="border-t pt-4 text-sm">
          <p className="font-bold">PAYMENT INFORMATION</p>
          <p>Bank Name: {invoiceData.bankDetails.bankName}</p>
          <p>Account Name: {invoiceData.bankDetails.accountName}</p>
          <p>Account Number: {invoiceData.bankDetails.accountNumber}</p>
          <p>Routing Number: {invoiceData.bankDetails.routingNumber}</p>
        </div>

        <p className="text-center mt-8 text-gray-600 font-medium">
          Thank you for your business!
        </p>
      </div>
      <div className="footer mt-8 p-4 mb-4">
        <div className="flex justify-between items-center mb-6">
          <button className="text-sm text-blue-600 hover:underline" onClick={() => naviateTo("/dashboard-candidate/create-invoice")}>
            ← Back to Edit
          </button>
          <h1 className="text-xl font-bold">Invoice Preview</h1>
          <div className="space-x-2">
            <button className="bg-white border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-50">
              Download PDF
            </button>
            <button
              className={`${
                isSending
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600"
              } text-white px-4 py-2 rounded text-sm`}
              onClick={handleSendInvoice}
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Invoice"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
