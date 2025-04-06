import React from 'react'

export default function CanSelectField({ options, label, width="100%" }) {
  return (
    <div className="flex items-start flex-col" style={{ width: width }}>
        <p className="">{label}</p>
    <select name="" id="" className={` h-12 p-2 border `} style={{ width: width, textTransform:"capitalize" }}> 
      {options.map((option, index) => (
        <option key={index} className="capitalize">{option}</option>
      ))}
    </select>
    </div>
  )
}
