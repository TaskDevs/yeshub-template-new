import React from 'react'
import  { extractYear } from '../../../../../utils/readableDate'



function SectionCanEducCard({data}) {
   
  return (
    <div className="twm-timing-list">
    <div className="twm-time-list-date">{extractYear(data?.
date_attended
)} to {extractYear(data?.
    date_completed
    )}</div>
    <div className="twm-time-list-title">{data?.school}</div>
    {/* <div className="twm-time-list-position">{data?.qualification}</div> */}
    <div className="twm-time-list-position"> {data?.qualification} - {data?.area_of_study}</div>
    <div className="twm-time-list-discription">
        <p>{data?.description}</p>
    </div>
</div>
  )
}

export default SectionCanEducCard