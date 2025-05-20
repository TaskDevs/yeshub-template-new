import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { PaymentApiData } from "../../../../context/payment/paymentContextApi";
import { toast } from "react-toastify";
import ShareInvoiceModal from "./shareInvoreModal";
import Swal from "sweetalert2";

const InvoiceDetailsPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { processGetInvoiceDetails, invoiceDetailInfo } =
    useContext(PaymentApiData);

  const { id } = useParams();
  useEffect(() => {
    processGetInvoiceDetails(id);
  }, []);

  const invoiceRef = useRef();

  const naviateTo = (path) => {
    window.location.href = path;
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      toast.success("Invoice deleted successfully.");
    }
  };

  const handleDownloadPDF = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element);
    const imageData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgProps = pdf.getImageProperties(imageData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  };

  const handleEdit = () => {
    if (invoiceDetailInfo?.invoice?.status == "sent") {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Invoice sent cant be edited",
      });
      return false;
    }

    let newData = {
      client: invoiceDetailInfo?.invoice?.client_name,
      invoiceNumber: invoiceDetailInfo?.invoice?.invoice_number,
      issueDate: invoiceDetailInfo?.invoice?.issue_date,
      dueDate: invoiceDetailInfo?.invoice?.due_date,
      items: invoiceDetailInfo?.invoice?.billing_item,
      taxRate: invoiceDetailInfo?.invoice?.tax_rate,
      discount: parseFloat(invoiceDetailInfo?.invoice?.discount),
      discountType: invoiceDetailInfo?.invoice?.discount_type,
      notes: invoiceDetailInfo?.invoice?.note,
      paymentTerms: invoiceDetailInfo?.invoice?.payment_terms,
      total_amount: invoiceDetailInfo?.invoice?.total_amount,
      attachments: invoiceDetailInfo?.invoice?.attachment,
      sub_total: parseFloat(invoiceDetailInfo?.invoice?.sub_total),
      discount_cal: parseFloat(invoiceDetailInfo?.invoice?.discount_cal),
      tax_cal: parseFloat(invoiceDetailInfo?.invoice?.tax_cal),
      status: "edit",
    };
    console.log(newData);
    localStorage.setItem("invoice_preview", JSON.stringify(newData));
    naviateTo("/dashboard-candidate/create-invoice");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="tw-css max-w-7xl mx-auto p-6 text-sm" ref={invoiceRef}>
      <div className="mb-6">
        {/* Top Row */}
        <div className="flex flex-wrap justify-between items-center mb-4">
          <button className="text-sm text-gray-600 hover:underline">
            &larr; Back to Invoices
          </button>

          <h2 className="text-xl font-semibold text-center w-full sm:w-auto sm:flex-1 sm:text-left text-gray-900 sm:ml-6">
            {invoiceDetailInfo?.invoice?.invoice_number}
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
              <p className="text-green-800 font-medium text-sm">
                {invoiceDetailInfo?.invoice?.status || "Status"}
              </p>
              {/* <p className="text-green-600 text-xs">
                Payment received on May 12, 2025
              </p> */}
            </div>
          </div>
          <div className="text-right">
            <p className="text-black font-medium text-sm">Amount</p>
            <p className="text-gray-800 font-semibold text-lg sm:text-xl">
              ₵{invoiceDetailInfo?.invoice?.total_amount || "0.00"}
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
            {invoiceDetailInfo?.client_info?.company_name}
          </p>
          <p className="text-sm text-gray-600 mb-3">
            {invoiceDetailInfo?.client_info?.address || "Address not available"}
            <br />
            {invoiceDetailInfo?.client_info?.city || "City not available"}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            Contact:{" "}
            {invoiceDetailInfo?.client_info?.phone_no || "Not Available"}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            Email:{" "}
            {invoiceDetailInfo?.client_info?.email || "Email Not Available"}
          </p>
          <p className="text-sm text-gray-600 mb-3">
            Website:
            {invoiceDetailInfo?.client_info?.website || "Website Not Available"}
          </p>
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
              {invoiceDetailInfo?.invoice?.billing_item.map((item, index) => (
                <tr className="border-b" key={index}>
                  <td className="py-2 font-medium text-gray-800">
                    {item.description}
                  </td>
                  <td>{item.quantity}</td>
                  <td>₵{item.rate}</td>
                  <td>₵{item.rate * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right mt-4 space-y-1 text-sm text-gray-700">
            <p>Subtotal: ₵{invoiceDetailInfo?.invoice?.sub_total}</p>
            <p>Tax (0%): ₵{invoiceDetailInfo?.invoice?.tax_rate}</p>
            <p className="font-semibold text-lg text-gray-900">
              Total: ₵{invoiceDetailInfo?.invoice?.total_amount}
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
            <p>Invoice #: {invoiceDetailInfo?.invoice?.invoice_number}</p>
            <p>Issue Date: {invoiceDetailInfo?.invoice?.issue_date}</p>
            <p>Due Date: {invoiceDetailInfo?.invoice?.due_date}</p>
            <p>Currency: USD ($)</p>
          </div>

          <div className="md:col-span-1 bg-gray-50 p-5 rounded-lg border">
            <h3 className="font-semibold mb-2">Payment Instructions</h3>
            {invoiceDetailInfo?.data?.bank_account !== null && (
              <>
                <p>
                  <strong>Bank Transfer</strong>
                </p>
                <p>Bank: {invoiceDetailInfo?.data?.bank_name}</p>
                <p>
                  Account Name:{" "}
                  {invoiceDetailInfo?.data?.bank_account?.account_name}
                </p>
                <p>
                  Account Number:{" "}
                  {invoiceDetailInfo?.data?.bank_account?.account_number}
                </p>
                <p>
                  Routing Number:{" "}
                  {invoiceDetailInfo?.data?.bank_account?.routing_number}
                </p>

                <p className="mt-2">Other Payment Methods: -</p>
              </>
            )}

            {invoiceDetailInfo?.data?.momo_account !== null && (
              <>
                <p>
                  <strong>Momo Account</strong>
                </p>
                <p>
                  Account Name:{" "}
                  {invoiceDetailInfo?.data?.momo_account?.account_name}
                </p>
                <p>
                  Account Number:{" "}
                  {invoiceDetailInfo?.data?.momo_account?.account_number}
                </p>
                <p>
                  Routing Number:{" "}
                  {invoiceDetailInfo?.data?.bank_account?.routing_number}
                </p>

                <p className="mt-2">Other Payment Methods: -</p>
              </>
            )}
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
                <span
                  className={`absolute -left-3 flex items-center justify-center w-6 h-6
                 ${
                   invoiceDetailInfo?.invoice?.status == "paid"
                     ? "bg-green-100"
                     : "bg-blue-100"
                 }  rounded-full ring-8 ring-white`}
                >
                  {invoiceDetailInfo?.invoice?.status == "paid" ? "✅" : "🧾"}
                </span>
                <h4
                  className={`${
                    invoiceDetailInfo?.invoice?.status == "paid"
                      ? "text-green-700 font-semibold"
                      : "font-medium text-gray-800"
                  } text-sm flex items-center`}
                >
                  {invoiceDetailInfo?.invoice?.status == "paid"
                    ? "Payment Received"
                    : "Payment not received"}

                  <span
                    className={`${
                      invoiceDetailInfo?.invoice?.status == "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    } text-xs font-bold ml-2 px-2 py-0.5 rounded`}
                  >
                    ${invoiceDetailInfo?.invoice?.total_amount}
                  </span>
                </h4>
                <p className="text-xs text-gray-500">
                  May 12, 2025 at 10:23 AM
                </p>
                <p className="text-sm text-gray-700">
                  {invoiceDetailInfo?.invoice?.status == "paid"
                    ? "Payment received"
                    : "Payment not received yet"}
                </p>
              </li>

              {/* Invoice Sent */}
              <li className="mb-10 ml-6">
                <span
                  className={`absolute -left-3 flex items-center justify-center w-6 h-6
                 ${
                   invoiceDetailInfo?.invoice?.status == "sent"
                     ? "bg-green-100"
                     : "bg-blue-100"
                 }  rounded-full ring-8 ring-white`}
                >
                  {invoiceDetailInfo?.invoice?.status == "sent" ? "✅" : "🧾"}
                </span>
                <h4
                  className={`${
                    invoiceDetailInfo?.invoice?.status == "sent"
                      ? "text-green-700 font-semibold"
                      : "font-medium text-gray-800"
                  } text-sm`}
                >
                  Invoice Sent
                </h4>
                <p className="text-xs text-gray-500">May 1, 2025 at 02:15 PM</p>
                <p className="text-sm text-gray-700">
                  Invoice sent to {` ${invoiceDetailInfo?.client_info?.email}`}
                </p>
              </li>

              {/* Invoice Created */}
              <li className="ml-6">
                <span
                  className={`absolute -left-3 flex items-center justify-center w-6 h-6
                 ${
                   invoiceDetailInfo?.invoice?.status == "draft"
                     ? "bg-green-100"
                     : "bg-blue-100"
                 }  rounded-full ring-8 ring-white`}
                >
                  {invoiceDetailInfo?.invoice?.status == "draft" ? "✅" : "🧾"}
                </span>
                <h4
                  className={`${
                    invoiceDetailInfo?.invoice?.status == "draft"
                      ? "text-green-700 font-semibold"
                      : "font-medium text-gray-800"
                  } text-sm`}
                >
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
                onClick={handleDownloadPDF}
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
              {/* <button
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
              </button> */}
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
