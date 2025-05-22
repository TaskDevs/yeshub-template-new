import React, { useState, useContext, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { email } from "../../../../../globals/constants";
import { userId } from "../../../../../globals/constants";
import { PaymentApiData } from "../../../../context/payment/paymentContextApi";
import { ProfileApiData } from "../../../../context/user-profile/profileContextApi";
import { EmployerApiData } from "../../../../context/employers/employerContextApi";
import Swal from "sweetalert2";

const InvoicePreview = () => {
  const { profileData } = useContext(ProfileApiData);
  const { processGetCompanyInfoForInvoice, processCheckIfCompanyExist } =
    useContext(EmployerApiData);
  const { financeSettingInfo, paymentMethodList, processAddInvoice } =
    useContext(PaymentApiData);
  const [paymentInfo, setPaymentInfo] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  const previewData = JSON.parse(localStorage.getItem("invoice_preview"));

  const invoiceRef = useRef();

  useEffect(() => {
    let payment_type = paymentMethodList.filter(
      (item) => item.type !== "Credit Card" && item.default == true
    )[0];
    setPaymentInfo(payment_type);
  }, [financeSettingInfo]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await processGetCompanyInfoForInvoice(previewData.client);
      console.log(response);
      setCompanyInfo(response.data);
    };
    fetchData();
  }, []);

  const invoiceData = {
    company: {
      name: `${profileData.firstname} ${profileData.lastname}`,
      address: profileData.address,
      email: email,
      phone: profileData.telephone,
    },
    client: {
      name: companyInfo.company_name || "Does not exist",
      address: companyInfo.address || "Address Not Available",
      email: companyInfo.email || "Email Not Available",
      website: companyInfo.website || "Website Not Available",
    },
    invoice: {
      number: previewData?.invoiceNumber || "Not Available",
      issueDate: previewData?.issueDate || "Not Available",
      dueDate: previewData?.dueDate || "Not Available",
      terms: previewData?.paymentTerms || "Not Available",
    },
    items: previewData?.items?.length > 0 ? previewData.items : [],
    taxRate: previewData?.taxRate || 0,
    discount: previewData?.discount || 0,
  };
  const [isSending, setIsSending] = useState(false);

  const subtotal = invoiceData.items.reduce(
    (sum, item) => sum + item.qty * item.rate,
    0
  );
  const tax = subtotal * invoiceData.taxRate;
  const total = subtotal + tax - invoiceData.discount;

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

  const handleSendInvoice = async () => {
    setIsSending(true);
    let checkCompanyExist = await processCheckIfCompanyExist(
      previewData.client.toLowerCase()
    );
    if (!checkCompanyExist.data) {
      Swal.fire({
        icon: "error",
        title: "Company not found",
        text: "Please verify client name",
      });
      setIsSending(false);
      return false;
    }

    const formData = new FormData();

    // Basic invoice fields
    formData.append("user_id", userId);
    formData.append("invoice_number", previewData.invoiceNumber);
    formData.append("client_name", previewData.client);
    formData.append("issue_date", previewData.issueDate);
    formData.append("due_date", previewData.dueDate);
    formData.append("status", "sent");
    formData.append("tax_rate", previewData.taxRate);
    formData.append("discount", previewData.discount);
    formData.append("discount_type", previewData.discountType);
    formData.append("payment_terms", previewData.paymentTerms);
    formData.append("payment_type", paymentInfo.type);
    formData.append("payment_item_no", paymentInfo.item_no);
    formData.append("note", previewData.notes);
    formData.append("sub_total", previewData.subtotal);
    formData.append("discount_cal", previewData.discount);
    formData.append("tax_cal", previewData.tax);
    formData.append("total_amount", total);
    formData.append("client_id", checkCompanyExist.data);
    formData.append("payment_status", "pending");

    // billing_item must be stringified (because it's an array of objects)
    formData.append("billing_item", JSON.stringify(previewData.items));

    // Extract and append raw File from your attachment objects
    previewData.attachments.forEach((fileWrapper) => {
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
    setIsSending(false);
  };

  const naviateTo = (path) => {
    window.location.href = path;
  };
  return (
    <div className="tw-css max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="text-sm text-blue-600 hover:underline"
          onClick={() => naviateTo("/dashboard-candidate/create-invoice")}
        >
          ← Back to Edit
        </button>
        <h1 className="text-xl font-bold">Invoice Preview</h1>
        <div className="space-x-2">
          <button
            className="bg-white border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-50"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </button>
          <button
            className={`${
              isSending ? "bg-green-400 cursor-not-allowed" : "bg-green-600"
            } text-white px-4 py-2 rounded text-sm`}
            onClick={handleSendInvoice}
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send Invoice"}
          </button>
        </div>
      </div>

      {/* Invoice Container */}
      <div className="bg-white shadow-md rounded-lg p-8" ref={invoiceRef}>
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
          <p>{invoiceData.client.address}</p>
          <p>{invoiceData.client.email}</p>
          <p>{invoiceData.client.website}</p>
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
                <td>{item.quantity}</td>
                <td>${item.rate.toFixed(2)}</td>
                <td>${(item.quantity * item.rate).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-6">
          <div className="w-full sm:w-1/2">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${previewData?.sub_total}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax:</span>
              <span>${previewData?.tax_cal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount:</span>
              <span>${previewData?.discount_cal}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total:</span>
              <span>${previewData?.total_amount}</span>
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
          {paymentInfo?.type == "Bank Account" && (
            <>
              <p>Bank Name: {paymentInfo.bank_name}</p>
              <p>Account Name: {paymentInfo.account_name}</p>
              <p>Account Number: {paymentInfo.account_number}</p>
              <p>Routing Number: {paymentInfo.routing_number}</p>
            </>
          )}
          {paymentInfo?.type == "Mobile Money" && (
            <>
              <p>Mobile Money Name : {paymentInfo.account_name}</p>
              <p>Network: {paymentInfo.network_type}</p>
              <p>Mobile Number: {paymentInfo.mobile_number}</p>
            </>
          )}
        </div>

        <p className="text-center mt-8 text-gray-600 font-medium">
          Thank you for your business!
        </p>
      </div>
      <div className="footer mt-8 p-4 mb-4">
        <div className="flex justify-between items-center mb-6">
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={() => naviateTo("/dashboard-candidate/create-invoice")}
          >
            ← Back to Edit
          </button>
          <h1 className="text-xl font-bold">Invoice Preview</h1>
          <div className="space-x-2">
            <button className="bg-white border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-50">
              Download PDF
            </button>
            <button
              className={`${
                isSending ? "bg-green-400 cursor-not-allowed" : "bg-green-600"
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
