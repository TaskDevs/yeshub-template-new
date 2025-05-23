import React from 'react'

export default function FilterPanel({ hideLabel = false, children }) {
  return (
    
    <div className="p-6">
      {!hideLabel && (
        <h3 className="text-xl font-bold mb-2">Filter</h3>
      )}

      <div className="flex flex-col gap-4">
        {children}
      </div>
    </div>

  )
}
