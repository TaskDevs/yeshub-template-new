import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";

const steps = [
  { name: "Basic Details" },
  { name: "Team Assignment" },
  { name: "Milestones" },
  { name: "Budgets" },
];

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

const category = ["Software Development", "Graphics", "AI"];

export default function CreateProject() {
  const [currentStep, setCurrentStep] = useState(0);
  const [structureType, setStructureType] = useState("flat");
  const [formData, setFormData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isOn, setIsOn] = useState(false);
  const [value, setValue] = useState(50);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Doughnut Chart Data
  const doughnutData = {
    labels: ["Withdrawals ", "Earnings"],
    datasets: [
      {
        data: [200, 150],
        backgroundColor: ["#4F46E5", "#FACC15"],
        borderWidth: 1,
      },
    ],
  };

  const renderForm = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <h4 className="text-gray-700 font-semibold mb-6">
              Project Basic Details
            </h4>
            <div className="flex mb-4">
              <div className="w-full">
                <label className="text-sm text-gray-500">Project Name</label>
                <input
                  name="projectName"
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Enter Project Name"
                  className="w-full pl-2 pr-4 py-2 mt-2 border rounded-md 
                  focus:outline-none"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm text-gray-500 mb-1">
                  Project Category
                </label>
                <select
                  className="w-full border rounded-md px-3 py-2 mt-2 text-sm"
                  name="projectCategory"
                  value={formData.projectCategory}
                  onChange={(e) => handleChange(e)}
                >
                  {category.map((item, idx) => (
                    <option key={idx} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message Field */}
            <div className="mb-4">
              <label className="block text-sm text-gray-700">
                Project Description
              </label>
              <textarea
                value={formData.message}
                name="description"
                onChange={(e) => handleChange(e)}
                placeholder="Type your message here..."
                rows="4"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
            </div>

            <div className="flex mb-4">
              <div className="w-full">
                <label className="text-sm text-gray-500">Start Date</label>
                <input
                  name="startDate"
                  onChange={(e) => handleChange(e)}
                  type="date"
                  placeholder="-/-/-"
                  className="w-full pl-2 pr-4 py-2 mt-2 border rounded-md 
                  focus:outline-none"
                />
              </div>
              <div className="w-full">
                <label className="text-sm text-gray-500">End Date</label>
                <input
                  name="endDate"
                  onChange={(e) => handleChange(e)}
                  type="date"
                  placeholder="-/-/-"
                  className="w-full pl-2 pr-4 py-2 mt-2 border rounded-md 
                  focus:outline-none"
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm text-gray-500 mb-4">Client Information</h4>
              <div className="flex ">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                  <span>Confidential Project</span>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                  <span>Requires NDA</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <h4 className="text-gray-700 font-semibold mb-6">
              Team Assignment
            </h4>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">Team Members</span>
              <span className="text-sm text-gray-400">selected: 3/10</span>
            </div>
            <div className="relative mb-4">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search team members by name or skill..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex space-x-2 items-start">
              <div className="w-full border border-gray-300 p-4 bg-white rounded-xl h-96 overflow-y-auto custom-scrollbar">
                <div>
                  <h4 className="text-gray-400 text-sm font-semibold mb-6">
                    Available Team Members
                  </h4>
                  <div className="flex items-start gap-4 mb-6">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-green-600"
                    />
                    <img
                      src="https://placehold.co/600x400"
                      alt="Freelancer Avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-gray-600 font-semibold">
                        Kwame Osei
                      </h4>
                      <span className="text-sm text-gray-600 block mb-2">
                        Senior Backend Developer
                      </span>
                      <div>
                        <span className="text-sm text-gray-500 rounded-full bg-gray-200 p-1 px-2 mr-2">
                          Node.js
                        </span>
                        <span className="text-sm text-gray-500 rounded-full bg-gray-200 p-1 px-2 mr-2">
                          MongoDB
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 mb-6">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-green-600"
                    />
                    <img
                      src="https://placehold.co/600x400"
                      alt="Freelancer Avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-gray-600 font-semibold">
                        Kwame Osei
                      </h4>
                      <span className="text-sm text-gray-600 block mb-2">
                        Senior Backend Developer
                      </span>
                      <div>
                        <span className="text-sm text-gray-500 rounded-full bg-gray-200 p-1 px-2 mr-2">
                          Node.js
                        </span>
                        <span className="text-sm text-gray-500 rounded-full bg-gray-200 p-1 px-2 mr-2">
                          MongoDB
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 mb-6">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-green-600"
                    />
                    <img
                      src="https://placehold.co/600x400"
                      alt="Freelancer Avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-gray-600 font-semibold">
                        Kwame Osei
                      </h4>
                      <span className="text-sm text-gray-600 block mb-2">
                        Senior Backend Developer
                      </span>
                      <div>
                        <span className="text-sm text-gray-500 rounded-full bg-gray-200 p-1 px-2 mr-2">
                          Node.js
                        </span>
                        <span className="text-sm text-gray-500 rounded-full bg-gray-200 p-1 px-2 mr-2">
                          MongoDB
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="w-full border border-gray-300 p-4 bg-white rounded-xl h-96 overflow-y-auto 
              custom-scrollbar"
              >
                <div>
                  <h4 className="text-gray-400 text-sm font-semibold mb-6">
                    Selected Team Members
                  </h4>

                  <div className="flex items-start gap-4 mb-6 bg-gray-100 p-4 rounded-xl">
                    <img
                      src="https://placehold.co/600x400"
                      alt="Freelancer Avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-gray-600 font-semibold">
                        Kwame Osei
                      </h4>
                      <span className="text-sm text-gray-600 block mb-2">
                        Senior Backend Developer
                      </span>
                      <div>
                        <span className="text-sm text-gray-500 block">
                          Role in Project
                        </span>
                        <select
                          className="w-full border rounded-md px-3 py-2 mt-2 text-sm"
                          name="projectCategory"
                          value={formData.projectCategory}
                          onChange={(e) => handleChange(e)}
                        >
                          {category.map((item, idx) => (
                            <option key={idx} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 mb-6 bg-gray-100 p-4 rounded-xl">
                    <img
                      src="https://placehold.co/600x400"
                      alt="Freelancer Avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-gray-600 font-semibold">
                        Kwame Osei
                      </h4>
                      <span className="text-sm text-gray-600 block mb-2">
                        Senior Backend Developer
                      </span>
                      <div>
                        <span className="text-sm text-gray-500 block">
                          Role in Project
                        </span>
                        <select
                          className="w-full border rounded-md px-3 py-2 mt-2 text-sm"
                          name="projectCategory"
                          value={formData.projectCategory}
                          onChange={(e) => handleChange(e)}
                        >
                          {category.map((item, idx) => (
                            <option key={idx} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="text-sm text-gray-500 mb-4 mt-4">Team Structure</h4>
            <div className="flex w-full">
              <div
                className={`border-gray-200 rounded-xl p-4 ${
                  structureType == "flat" ? "bg-green-100" : "bg-white"
                } cursor-pointer`}
                onClick={() => setStructureType("flat")}
              >
                <h4 className="font-semibold">Flat Structure</h4>
                <p>
                  All team members report directly to you with equal
                  responsibilities
                </p>
              </div>
              <div
                className={`border-gray-200 rounded-xl p-4 ${
                  structureType == "hierarchial" ? "bg-green-100" : "bg-white"
                } cursor-pointer`}
                onClick={() => setStructureType("hierarchial")}
              >
                <h4 className="font-semibold">Hierarchical</h4>
                <p>
                  All team members report directly to you with equal
                  responsibilities
                </p>
              </div>
              <div
                className={`border-gray-200 rounded-xl p-4 ${
                  structureType == "matrix" ? "bg-green-100" : "bg-white"
                } cursor-pointer`}
                onClick={() => setStructureType("matrix")}
              >
                <h4 className="font-semibold">Matrix Structure</h4>
                <p>
                  All team members report directly to you with equal
                  responsibilities
                </p>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="">
            <h4 className="text-gray-700 font-semibold mb-6">
              Project Milestones
            </h4>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">Milestone Timeline</span>
              <span className="text-sm text-green-600 cursor-pointer">
                + Add Milestone
              </span>
            </div>
            <div className="border-gray-400 bg-white rounded-xl p-4">
              <div className="mb-2">
                <span className="p-1 px-3 rounded-full bg-green-100 text-green-600 mr-2">
                  1
                </span>
                <span className="font-semibold">Project Kickoff</span>
              </div>
              <div className="flex mb-4">
                <div className="w-full">
                  <label className="text-sm text-gray-500">
                    Milestone Name
                  </label>
                  <input
                    name="milestoneName"
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Milestone Name"
                    className="w-full pl-2 pr-4 py-2 mt-2 border rounded-md 
                  focus:outline-none"
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm text-gray-500">Due Date</label>
                  <input
                    name="dueDate"
                    onChange={(e) => handleChange(e)}
                    type="date"
                    placeholder="Due Date"
                    className="w-full pl-2 pr-4 py-2 mt-2 border rounded-md 
                  focus:outline-none"
                  />
                </div>
              </div>
              {/* Message Field */}
              <div className="mb-4">
                <label className="block text-sm text-gray-700">
                  Description
                </label>
                <textarea
                  value={formData.message}
                  name="description"
                  onChange={(e) => handleChange(e)}
                  placeholder="Initial project setup, team onboarding and requirements gathering"
                  rows="4"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                />
              </div>

              <h4 className="text-sm text-gray-500">Deliverables</h4>
              <div>
                <div className="flex space-x-2">
                  <span className="w-4 h-4 bg-green-500"></span>
                  <input
                    name="deliverables_added"
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder=""
                    className="w-full pl-2 pr-4 py-2 mt-2 border rounded-xl 
                  focus:outline-none"
                  />
                  <span className="cursor-pointer text-gray-400">X</span>
                </div>
                <div className="flex space-x-2">
                  <span className="w-4 h-4 bg-green-500"></span>
                  <input
                    name="deliverables_added"
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder=""
                    className="w-full pl-2 pr-4 py-2 mt-2 border rounded-xl 
                  focus:outline-none"
                  />
                  <span className="cursor-pointer text-gray-400">X</span>
                </div>
                <div className="flex space-x-2">
                  <span className="w-4 h-4 bg-green-500"></span>
                  <input
                    name="deliverables_added"
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder=""
                    className="w-full pl-2 pr-4 py-2 mt-2 border rounded-xl 
                  focus:outline-none"
                  />
                  <span className="cursor-pointer text-gray-400">X</span>
                </div>
              </div>
              <span className="text-green-600 text-sm mt-6 mb-6 cursor-pointer block">
                + Add Deliverables
              </span>
              <div className="flex">
                <div className="w-full flex justify-between items-center">
                  <button
                    onClick={() => setIsOn(!isOn)}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ${
                      isOn ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
                        isOn ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <div>
                    <span className="text-gray-500 text-sm">Completion:</span>
                    <span className="text-gray-500 text-sm">33%</span>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-green-600 rounded-full"
                        style={{ width: `33%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-gray-200 rounded-xl bg-gray-200 mt-6 p-4">
              <h4 className="text-sm text-gray-700 font-semibold mb-6">
                Project Timeline
              </h4>
              <div className="p-4">
                <ol className="relative border-l border-gray-300">
                  {/* Payment Received */}
                  <li className="mb-10 ml-6">
                    <span
                      className={`absolute -left-3 flex items-center justify-center w-6 h-6
                         bg-green-100 rounded-full ring-8 ring-white`}
                    >
                      ✅
                    </span>
                    <div className="p-2">
                      <h4
                        className={`text-gray-700 font-semibold text-sm flex items-center mb-2`}
                      >
                        Project Kickoff
                        <span
                          className={` text-gray-600 text-xs font-semibold ml-2 px-2 py-0.5`}
                        >
                          May 1, 2025
                        </span>
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">
                        Initial planning and requirements gathering
                      </p>
                    </div>
                  </li>

                  <li className="mb-10 ml-6">
                    <span
                      className={`absolute -left-3 flex items-center justify-center w-6 h-6
                         bg-gray-100 rounded-full ring-8 ring-white`}
                    >
                      🧾
                    </span>
                    <div className="p-2">
                      <h4
                        className={`text-gray-700 font-semibold text-sm flex items-center mb-2`}
                      >
                        Design Phase
                        <span
                          className={` text-gray-600 text-xs font-semibold ml-2 px-2 py-0.5`}
                        >
                          May 1, 2025
                        </span>
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">
                        UI/UX design, wireframes and prototyping
                      </p>
                    </div>
                  </li>

                  {/* Invoice Sent */}
                  <li className="mb-10 ml-6">
                    <span
                      className={`absolute -left-3 flex items-center justify-center w-6 h-6
                     bg-gray-100 rounded-full ring-8 ring-white`}
                    >
                      🧾
                    </span>
                    <div className="p-2">
                      <h4
                        className={`text-gray-700 font-semibold text-sm flex items-center mb-2`}
                      >
                        Development Phase
                        <span
                          className={` text-gray-600 text-xs font-semibold ml-2 px-2 py-0.5`}
                        >
                          May 1, 2025
                        </span>
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">
                        Frontend and backend implementation
                      </p>
                    </div>
                  </li>

                  {/* Testing Phase */}
                  <li className="mb-10 ml-6">
                    <span
                      className={`absolute -left-3 flex items-center justify-center 
                        w-6 h-6 bg-blue-100 rounded-full ring-8 ring-white`}
                    >
                      🧾
                    </span>
                    <div className="p-2">
                      <h4
                        className={`text-gray-700 font-semibold text-sm flex items-center mb-2`}
                      >
                        Project Completion
                        <span
                          className={` text-gray-600 text-xs font-semibold ml-2 px-2 py-0.5`}
                        >
                          May 1, 2025
                        </span>
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">
                        Testing deployment and handover
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="border-gray-400 bg-white rounded-xl p-4">
            <h4 className="text-gray-700 font-semibold mb-6">
              Budget Allocation
            </h4>
            <div className="w-full flex items-start">
              <div className="w-2/3">
                <div className="mb-6">
                  <label className="text-gray-500 text-sm">
                    Total Project Budget
                  </label>
                  <input
                    name="totalBudget"
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="GH 60,000"
                    className="w-full pl-2 pr-4 py-2 mt-2 border rounded-md 
                  focus:outline-none"
                  />
                </div>
                <h4 className="text-gray-700 mb-6">Budget Breakdown</h4>
                <div className="border rounded-xl p-4 mb-4">
                  <div className="flex justify-between">
                    <label className="text-gray-500 text-sm">Development</label>
                    <label className="text-gray-500 text-sm">
                      60% GH 15,000
                    </label>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="border rounded-xl p-4 mb-4">
                  <div className="flex justify-between">
                    <label className="text-gray-500 text-sm">Development</label>
                    <label className="text-gray-500 text-sm">
                      60% GH 15,000
                    </label>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="border rounded-xl p-4 mb-4">
                  <div className="flex justify-between">
                    <label className="text-gray-500 text-sm">Development</label>
                    <label className="text-gray-500 text-sm">
                      60% GH 15,000
                    </label>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="border rounded-xl p-4 mb-4">
                  <div className="flex justify-between">
                    <label className="text-gray-500 text-sm">Development</label>
                    <label className="text-gray-500 text-sm">
                      60% GH 15,000
                    </label>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="flex justify-between">
                  <h4 className="text-gray-700 mb-6">
                    Additional Budget Items
                  </h4>
                  <span className="text-green-600 cursor-pointer">
                    + Add Item
                  </span>
                </div>
                <div>
                  <div className="flex justify-between mb-6">
                    <input
                      name="additional_item"
                      onChange={(e) => handleChange(e)}
                      type="text"
                      placeholder="Software Licenses"
                      className="w-full pl-2 pr-4 py-2 mt-2 border rounded-xl 
                  focus:outline-none"
                    />
                    <span className="cursor-pointer text-gray-500">X</span>
                  </div>
                  <div className="flex justify-between mb-6">
                    <input
                      name="additional_item"
                      onChange={(e) => handleChange(e)}
                      type="text"
                      placeholder="Software Licenses"
                      className="w-full pl-2 pr-4 py-2 mt-2 border rounded-xl 
                  focus:outline-none"
                    />
                    <span className="cursor-pointer text-gray-500">X</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-700">
                    Budget Notes
                  </label>
                  <textarea
                    value={formData.message}
                    name="budget_notes"
                    onChange={(e) => handleChange(e)}
                    placeholder="Add any additional notes about the budget"
                    rows="4"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:ring-2 focus:ring-green-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div className="w-1/3">
                <h4 className="font-semibold mb-4">Budget Summary</h4>
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

                  <div className="flex justify-between mt-4">
                    <span className="text-sm text-gray-500">Development</span>
                    <span className=" text-gray-600 font-semibold">
                      GH 2,500
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Design</span>
                    <span className=" text-gray-600 font-semibold">
                      GH 2,500
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Project Management
                    </span>
                    <span className=" text-gray-600 font-semibold">
                      GH 2,500
                    </span>
                  </div>
                  <hr className="mt-4" />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total Budget</span>
                    <span className=" text-green-600 font-semibold">
                      GH 27,000
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="tw-css">
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6">Create Project</h2>
        <div className="flex items-center justify-between mb-8 w-full">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 flex items-center justif-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-semibold ${
                    currentStep === index
                      ? "bg-green-200 border-green-400 text-green-800"
                      : "bg-white border-gray-300 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="text-sm mt-2 text-center whitespace-nowrap">
                  {step.name}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
              )}
            </div>
          ))}
        </div>
        <div className="bg-gray-50 border p-6 rounded-xl">{renderForm()}</div>
        <div className="mt-6 flex">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
            }
            disabled={currentStep === steps.length - 1}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
