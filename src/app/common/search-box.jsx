import React from 'react';
import { IoSearch } from 'react-icons/io5';

export const SearchInput = ({
  placeholder = "Search...",
  value = "",
  onChange = () => {},
  onSearch = () => {},
  className = "",
  inputClassName = "",
  leftIcon = <IoSearch size={18} />,
  rightIcon = null,
  rightIconClassName = "text-gray-400",
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(value);
    }
  };

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`w-full rounded-xl border border-gray-300 bg-white py-2.5 ${
          leftIcon ? 'pl-10' : 'pl-4'
        } ${rightIcon ? 'pr-10' : 'pr-4'} text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition duration-150 ${inputClassName}`}
      />

      {/* Right Icon */}
      {rightIcon && (
        <div
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer ${rightIconClassName}`}
          onClick={() => onSearch(value)}
        >
          {rightIcon}
        </div>
      )}
    </div>
  );
};
