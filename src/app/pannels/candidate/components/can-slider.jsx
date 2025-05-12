
import React, { useState } from 'react';

export default function CanSlider({ values, label, onChange }) {
  const [activeVal, setActiveVal] = useState(values[1]);

  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setActiveVal(val);
    if (onChange) {
      onChange({ min: values[0], max: val });
    }
  };

  return (
    <div className="flex items-start flex-col w-full">
      <p className="text-gray-700 font-medium">{label}</p>
      <div className="flex flex-col w-full">
        <input
          type="range"
          min={values[0]}
          max={values[2]}
          className="w-full cursor-pointer"
          onChange={handleSliderChange}
          value={activeVal}
        />
        <div className="flex items-center justify-between text-gray-500">
          {values.map((value, index) => (
            <p key={index}>GHS{value}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
