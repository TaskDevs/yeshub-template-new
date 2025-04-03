import React from 'react'

function CanProfileCards({ icon, label, href, children }) {
  return (
    <div className="profile-cards-wrapper">
        <div className="d-flex justify-content-between">
            <p className='user-details-label'>{label}</p>
            <a
              data-bs-toggle="modal"
              href={href}
              role="button"
              title="Add"
              className="site-text-primary"
            >
              <span className={`fa fa-${icon}`} />
            </a>
        </div>
        
        <div className="">
        {children}
        </div>
        
        </div>
  )
}

export default CanProfileCards