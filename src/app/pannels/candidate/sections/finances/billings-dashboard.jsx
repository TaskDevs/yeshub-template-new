import React, { useState, useEffect, useContext } from "react";
import { PaymentApiData } from "../../../../context/payment/paymentContextApi";
import { CheckCircle, Clock, CalendarCheck2, FileText } from "lucide-react";

const statusColor = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Overdue: "bg-red-100 text-red-700",
  Rejected: "bg-purple-100 text-purple-700",
  sent: "bg-emerald-100 text-emerald-700",
  draft: "bg-orange-100 text-orange-700",
};

export default function BillingDashboard() {
  const {
    processGetInvoiceOfUser,
    billingData,
    billingList,
    filterCompanyNameList,
  } = useContext(PaymentApiData);
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [clientFilter, setClientFilter] = useState("All Clients");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 5;

  useEffect(() => {
    processGetInvoiceOfUser();
  }, []);

  const filteredInvoices = billingList.filter((inv) => {
    const matchesStatus =
      statusFilter === "All Statuses" || inv.status === statusFilter;
    const matchesClient =
      clientFilter === "All Clients" || inv.company_name === clientFilter;
    const matchesSearch =
      inv.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesClient && matchesSearch;
  });

  const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage);
  const startIndex = (currentPage - 1) * invoicesPerPage;
  const currentInvoices = filteredInvoices.slice(
    startIndex,
    startIndex + invoicesPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const naviateTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="tw-css p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between sm:flex-row sm:justify-between sm:items-center items-center sm:justify-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Billing & Earnings
          </h1>
          <p className="text-sm text-gray-600">
            Manage your invoices, track payments, and monitor your earnings
          </p>
        </div>
        <button
          className="px-4 py-2 text-white bg-green-600 rounded"
          onClick={() => naviateTo("/dashboard-candidate/create-invoice")}
        >
          + Create New Invoice
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-4 overflow-auto mb-4 py-4">
        {/* Total Invoiced */}
        <div className="bg-white p-4 rounded-lg shadow flex items-start gap-3">
          <div>
            <p className="text-sm text-gray-500">Total Invoiced (May 2025)</p>
            <p className="text-2xl font-bold text-gray-900">
              ₵{billingData.total_amount}
            </p>
            <p className="text-green-600 text-sm">↑ 12% from last month</p>
          </div>
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        {/* Paid Invoices */}
        <div className="bg-white p-4 rounded-lg shadow flex items-start gap-3">
          <div>
            <p className="text-sm text-gray-500">Paid Invoices</p>
            <p className="text-2xl font-bold text-gray-900">
              ₵{billingData.paid_total}
            </p>
            <p className="text-green-600 text-sm">45% of total invoiced</p>
          </div>
          <div className="bg-green-100 text-green-600 p-2 rounded-full">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-white p-4 rounded-lg shadow flex items-start gap-3">
          <div>
            <p className="text-sm text-gray-500">Pending Payments</p>
            <p className="text-2xl font-bold text-gray-900">
              ₵{billingData.pending_total}
            </p>
            <p className="text-yellow-600 text-sm">44% of total invoiced</p>
          </div>
          <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Overdue Payments */}
        <div className="bg-white p-4 rounded-lg shadow flex items-start gap-3">
          <div>
            <p className="text-sm text-gray-500">Overdue Payments</p>
            <p className="text-2xl font-bold text-gray-900">
              ₵{billingData.overdue_total}
            </p>
            <p className="text-red-600 text-sm">11% of total invoiced</p>
          </div>
          <div className="bg-red-100 text-red-600 p-2 rounded-full">
            <CalendarCheck2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-4">Filter Invoices</h2>
        <div className="grid md:grid-cols-4 gap-4 mb-4">
          <select className="w-full border-gray-300 rounded px-3 py-2">
            <option>Last 30 days</option>
            <option>Last 60 days</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border-gray-300 rounded px-3 py-2"
          >
            <option>All Statuses</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Overdue</option>
            <option>Rejected</option>
            <option>sent</option>
            <option>draft</option>
          </select>
          <select
            value={clientFilter}
            onChange={(e) => {
              setClientFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border-gray-300 rounded px-3 py-2"
          >
            {filterCompanyNameList.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Invoice number or description"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="px-4 py-2">Invoice #</th>
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">Issue Date</th>
                <th className="px-4 py-2">Due Date</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentInvoices.map((inv) => (
                <tr key={inv.id} className="border-b">
                  <td className="px-4 py-2">{inv.invoice_number}</td>
                  <td className="px-4 py-2">{inv.company_name}</td>
                  <td className="px-4 py-2">{inv.issue_date}</td>
                  <td className="px-4 py-2">{inv.due_date}</td>
                  <td className="px-4 py-2">{inv.total_amount}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-sm px-2 py-1 rounded-full font-medium ${
                        statusColor[inv.payment_status]
                      }`}
                    >
                      {inv.payment_status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="text-green-600 hover:underline"
                      onClick={() =>
                        naviateTo(
                          `/dashboard-candidate/invoice-detail/${inv.id}`
                        )
                      }
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-end items-center mt-4 space-x-2 text-sm">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1
                    ? "bg-green-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
