import React, { useState, useEffect, useRef, useContext } from "react";
import AddFundsModal from "../../../employer/components/jobs/AddFundsModal";
import Swal from "sweetalert2";
import { TransactionApiData } from "../../../../context/transaction/transactionContextApi";
import jsPDF from "jspdf";
//import Swal from "sweetalert2";
import html2canvas from "html2canvas";
useNavigate;
import {
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  ComposedChart, // ✅ Use this instead of LineChart
} from "recharts";
import {
  Download,
  PlusCircle,
  ArrowUpRight,
  AlertTriangle,
  Wallet,
  Banknote,
  CreditCard,
  History,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const chartData = {
  monthly: [
    { name: "Jan", revenue: 12000, expenses: 8000, profit: 4000 },
    { name: "Feb", revenue: 10000, expenses: 6500, profit: 3500 },
    { name: "Mar", revenue: 14000, expenses: 9000, profit: 5000 },
    { name: "Apr", revenue: 16000, expenses: 11000, profit: 5000 },
    { name: "May", revenue: 15000, expenses: 10500, profit: 4500 },
  ],
  quarterly: [
    { name: "Q1", revenue: 36000, expenses: 24500, profit: 11500 },
    { name: "Q2", revenue: 46000, expenses: 31000, profit: 15000 },
    { name: "Q3", revenue: 50000, expenses: 34000, profit: 16000 },
    { name: "Q4", revenue: 55000, expenses: 37500, profit: 17500 },
  ],
  yearly: [
    { name: "2021", revenue: 120000, expenses: 85000, profit: 35000 },
    { name: "2022", revenue: 150000, expenses: 100000, profit: 50000 },
    { name: "2023", revenue: 180000, expenses: 120000, profit: 60000 },
    { name: "2024", revenue: 210000, expenses: 135000, profit: 75000 },
  ],
};

const projectsData = [
  {
    id: 1,
    name: "E-commerce Platform Redesign",
    date: "May 1, 2025",
    freelancer: "Kwame Osei",
    role: "Senior Backend Developer",
    avatar: "https://i.pravatar.cc/40?img=1",
    escrow: "$3,200",
    total: "$8,500",
    projectStatus: "In Progress",
    paymentStatus: "Funded",
  },
  {
    name: "Mobile App UI Design",
    date: "April 15, 2025",
    freelancer: "Ama Darko",
    role: "UI/UX Designer",
    avatar: "https://i.pravatar.cc/40?img=2",
    escrow: "$1,800",
    total: "$3,500",
    projectStatus: "In Progress",
    paymentStatus: "Funded",
  },
  {
    name: "Database Optimization",
    date: "May 10, 2025",
    freelancer: "Abena Mensah",
    role: "Database Engineer",
    avatar: "https://i.pravatar.cc/40?img=3",
    escrow: "$2,400",
    total: "$2,400",
    projectStatus: "On Hold",
    paymentStatus: "Partial",
  },
  {
    name: "Server Infrastructure Setup",
    date: "April 5, 2025",
    freelancer: "Emmanuel Agyei",
    role: "DevOps Engineer",
    avatar: "https://i.pravatar.cc/40?img=4",
    escrow: "$1,350",
    total: "$4,500",
    projectStatus: "In Progress",
    paymentStatus: "Partial",
  },
  {
    name: "API Integration",
    date: "May 8, 2025",
    freelancer: "Kofi Boateng",
    role: "Backend Engineer",
    avatar: "https://i.pravatar.cc/40?img=5",
    escrow: "$0",
    total: "$2,800",
    projectStatus: "In Progress",
    paymentStatus: "Unfunded",
  },
];

const TABS = [
  "Active Projects",
  "Freelancer Invoices",
  "Transaction History",
  "Payment Methods",
];

const FinancialOverview = () => {
  const {
    walletStatus,
    processCreateWalletOfUser,
    allEarnings,
    processGetTransactionOfUser,
  } = useContext(TransactionApiData);
  const [selectedFilter, setSelectedFilter] = useState("monthly");
  const contentRef = useRef(null); // ref to capture the chart + cards
  const [activeTab, setActiveTab] = useState("Active Projects");
  const [search, setSearch] = useState("");
  const [createWalletLoad, setCreateWalletLoad] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All Projects");
  const [page, setPage] = useState(1);
  const perPage = 5;
  const navigate = useNavigate(); // Initialize useNavigate hook
  const handleView = (project) => {
    navigate(`/dashboard-client/project-details/${project.id}`); // if using React Router
  };

  useEffect(() => {
    processGetTransactionOfUser();
  }, []);

  const handleAddFunds = (data) => {
    console.log("Funds Added:", data);
    setShowModal(false);
  };

  const handleCreateWallet = async () => {
    //console.log("Creating wallet");
    setCreateWalletLoad(true);
    let response = await processCreateWalletOfUser();
    if (response.status == "success") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: response.message || "An issue occured, try again",
      });
    }
    setCreateWalletLoad(false);
  };

  const filteredProjects = projectsData
    .filter((project) =>
      project.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((project) =>
      filterStatus === "All Projects"
        ? true
        : project.projectStatus === filterStatus
    );

  const paginatedProjects = filteredProjects.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const totalPages = Math.ceil(filteredProjects.length / perPage);
  const downloadPDF = async () => {
    const input = contentRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`financial-report-${selectedFilter}.pdf`);
  };

  return (
    <div className="tw-css min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manage Finances</h1>
          <p className="text-sm text-gray-600">
            Track payments, invoices, and financial transactions
          </p>
        </div>
        <div className="flex space-x-3">
          {walletStatus == "false" && (
            <button
              onClick={handleCreateWallet}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm flex items-center space-x-2"
            >
              <PlusCircle size={16} />
              <span>{createWalletLoad ? "loading..." : "Create Wallet"}</span>
            </button>
          )}

          {walletStatus == "true" && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm flex items-center space-x-2"
            >
              <PlusCircle size={16} />
              <span>Top Up Account</span>
            </button>
          )}

          <button
            onClick={downloadPDF}
            className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md text-sm flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Download Reports</span>
          </button>
        </div>
      </div>
      <div ref={contentRef}>
        {/* Cards Section */}
        <div className="grid md:grid-cols-4 gap-4 mb-4">
          {/* Total Spent */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-medium text-gray-600">
                Total Spent (May 2025)
              </h2>
              <ArrowUpRight size={20} className="text-green-500" />
            </div>
            <p className="text-xl font-semibold">₵12,450</p>
            <p className="text-sm text-green-600 mt-1">↑ 8.2% from April</p>
            <div className="mt-2 text-sm text-gray-500">Monthly Budget</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "83%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">₵15,000 (83%)</p>
          </div>

          {/* Outstanding Payments */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-medium text-gray-600">
                Outstanding Payments
              </h2>
              <AlertTriangle size={20} className="text-yellow-400" />
            </div>
            <p className="text-xl font-semibold">₵3,280</p>
            <p className="text-sm text-red-600 mt-1">↑ 12.5% from April</p>
            <div className="mt-3 space-y-1 text-sm">
              <div className="text-gray-600">
                Due Today: <strong>₵1,200</strong>
              </div>
              <div className="text-gray-600">
                Due This Week: <strong>₵1,850</strong>
              </div>
              <div className="text-red-500">
                Overdue: <strong>₵230</strong>
              </div>
            </div>
          </div>

          {/* Total Escrow Balance */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-medium text-gray-600">
                Total Escrow Balance
              </h2>
              <Wallet size={20} className="text-blue-500" />
            </div>
            <p className="text-xl font-semibold">₵{allEarnings.available}</p>
            <p className="text-sm text-gray-500">across 5 projects</p>
            <div className="mt-3 text-sm text-gray-600">Active Projects</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: "71%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">5 of 7</p>
          </div>

          {/* Available Balance */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-medium text-gray-600">
                Available Balance
              </h2>
              <CreditCard size={20} className="text-green-500" />
            </div>
            <p className="text-2xl font-semibold">₵{allEarnings.available}</p>
            <div className="mt-3 flex space-x-2">
              <button className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm flex items-center space-x-1">
                <Banknote size={14} />
                <span>Withdraw</span>
              </button>
              <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm flex items-center space-x-1">
                <History size={14} />
                <span>History</span>
              </button>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow-sm p-2 py-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium text-gray-700">
              Financial Activity
            </h2>
            <div className="space-x-2">
              {["monthly", "quarterly", "yearly"].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedFilter(type)}
                  className={`px-3 py-1 rounded text-sm ${
                    selectedFilter === type
                      ? "bg-green-100 text-green-800"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={chartData[selectedFilter]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value) => `₵${value.toLocaleString()}`}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />

              {/* Background fills using Area */}
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="none"
                fill="#22c55e33"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="none"
                fill="#ef444433"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="none"
                fill="#3b82f633"
              />

              {/* Lines on top */}
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* table */}

        <div className="p-6 space-y-6">
          <div className="flex space-x-3 border-b">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 border-b-2 text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Active Projects" && (
            <div className="border rounded-lg p-4 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-1/3 px-3 py-2 border rounded text-sm"
                />
                <div className="flex items-center gap-2">
                  <select
                    className="border rounded px-2 py-1 text-sm"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option>All Projects</option>
                    <option>In Progress</option>
                    <option>On Hold</option>
                  </select>
                  <button className="border px-3 py-1 rounded text-sm">
                    Filters
                  </button>
                </div>
              </div>

              <table className="w-full text-sm text-left">
                <thead className="text-gray-500 border-b">
                  <tr>
                    <th className="py-2">Project</th>
                    <th>Assigned Freelancer</th>
                    <th>Escrow Amount</th>
                    <th>Project Status</th>
                    <th>Payment Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProjects.map((project, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-2">
                        <div className="font-medium text-black">
                          {project.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          Started {project.date}
                        </div>
                      </td>

                      <td>
                        <div className="flex items-center gap-3">
                          <img
                            src={project.avatar}
                            alt="avatar"
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-black">
                              {project.freelancer}
                            </span>
                            <span className="text-xs text-gray-400">
                              {project.role}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div>{project.escrow}</div>
                        <div className="text-xs text-gray-400">
                          of {project.total} total
                        </div>
                      </td>

                      <td>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            project.projectStatus === "In Progress"
                              ? "bg-green-100 text-green-700"
                              : project.projectStatus === "On Hold"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {project.projectStatus}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            project.paymentStatus === "Funded"
                              ? "bg-green-100 text-green-700"
                              : project.paymentStatus === "Partial"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {project.paymentStatus}
                        </span>
                      </td>

                      <td>
                        <a
                          onClick={() => handleView(project.id)}
                          className="text-green-600 text-sm mr-4"
                        >
                          View Details
                        </a>
                        <a href="#" className="text-gray-500 text-sm">
                          Add Funds
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  className="border rounded px-2 py-1"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                >
                  <ChevronLeft size={16} />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 border rounded ${
                      page === i + 1
                        ? "bg-green-500 text-white"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="border rounded px-2 py-1"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <AddFundsModal
          currentBalance={3200}
          onClose={() => setShowModal(false)}
          onAddFunds={handleAddFunds}
        />
      )}
      {/* Download PDF Button */}
    </div>
  );
};

export default FinancialOverview;
