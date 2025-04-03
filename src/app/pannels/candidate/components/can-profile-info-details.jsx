import React from 'react'
import CanUserSkills from './can-user-skills'
import CanUserWorkHistory from './can-user-work-history'
import CanUserEducation from './can-user-education'
import CanUserCertifications from './can-user-certifications'
import CanUserPortfolio from './can-user-portfolio'
import CanUserWorkHours from './can-user-work-hours'
import CanUserLicenses from './can-user-licenses'
import CanUserTestimonials from './can-user-testimonials'

function CanProfileInfoDetails() {
  return (
    <div>
        <section className="user-profile-details">
            <CanUserSkills/>
            <CanUserWorkHistory/>

        </section>
        <section className="user-profile-details">
            <CanUserEducation/>
            <CanUserPortfolio/>
            <CanUserCertifications/>  
            <CanUserWorkHours/>
            <CanUserLicenses/>
            <CanUserTestimonials/>
        </section>
    </div>
  )
}

export default CanProfileInfoDetails