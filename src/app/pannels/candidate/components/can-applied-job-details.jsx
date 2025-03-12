import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalApiData } from "../../../context/global/globalContextApi";
import { JobApiData } from "../../../context/jobs/jobsContextApi";
import readableDate from "../../../../utils/readableDate";
import { ApplicationApiData } from "../../../context/application/applicationContextApi";
import { userId } from "../../../../globals/constants";
// import SectionJobsSidebar2 from '../../public-user/sections/jobs/sidebar/section-jobs-sidebar2';

function CanAppliedJobDetails() {
  const [profile, setProfile] = useState({});
  const { setIsLoading } = useContext(GlobalApiData);
  const { processAJobProfile } = useContext(JobApiData);
  const { appliedJobs } = useContext(ApplicationApiData);
  const { id } = useParams();
  // processApplicationProfile

  console.log("appliedJobs-applied-details", appliedJobs);
  const applicationData = appliedJobs?.find(
    (application) => application.job_id === Number(id)
  );
  console.log("applicationData", applicationData);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 200);
    const getJob = async () => {
      try {
        const data1 = await processAJobProfile(id);

        console.log("data-job-details", data1);

        setProfile(data1.data);
      } catch (error) {
        console.error("Error fetching candidate data:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    };

    getJob();
  }, [id, userId]);

  console.log("profile-jobs-detail", profile);

  return (
    <>
      <div className="twm-right-section-panel site-bg-gray">
        <div className="section-full  p-t120 p-b90 bg-white">
          <div className="container">
            <div className="section-content">
              {/* d-flex justify-content-center */}
              <div className="row ">
                {/* col-lg-8 col-md-12 */}
                <div className="">
                  <div className="cabdidate-de-info">
                    <div className="twm-job-self-wrap">
                      <div className="twm-job-self-info">
                        <div className="twm-job-self-top">
                          <div className="twm-mid-content">
                            <div className="twm-media">
                              <img
                                src={profile?.logo ? `${profile.logo}` : ""}
                                alt="#"
                              />
                            </div>
                            {/* twm-job-title */}
                            <div className="">
                              <h4 className="twm-job-title mb-5">
                                {profile?.employer?.company_name}
                              </h4>
                              <h4 className="">{profile?.job_title}</h4>
                            </div>

                            <p className="twm-job-address text-capitalize">
                              <i className="feather-map-pin" />
                              {applicationData?.jobDetails?.employer?.address}
                            </p>

                            <div className="twm-job-self-mid">
                              <div className="twm-job-apllication-area">
                                Job Type:{" "}
                                <span className="">{profile?.job_type}</span>
                              </div>

                              <div className="twm-job-self-mid-left">
                                <div className="twm-jobs-amount">
                                  {profile?.salary ? (
                                    <p> Salary: ₵{profile?.salary}</p>
                                  ) : (
                                    <p> Budget: ₵{profile?.budget}</p>
                                  )}
                                </div>
                              </div>

                              <div className="twm-job-apllication-area">
                                Application Status:{" "}
                                <span className="text-capitalize font-weight-[400]">
                                  {applicationData?.status}
                                </span>
                              </div>

                              <div className="twm-job-apllication-area">
                                Application ends:{" "}
                                <span className="twm-job-apllication-date">
                                  {readableDate(profile?.end_date)}
                                </span>
                              </div>
                            </div>

                            <div className=""></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h4 className="twm-s-title">Job Description:</h4>
                    <div dangerouslySetInnerHTML={{ __html: profile?.duty }} />

                    <h4 className="twm-s-title">Requirments:</h4>

                    <div
                      dangerouslySetInnerHTML={{ __html: profile?.description }}
                    />
                  </div>
                </div>

                <div className="">
                <div className="twm-job-self-mid">
                              <h4 className="twm-s-title mt-5">
                               Company Information
                              </h4>
                              <p className="twm-job-address text-capitalize">
                              Email:{" "}
                              {applicationData?.jobDetails?.employer?.email}
                            </p>
                            <p className="twm-job-address text-capitalize">
                            Wesite:{" "}
                            <a className="" href={applicationData?.jobDetails?.employer?.website} target="_blank" rel="noreferrer">link</a>
                              
                            </p>
                            </div>
                           
                </div>


                {/* rightSidebar col-lg-4 col-md-12 */}
                {/* <div className=" ">
                        <SectionJobsSidebar2 _config={profile} showAdvert={false} />
                    </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CanAppliedJobDetails;
