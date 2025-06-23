import React, { useState } from "react";
import { useChat } from "../../context/chat/chatContext";

const ITEMS_PER_PAGE = 10;

export default function NotificationList() {
  const { messages, processMarkAsRead } = useChat();
  const [expandedId, setExpandedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(messages.length / ITEMS_PER_PAGE);

  const paginatedMessages = messages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleExpand = (id, status, stage) => {
    if (stage === "view") {
      processMarkAsRead(id, status);
    }
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-2">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 py-16">
          <svg
            className="w-12 h-12 mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75h.008v.008H9.75V9.75zM14.25 9.75h.008v.008h-.008V9.75zM9 15c.5.667 1.5 1 3 1s2.5-.333 3-1m2.25-7.5A9 9 0 1 1 6.75 6.75 9 9 0 0 1 18.75 7.5z"
            />
          </svg>
          <h3 className="text-lg font-semibold mb-2">No Notifications Yet</h3>
          <p className="text-sm text-gray-400 max-w-xs text-center">
            You don’t have any notifications at the moment. Messages from employers will appear here.
          </p>
        </div>
      ) : (
        <>
          {paginatedMessages.map((msg) => (
            <div
              key={msg.id}
              className={`relative border-l-4 ${
                !msg.status ? "border-yellow-400 bg-yellow-50" : "border-gray-300 bg-white"
              } rounded-md shadow-sm mb-4 p-4 transition-all duration-200`}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Employer Info */}
                <div className="flex gap-3 items-center">
                  <img
                    src={msg.employer_logo}
                    alt="Logo"
                    className="w-8 h-8 rounded-full border"
                  />
                  <div>
                    <p className="font-semibold text-sm text-gray-800">
                      {msg.employer_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(msg.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* View/Close Button */}
                <button
                  onClick={() =>
                    toggleExpand(
                      msg.id,
                      msg.status,
                      expandedId === msg.id ? "close" : "view"
                    )
                  }
                  className="text-sm text-green-600 hover:underline"
                >
                  {expandedId === msg.id ? "Close" : "View"}
                </button>
              </div>

              {/* Message Content */}
              {expandedId === msg.id && (
                <div className="mt-3 text-sm text-gray-700 border-t pt-3">
                  {msg.message}
                </div>
              )}

              {/* Unread Indicator */}
              {!msg.status && (
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
              )}
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border rounded-md bg-white hover:bg-gray-50 disabled:opacity-40"
            >
              Prev
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border rounded-md bg-white hover:bg-gray-50 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
