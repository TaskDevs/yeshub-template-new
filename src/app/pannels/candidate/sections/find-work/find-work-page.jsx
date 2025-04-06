import React, { useContext, useEffect } from "react";
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
import { JobApiData } from "../../../../context/jobs/jobsContextApi";



function FindWorkPage() {
  const username = sessionStorage.getItem("username");
  const { profileData } = useContext(ProfileApiData);
  const { jobListData, processGetAllJob } = useContext(JobApiData);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await processGetAllJob(1);
      console.log("jobs-res", res)
    }
    fetchJobs()
  }, [])

  console.log("jobListData", jobListData)
 

  return (
    <div className="tw-css  min-h-screen">
      <div className=" mx-auto px-4 py-6 ">
        <div className="w-full px-4 py-4">
          {/* Greetings Section */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-6">
              <div className="flex justify-between">
                <div className="flex flex-col space-y-4 items-start ">
                  <h1 className="font-medium text-[2rem]">
                    Welcome back, {profileData?.firstname || username }!
                  </h1>
                  <p className="text-gray-500">
                    There are 238 new jobs matching your skills today!
                  </p>
                </div>

                <button
                  onClick={() => {}}
                  className="bg-green-800 text-white px-4 py-2 rounded flex items-center gap-2 h-10"
                >
                  <CiBookmark className="w-4 h-4" />
                  <span>Saved jobs</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-start ">
            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow-sm mb-6 w-[35%]">
              <FilterPanel>
                <CanSelectField options={jobTypes} label="Job Type" />
                <CanSelectField
                  options={experinceLevel}
                  label="Experience Level"
                />
                <CanSlider values={["0", "5k", "10k+"]} label="Salary" />
                <CanCheckbox options={skills} label="Skills" />
              </FilterPanel>
            </div>

            <div className="bg-white rounded-lg shadow-sm mb-6 w-full">
              <div className="p-6 flex flex-col space-y-4">
                {/* header */}
                <div className="flex justify-between items-center mb-4 w-full ">
                  <h2 className="font-medium capitalize">available jobs</h2>
                  <CanSelectField options={sort} width="240px" />
                </div>

                {/*job cards */}
                <div className="grid grid-cols-1 gap-4 w-full">
                  {jobData.map((job) => (
                    <CanJobCard
                      key={job.id}
                      role={job.job_title}
                      ratings="4.9"
                      reviews="23k"
                      companyName={job.employer.company_name}
                      description={job?.description}
                      skills={job?.skills}
                      newTag={
                        readableDate(job.start_date) ===
                        new Date().toDateString()
                          && "new"
                         
                      }
                      numberOfProposals="23"
                      salaryRange={job?.salary}
                      submitProposalBtn={job?.submitProposalBtn}
                      jobType={job?.job_type}
                      
                    />
                  ))}
                </div>
              </div>
            </div>

            <ProfileInfoSection/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindWorkPage;
