import React, { useContext, useEffect } from "react";
import { CiBookmark } from "react-icons/ci";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { experinceLevel, jobTypes, skills, sort } from "./filter-data";
import CanSelectField from "../../components/can-select-field";
import CanCheckbox from "../../components/can-checkbox";
import CanSlider from "../../components/can-slider";
import FilterPanel from "./filter-panel";
import readableDate from "../../../../../utils/readableDate";
import CanJobCard from "../../components/can-job-card";
import ProfileInfoSection from "./profile-info-section";
import { ProfileApiData } from "../../../../context/user-profile/profileContextApi";
import { JobApiData } from "../../../../context/jobs/jobsContextApi";
import { useNavigate } from "react-router-dom";
// import { ProposalSubmissionModal } from "../new-profile/profile-components";
// import { ProposalForm } from "./proposal-form";
import styles from "./find-work.module.css";
import MobileFindSavedWork from "./mobile-find-work";


function FindWorkPage() {
  const username = sessionStorage.getItem("username");
  const { profileData } = useContext(ProfileApiData);
  const { processGetAllJob, jobListData} =
    useContext(JobApiData);

  const [modalOpen, setModalOpen] = useState(false);
  const [jobInfo, setJobInfo] = useState({
    job_id: null,
    company_id: null,
  });
  const [filterJobListData, setFilterJobListData] = useState([]);


  // const [jobInfo, setJobInfo] = useState({
  //   job_id: null,
  //   company_id: null,
  // });
 
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  console.log("jobListData", jobListData)

  useEffect(() => {
    processGetAllJob(1, userId);
  }, []);

  useEffect(() => {
    setFilterJobListData(jobListData);
    console.log(jobListData);
  }, [jobListData]);


  // Close modal handler
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handlePrepareSubmit = (job_id, employer_id) => {
    setJobInfo({
      job_id: job_id,
      company_id: employer_id,
    });
    // console.log(id);
    setModalOpen(true);
  };

  const handleFilterChange = (data) => {
    if (data !== "all types") {
      let filterData = filterJobListData.filter(
        (item) => item.job_type == data
      );
      setFilterJobListData(filterData);
    } else {
      setFilterJobListData(jobListData);
    }
    console.log(data);
  };

  const handleOnSubmit = (data) => {
    if (!userId) {
      alert("Make sure you sign up first");
      return;
    } else {
      let newData = {
        user_id: userId,
        job_id: jobInfo.job_id,
        company_id: jobInfo.company_id,
        milestones: data?.milestones?.length > 0 ? data.milestones : null,
        requirement: data.request ? data.request : null,
        status: "pending",
        type: data.type,
      };

      console.log(newData);
      processApplyForJob(newData);
      setModalOpen(false);
    }
  };

  return (
    <div className=" tw-css mx-auto ">
      <div className={`${styles.mobileFindWork} min-h-screen p-4`}>
        <MobileFindSavedWork>
          {jobListData.map((job) => (
            <CanJobCard
              key={job.id}
              id={job?.id}
              role={job.job_title}
              ratings="4.9"
              reviews="23k"
              companyName={job.employer.company_name}

              action={() => handlePrepareSubmit(job.id, job.employer_id)}

              jobType={job?.job_type}
              isMobile={true}
              jobLocation={job?.location || "Accra"}
              datePosted={job?.created_at || "2025-04-14T16:43:24.000000Z"}
              salaryRange={job?.fixed_rate || "400"}
            />
          ))}
        </MobileFindSavedWork>
      </div>

      <div className=" mx-auto  max-w-7xl p-6">
        <div className={`${styles.findWorkDesktop}`}>
          {/* Greetings Section */}
          <div className="greetings-wrapper">
            <div className="p-6">
              <div className="flex justify-between">
                <div className="flex flex-col space-y-4 items-start ">
                  <h1 className="font-medium text-[2rem]">
                    Welcome back, {profileData?.firstname || username}!
                  </h1>
                  <p className="text-gray-500">
                    There are 238 new jobs matching your skills today!
                  </p>
                </div>

                  <button
                    onClick={() => navigate("/dashboard-candidate/saved-jobs")}
                    className="bg-green-800 text-white px-4 py-2 rounded flex items-center gap-2 h-10"
                  >
                    <CiBookmark className="w-4 h-4" />
                    <span>Saved jobs</span>
                  </button>
                </div>
              </div>
            </div>

          <div className="grid-container">
            <div className={`${styles.gridOne} section-one`}>
              <FilterPanel>
                <CanSelectField
                  options={jobTypes}
                  label="Job Scope"
                  action={[setFilterJobListData, jobListData]}
                  onChange={handleFilterChange}
                />
                <CanSelectField
                  options={experinceLevel}
                  label="Experience Level"
                />
                <CanSlider values={["0", "5k", "10k+"]} label="Salary" />
                <CanCheckbox options={skills} label="Skills" />
              </FilterPanel>
            </div>


            <div className={`${styles.gridTwo} section-two`} >
              <div className=" p-6 flex flex-col gap-4">
                <div className=" section-two-header ">
                  <h2 className="font-medium capitalize">available jobs</h2>
                  <CanSelectField options={sort} width="240px" />
                </div>

                {/*job cards */}
                <div className="grid grid-cols-1 gap-4 w-full">

                  {filterJobListData.map((job) => (
                    <CanJobCard
                      key={job.id}
                      id={job?.id}
                      role={job?.job_title}
                      ratings="4.9"
                      reviews="23k"
                      companyName={job?.job_category}
                      description={job?.description}
                      skills={job?.skills}
                      isMobile={false}
                      newTag={
                        readableDate(job.start_date) ===
                          new Date().toDateString() && "new"
                      }
                      action={() =>
                        handlePrepareSubmit(job.id, job.employer_id)
                      }
                      numberOfProposals="23"
                      salaryRange={job.fixed_rate || job.budget}
                      jobType={job?.job_type || ""}
                    />
                  ))}
                  {filterJobListData.length == 0 && (
                    <p className="text-gray-500">No jobs available</p>

                  )}
                </div>
              </div>
            </div>


              <div className={`${styles.gridThree} section-three`}>
                <ProfileInfoSection />
              </div>
            </div>
          </div>
        </div>
{/* 
        {modalOpen && (
  
  <ProposalSubmissionModal
  isOpen={modalOpen}
  onClose={handleCloseModal}
  title={"Ready To Send Proposal"}
 >
  <ProposalForm onSubmit={handleOnSubmit} />
 </ProposalSubmissionModal>
 )}
 <ToastContainer position="top-right" autoClose={3000} /> */}
 
      </div>


      {modalOpen && (
        <ProposalSubmissionModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          title={"Ready To Send Proposal"}
        >
          <ProposalForm onSubmit={handleOnSubmit} />
        </ProposalSubmissionModal>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}


export default FindWorkPage;
