
import React, { useState } from 'react';

export default function CanSelectField({
  options,
  label,
  width = '100%',
  onChange,
}) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange?.(value); // call parent's handler
  };

  return (
    <div
      className={`${label ? 'flex items-start flex-col' : ''} rounded-md`}
      style={{ width }}
    >
      {label && <p>{label}</p>}

      <select
        className="h-12 p-2 border"
        style={{ width, textTransform: 'capitalize' }}
        value={selectedValue}
        onChange={handleSelectChange}
      >
       
        {options.map((option, index) => (
          <option key={index} value={option} className="capitalize">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
