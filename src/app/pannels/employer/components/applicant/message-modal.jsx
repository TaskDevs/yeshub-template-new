import React, { useState } from "react";
import { useChat } from "../../../../context/chat/chatContext";

export default function MessageModal({ isOpen, onClose, messageData }) {
  const {
    // messages,
    // loadMessages,
    handleSendMessage,
  } = useChat();
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSend = async () => {
    setLoading(true);
    // const formData = new FormData();
    // formData.append("message", message);
    // formData.append("file", file);

    let newData = {
      receiver_id: messageData.receiver_id,
      sender_id: messageData.sender_id,
      message: message,
    };

    await handleSendMessage(newData); // assumes onSend is a prop that handles the message posting
    setLoading(false);
    onClose();
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

        <h2 className="text-lg font-semibold mb-4">
          Message to {messageData?.freelancer_name}
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            rows={5}
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Attach File
          </label>
          <input type="file" onChange={handleFileChange} />
          {file && <p className="text-sm mt-1 text-gray-600">{file.name}</p>}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSend}
            disabled={loading || !message.trim()}
            className={`bg-green-600 text-white px-4 py-2 rounded-md text-sm ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
            }`}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
