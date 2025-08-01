import React, { useState, useContext, useEffect, useMemo } from "react";
import { userId } from "../../../../../globals/constants";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Doughnut } from "react-chartjs-2";
import DataTable from "react-data-table-component";
import { Briefcase, DollarSign } from "lucide-react";
import AddPaymentMethodModal from "./AddPaymentMethodModal";
import { PaymentApiData } from "../../../../context/payment/paymentContextApi";
import NoteModal from "./NoteModal";
import { Send, MessageSquare } from "lucide-react";
import Swal from "sweetalert2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { TransactionApiData } from "../../../../context/transaction/transactionContextApi";
import { FreelanceApiData } from "../../../../context/freelance/freelanceContextApi";

ChartJS.register(ArcElement, ChartTooltip, Legend);

const doughnutOptions = {
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      color: "#4B5563", // text-gray-600
      font: {
        size: 10, // 👈 reduce font size here
        weight: "bold",
      },
      formatter: (value, context) => {
        const total = context.chart.data.datasets[0].data.reduce(
          (a, b) => a + b,
          0
        );
        const percentage = ((value / total) * 100).toFixed(0);
        return `${percentage}%`;
      },
    },
  },
};

const transactionColumns = [
  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
    width: "120px",
  },
  {
    name: "Description",
    cell: (row) => (
      <div>
        <p className="font-medium text-gray-700">{row.description}</p>
        <p className="text-xs text-gray-500">{row.note}</p>
      </div>
    ),
    grow: 2,
  },
  {
    name: "Type",
    cell: (row) => (
      <span
        className={`text-xs font-medium px-2 py-1 rounded-full ${
          row.type === "payment"
            ? "bg-green-100 text-green-700"
            : row.type === "withdrawal"
            ? "bg-blue-100 text-blue-700"
            : "bg-orange-100 text-orange-700"
        }`}
      >
        {row.type}
      </span>
    ),
    width: "120px",
  },
  {
    name: "Amount",
    cell: (row) => (
      <span
        className={`font-medium ${
          row.amount.startsWith("+") ? "text-green-600" : "text-red-600"
        }`}
      >
        ₵{row.amount}
      </span>
    ),
    right: true,
  },

  {
    name: "Status",
    cell: (row) => (
      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
        {row.status}
      </span>
    ),
    width: "120px",
  },
];

// Contract Data
const getStatusBadge = (status) => {
  const base = "px-2 py-1 rounded-full text-xs font-semibold ";
  switch (status) {
    case "In Progress":
      return base + "bg-green-100 text-green-700";
    case "Pending":
      return base + "bg-yellow-100 text-yellow-700";
    case "Just Started":
      return base + "bg-blue-100 text-blue-700";
    default:
      return base + "bg-gray-100 text-gray-600";
  }
};
// Columns definition
const contractColumns = [
  {
    name: "Contract",
    selector: (row) => row.project,
    sortable: true,
    cell: (row) => (
      <div>
        <div className="font-semibold text-gray-800">{row.project}</div>
        <div className="text-xs text-gray-500">Client: {row.client}</div>
      </div>
    ),
  },
  {
    name: "Deadline",
    selector: (row) => row.deadline,
    sortable: true,
    cell: (row) => (
      <div>
        <div className="text-sm text-gray-800">{row.deadline}</div>
        <div className="text-xs text-gray-400">
          {row.daysRemaining} days remaining
        </div>
      </div>
    ),
  },
  {
    name: "Status",
    selector: (row) => row.status,
    cell: (row) => (
      <span className={getStatusBadge(row.status)}>{row.status}</span>
    ),
    sortable: true,
  },
  {
    name: "Value",
    selector: (row) => row.budget,
    sortable: true,
    cell: (row) => (
      <span className="font-medium text-gray-800">{row.budget}</span>
    ),
  },

  {
    name: "Actions",
    cell: () => (
      <div className="flex gap-2 flex-row items-center">
        <button className="bg-green-600 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-md transition flex items-center gap-1">
          <Send size={12} />
          <span className="hidden sm:inline">Submit</span>
        </button>
        <button className="border border-gray-300 text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-md hover:bg-gray-100 transition flex items-center gap-1">
          <MessageSquare size={12} />
          <span className="hidden sm:inline">Message</span>
        </button>
      </div>
    ),
    ignoreRowClick: true,
    button: true,
  },
];

// Data definition
const contractData = [];

export default function FinancialDashboard() {
  const {
    freelanceEarnings,
    processMakeWithdrawal,
    processGetTransactionOfFreelance,
    walletStatus,
    processGetPotentialEarningsOfFreelance,
    processCreateWalletOfUser,
    transactionList,
    monthEarnings,
  } = useContext(TransactionApiData);
  const { freelanceProjectList } = useContext(FreelanceApiData);
  const { paymentMethodList, financeSettingInfo, processDeletePaymentMethod } =
    useContext(PaymentApiData);
  const [createWalletLoad, setCreateWalletLoad] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState({});
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    processGetTransactionOfFreelance();
    processGetPotentialEarningsOfFreelance();
  }, []);

  useEffect(() => {
    setPaymentMethods(paymentMethodList);
  }, [financeSettingInfo, paymentMethodList]);



  // Doughnut Chart Data
  const doughnutData = {
    labels: ["Withdrawals ", "Earnings"],
    datasets: [
      {
        data: [
          parseFloat(freelanceEarnings.available),
          parseFloat(freelanceEarnings.pending),
        ],
        backgroundColor: ["#4F46E5", "#FACC15"],
        borderWidth: 1,
      },
    ],
  };

  const areaChartData = monthEarnings;

  const handleMethodChange = (e) => {
    const method = paymentMethods.find((m) => m.id === e.target.value);
    setSelectedMethod(method);
  };

  const handleWithdraw = async () => {
    console.log(
      `amount is = ${amount} and available ${freelanceEarnings.available}`
    );
    if (!amount || Number(amount) > Number(freelanceEarnings.available)) {
      Swal.fire({
        icon: "error",
        title: "Insufficient Balance",
        text: "Withdrawal cannot be made due to insufficient balance",
      });
      return;
    }

    if (!selectedMethod.item_no) {
      Swal.fire({
        icon: "error",
        title: "No Payment Method",
        text: "Add or select a payment method",
      });
      return;
    }

    if (selectedMethod.type == "Credit Card") {
      Swal.fire({
        icon: "error",
        title: "Sorry",
        text: "Withdrawal can be made for only Bank and Momo Account",
      });
      return;
    }
    let newData = {
      user_id: userId,
      amount: amount,
      note: note,
      description: note,
      payment_method: selectedMethod.type,
      payment_item_no: selectedMethod.item_no,
    };

    console.log(newData);

    let response = await processMakeWithdrawal(newData);
    if (response.status == "success") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Transaction successfull",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops Sorry",
        text: "An Issue occured please try again",
      });
    }

    console.log(newData);
    // console.log("Withdrawing with note:", note);
    // Perform withdrawal logic
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

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return transactionList.filter((item) => {
      const description = item.description?.toLowerCase() || "";
      const note = item.note?.toLowerCase() || "";
      const type = item.type?.toLowerCase() || "";
      const status = item.status?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();

      return (
        description.includes(search) ||
        note.includes(search) ||
        type.includes(search) ||
        status.includes(search)
      );
    });
  }, [searchTerm, transactionList]);

  const handleDeletePaymentMethod = async (data) => {
    let new_data = {
      user_id: userId,
      type: data.type,
      item_no: data.item_no,
    };
    let response = await processDeletePaymentMethod(new_data);
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
  };

  return (
    <div className="tw-css bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold text-gray-800">
            Financial Overview
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your earnings, payments, and history.
          </p>
        </header>

        {/* Summary Cards */}
        <section className="grid md:grid-cols-3 gap-4">
          <div className="bg-white shadow-sm rounded-xl p-5 flex justify-between items-center hover:shadow-md transition">
            <div>
              <p className="text-gray-500">Active Projects</p>
              <p className="text-3xl font-bold text-gray-800">
                {freelanceProjectList?.length}
              </p>
              <p className="text-sm text-green-600 mt-1"></p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <Briefcase className="text-green-600" size={24} />
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-xl p-5 flex justify-between items-center hover:shadow-md transition">
            <div>
              <p className="text-gray-500">Available Earnings</p>
              <p className="text-3xl font-bold text-green-600">
                ₵{freelanceEarnings.available}
              </p>
              {walletStatus == "true" && (
                <button className="mt-2 text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
                  Withdraw Funds
                </button>
              )}
              {walletStatus == "false" && (
                <>
                  <button
                    className="mt-2 text-sm bg-yellow-600 hover:bg-yellow-700 text-white px-3 
                  py-1 rounded"
                    onClick={handleCreateWallet}
                  >
                    {createWalletLoad
                      ? "creating wallet ..."
                      : " Create Wallet"}
                  </button>
                </>
              )}
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <DollarSign className="text-green-600" size={24} />
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-xl p-5 flex justify-between items-center hover:shadow-md transition">
            <div>
              <p className="text-gray-500">Pending Earnings</p>
              <p className="text-3xl font-bold text-GRAY-600">
                ₵{freelanceEarnings.pending}
              </p>
              {/* <p className="text-sm text-gray-500 mt-1">Processing this week</p> */}
            </div>
            <div className="bg-yellow-100 p-2 rounded-full">
              <DollarSign className="text-yellow-500" size={24} />
            </div>
          </div>
        </section>

        {/* Charts */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
            <h2 className="mb-4 text-lg font-semibold text-gray-700">
              Earnings Trend
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={areaChartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorEarnings"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="#4F46E5"
                  fillOpacity={1}
                  fill="url(#colorEarnings)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow w-full max-w-md mx-auto hover:shadow-md transition">
            <div
              className="flex justify-center items-center"
              style={{ height: "260px" }}
            >
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-y-3 gap-x-6 text-xs text-gray-700">
              {doughnutData.labels.map((label, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          doughnutData.datasets[0].backgroundColor[index],
                      }}
                    ></span>
                    <span>{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-5 gap-6">
          {/* Withdraw Funds */}
          <div className="w-full col-span-2 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Withdraw Funds
            </h2>

            <label className="block text-sm font-medium text-gray-600 mb-1">
              Payment Method
            </label>
            <select
              className="border border-gray-300 rounded-md p-2 w-full mb-4"
              value={selectedMethod.id}
              onChange={handleMethodChange}
            >
              {paymentMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.type} {method.details?.slice(-4)}
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium text-gray-600 mb-1">
              Amount
            </label>
            <div className="relative mb-2">
              <span className="absolute left-3 top-2.5 text-gray-500">₵</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7 border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Available: ₵{freelanceEarnings.available}
            </p>

            <button
              onClick={() => setShowNoteModal(true)}
              className="w-full bg-green-600  text-white py-2 rounded-md font-semibold transition"
            >
              Withdraw ₵{parseFloat(amount || 0).toFixed(2)}
            </button>
          </div>

          {/* Payment Methods */}
          <div className="col-span-3 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Payment Methods
              </h2>
              <button
                className="text-sm text-green-600 hover:underline"
                onClick={() => setIsModalOpen(true)}
              >
                + Add Method
              </button>
            </div>

            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`flex justify-between items-center p-4 border rounded-md cursor-pointer ${
                    selectedMethod?.id === method.id
                      ? "border-green-500 bg-green-50"
                      : ""
                  }`}
                  onClick={() => setSelectedMethod(method)}
                >
                  <div>
                    <p className="font-medium text-gray-700">{method.type}</p>
                    <p className="text-sm text-gray-500">{method.detail}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {method.isDefault && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                    <button
                      onClick={() => handleDeletePaymentMethod(method)}
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      //   handleRemoveMethod(method.id);
                      // }}
                      className="text-red-500 text-xs hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Tables */}
        <section className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
  <h2 className="text-lg font-semibold text-gray-700">
    Transaction History
  </h2>
  <div className="flex flex-wrap gap-2">
    <input
      type="text"
      placeholder="Search transactions..."
      className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full sm:w-48 focus:outline-none"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button
      className="border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-100"
      onClick={() => setSearchTerm("")}
    >
      Clear
    </button>
    <button
      className="border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-100"
      onClick={() => {
        const csv = [
          ["Date", "Description", "Note", "Type", "Amount", "Status"],
          ...filteredData.map((row) => [
            row.date,
            row.description,
            row.note,
            row.type,
            row.amount,
            row.status,
          ]),
        ]
          .map((row) =>
            row
              .map((field) => `"${String(field).replace(/"/g, '""')}"`)
              .join(",")
          )
          .join("\n");

        const blob = new Blob([csv], {
          type: "text/csv;charset=utf-8;",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("hidden", "");
        a.setAttribute("href", url);
        a.setAttribute("download", "transactions.csv");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }}
    >
      Export
    </button>
  </div>
</div>

          <DataTable
            columns={transactionColumns}
            data={filteredData}
            pagination
            highlightOnHover
            striped
            responsive
            paginationComponentOptions={{
              rowsPerPageText: "Rows per page:",
              rangeSeparatorText: "of",
              selectAllRowsItem: true,
              selectAllRowsItemText: "All",
            }}
            customStyles={{
              pagination: {
                style: {
                  borderTop: "1px solid #e5e7eb",
                  paddingTop: "1rem",
                  justifyContent: "flex",
                },
              },
            }}
          />
        </section>

        <section className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Active Contracts
          </h2>
          <DataTable
            columns={contractColumns}
            data={contractData}
            pagination
            responsive
            striped
            highlightOnHover
          />
        </section>
        {/* Payment methos modal */}
        <AddPaymentMethodModal
          isOpen={isModalOpen}
          paymentItemsNo={paymentMethods.length}
          onClose={() => setIsModalOpen(false)}
        />

        {/* withdrawal note modal */}
        <NoteModal
          isOpen={showNoteModal}
          onClose={() => setShowNoteModal(false)}
          onConfirm={() => {
            handleWithdraw();
            setShowNoteModal(false);
          }}
          note={note}
          setNote={setNote}
        />
      </div>
    </div>
  );
}
