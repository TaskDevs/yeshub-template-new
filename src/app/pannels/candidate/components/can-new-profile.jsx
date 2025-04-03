import React from 'react'
import CanProfileInfo from './can-profile-info'
import CanProfileInfoDetails from './can-profile-info-details'

function CanNewProfile() {
  return (
    <div className="tw-css twm-right-section-panel site-bg-gray">
        <div className="max-w-7xl mx-auto">
            <section className="">
                <CanProfileInfo/>
            </section>
            <section className="">
            <CanProfileInfoDetails/>
            </section>
        </div>
        </div>
  )
}

export default CanNewProfile