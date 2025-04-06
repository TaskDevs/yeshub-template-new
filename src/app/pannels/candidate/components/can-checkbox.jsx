import React from 'react'

export default function CanCheckbox({ options, label }) {
  return (
    <div className="flex items-start flex-col w-full">
        <p className="text-gray-700 font-medium">{label}</p>
        <div className="flex flex-col space-y-2 items-start">
            {options.map((option, index) => (
                <div className="flex space-x-2 justify-start items-center" key={index}>
                <input type="checkbox"  value={option} />
                <label className='text-gray-500'>{option}</label>
                </div>
            ))}
        </div>
    </div>
  )
}

