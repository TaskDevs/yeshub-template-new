import React , {useState, useMemo} from "react";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);


const sampleTransactions = [
  {
    date: '2025-05-20T10:45:00',
    type: 'Milestone Payment',
    amount: -1200,
    status: 'Completed',
    sender: 'Kwame Osei',
    method: 'Escrow',
    reference: 'Frontend Development',
  },
  {
    date: '2025-05-15T09:30:00',
    type: 'Escrow Deposit',
    amount: 2000,
    status: 'Completed',
    sender: 'You',
    method: 'Visa •••• 4587',
    reference: 'Project Funding',
  },
  {
    date: '2025-05-10T14:20:00',
    type: 'Milestone Payment',
    amount: -1450,
    status: 'Completed',
    sender: 'Kwame Osei',
    method: 'Escrow',
    reference: 'Requirements & Wireframes',
  },
  {
    date: '2025-05-05T11:15:00',
    type: 'Escrow Deposit',
    amount: 3850,
    status: 'Completed',
    sender: 'You',
    method: 'Mastercard •••• 2315',
    reference: 'Initial Project Funding',
  },
  {
    date: '2025-05-25T16:40:00',
    type: 'Milestone Payment',
    amount: -800,
    status: 'Pending',
    sender: 'Kwame Osei',
    method: 'Escrow',
    reference: 'UI Component Development',
  },
  {
    date: '2025-05-08T13:25:00',
    type: 'Refund',
    amount: 250,
    status: 'Cancelled',
    sender: 'You',
    method: 'Escrow',
    reference: 'Cancelled Task',
  }
];

const statusColors = {
  Completed: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-gray-100 text-gray-700',
};


const ITEMS_PER_PAGE = 5;
export default function PaymentHistoryPage() {
  const [selectedStatuses, setSelectedStatuses] = useState(['Completed', 'Pending', 'Cancelled']);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const toggleStatus = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const filteredTransactions = useMemo(() => {
    return sampleTransactions.filter((tx) => {
      const matchesStatus = selectedStatuses.includes(tx.status);
      const matchesSearch = tx.reference.toLowerCase().includes(search.toLowerCase());
      const matchesType = type === 'All' || tx.type === type;
      const txDate = new Date(tx.date);
      const inDateRange =
        (!fromDate || new Date(fromDate) <= txDate) &&
        (!toDate || new Date(toDate) >= txDate);
      return matchesStatus && matchesSearch && matchesType && inDateRange;
    });
  }, [sampleTransactions, selectedStatuses, search, type, fromDate, toDate]);

  const pageCount = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const exportCSV = () => {
    const rows = [
      ['Date', 'Type', 'Amount', 'Status', 'Sender', 'Method', 'Reference'],
      ...filteredTransactions.map((tx) => [
        format(new Date(tx.date), 'MMM dd, yyyy hh:mm a'),
        tx.type,
        tx.amount,
        tx.status,
        tx.sender,
        tx.method,
        tx.reference,
      ]),
    ];

    const csvContent = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const chartData = {
    labels: ["May 1", "May 5", "May 10", "May 15", "May 20", "May 25"],
    datasets: [
      {
        label: "Deposits",
        data: [0, 3200, 3200, 5850, 5850, 5850],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Payments",
        data: [0, 0, 1000, 1000, 2000, 2650],
        borderColor: "#facc15",
        backgroundColor: "rgba(250, 204, 21, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₵${value}`,
        },
      },
    },
  };

  return (
    <div className="tw-css p-6 bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-4">
        Manage Finances &gt; Active Projects &gt; E-commerce Platform Redesign &gt;{" "}
        <span className="text-gray-700 font-medium">Payment History</span>
      </div>

      {/* Page Heading */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-1">Payment History</h1>
      <p className="text-gray-500 mb-6">E-commerce Platform Redesign</p>

      {/* Stats Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Total Transactions</p>
            <p className="text-lg font-bold text-gray-800">12</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Paid</p>
            <p className="text-lg font-bold text-gray-800">₵2,650.00</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Deposited</p>
            <p className="text-lg font-bold text-gray-800">₵5,850.00</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Escrow Balance</p>
            <p className="text-lg font-bold text-gray-800">₵3,200.00</p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

     <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex flex-wrap gap-3 mb-4">
        <input type="date" className="border p-2 rounded" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <input type="date" className="border p-2 rounded" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        <select className="border p-2 rounded" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="All">All</option>
          <option value="Milestone Payment">Milestone Payment</option>
          <option value="Escrow Deposit">Escrow Deposit</option>
          <option value="Refund">Refund</option>
        </select>
        <input
          type="text"
          placeholder="Search reference..."
          className="border p-2 rounded flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          {['Completed', 'Pending', 'Cancelled'].map((status) => (
            <button
              key={status}
              className={`px-3 py-1 text-sm font-medium border rounded ${
                selectedStatuses.includes(status)
                  ? statusColors[status]
                  : 'bg-white text-gray-600'
              }`}
              onClick={() => toggleStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
        <button
          onClick={exportCSV}
          className="ml-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Export CSV
        </button>
      </div>

      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-gray-500 border-b">
            <th className="py-2 px-4">Date & Time</th>
            <th className="py-2 px-4">Type</th>
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Sender</th>
            <th className="py-2 px-4">Method</th>
            <th className="py-2 px-4">Reference</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.map((tx, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">
                {format(new Date(tx.date), 'MMM dd, yyyy')}<br />
                <span className="text-xs text-gray-400">
                  {format(new Date(tx.date), 'hh:mm a')}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                  {tx.type}
                </span>
              </td>
              <td className="px-4 py-3 font-semibold text-sm">
                <span className={tx.amount < 0 ? 'text-red-600' : 'text-green-600'}>
                  {tx.amount < 0 ? '-' : '+'}₵{Math.abs(tx.amount).toFixed(2)}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${statusColors[tx.status]}`}>
                  {tx.status}
                </span>
              </td>
              <td className="px-4 py-3">{tx.sender}</td>
              <td className="px-4 py-3">{tx.method}</td>
              <td className="px-4 py-3">{tx.reference}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 rounded bg-green-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Prev
        </button>
        <div className="space-x-1">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          disabled={currentPage === pageCount}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, pageCount))}
          className="px-3 py-1 rounded bg-green-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
}
