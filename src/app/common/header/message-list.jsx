import React, { useState } from "react";
//import { useChat } from "../../context/chat/chatContext";
import { useNavigate } from "react-router-dom";
import { userRole } from "../../../globals/constants";

const ITEMS_PER_PAGE = 10;

export default function MessageList({
  data,
  action,
  onClose,
  messageCountAction,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const paginatedMessages = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Go to talent pool or freelance manager
  const handleViewPage = (id) => {
    let newData = data.filter((item) => item.id == id);
    action(newData);
    if (userRole === "client") {
      navigate(`/dashboard-client/talent-pool/${id}`);
    } else {
      navigate(`/dashboard-candidate/manage-project/${id}`);
    }
    messageCountAction[1](
      messageCountAction[0] > 0 ? messageCountAction[0] - 1 : 0
    );
    onClose();
  };

  return (
    <div className="p-2">
      {data.length === 0 ? (
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
            You don’t have any notifications at the moment. Messages from
            employers will appear here.
          </p>
        </div>
      ) : (
        <>
          {paginatedMessages.map((msg) => (
            <div
              key={msg.id}
              className={`relative border-l-4 ${
                !msg.status
                  ? "border-yellow-400 bg-yellow-50"
                  : "border-gray-300 bg-white"
              } rounded-md shadow-sm mb-4 p-4 transition-all duration-200`}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Employer Info */}
                <div className="items-center">
                  <h6 className="text-sm font-semibold tet-gray-500">
                    {msg.sender_name}
                  </h6>
                  <hr />
                  <p className=" text-gray-800">{msg.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(msg.created_at).toLocaleString()}
                  </p>
                </div>

                {/* View/Close Button */}
                <button
                  onClick={() => handleViewPage(msg.project_id)}
                  className="text-sm text-green-600 hover:underline"
                >
                  View
                </button>
              </div>
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
