import React from 'react'
import SectionCanWorkSample from '../sections/resume/section-can-work-sample'
import CanProfileCards from './can-profile-cards'

function CanUserPortfolio() {
  return (
    <CanProfileCards icon="plus" label="portfolio" href="#Work_Sample">
      <SectionCanWorkSample/>
  </CanProfileCards>
  )
}

export default CanUserPortfolio