import React, { useEffect, useState } from 'react';

export default function InviteToJobModal({
  isOpen,
  onClose,
  jobOptions = [],
  freelancerName = "",
  freelancerId = null,
  onSend = () => {},
}) {
  const [selectedJob, setSelectedJob] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const employerId = sessionStorage.getItem("userId");
useEffect(() => {
  if (jobOptions.length > 0) {
    setSelectedJob(jobOptions[0].id); // use job title or full object if needed
  }
}, [jobOptions]);


const sendInvitation = async () => {
  setLoading(true);
  try {
    const data = {
      freelancer_id: freelancerId,
      company_id: employerId,
      job_id: selectedJob,
      response:response,
    };

    await onSend(data);
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
        <h5 className="text-sm font-semibold text-green-500 mb-4">
          Invite  {freelancerName} to Job.
        </h5>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Job
          </label>
          <select
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
          >
            {jobOptions.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message (Optional)
          </label>
          <textarea
            rows={4}
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder={`Write a message to free...`}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={sendInvitation}
            disabled={loading}
            className={`bg-green-600 text-white px-4 py-2 rounded-md text-sm ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
            }`}
          >
            {loading ? 'Sending...' : 'Send Invitation'}
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
