
import React, { useState } from 'react';

export default function CanCheckbox({ options, label, onChange }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    let updatedOptions;

    if (event.target.checked) {
      updatedOptions = [...selectedOptions, value];
      console.log("updatedOptions", updatedOptions)
    } else {
      updatedOptions = selectedOptions.filter((option) => option !== value);
      console.log("updatedOptions", updatedOptions)
    }

    setSelectedOptions(updatedOptions);
    if (onChange) {
      onChange(updatedOptions); // Notify parent of the selected options
    }
  };

  return (
    <div className="tw-css flex items-start flex-col w-full">
      <p className="text-gray-700 font-medium">{label}</p>
      <div className="flex flex-col space-y-2 items-start">
        {options.map((option, index) => (
          <div className="flex justify-start items-center" key={index}>
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={handleCheckboxChange}
              className="size-4 cursor-pointer"
            />
            <label className="text-gray-500 capitalize ml-1">{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
}


