import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { GlobalApiData } from "../../../context/global/globalContextApi";
import { JobApiData } from "../../../context/jobs/jobsContextApi";
import readableDate from "../../../../utils/readableDate";
import { ApplicationApiData } from "../../../context/application/applicationContextApi";
import { freelancerId, userId } from "../../../../globals/constants";
import { MilestoneApiData } from "../../../context/milestone/milestoneContextApi";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import SectionEditMilestone from "../../public-user/sections/jobs/section-edit-milestone";
import Loader from "../../../common/loader";




function CanAppliedJobDetails() {
  // const [_profile, setProfile] = useState({});
  const [isLoading, setIsLoading ] = useState(false);
  // const { setIsLoading } = useContext(GlobalApiData);
  const { processAJobProfile } = useContext(JobApiData);
  const { appliedJobs } = useContext(ApplicationApiData);
  const {
      processGetAllMilestone,
      jobMilestones,
      // setJobMilestones,
      selectedMilestoneId,
      setSelectedMilestoneId,
  } = useContext(MilestoneApiData);

  const [milestoneData, setMilestoneData] = useState([])
  const [milestoneToEdit, setMilestoneToEdit] = useState(null);
  const { id } = useParams();

  // console.log("selectedMilestoneId-details", selectedMilestoneId)

  const handleEditClick = (milestone) => {
      setMilestoneToEdit({
          title: milestone.title,
          amount: milestone.amount,
          description: milestone.description,
          freelance_id: milestone.freelance_id,
          employer_status: milestone.employer_status,
          freelancer_status: milestone.freelancer_status,
          pay_status: milestone.pay_status,
          job_id: milestone.job_id,
          user_id: milestone.user_id,
      });
      setSelectedMilestoneId(milestone.id);
  };

  const milestoneToEditData = jobMilestones.find((m) => m.id === selectedMilestoneId);

  console.log("jobMilestones-app-details", jobMilestones);
  console.log("milestoneData-details", milestoneData)

  const milestoneJobDetails = milestoneData[0]?.posted_job;

  const applicationData = appliedJobs?.find((application) => application.job_id === Number(id));

  // console.log("applicationData", applicationData);

  const getJob = async () => {
    setIsLoading(true);
      try {
          const [data1, data2] = await Promise.all([
              processAJobProfile(id),
              processGetAllMilestone(userId),
          ]);

          console.log("data1-applied-details", data1);
          // console.log("data2-applied-details", data2.data.data);
          const milestones = data2.data.data;

          const uniqueJobMilestones = milestones.filter((m) => m.job_id === id);
          console.log("uniqueJobMilestones", uniqueJobMilestones);

          // setProfile(data1.data);
          setMilestoneData(uniqueJobMilestones);

          // Pre-select the first milestone if available
          if (uniqueJobMilestones.length > 0 && !selectedMilestoneId) {
              setSelectedMilestoneId(uniqueJobMilestones[0].id);
          }
      } catch (error) {
          console.error("Error fetching candidate data:", error);
      } finally {
        setIsLoading(false);
      }
  };

  useEffect(() => {
      getJob();
  }, [id, userId]);

  
  // console.log("profile-jobs-detail", profile);

  // if (freelancerId && jobMilestones.length === 0) {
  //     return <Loader />;
  // }

  // if (!freelancerId && !applicationData?.id) {
  //   return <Loader />;
  // }

  return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <>
          <div className="twm-right-section-panel site-bg-gray applied-wrapper">
            
              <div className="section-full p-t120 p-b90 bg-white">
              <a href={`/dashboard-candidate/applied-jobs` }
              className=" applied-view-btn"
          >
            <button className="site-button">Back</button>
          </a>
                  <div className="container">
                
                      <h3 className="mb-5">Applied Job Details</h3>
                      <div className="section-content">
                          {freelancerId ? (
                              <div className="row ">
                                  <div className="">
                                      <div className="cabdidate-de-info">
                                          <div className="twm-job-self-wrap">
                                              <div className="twm-job-self-info">
                                                  <div className="twm-job-self-top">
                                                      <div className="mt-5">
                                                          <div className="">
                                                              <h4 className="">{milestoneJobDetails?.job_title}</h4>
                                                          </div>
                                                          <div className="twm-job-self-mid applied-details-mid">
                                                              <div className="twm-job-apllication-area">
                                                                  Job Type: <span className="">{milestoneJobDetails?.job_type}</span>
                                                              </div>
                                                              <div className="twm-job-self-mid-left">
                                                                  <div className="twm-jobs-amount">
                                                                      {milestoneJobDetails?.salary ? (
                                                                          <p> Salary: ₵{milestoneJobDetails?.salary}</p>
                                                                      ) : (
                                                                          <p> Budget: ₵{milestoneJobDetails?.budget}</p>
                                                                      )}
                                                                  </div>
                                                              </div>
                                                              <div className="twm-job-apllication-area">
                                                                  Application ends: <span className="twm-job-apllication-date">{readableDate(milestoneJobDetails?.end_date)}</span>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <h4 className="twm-s-title">Job Description:</h4>
                                      <div dangerouslySetInnerHTML={{ __html: milestoneJobDetails?.duty }} />
                                      <h4 className="twm-s-title">Requirments:</h4>
                                      <div dangerouslySetInnerHTML={{ __html: milestoneJobDetails?.description }} />
                                      <h4 className="twm-s-title">Milestones:</h4>
                                      <ol className="d-flex gap-4" style={{ flexDirection: "column" }}>
                                          {milestoneData?.map((milestone) => (
                                              <li
                                                  className="mb-2 d-flex"
                                                  style={{ borderBottom: "1px solid #d5d5d5", justifyContent: "space-between", alignItems: "center" }}
                                                  key={milestone?.id}
                                                  onClick={() => setSelectedMilestoneId(milestone?.id)}
                                              >
                                                  <div className=" ">
                                                      <p className="mb-1">
                                                          <strong className="me-1">Title:</strong> {milestone?.title}
                                                      </p>
                                                      <p className="mb-1">
                                                          <strong className="me-1">Amount:</strong> {milestone?.amount}
                                                      </p>
                                                      <p className="mb-1">
                                                          <strong className="me-1">Description:</strong> {milestone?.description}
                                                      </p>
                                                  </div>
                                                  {selectedMilestoneId === milestone?.id && (
                                                      <div className="actions">
                                                          <button className="site-button actions" data-bs-target="#delete-milestone" data-bs-toggle="modal" data-bs-dismiss="modal">
                                                              <FaRegTrashCan color="white" />
                                                              <span className="admin-nav-text">Delete</span>
                                                          </button>
                                                          <button className="site-button actions " data-bs-target="#edit-milestone" data-bs-toggle="modal" data-bs-dismiss="modal" onClick={() => handleEditClick(milestone)}>
                                                              <MdOutlineEdit color="white" />
                                                              <span>Edit</span>
                                                          </button>
                                                      </div>
                                                  )}
                                              </li>
                                          ))}
                                      </ol>
                                  </div>
                              </div>
                          ) : 
                          (
                            <div className="row ">
                              <div className="cabdidate-de-info">
                                <div className="twm-job-self-wrap">
                                  <div className="twm-job-self-info">
                                    <div className="twm-job-self-top">
                                      <div className="twm-mid-content">
                                        <div
                                          className="twm-media mt-5"
                                          style={{
                                            marginTop: "5rem",
                                            marginBottom: "5rem",
                                          }}
                                        >
                                          <img
                                            src={
                                              applicationData?.jobDetails?.employer?.logo
                                            }
                                            alt="#"
                                          />
                                        </div>
                                        {/* twm-job-title */}
                                        <div className="mt-5">
                                          <h4 className="twm-job-title mb-2">
                                            {
                                              applicationData?.jobDetails?.employer
                                                ?.company_name
                                            }
                                          </h4>
                                          <h4 className="mb-2">
                                            {applicationData?.jobDetails?.job_title}
                                          </h4>
                                        </div>
            
                                        <div className="twm-job-self-mid applied-details-mid">
                                          <div className="twm-job-apllication-area">
                                            Job Type:{" "}
                                            <span className="">
                                              {applicationData?.posted_job?.job_type}
                                            </span>
                                          </div>
            
                                          <div className="twm-job-self-mid-left">
                                            <div className="twm-jobs-amount">
                                              {applicationData?.posted_job?.salary ? (
                                                <p>
                                                  {" "}
                                                  Salary: ₵
                                                  {applicationData?.posted_job?.salary}
                                                </p>
                                              ) : (
                                                <p>
                                                  {" "}
                                                  Budget: ₵
                                                  {applicationData?.posted_job?.budget}
                                                </p>
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
                                              {readableDate(
                                                applicationData?.posted_job?.end_date
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <h4 className="twm-s-title">Job Description:</h4>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: applicationData?.posted_job?.duty,
                                  }}
                                />
            
                                <h4 className="twm-s-title">Requirments:</h4>
            
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: applicationData?.posted_job?.description,
                                  }}
                                />
            
                                <div className="twm-job-self-mid">
                                  <h4 className="twm-s-title mt-5">Company Information</h4>
                                  <p className="twm-job-address text-capitalize">
                                    Email: {applicationData?.jobDetails?.employer?.email}
                                  </p>
                                  <p className="twm-job-address text-capitalize">
                                    Wesite:{" "}
                                    <a
                                      className=""
                                      href={applicationData?.jobDetails?.employer?.website}
                                      
                                    >
                                      link
                                    </a>
                                  </p>
                                  <p className="twm-job-address text-capitalize">
                                    <i className="feather-map-pin" /> Address:
                                    <span>
                                      {" "}
                                      {applicationData?.jobDetails?.employer?.address}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          )} 
                           </div>
          </div>
        </div>
      </div>

      <SectionEditMilestone
        data={milestoneToEditData}
        milestone={milestoneToEdit}
        setMilestone={setMilestoneToEdit}
      />
      </>
                        )}
    </>
  );
}


export default CanAppliedJobDetails;
