import React from 'react'

function CanUserDetails({label, icon, text}) {
  return (
    <div className="user-details">
        <p className="user-details-label">{label}</p>
        <div className="d-flex align-items-flex-start gap-2 justify-content-center">
            <span><i className={`pi ${icon}`} style={{color: '#4B5563'}}></i></span>
            <p>{text}</p>
        </div>
        
    </div>
  )
}

export default CanUserDetails