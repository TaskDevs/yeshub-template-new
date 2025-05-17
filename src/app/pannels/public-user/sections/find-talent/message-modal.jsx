import React, { useState } from "react";
import { X } from "lucide-react";
import Avatar from "@mui/material/Avatar";

export default function MessageModal({ isOpen, onClose }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // For demo: Log the message details
    console.log("Sending message:");
    console.log("Subject:", subject);
    console.log("Message:", message);
    console.log("File:", file);

    // TODO: Replace with your API call
    // const formData = new FormData();
    // formData.append("subject", subject);
    // formData.append("message", message);
    // if (file) formData.append("attachment", file);

    // Reset form
    setSubject("");
    setMessage("");
    setFile(null);
    onClose();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 mt-10">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex items-center space-x-4 mb-4">
            <Avatar alt="" src="https://placehold.co/400" className="w-12 h-12" />
            <div>
              <h2 className="font-semibold text-lg">David Chen</h2>
              <p className="text-sm text-gray-500">UI/UX Designer | Product Design</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>
          </div>

          {/* Subject Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter message subject"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Message Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows="4"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Attachments */}
          <div className="mb-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="file" className="hidden" onChange={handleFileChange} />
              <span className="inline-block px-3 py-1 border rounded-md text-sm border-gray-400">
                Add Files
              </span>
              <span className="text-sm text-gray-500">
                {file ? file.name : "No files selected"}
              </span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow"
            >
              Send Message
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
