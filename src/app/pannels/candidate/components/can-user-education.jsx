import React from 'react'
import SectionCanEducation from '../sections/resume/section-can-education'
import CanProfileCards from './can-profile-cards'

function CanUserEducation() {
  return (
    <CanProfileCards icon="plus" label="Education" href="#Education">
      <SectionCanEducation/>
  </CanProfileCards>
  )
}

export default CanUserEducation