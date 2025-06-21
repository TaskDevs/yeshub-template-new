import React, { useEffect } from "react";
import NotificationList from "./notification-list";
import { useChat } from "../../context/chat/chatContext";
import { userId } from "../../../globals/constants";

export default function NotificationDrawer({ isOpen, onClose }) {
  const { processGetMessagesOfReceiver } = useChat();

  useEffect(() => {
    if (isOpen) {
      processGetMessagesOfReceiver(userId);
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-40" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`absolute top-0 right-0 h-full bg-white shadow-lg w-full max-w-md transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(100vh-64px)]">
          <NotificationList />
        </div>
      </div>
    </div>
  );
}
