import React, {useState} from "react";
import { CheckCircle, Clock, CalendarCheck2, FileText } from "lucide-react";


const invoices = [
  {
    number: "INV-2025-0042",
    client: "Acme Corporation",
    issueDate: "May 1, 2025",
    dueDate: "May 15, 2025",
    amount: "$3,500.00",
    status: "Paid",
  },
  {
    number: "INV-2025-0041",
    client: "Globex Industries",
    issueDate: "Apr 28, 2025",
    dueDate: "May 12, 2025",
    amount: "$2,800.00",
    status: "Paid",
  },
  {
    number: "INV-2025-0040",
    client: "TechNova Solutions",
    issueDate: "Apr 25, 2025",
    dueDate: "May 9, 2025",
    amount: "$4,200.00",
    status: "Pending",
  },
  {
    number: "INV-2025-0039",
    client: "Quantum Dynamics",
    issueDate: "Apr 20, 2025",
    dueDate: "May 4, 2025",
    amount: "$2,150.00",
    status: "Paid",
  },
  {
    number: "INV-2025-0038",
    client: "Acme Corporation",
    issueDate: "Apr 15, 2025",
    dueDate: "Apr 29, 2025",
    amount: "$3,500.00",
    status: "Overdue",
  },
  {
    number: "INV-2025-0037",
    client: "Globex Industries",
    issueDate: "Apr 10, 2025",
    dueDate: "Apr 24, 2025",
    amount: "$1,800.00",
    status: "Pending",
  },
  {
    number: "INV-2025-0036",
    client: "TechNova Solutions",
    issueDate: "Apr 5, 2025",
    dueDate: "Apr 19, 2025",
    amount: "$2,300.00",
    status: "Rejected",
  },
];

const statusColor = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Overdue: "bg-red-100 text-red-700",
  Rejected: "bg-purple-100 text-purple-700",
};

export default function BillingDashboard() {
    const [statusFilter, setStatusFilter] = useState("All Statuses");
    const [clientFilter, setClientFilter] = useState("All Clients");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const invoicesPerPage = 5;
  
    const filteredInvoices = invoices.filter((inv) => {
      const matchesStatus =
        statusFilter === "All Statuses" || inv.status === statusFilter;
      const matchesClient =
        clientFilter === "All Clients" || inv.client === clientFilter;
      const matchesSearch =
        inv.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.client.toLowerCase().includes(searchTerm.toLowerCase());
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
      }
  
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
        <button className="px-4 py-2 text-white bg-green-600 rounded" onClick={() => naviateTo("/dashboard-candidate/create-invoice")}>
          + Create New Invoice
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-4 overflow-auto mb-4 py-4"> 
        {/* Total Invoiced */}
        <div className="bg-white p-4 rounded-lg shadow flex items-start gap-3">
          
          <div>
            <p className="text-sm text-gray-500">Total Invoiced (May 2025)</p>
            <p className="text-2xl font-bold text-gray-900">₵18,750.00</p>
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
            <p className="text-2xl font-bold text-gray-900">₵8,450.00</p>
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
            <p className="text-2xl font-bold text-gray-900">₵8,300.00</p>
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
            <p className="text-2xl font-bold text-gray-900">₵2,000.00</p>
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
        </select>
        <select
          value={clientFilter}
          onChange={(e) => {
            setClientFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full border-gray-300 rounded px-3 py-2"
        >
          <option>All Clients</option>
          <option>Acme Corporation</option>
          <option>Globex Industries</option>
          <option>TechNova Solutions</option>
          <option>Quantum Dynamics</option>
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
              <tr key={inv.number} className="border-b">
                <td className="px-4 py-2">{inv.number}</td>
                <td className="px-4 py-2">{inv.client}</td>
                <td className="px-4 py-2">{inv.issueDate}</td>
                <td className="px-4 py-2">{inv.dueDate}</td>
                <td className="px-4 py-2">{inv.amount}</td>
                <td className="px-4 py-2">
                  <span
                    className={`text-sm px-2 py-1 rounded-full font-medium ${statusColor[inv.status]}`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button className="text-green-600 hover:underline" onClick={() => naviateTo("/dashboard-candidate/invoice-detail/1")}>
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
