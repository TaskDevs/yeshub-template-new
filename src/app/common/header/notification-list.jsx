import React, { useState } from "react";
import { useChat } from "../../context/chat/chatContext";

const ITEMS_PER_PAGE = 10;

export default function NotificationList() {
  const { messages, processMarkAsRead } = useChat();
  const [expandedId, setExpandedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedMessages = messages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(messages.length / ITEMS_PER_PAGE);

  const toggleExpand = (id, status, stage) => {
    // console.log(status);
    if (stage == "view") {
      processMarkAsRead(id, status);
    }
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {paginatedMessages.map((msg) => (
        <div
          key={msg.id}
          className="border rounded-xl p-4 mb-4 shadow-sm transition-all"
        >
          <div className="flex items-center gap-4 mb-2">
            <img
              src={msg.employer_logo}
              alt="Logo"
              className="w-5 h-5 rounded-full"
            />
            <div className="flex-1">
              <h4 className="text-gray-600">{msg.employer_name}</h4>
            </div>
            <button
              onClick={() =>
                toggleExpand(
                  msg.id,
                  msg.status,
                  expandedId === msg.id ? "close" : "view"
                )
              }
              className="text-sm text-green-600 underline"
            >
              {expandedId === msg.id ? "Close" : "View"}
            </button>
          </div>

          {expandedId === msg.id && (
            <div className="text-sm text-gray-700 mt-2 bg-green-50 border border-green-100 rounded-lg p-3">
              {msg.message}
            </div>
          )}
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-1 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
