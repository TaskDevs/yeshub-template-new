import React, { useEffect, useState } from "react";

export default function HireTalentModal({
  isOpen,
  onClose,
  jobOptions = [],
  projectTypeData = ["one-time project", "ongoing project"],
  timeLineData = ["Less than 1 week", "Less than a month"],
  onSend = () => {},
}) {
  const [selectedJob, setSelectedJob] = useState("");
  const [projectType, setProjectType] = useState("");
  const [timeLine, setTimeLine] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (jobOptions.length > 0) {
      setSelectedJob(jobOptions[0]);
    }
    if (projectTypeData.length > 0) {
      setProjectType(projectTypeData[0]);
    }
    if (timeLineData.length > 0) {
      setTimeLine(timeLineData[0]);
    }
  }, [jobOptions, projectType, timeLine]);

  const sendInvitation = async () => {
    setLoading(true);
    try {
      await onSend({ selectedJob, message });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">Hire David Chen</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Title
          </label>
          <select
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
          >
            {jobOptions.map((job, idx) => (
              <option key={idx} value={job}>
                {job}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Description
          </label>
          <textarea
            rows={4}
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder={`Write a message to free...`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Type
          </label>
          <select
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={selectedJob}
            onChange={(e) => setProjectType(e.target.value)}
          >
            {projectTypeData.map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Budget
          </label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="GH Enter your budget"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Timeline
          </label>
          <select
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={selectedJob}
            onChange={(e) => setProjectType(e.target.value)}
          >
            {timeLineData.map((item, idx) => (
              <option key={idx} value={item}>
                {timeLine}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={sendInvitation}
            disabled={loading}
            className={`bg-green-600 text-white px-4 py-2 rounded-md text-sm ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
            }`}
          >
            {loading ? "Sending..." : "Submit Proposal"}
          </button>
          <button
            onClick={onClose}
            disabled={loading}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
