import React, { useState, useEffect, useContext } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  FileText,
  Download,
  Printer,
  XCircle,
} from "lucide-react";
import { TransactionApiData } from "../../../../context/transaction/transactionContextApi";

// const transactionsData = [
//   {
//     date: "2025-05-12",
//     description: "Payment from TechCorp Solutions",
//     type: "Payment",
//     amount: "+$2,450.00",
//     status: "Completed",
//   },
//   {
//     date: "2025-05-10",
//     description: "Withdrawal to Bank Account",
//     type: "Withdrawal",
//     amount: "-$1,800.00",
//     status: "Pending",
//   },
//   {
//     date: "2025-05-08",
//     description: "Payment from DataFlow Inc",
//     type: "Payment",
//     amount: "+$3,200.00",
//     status: "Completed",
//   },
//   {
//     date: "2025-05-05",
//     description: "Service Fee",
//     type: "Fee",
//     amount: "-$320.00",
//     status: "Completed",
//   },
//   // Add more entries to demonstrate pagination
//   ...Array.from({ length: 20 }, (_, i) => ({
//     date: "2025-04-20",
//     description: `Test Transaction ${i + 1}`,
//     type: "Fee",
//     amount: "-$100.00",
//     status: "Completed",
//   })),
// ];

const TransactionsPage = () => {
  const { transactionList } = useContext(TransactionApiData);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [openActionIndex, setOpenActionIndex] = useState(null);
  const filteredTransactions = transactionList.filter((t) => {
    const dateMatch =
      (!startDate || new Date(t.date) >= new Date(startDate)) &&
      (!endDate || new Date(t.date) <= new Date(endDate));
      
   const searchMatch = typeof t.description === "string"
    ? t.description.toLowerCase().includes(searchTerm.toLowerCase())
    : false;

  
  return dateMatch && searchMatch;
  });
  const { processGetTransactionOfUser } = useContext(TransactionApiData);

  useEffect(() => {
    processGetTransactionOfUser();
  }, []);

  const pageCount = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const exportToCSV = () => {
    const csvRows = [
      ["Date", "Description", "Type", "Amount", "Status"],
      ...filteredTransactions.map((t) => [
        t.date,
        t.description,
        t.type,
        t.amount,
        t.status,
      ]),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderStatus = (status) => {
    const color =
      status === "Completed"
        ? "bg-green-100 text-green-600"
        : status === "Pending"
        ? "bg-yellow-100 text-yellow-600"
        : "bg-gray-100 text-gray-600";
    return (
      <span className={`px-2 py-1 rounded text-sm font-medium ${color}`}>
        {status}
      </span>
    );
  };

  const renderType = (type) => {
    const color =
      type === "Payment"
        ? "bg-green-100 text-green-600"
        : type === "Withdrawal"
        ? "bg-blue-100 text-blue-600"
        : "bg-red-100 text-red-600";
    return (
      <span className={`px-2 py-1 rounded text-sm font-medium ${color}`}>
        {type}
      </span>
    );
  };

  const renderActions = (index) => {
    if (openActionIndex !== index) return null;
    return (
      <div className="relative">
        <div className="absolute right-0 mt-2 w-64 max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
            <FileText className="w-5 h-5 mr-3 shrink-0 text-gray-500" />
            <span className="truncate">View Details</span>
          </button>
          <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
            <Download className="w-5 h-5 mr-3 shrink-0 text-gray-500" />
            <span className="truncate">Download Receipt</span>
          </button>
          <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
            <Printer className="w-5 h-5 mr-3 shrink-0 text-gray-500" />
            <span className="truncate">Print</span>
          </button>
          <button className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
            <XCircle className="w-5 h-5 mr-3 shrink-0 text-red-500" />
            <span className="truncate">Cancel</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="tw-css p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">Transactions</h1>
      <p className="text-gray-600">View and manage your transaction history</p>

      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-2 py-1 rounded w-64"
            />
            <button className="border rounded px-4 py-1 bg-white hover:bg-gray-100">
              Filter
            </button>
            <button
              onClick={exportToCSV}
              className="border rounded px-4 py-1 bg-gray-800 text-white"
            >
              Export
            </button>
          </div>
        </div>

        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="border-b text-left text-gray-600">
              <th className="py-2">Date</th>
              <th>Description</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((t, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2">
                  {new Date(t.date).toLocaleDateString()}
                </td>
                <td>{t.description}</td>
                <td>{renderType(t.type)}</td>
                <td>{t.amount}</td>
                <td>{renderStatus(t.status)}</td>
                <td className="relative">
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() =>
                      setOpenActionIndex(
                        openActionIndex === index ? null : index
                      )
                    }
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  {renderActions(index)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center pt-4">
          <span className="text-sm text-gray-500">
            Showing {paginatedTransactions.length} of{" "}
            {filteredTransactions.length} entries
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="border rounded p-1"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[...Array(pageCount)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`${
                  currentPage === i + 1 ? "bg-green-600 text-white" : "border"
                } px-3 py-1 rounded`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, pageCount))
              }
              className="border rounded p-1"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
