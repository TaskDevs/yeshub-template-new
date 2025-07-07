import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  showLabel = true,
}) => {
  // Calculate start and end item numbers for the label
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Create array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-between px-5 py-4 w-full ">
      {/* Label showing results range - conditionally rendered */}
      {showLabel && (
        <div className="text-gray-600 text-sm">
          Showing {startItem} to {endItem} of {totalItems} results
        </div>
      )}

      {/* If not showing label, push pagination to left */}
      {!showLabel && <div></div>}

      {/* Pagination controls */}
      <div className="flex items-center justify-start gap-0 space-x-0">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`border rounded-l px-3 py-2 h-full ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
          } `}
        >
          <IoIosArrowBack size={16} />
        </button>

        {/* Page numbers */}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`border-t border-b border-r px-3 py-1 text-white ${
              currentPage === number
                ? " text-gray-800 font-medium bg-[#305715]"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {number}
          </button>
        ))}

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`border-t border-b border-r rounded-r px-3 py-2 ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <IoIosArrowForward size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
