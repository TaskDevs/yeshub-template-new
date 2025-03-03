import React from 'react'
import  { extractYear } from '../../../../../utils/readableDate'



function SectionCanPortfolioCard({data}) {
   
  return (
    <div className="twm-timing-list">
    <div className="twm-time-list-date">{extractYear(data?.project_start_date

)} to {extractYear(data?.
    project_end_date

    )}</div>
    <div className="twm-time-list-title">{data?.project_title}</div>
    {/* <div className="twm-time-list-position">{data?.qualification}</div> */}
    <div className="twm-time-list-position">{data?.
skills
}</div>
    <div className="twm-time-list-discription">
        <p>{data?.description}</p>
    </div>
</div>
  )
}

export default SectionCanPortfolioCard