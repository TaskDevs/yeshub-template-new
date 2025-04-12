import React, { useContext, useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { experinceLevel, jobData, jobTypes, skills, sort } from "./filter-data";
import CanSelectField from "../../components/can-select-field";
import CanCheckbox from "../../components/can-checkbox";
import CanSlider from "../../components/can-slider";
import FilterPanel from "./filter-panel";
import readableDate from "../../../../../utils/readableDate";
import CanJobCard from "../../components/can-job-card";
import ProfileInfoSection from "./profile-info-section";
import { ProfileApiData } from "../../../../context/user-profile/profileContextApi";
import { useNavigate } from "react-router-dom";
import styles from "./find-work.module.css";
import MobileFindSavedWork from "./mobile-find-work";
import { JobApiData } from "../../../../context/jobs/jobsContextApi";
import Loader from "../../../../common/loader";
import { useFilterForm } from "../../../../../utils/useFilterFormHook";
import { filterElements } from "../../common/filter-elements";

function FindWorkPage() {
  const username = sessionStorage.getItem("username");
  const { profileData } = useContext(ProfileApiData);
  const { jobListData, processGetAllJob } = useContext(JobApiData)
   
    const { filters, handleChange } = useFilterForm();
  const navigate = useNavigate();
  const [filteredJobs, setFilteredJobs] = useState(jobListData);


  console.log("jobListData-filteredJobs", jobListData, filteredJobs)
  

   useEffect(() => {
      const results = filterElements(jobData, filters);
      console.log("filter-results", results);
      setFilteredJobs(results);
    }, [filters, jobData]);

  useEffect(() => {
    const fetchJobList = async () => {
      const res = await processGetAllJob();
      console.log("res", res)
      
    }
  
    fetchJobList()
  }, [])

  if (jobListData.length === 0) {
    return <div><Loader /></div>
  }
  
  

  return (
    <>
      <div className=" tw-css mx-auto  ">
        <div className={`${styles.mobileFindWork} min-h-screen p-4`}>
          <MobileFindSavedWork>
            {jobData?.map((job) => (
              <CanJobCard
                key={job.id}
                role={job.job_title}
                ratings="4.9"
                reviews="23k"
                companyName={job.employer.company_name}
                jobType={job?.job_type}
                isMobile={true}
                jobLocation={job?.location}
                datePosted={job?.start_date}
                salaryRange={job?.salary}
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
                  <CanSelectField options={jobTypes} label="Job Type" onChange={handleChange("jobTypes")} />
                  <CanSelectField
                    options={experinceLevel}
                    label="Experience Level"
                    onChange={handleChange("experienceLevel")}
                  />
                  <CanSlider values={["0", "5k", "10k+"]} label="Salary" onChange={handleChange("salaryRange")} />
                  <CanCheckbox options={skills} label="Skills" onChange={handleChange("skills")} />
                </FilterPanel>
              </div>

              <div className={`${styles.gridTwo} section-two`}>
                <div className=" p-6 flex flex-col gap-4">
                  <div className=" section-two-header ">
                    <h2 className="font-medium capitalize">available jobs</h2>
                    <CanSelectField options={sort} width="240px" />
                  </div>

                  {/*job cards */}
                  <div className="grid grid-cols-1 gap-4 w-full">
                    {jobListData?.map((job) => (
                      <CanJobCard
                        key={job?.id}
                        id={job?.id}
                        role={job?.title}
                        ratings="4.9"
                        reviews="23k"
                        companyName={job?.category}
                        description={job?.description}
                        skills={job?.skills}
                        isMobile={false}
                        newTag={
                          readableDate(job.start_date) ===
                            new Date().toDateString() && "new"
                        }
                        numberOfProposals="23"
                        salaryRange={job?.fixed_rate}
                        rate={job?.fixed_rate}
                        jobType={job?.job_type}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className={`${styles.gridThree} section-three`}>
                <ProfileInfoSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FindWorkPage;
