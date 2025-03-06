import React from 'react'
import CountUp from 'react-countup'

function SectionOverviewCard({ id, label, icon, listing, count }) {
  return (
    <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                        <div className="panel panel-default">
                            <div className={`panel-body wt-panel-body dashboard-card-2 block-gradient${id}`}>
                                <div className="wt-card-wrap-2">
                                    <div className="wt-card-icon-2"><i className={`flaticon-${icon}`} /></div>
                                    <div className={`wt-card-right wt-total-${listing} counter`}>
                                        <CountUp end={count} duration={10} />
                                    </div>
                                    <div className="wt-card-bottom-2">
                                        <h4 className="m-b0">{label}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
  )
}

export default SectionOverviewCard