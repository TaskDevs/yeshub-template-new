import { useEffect, useState} from "react";
import { loadScript } from "../../../../../globals/constants";
import SectionJobsSidebar2 from "../../sections/jobs/sidebar/section-jobs-sidebar2";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL } from "../../../../../globals/constants";
import readableDate from "../../../../../utils/readableDate";
import { JobById } from "../../../../context/jobs/jobsApi";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
function JobDetail1Page() {
  const { id } = useParams();
  const [job, setJobs] = useState(null);
  const navigate = useNavigate();
  const [proposal, setProposal] = useState(0);

  useEffect(() => {
    const fetchJobById = async () => {
      const res = await JobById(id);
      setJobs(res.job);
      setProposal(res.proposal_count);
    };
    fetchJobById();
  }, []);

  useEffect(() => {
    loadScript("js/custom.js");
  });

  const handleSaveJob = (path) => {
   navigate(path)
  };

  dayjs.extend(relativeTime);

// Assume job.posted_at is a valid ISO string or JS date
const postedDate = job?.created_at || job?.posted_at;

  return (
    <>
      <div className="section-full  p-t120 p-b90 bg-white">
        <div className="container">
          {/* BLOG SECTION START */}
          <div className="section-content">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8 col-md-12">
                {/* Candidate detail START */}
                <div className="cabdidate-de-info">
                  <div className="twm-job-self-wrap">
                    <div className="twm-job-self-info">
                      <div className="twm-job-self-top">
                        <div className="twm-media-bg">
                          <img
                            src={
                              job?.employer?.banner
                                ? `${job?.employer?.banner}`
                                : `${baseURL}/assets/images/no-logo.png`
                            }
                            alt="#"
                            style={{
                              height: "250px",
                              width: "1080px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "20px",
                            }}
                          />
                          {/* <div className="twm-jobs-category green">
															<span className="twm-bg-green">New</span>
														</div> */}
                        </div>
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
                            {job?.title}
                            <span className="twm-job-post-duration">
                              / {dayjs(postedDate).fromNow()}
                            </span>
                          </h4>

                          <p className="items-center bg-green-100 text-green-800 rounded-full">
                            <i className="fas fa-eye mx-2" />
                            <span className="font-semibold capitalize">
                              ({proposal}) Proposals
                            </span>
                          </p>

                          <p className="twm-job-address text-capitalize">
                            <i className="feather-map-pin" />
                            {job?.employer?.address}
                          </p>
                          <div className="twm-job-self-mid">
                            <div className="twm-job-self-mid-left">
                              <div className="twm-jobs-amount">
                                {job?.fixed_rate ? (
                                  <p> Budget: ₵{job?.fixed_rate}</p>
                                ) : (
                                  <p>
                                    Hourly Rate: ₵{job?.hourly_rate_start} - ₵
                                    {job?.hourly_rate_start}
                                  </p>
                                )}

                                {/* <span>/ daily</span> */}
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
                              onClick={() => handleSaveJob('/login')}
                              className="site-button"
                            >
                           
                            Apply Now
                            </button>
                          </div>
                          <div className=""></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h4 className="twm-s-title">Job Description:</h4>

                  <div dangerouslySetInnerHTML={{ __html: job?.description }} />
                </div>
              </div>
              <div className="col-lg-4 col-md-12 rightSidebar">
                {job && <SectionJobsSidebar2 _config={job} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ApplyJobPopup /> */}
    </>
  );
}

export default JobDetail1Page;
