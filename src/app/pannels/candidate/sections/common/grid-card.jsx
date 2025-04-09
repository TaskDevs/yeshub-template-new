import React from 'react'

function GridCard({ children }) {
  return (
    // cards grid
    <div className="grid grid-cols-1 gap-4 w-full">
        {/* card-wrapper */}
        <div className="tw-css border rounded-lg shadow-md p-4 flex flex-col size-full bg-[white]">
            {children}
        </div>
    </div>
  )
}

export default GridCard