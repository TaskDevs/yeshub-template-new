

export default function ScheduleMeetingModal({ isOpen, onClose, participantName = "Kwame Osei" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 mt-10">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        <h2 className="text-lg font-semibold mb-4">Schedule Meeting with {participantName}</h2>

        {/* Meeting Topic */}
        <div className="mb-3">
          <label className="text-sm font-medium">Meeting Topic</label>
          <input
            type="text"
            placeholder="Enter meeting topic"
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date and Time */}
        <div className="flex gap-3 mb-3">
          <div className="flex-1">
            <label className="text-sm font-medium">Date</label>
            <input
              type="date"
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium">Time</label>
            <input
              type="time"
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Duration */}
        <div className="mb-3">
          <label className="text-sm font-medium">Duration</label>
          <select className="mt-1 w-full border rounded-lg px-3 py-2 text-sm">
            <option>30 minutes</option>
            <option>1 hour</option>
            <option>1.5 hours</option>
            <option>2 hours</option>
          </select>
        </div>

        {/* Platform */}
        <div className="mb-3">
          <label className="text-sm font-medium">Platform</label>
          <select className="mt-1 w-full border rounded-lg px-3 py-2 text-sm">
            <option>Zoom</option>
            <option>Google Meet</option>
            <option>Teams</option>
            <option>Skype</option>
          </select>
        </div>

        {/* Agenda */}
        <div className="mb-4">
          <label className="text-sm font-medium">Agenda</label>
          <textarea
            rows="3"
            placeholder="Enter meeting agenda"
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm"
          >
            Cancel
          </button>
          <button className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700">
            Schedule Meeting
          </button>
        </div>
      </div>
    </div>
  );
}
