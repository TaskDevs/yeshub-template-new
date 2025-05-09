import React, { useState } from "react";
import { toast } from "react-toastify";
import ShareInvoiceModal from "./shareInvoreModal";

const InvoiceDetailsPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleEdit = () => {
    // Navigate to edit invoice page
    toast.info("Navigating to edit invoice...");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      toast.success("Invoice deleted successfully.");
    }
  };

  const handleDownload = () => {
    toast.info("Downloading PDF...");
  };

  //   const handleShare = () => {
  //     toast.success("Invoice shared via email.");
  //   };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="tw-css max-w-7xl mx-auto p-6 text-sm">
      <div className="mb-6">
        {/* Top Row */}
        <div className="flex flex-wrap justify-between items-center mb-4">
          <button className="text-sm text-gray-600 hover:underline">
            &larr; Back to Invoices
          </button>

          <h2 className="text-xl font-semibold text-center w-full sm:w-auto sm:flex-1 sm:text-left text-gray-900 sm:ml-6">
            INV-2025-0042
          </h2>

          <div className="flex gap-2 mt-2 sm:mt-0">
            <button
              onClick={handleEdit}
              className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 text-sm"
            >
              ✏️ Edit Invoice
            </button>
            <button
              onClick={handleDelete}
              className="border border-red-300 px-4 py-2 rounded text-red-600 hover:bg-red-50 text-sm"
            >
              🗑️ Delete
            </button>
          </div>
        </div>

        {/* Payment Alert */}
        <div className="flex justify-between items-center bg-green-50 border border-green-100 rounded-lg px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="bg-green-100 text-green-600 p-1 rounded-full">
              ✅
            </div>
            <div>
              <p className="text-green-800 font-medium text-sm">Paid</p>
              <p className="text-green-600 text-xs">
                Payment received on May 12, 2025
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-black font-medium text-sm">Amount</p>
            <p className="text-gray-800 font-semibold text-lg sm:text-xl">
              ₵3,500.00
            </p>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4 p-6 rounded-lg shadow">
        {/* Client Information - 1/3 width */}
        <div className="md:col-span-1 bg-gray-50 p-5 rounded-lg border">
          <h3 className="font-semibold text-gray-900 text-lg mb-4">
            Client Information
          </h3>
          <p className="font-bold text-sm text-gray-800 mb-1">
            Acme Corporation
          </p>
          <p className="text-sm text-gray-600 mb-3">
            123 Paradise Plaza, Suite 500
            <br />
            San Francisco, CA 94106
          </p>
          <p className="text-sm text-gray-600 mb-1">
            Contact: Jonathan Reynolds
          </p>
          <p className="text-sm text-gray-600 mb-1">
            Email: jonathan.reynolds@acmecorp.com
          </p>
          <p className="text-sm text-gray-600 mb-3">Phone: +1 (415) 555-7676</p>
          <p className="text-sm text-gray-600 font-medium">
            Payment Terms: Net 14 days
          </p>
        </div>

        {/* Line Items - 2/3 width */}
        <div className="md:col-span-2 bg-gray-50 p-5 rounded-lg border">
          <h3 className="font-semibold text-gray-900 text-lg mb-4">
            Line Items
          </h3>
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-gray-600">Description</th>
                <th className="text-gray-600">Quantity</th>
                <th className="text-gray-600">Unit Price</th>
                <th className="text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-medium text-gray-800">
                  UI/UX Design Services
                </td>
                <td>1</td>
                <td>₵2,000.00</td>
                <td>₵2,000.00</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium text-gray-800">
                  Frontend Development
                </td>
                <td>20</td>
                <td>₵65.00</td>
                <td>₵1,300.00</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-gray-800">
                  Consultation Services
                </td>
                <td>2</td>
                <td>₵100.00</td>
                <td>₵200.00</td>
              </tr>
            </tbody>
          </table>

          <div className="text-right mt-4 space-y-1 text-sm text-gray-700">
            <p>Subtotal: ₵3,500.00</p>
            <p>Tax (0%): ₵0.00</p>
            <p className="font-semibold text-lg text-gray-900">
              Total: ₵3,500.00
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-3 gap-4 bg-white p-6 rounded-lg shadow">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-1">
          <div className="md:col-span-1 bg-gray-50 p-5 rounded-lg border">
            <h3 className="font-semibold mb-2">Invoice Details</h3>
            <p>Invoice #: INV-2025-0042</p>
            <p>Issue Date: May 1, 2025</p>
            <p>Due Date: May 15, 2025</p>
            <p>PO #: PO-ACM-77992</p>
            <p>Reference: Project Alpha Phase 2</p>
            <p>Currency: USD ($)</p>
          </div>

          <div className="md:col-span-1 bg-gray-50 p-5 rounded-lg border">
            <h3 className="font-semibold mb-2">Payment Instructions</h3>
            <p>
              <strong>Bank Transfer</strong>
            </p>
            <p>Bank: First National Bank</p>
            <p>Account Name: Your Company LLC</p>
            <p>Account Number: XXX-XXXX-7890</p>
            <p>Routing Number: XXX-XXXX</p>
            <p>SWIFT: FNBUSXXX</p>
            <p className="mt-2">Other Payment Methods: -</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-gray-900 text-lg mb-6">
              Payment History
            </h3>
            <ol className="relative border-l border-gray-300">
              {/* Payment Received */}
              <li className="mb-10 ml-6">
                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-green-100 rounded-full ring-8 ring-white">
                  ✅
                </span>
                <h4 className="text-green-700 font-semibold text-sm flex items-center">
                  Payment Received{" "}
                  <span className="bg-green-100 text-green-800 text-xs font-bold ml-2 px-2 py-0.5 rounded">
                    $3,500.00
                  </span>
                </h4>
                <p className="text-xs text-gray-500">
                  May 12, 2025 at 10:23 AM
                </p>
                <p className="text-sm text-gray-700">
                  Payment received via bank transfer
                </p>
              </li>

              {/* Reminder Sent */}
              <li className="mb-10 ml-6">
                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-8 ring-white text-xs">
                  📧
                </span>
                <h4 className="text-sm font-medium text-gray-800">
                  Payment Reminder Sent
                </h4>
                <p className="text-xs text-gray-500">
                  May 10, 2025 at 09:00 AM
                </p>
                <p className="text-sm text-gray-700">
                  Automatic reminder sent to jonathan.reynolds@acmecorp.com
                </p>
              </li>

              {/* Invoice Sent */}
              <li className="mb-10 ml-6">
                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-8 ring-white text-xs">
                  🧾
                </span>
                <h4 className="text-sm font-medium text-gray-800">
                  Invoice Sent
                </h4>
                <p className="text-xs text-gray-500">May 1, 2025 at 02:15 PM</p>
                <p className="text-sm text-gray-700">
                  Invoice sent to jonathan.reynolds@acmecorp.com
                </p>
              </li>

              {/* Invoice Created */}
              <li className="ml-6">
                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full ring-8 ring-white text-xs">
                  📄
                </span>
                <h4 className="text-sm font-medium text-gray-800">
                  Invoice Created
                </h4>
                <p className="text-xs text-gray-500">May 1, 2025 at 01:45 PM</p>
              </li>
            </ol>
          </div>

          <div className="md:col-span-1 bg-white p-5 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Actions</h2>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={handleDownload}
                className="bg-green-600 text-white px-1 py-2 rounded-md hover:bg-green-700 flex items-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 7h-2V3H9v4H7l3 4 3-4zm-6 8v-2H5v2a2 2 0 002 2h6a2 2 0 002-2v-2h-2v2H7z" />
                </svg>
                Download PDF
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="border px-1 py-2 rounded-md hover:bg-gray-100 flex items-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M15 8a3 3 0 10-2.83-4h-.34A3 3 0 006 6v.26A3 3 0 005 8a3 3 0 001.17 2.43v.34A3 3 0 0011 13h.26A3 3 0 0015 8z" />
                </svg>
                Share Invoice
              </button>
              <button
                onClick={handlePrint}
                className="border px-1 py-2 rounded-md hover:bg-gray-100 flex items-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6 2a2 2 0 00-2 2v4h12V4a2 2 0 00-2-2H6zm8 14v2H6v-2H4a2 2 0 01-2-2V9h16v5a2 2 0 01-2 2h-2z" />
                </svg>
                Print Invoice
              </button>
            </div>

            {/* Notes */}
            <div>
              <h3 className="font-semibold mb-2">Notes</h3>
              <div className="bg-gray-50 p-4 rounded border text-gray-700 text-sm mb-3">
                Client requested detailed breakdown of development hours for
                their accounting department. Sent via email on May 2.
                <div className="text-xs text-gray-500 mt-1">
                  Added by Sarah Wilson on May 2, 2025
                </div>
              </div>

              {/* Add Note */}
              <div className="flex items-start gap-2">
                <textarea
                  placeholder="Add a note..."
                  className="flex-1 border rounded p-2 text-sm resize-none"
                  rows={2}
                />
                <button className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <ShareInvoiceModal
          invoiceId="INV-2025-0042"
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default InvoiceDetailsPage;
