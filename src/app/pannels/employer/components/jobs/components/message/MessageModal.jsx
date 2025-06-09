import { useState } from 'react';

export default function MessageModal({ recipientName, isOpen, onClose }) {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  if (!isOpen) return null;

  const handleSend = () => {
    // Handle the message submission logic here
    console.log('Sending message to:', recipientName);
    console.log('Message:', message);
    console.log('File:', file);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg w-full max-w-md shadow-lg p-6">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">Message to {recipientName}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-xl">&times;</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Message</label>
            <textarea
              className="w-full border rounded p-2 resize-none"
              rows="4"
              maxLength={500}
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">Maximum 500 characters</p>
          </div>

          <div>
            <label className="block font-medium mb-1">Attachments</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-600"
            />
            <p className="text-sm text-gray-500 mt-1">Maximum file size: 10MB</p>
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={handleSend} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
