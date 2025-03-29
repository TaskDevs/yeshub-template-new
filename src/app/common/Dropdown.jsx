import { GoChevronDown } from "react-icons/go";
import { useState, useEffect, useRef } from "react";

export const CustomDropdown = ({ selected, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Add click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="border rounded px-3 py-1 text-sm flex items-center space-x-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
        <GoChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 bg-white border rounded-md shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option}
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};