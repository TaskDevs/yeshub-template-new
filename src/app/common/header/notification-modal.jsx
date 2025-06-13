import React, { useEffect } from "react";
import NotificationList from "./notification-list"; // assuming it's in a separate file
import { useChat } from "../../context/chat/chatContext";
import { userId } from "../../../globals/constants";

export default function NotificationModal({ isOpen, onClose }) {
  const { processGetMessagesOfReceiver } = useChat();

  useEffect(() => {
    processGetMessagesOfReceiver(userId);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <NotificationList />
      </div>
    </div>
  );
}
