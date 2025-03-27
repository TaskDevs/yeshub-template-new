import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { JobApiData } from '../../../context/jobs/jobsContextApi';
import { ApplicationApiData } from '../../../context/application/applicationContextApi';
import readableDate from '../../../../utils/readableDate';
import { baseURL, publicUrlFor } from '../../../../globals/constants';
import { GlobalApiData } from '../../../context/global/globalContextApi';
import SectionJobsSidebar2 from '../../public-user/sections/jobs/sidebar/section-jobs-sidebar2';
import Loader from '../../../common/loader';

function CanSavedJobsDetails() {
    const { id } = useParams();
	const { processAJobProfile } = useContext(JobApiData);
    const { isSubmitting } = useContext(GlobalApiData)
    const [job, setJobs] = useState(null)
    const { handleSubmmitApplication } = useContext(ApplicationApiData);

    sessionStorage.setItem("job_id", id)

    useEffect(() =>{
        
        const jobData = async () => {
            const res = await processAJobProfile(id);

            if (res) {
                const newData = res.data
            setJobs(newData)
            } else {
                return false;
            }
            
        }
		
		jobData();
	}, [])


    if (!job?.id) {
        return <Loader />
    }


   

    return (
        <>
          
            <div className="twm-right-section-panel site-bg-gray applied-wrapper">
              
                <div className="section-full p-t120 p-b90 bg-white">
                <a href={`/dashboard-candidate/saved-jobs` }
                className="applied-view-btn"
            >
              <button className="site-button mb-5">Back</button>
            </a>
                    <div className="container">
                  
                        <h3 className="mb-5"> Job Details</h3>
                        <div className="section-content">
                          
                                <div className="cabdidate-de-info">
                                <div className="twm-job-self-wrap">
                                    <div className="twm-job-self-info">
                                    
                                        <div className="twm-job-self-top">
                                            { job?.employer?.banner ? (
                                                // twm-media-bg
                                                <div className="">
                                                <img
                                                src={`${job?.employer?.banner}`} 
                                                alt="#"
                                                />
                                                   
                                                </div>
                                            ) : (
                                                <div
                                                className="wt-bnr-inr overlay-wraper bg-center"
                                              //   className="twm-candi-self-wrap overlay-wraper"
                                                style={{
                                                    backgroundImage: `url(${publicUrlFor(
                                                        "images/candidates/candidate-bg.jpg"
                                                    )})`,
                                                }}
                                              >
                                               
                                                <div className="overlay-main site-bg-white opacity-01" />
                                              </div>
                                            )}
                                            
                                            <div className="twm-mid-content">
                                                <div className="twm-media">
                                                    <img
                                                        src={
                                                            job?.employer?.logo
                                                                ? `${job?.employer?.logo}`
                                                                : `${baseURL}/assets/images/no-logo.png`
                                                        }
                                                        alt="#"
                                                    />
                                                </div>
                                                <h4 className="twm-job-title">
                                                    {job?.job_title}
                                                   
                                                </h4>
                                                <p className="twm-job-address text-capitalize">
                                                    <i className="feather-map-pin" />
                                                    {job?.employer?.address}
                                                </p>
                                                <div className="twm-job-self-mid">
                                                    <div className="twm-job-self-mid-left">
                                                        
                                                        <div className="twm-jobs-amount">
                                                            {job?.salary ? (
                                                                <p>	Salary: ₵{job?.salary}</p>
                                                            ):(
                                                                <p>	Budget: ₵{job?.budget}</p>
                                                            )}
                                                        
                                                        </div>
                                                    </div>
                                                    <div className="twm-job-apllication-area">
                                                        Application ends:{" "}
                                                        <span className="twm-job-apllication-date">
                                                            
                                                            {readableDate(job?.end_date)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="twm-job-self-bottom">
                                                
                                                    

                                                    <button
                                                        type="submit"
                                                        onClick={() => handleSubmmitApplication(id)}
                                                        className="site-button"
                                                    >
                                                        {" "}
                                                        {isSubmitting ? "Submitting" : "Apply Now"}
                                                    </button>
                                                </div>
                                                <div className=""></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h4 className="twm-s-title">Job Description:</h4>
                                <div dangerouslySetInnerHTML={{ __html: job?.duty }} />
                                
                                <h4 className="twm-s-title">Requirments:</h4>
                    
                                <div dangerouslySetInnerHTML={{ __html: job?.description }} />

                                
             
                                
                            </div>
                            {/* col-lg-4 col-md-12 rightSidebar */}
                            <div className="">
								<SectionJobsSidebar2 _config={job} showAdvert={false} />
							</div>
                                
                            
                             </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default CanSavedJobsDetails;