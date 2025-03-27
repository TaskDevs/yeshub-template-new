import { useEffect, useState } from "react";
import JobViewPopup from "../../../common/popups/popup-job-view";
import { loadScript } from "../../../../globals/constants";
import { useJobCartStore } from "../../../../utils/useJobCartStore";
import { NavLink } from "react-router-dom";
import { Chip } from 'primereact/chip';
function CanSavedJobsPage() {
    const { jobs, removeJob } = useJobCartStore();
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
console.log(jobs)
    useEffect(() => {
        loadScript("js/custom.js");
        setLoading(false);
    }, []);

    const handleRemoveJob = async (jobId) => {
        setDeleting(true);
        await removeJob(jobId);
        setDeleting(false);
    };

    return (
        <div className="twm-right-section-panel candidate-save-job site-bg-gray container-fluid">
            {loading ? (
                <div className="text-center my-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="list-group">
                    {jobs.length === 0 ? (
                        <div className="text-center py-4">No saved jobs found.</div>
                    ) : (
                        jobs.map((job) => (
                             <div className="twm-jobs-list-style1 mb-5" key={job.id}>
                              <NavLink to={`/job-detail/${job.id}`}>
                                  <div className="twm-media">
                                    <img
                                      src={ `${job.image}`}
                                      alt="#"
                                    />
                                    {/* <JobZImage src={`${baseURL}/assets/images/no-logo.png`} alt="#" /> */}
                                  </div>
                                  <div className="twm-mid-content">
                            
                                    <h4 className="twm-job-title">
                                      {job.title}
                                      <span className="twm-job-post-duration">
                                        {/* / <TimeAgo date={duration} /> */}
                                      </span>
                                    </h4>
                                    {/* <p className="twm-job-address twm-exp-profile text-capitalize">
                                      {location}
                                    </p> */}
                            
                                    <div className="flex flex-wrap gap-2">
                                      {job?.skill?.map((skill, index) => (
                                          <div className=" flex flex-wrap gap-2" key={index}>
                                             <Chip label={skill} /> 
                                       
                                        </div>
                                      ))}
                                    </div>
                                    
                                  </div>
                                  </NavLink>
                                  <div className="twm-right-content">
                                    <div className="twm-jobs-category green">
                                      <span className="twm-bg-red"
                                      onClick={() => handleRemoveJob(job.id)}
                                      disabled={deleting}
                                      style={{cursor:'pointer'}}
                                      >X</span>
                                    </div>
                                    <div className="twm-jobs-amount">
                                     
                                      {job.salary ? (
																	<p>₵{job?.salary}</p>
																):(
																	<p>	₵{job?.budget}</p>
																)}
                                      {/* <span>/ daily</span> */}
                                    </div>
                                    {/* <p
                                      className="twm-jobs-browse bids"
                                      style={{ color: days_left === 0 ? "red" : "inherit" }}
                                    >
                                      {days_left === 0 ? "Expired" : `${days_left} days left`}
                                    </p> */}
                                  </div>
                                </div>
                        ))
                    )}
                </div>
            )}
            <JobViewPopup />
        </div>
    );
}

export default CanSavedJobsPage;
