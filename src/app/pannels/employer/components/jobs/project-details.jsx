import React, { useState } from "react";
import { Check, Clock } from "lucide-react";
import ReleasePaymentModal from "./release-payment-modal";

import { PaperClipIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import AddFundsModal from "./AddFundsModal";
import { useNavigate } from "react-router-dom";
const ProjectDetailPage = () => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate =useNavigate()

  const handleAddFunds = (data) => {
    console.log("Funds Added:", data);
    setShowModal(false);
  };
  const milestones = [
    {
      title: "Project Requirements & Wireframes",
      description:
        "Detailed project requirements document and initial wireframes for key pages.",
      status: "Completed",
      dueDate: "May 10, 2025",
      color: "green",
      files: ["requirements_doc.pdf", "wireframes_v1.fig"],
    },
    {
      title: "Frontend Development",
      description:
        "Development of responsive frontend components and integration with API endpoints.",
      status: "In Progress",
      dueDate: "May 30, 2025",
      color: "yellow",
      files: ["GitHub Repository", "frontend_progress_report.pdf"],
    },
    {
      title: "Backend Development",
      description:
        "API development, database optimization, and server-side functionality.",
      status: "Pending",
      dueDate: "June 15, 2025",
      color: "gray",
      files: [],
    },
    {
      title: "Testing & Deployment",
      description:
        "Quality assurance testing, bug fixes, and deployment to production environment.",
      status: "Pending",
      dueDate: "June 30, 2025",
      color: "gray",
      files: [],
    },
  ];

  const finance = {
    budget: 8500,
    escrow: 3200,
    paid: 2650,
  };

  const remaining = finance.budget - finance.paid;
  const project = {
    title: "E-commerce Platform Redesign",
    status: "In Progress",
    startDate: "May 1, 2025",
    dueDate: "June 30, 2025",
    budget: 8500,
    escrow: 3200,
    paid: 2650,
    progress: 42,
    tags: [
      "Web Development",
      "UI/UX Design",
      "E-commerce",
      "Backend",
      "Database",
    ],
  };

  const freelancer = {
    name: "Kwame Osei",
    title: "Senior Backend Developer",
    rating: 4.8,
    reviews: 42,
    availability: "Available",
    responseTime: "Usually within 2 hours",
    timeZone: "GMT+0 (Accra)",
    skills: [
      "JavaScript",
      "Node.js",
      "React",
      "MongoDB",
      "API Development",
      "AWS",
    ],
  };

  const handleSend = () => {
    console.log("Message:", message);
    if (attachment) console.log("Attachment:", attachment.name);
    setMessage("");
    setAttachment(null);
  };

  return (
    <div className="tw-css max-w-7xl mx-auto p-6 text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
              <span className="text-xl">{"</>"}</span>
            </div>
            <h1 className="text-2xl font-bold">{project.title}</h1>
            <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full">
              In Progress
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Started {project.startDate} • Due {project.dueDate}
          </p>
        </div>
        <div className="flex gap-3 mt-2">
          <button className="border border-gray-300 rounded px-4 py-2 text-sm hover:bg-gray-100">
            Edit Project
          </button>
          <button className="bg-green-600 text-white rounded px-4 py-2 text-sm hover:bg-green-700">
            Actions
          </button>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid md:grid-cols-3 gap-4 mb-4 mt-6">
        {/* Left: Project Overview */}
        <div className="md:col-span-2 border rounded-lg p-6 bg-white">
          <h2 className="text-lg font-semibold mb-4">Project Overview</h2>
          <p className="text-sm mb-6 text-gray-700">
            This project involves a complete redesign of our e-commerce
            platform, including the frontend user interface, backend systems,
            and database optimization. The goal is to improve user experience,
            increase conversion rates, and enhance overall performance.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Total Budget</p>
              <p className="text-lg font-semibold">
                ₵{project.budget.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Amount in Escrow</p>
              <p className="text-lg font-semibold">
                ₵{project.escrow.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Paid to Date</p>
              <p className="text-lg font-semibold">
                ₵{project.paid.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Project Progress</p>
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div
                className="h-3 bg-green-600 rounded-full"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">{project.progress}%</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-gray-100 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Freelancer Info */}
        <div className="border rounded-lg p-6 bg-white">
          <h2 className="text-lg font-semibold mb-4">Freelancer Information</h2>
          <div className="flex items-center gap-4 mb-4">
            <img
              src="https://placehold.co/600x400"
              alt="Freelancer Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{freelancer.name}</p>
              <p className="text-sm text-gray-500">{freelancer.title}</p>
              <p className="text-yellow-500 text-sm">
                ⭐ {freelancer.rating} ({freelancer.reviews} reviews)
              </p>
            </div>
          </div>

          <div className="text-sm space-y-1 mb-4">
            <p>
              <strong>Availability:</strong>{" "}
              <span className="text-green-600">{freelancer.availability}</span>
            </p>
            <p>
              <strong>Response Time:</strong> {freelancer.responseTime}
            </p>
            <p>
              <strong>Time Zone:</strong> {freelancer.timeZone}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {freelancer.skills.map((skill, idx) => (
              <span key={idx} className="text-xs bg-gray-200 px-3 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <button className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 text-sm">
              💬 Message
            </button>
            <button className="border border-gray-300 w-full py-2 rounded hover:bg-gray-100 text-sm">
              📞 Call
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-4 mt-6">
        {/* Milestones */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Milestones & Deliverables</h2>
            <button className="text-sm border border-gray-300 rounded px-3 py-1 hover:bg-gray-100">
              + Add Milestone
            </button>
          </div>

          <ol className="relative border-l border-gray-300">
            {milestones.map((m, i) => (
              <li key={i} className="mb-8 ml-4">
                <span
                  className={`absolute w-4 h-4 rounded-full -left-2 top-1.5 ${
                    m.color === "green"
                      ? "bg-green-500"
                      : m.color === "yellow"
                      ? "bg-yellow-400"
                      : "bg-gray-400"
                  }`}
                />
                <h3 className="text-sm font-semibold">{m.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{m.description}</p>

                {m.files.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {m.files.map((file, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-xs px-3 py-1 rounded-full flex items-center gap-1"
                      >
                        📄 {file}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm">
                  <span
                    className={`${
                      m.status === "Completed"
                        ? "text-green-600 bg-green-100"
                        : m.status === "In Progress"
                        ? "text-yellow-700 bg-yellow-100"
                        : "text-gray-600 bg-gray-100"
                    } px-2 py-0.5 rounded-full text-xs font-medium`}
                  >
                    {m.status}
                  </span>
                  <span className="text-gray-500">
                    {m.status === "Completed" ? "" : "Due "} {m.dueDate}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Financial Summary */}
        <div className="bg-white rounded-lg p-6 border">
          <h2 className="text-lg font-semibold mb-4">Financial Summary</h2>
          <ul className="text-sm space-y-2 mb-4">
            <li className="flex justify-between">
              <span>Total Budget</span>
              <span>
                $
                {finance.budget.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Amount in Escrow</span>
              <span>
                $
                {finance.escrow.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Paid to Date</span>
              <span>
                $
                {finance.paid.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </li>
            <li className="flex justify-between font-semibold text-gray-800 border-t pt-2">
              <span>Remaining Budget</span>
              <span>
                $
                {remaining.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </li>
          </ul>

          {/* Pie Legend Only (no actual chart) */}
          <div className="flex justify-center items-center gap-4 my-4">
            <div className="w-20 h-20 relative">
              <div className="absolute w-full h-full rounded-full border-8 border-t-blue-400 border-r-green-300 border-b-orange-300 border-l-transparent" />
            </div>
            <div className="text-xs space-y-1">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-blue-400" /> Paid
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-green-300" /> In Escrow
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-orange-300" />{" "}
                Remaining
              </div>
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-2 text-sm"
          >
            💳 Release Payment
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="w-full border border-gray-300 py-2 rounded mb-2 text-sm hover:bg-gray-50"
          >
            🏦 Add Funds to Escrow
          </button>
          <button 
            onClick={() => navigate('/dashboard-client/payment-history')}
          className="w-full border border-gray-300 py-2 rounded text-sm hover:bg-gray-50">
            📊 View Payment History
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8 mt-6">
        {/* Communication Hub Section */}
        <div className="bg-white p-6 rounded-md shadow md:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Communication Hub</h2>
            <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700">
              Schedule Meeting
            </button>
          </div>

          {/* Chat Messages */}
          <div className="space-y-6">
            {/* Message from Developer */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <div className="bg-gray-100 p-4 rounded-md max-w-2xl">
                <p className="text-xs text-gray-500 mb-1">
                  May 20, 2025 · 10:45 AM
                </p>
                <p className="text-sm text-gray-800">
                  Hi there! Ive completed the frontend components for the
                  product listing page. You can check the preview in the
                  development environment. Let me know your thoughts!
                </p>
              </div>
            </div>

            {/* Reply from Client */}
            <div className="flex items-start justify-end gap-3">
              <div className="bg-green-500 text-white p-4 rounded-md max-w-2xl">
                <p className="text-sm">
                  Great work, Kwame! I just checked the product listing page and
                  it looks fantastic. The filtering functionality is working
                  smoothly. I have a few minor suggestions for the mobile view
                  can we schedule a quick call to discuss?
                </p>
                <p className="text-xs text-right mt-1">
                  May 20, 2025 · 11:30 AM
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            </div>

            {/* Developer Reply */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <div className="bg-gray-100 p-4 rounded-md max-w-2xl">
                <p className="text-xs text-gray-500 mb-1">
                  May 20, 2025 · 11:45 AM
                </p>
                <p className="text-sm text-gray-800">
                  Absolutely! I am available for a call today between 2–4 PM or
                  tomorrow morning. Let me know what works best for you.
                </p>
              </div>
            </div>
          </div>

          {/* Message Input Area */}
          <div className="flex items-center gap-3 mt-6 border-t pt-4">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm"
            />
            <label>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setAttachment(e.target.files[0])}
              />
              <PaperClipIcon className="w-6 h-6 text-gray-600 cursor-pointer" />
            </label>
            <button
              onClick={handleSend}
              className="p-2 bg-green-500 rounded-full text-white hover:bg-green-600"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Project Timeline Section */}
        <div className="bg-white p-6 rounded-md shadow">
          <h2 className="text-xl font-semibold mb-4">Project Timeline</h2>
          <p className="text-sm">
            Start Date: <strong>May 1, 2025</strong>
          </p>
          <p className="text-sm">
            Due Date: <strong>June 30, 2025</strong>
          </p>
          <p className="text-sm mt-2">
            Time Elapsed: <strong>20 days (33%)</strong>
          </p>

          {/* Optional: Bar Chart or Progress Bar */}
          <div className="w-full bg-gray-200 h-2 rounded-full mt-4 mb-4">
            <div
              className="bg-green-400 h-2 rounded-full"
              style={{ width: "33%" }}
            ></div>
          </div>

          {/* Project Stages */}
          <div className="text-sm space-y-2">
            <div className="flex items-center">
              <Check
                size={"12px"}
                className="w-5 h-5 bg-green-200 rounded-full text-green-500 p-1"
              />
              <p className="m-0">Project Started — May 1, 2025</p>
            </div>
            <div className="flex items-center">
              <Check
                size={"12px"}
                className="w-5 h-5 bg-green-200 rounded-full text-green-500 p-1"
              />
              <p>Requirements Completed — May 10, 2025</p>
            </div>
            <div className="flex items-center">
              <Clock
                size={"12px"}
                className="w-5 h-5 bg-yellow-200 rounded-full text-yellow-500 p-1"
              />
              <p>
                <strong>Frontend Development</strong> — In Progress (Due May 30,
                2025)
              </p>
            </div>
            <div className="flex items-center">
              <Clock
                size={"12px"}
                className="w-5 h-5 bg-gray-200 rounded-full text-gray-500 p-1"
              />
              <p className="text-gray-500">
                Backend Development — Pending (Due June 15, 2025)
              </p>
            </div>
            <div className="flex items-center">
              <Clock
                size={"12px"}
                className="w-5 h-5 bg-gray-200 rounded-full text-gray-500 p-1"
              />
              <p className="text-gray-500">
                Testing & Deployment — Pending (Due June 30, 2025)
              </p>
            </div>
          </div>
        </div>
       
      </div>
       {/* payment modal */}
        <ReleasePaymentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        {showModal && (
          <AddFundsModal
            currentBalance={3200}
            onClose={() => setShowModal(false)}
            onAddFunds={handleAddFunds}
          />
        )}
    </div>
  );
};

export default ProjectDetailPage;
