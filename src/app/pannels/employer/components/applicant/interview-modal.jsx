import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { EmployerApiData } from "../../../../context/employers/employerContextApi";

export default function InterviewModal({
  isOpen,
  onClose,
  candidateData,
  status,
}) {
  const { processSetInterview, interviewInfo } = useContext(EmployerApiData);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [format, setFormat] = useState("WhatsApp video call");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [interviewers, setInterviewers] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const isViewOnly = status === "view";

  useEffect(() => {
    if (status == "view" || status == "edit") {
      //console.log(interviewInfo);
      setDate(interviewInfo.date);
      setTime(interviewInfo.time);
      setFormat(interviewInfo.format);
      setLocation(interviewInfo.location);
      setDuration(interviewInfo.duration);
      setInterviewers(interviewInfo.inteviewers);
      setInterviewers(interviewInfo.notes);
    }
  }, [interviewInfo]);

  const handleSchedule = async () => {
    setLoading(true);
    try {
      let newData = {
        proposal_id: candidateData.proposal_id,
        user_id: candidateData.user_id,
        date: date,
        time: time,
        format: format,
        location: location,
        duration: duration,
        interviewers: interviewers,
        notes: notes,
      };

      let response = await processSetInterview(newData);
      if (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Interview set successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: "Failed to post a job",
        });
      }
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-4">Schedule Interview</h2>

        {/* Date and Time on same row */}
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              disabled={isViewOnly}
              type="date"
              className="w-full border rounded-md px-3 py-2 text-sm"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              disabled={isViewOnly}
              type="time"
              className="w-full border rounded-md px-3 py-2 text-sm"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        {/* Format */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interview Format
          </label>
          <select
            disabled={isViewOnly}
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option>WhatsApp video call</option>
            <option>Google Meet</option>
            <option>Zoom</option>
            <option>Phone call</option>
          </select>
        </div>

        {/* Location or Link */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location / Meeting Link
          </label>
          <input
            disabled={isViewOnly}
            type="text"
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Enter link or location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration
          </label>
          <input
            disabled={isViewOnly}
            type="text"
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="e.g. 30 minutes"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        {/* Interviewers */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interviewers
          </label>
          <textarea
            disabled={isViewOnly}
            rows={2}
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Enter interviewer names"
            value={interviewers}
            onChange={(e) => setInterviewers(e.target.value)}
          />
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            disabled={isViewOnly}
            rows={2}
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Any additional information..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          {!isViewOnly && (
            <button
              onClick={handleSchedule}
              disabled={loading}
              className={`bg-green-600 text-white px-4 py-2 rounded-md text-sm ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
              }`}
            >
              {loading ? "Scheduling..." : "Schedule Interview"}
            </button>
          )}

          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
