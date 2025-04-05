import React from 'react';
import { IoSearch } from 'react-icons/io5';

/**
 * Reusable Search Component with support for left and right icons
 */
export const SearchInput = ({
          placeholder = "Search...",
          value = "",
          onChange = () => { },
          onSearch = () => { },
          className = "",
          inputClassName = "",
          leftIcon = <IoSearch size={18} />,
          rightIcon = null,
          leftIconClassName = "text-gray-400",
          rightIconClassName = "text-gray-400"
}) => {
          // Handle the enter key press
          const handleKeyDown = (e) => {
                    if (e.key === 'Enter') {
                              onSearch(value);
                    }
          };

          return (
                    <div className={`relative ${className}`}>
                              {leftIcon && (
                                        <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${leftIconClassName}`}>
                                                  {leftIcon}
                                        </div>
                              )}
                              <input
                                        type="text"
                                        value={value}
                                        onChange={(e) => onChange(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder={placeholder}
                                        className={`py-2  w-full ${leftIcon ? 'pl-9' : 'pl-4'} ${rightIcon ? 'pr-9' : 'pr-4'} ${inputClassName} border rounded-md outline-none focus:outline-none focus:right-0`}
                              />


                              {rightIcon && (
                                        <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${rightIconClassName}`}>
                                                  {rightIcon}
                                        </div>
                              )}
                    </div>
          );
};
