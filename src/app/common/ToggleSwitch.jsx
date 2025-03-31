import React, { useState } from 'react';

export const ToggleSwitch = ({ initialState = false, onChange = () => {} }) => {
  const [isActive, setIsActive] = useState(initialState);
  
  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    onChange(newState);
  };
  
  return (
    <div 
      onClick={handleToggle}
      className="ml-2 relative w-8 h-4 bg-green-100 rounded-full cursor-pointer"
      role="switch"
      aria-checked={isActive}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleToggle();
          e.preventDefault();
        }
      }}
    >
      <div 
        className={`absolute top-0 w-4 h-4 bg-purple-700 rounded-full border-2 border-green-100 transition-transform duration-300 ease-in-out transform ${
          isActive ? 'translate-x-4' : 'translate-x-0'
        }`} 
      />
    </div>
  );
};
