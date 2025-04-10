// import React from 'react'

// export default function CanSelectField({ options, label, width="100%" }) {
//   return (
//     <div className={`${label ? "flex items-start flex-col" : "" } rounded-md`} style={{ width: width }}>
//        {label && (<p className="">{label}</p>)} 

//     <select name="" id="" className={` h-12 p-2 border `} style={{ width: width, textTransform:"capitalize" }}> 
//       {options.map((option, index) => (
//         <option key={index} value={option} className="capitalize">{option}</option>
//       ))}
//     </select>
//     </div>
//   )
// }


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
