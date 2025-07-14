import React, { useContext, useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import BeatLoader from "react-spinners/BeatLoader";
import { experienceLevel, jobTypes, sort } from "./filter-data";
import CanSelectField from "../../components/can-select-field";
import CanSlider from "../../components/can-slider";
import FilterPanel from "./filter-panel";
import readableDate from "../../../../../utils/readableDate";
import CanJobCard from "../../components/can-job-card";
import ProfileInfoSection from "./profile-info-section";
import { ProfileApiData } from "../../../../context/user-profile/profileContextApi";
import { JobApiData } from "../../../../context/jobs/jobsContextApi";
import { useNavigate } from "react-router-dom";
import styles from "./find-work.module.css";
import MobileFindSavedWork from "./mobile-find-work";

function FindWorkPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const username = sessionStorage.getItem("username");
  const { profileData } = useContext(ProfileApiData);
  const { processGetAllJob, jobListData } = useContext(JobApiData);

  const [filterJobListData, setFilterJobListData] = useState([]);

  // NEW: Filters state
  const [selectedJobType, setSelectedJobType] = useState("all types");
  const [selectedExperience, setSelectedExperience] = useState("all levels");
  const [selectedSalaryRange, setSelectedSalaryRange] = useState(null);

  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    processGetAllJob(1, userId).finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setFilterJobListData(jobListData);
  }, [jobListData]);

  // NEW: apply all filters
  const applyAllFilters = () => {
    let filtered = [...jobListData];

    if (selectedJobType !== "all types") {
      filtered = filtered.filter(
        (item) => item.job_type?.toLowerCase() === selectedJobType.toLowerCase()
      );
    }

    if (selectedExperience !== "all levels") {
      filtered = filtered.filter(
        (item) =>
          item.experience?.toLowerCase() === selectedExperience.toLowerCase()
      );
    }

    if (selectedSalaryRange) {
      const { max } = selectedSalaryRange;
      if (max > 10000) {
        filtered = filtered.filter((item) => item.budget > 10000);
      } else if (max > 5000 && max <= 10000) {
        filtered = filtered.filter(
          (item) => item.budget > 5000 && item.budget <= 10000
        );
      } else if (max > 0 && max <= 5000) {
        filtered = filtered.filter(
          (item) => item.budget > 0 && item.budget <= 5000
        );
      }
    }

    setFilterJobListData(filtered);
    setCurrentPage(1);
  };

  // Run filters whenever any filter changes
  useEffect(() => {
    applyAllFilters();
  }, [selectedJobType, selectedExperience, selectedSalaryRange, jobListData]);

  // NEW: filter change handlers
  const handleFilterChange = (data) => {
    setSelectedJobType(data);
  };

  const handleFilterExperience = (data) => {
    setSelectedExperience(data);
  };

  const handleFilterSalary = (data) => {
    setSelectedSalaryRange(data);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filterJobListData.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filterJobListData.length / jobsPerPage);

  const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

  const handleResetFilters = () => {
    setSelectedJobType("all types");
    setSelectedExperience("all levels");
    setSelectedSalaryRange(null);
  };

  const calculateDaysLeft = (start_date, end_date) => {
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const today = new Date();

  // If today is before the job starts, return full duration
  if (today < startDate) {
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  }

  // If job has already ended
  if (today > endDate) {
    return 0;
  }

  // Job is ongoing; calculate remaining days
  const timeDiff = endDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};

  return (
    <div className="tw-css mx-auto">
      <div className={`${styles.mobileFindWork} min-h-screen p-4`}>
        {isLoading ? (
          <>
            <div className="flex items-center justify-center h-screen">
              <span className="text-gray-500 text-sm text-center">
               <BeatLoader />
              </span>
            </div>
          </>
        ) : (
          <MobileFindSavedWork
            jobs={currentJobs}
            renderJob={(job) => (
              <CanJobCard
                key={job.id}
                id={job?.id}
                role={job?.job_title}
                skills={job?.skills}
                companyName={job?.company_name}
                jobType={job?.job_type}
                isMobile={true}
                jobLocation={job?.location || "Accra"}
                days_left={calculateDaysLeft(job?.created_at, job?.end_date)}
                salaryRange={job?.fixed_rate || job?.budget}
                image={
                  job?.employer?.logo || "https://placehold.co/80x80?text=Logo"
                }
              />
            )}
          />
        )}

        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePagination(page)}
              className={`mx-1 px-3 py-1 rounded border ${
                currentPage === page
                  ? "bg-green-800 text-white"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-6">
        <div className={`${styles.findWorkDesktop}`}>
          <div className="greetings-wrapper">
            <div className="p-6">
              <div className="flex justify-between">
                <div className="flex flex-col space-y-4 items-start">
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
                  label="Job Type"
                  action={[setFilterJobListData, jobListData]}
                  onChange={handleFilterChange}
                />
                <CanSelectField
                  options={experienceLevel}
                  label="Experience Level"
                  action={[setFilterJobListData, jobListData]}
                  onChange={handleFilterExperience}
                />
                <CanSlider
                  onChange={handleFilterSalary}
                  values={["0", "5k", "10k+"]}
                  label="Salary"
                />
                <button
                  onClick={handleResetFilters}
                  className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Reset Filters
                </button>
              </FilterPanel>
            </div>

            <div className={`${styles.gridTwo} section-two`}>
              <div className="p-6 flex flex-col gap-4">
                <div className="section-two-header flex justify-between items-center">
                  <h2 className="font-medium capitalize">available jobs</h2>
                  <CanSelectField options={sort} width="240px" />
                </div>

                <div className="grid grid-cols-1 gap-4 w-full">
                  {isLoading ? (
                    <>
                      <div className="flex gap-2">
                        <div className="h-4 bg-gray-300 rounded w-24"></div>
                        <div className="h-4 bg-gray-300 rounded w-16"></div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {[1, 2, 3].map((_, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-300 h-6 w-16 rounded-sm"
                          ></div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="h-8 w-20 bg-gray-300 rounded"></div>
                        <div className="h-6 w-20 bg-gray-300 rounded"></div>
                        <div className="h-10 w-20 bg-gray-300 rounded"></div>
                      </div>
                    </>
                  ) : currentJobs.length > 0 ? (
                    currentJobs.map((job) => (
                      <CanJobCard
                        key={job.id}
                        id={job?.id}
                        role={job?.job_title}
                        proposal={job?.count_proposal}
                        ratings={job?.company_rating}
                        image={
                          job?.employer?.logo ||
                          "https://placehold.co/80x80?text=Logo"
                        }
                       
                        companyName={job?.job_category}
                        description={job?.description}
                        skills={job?.skills}
                        isMobile={false}
                        newTag={
                          readableDate(job.start_date) ===
                            new Date().toDateString() && "new"
                        }
                        numberOfProposals="23"
                        salaryRange={job?.fixed_rate || job?.budget}
                        jobType={job?.job_type}
                        datePosted={job?.created_at}
                        days_left={calculateDaysLeft(job?.created_at, job?.end_date)}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500">No jobs available</p>
                  )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-6">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePagination(page)}
                        className={`mx-1 px-3 py-1 rounded border ${
                          currentPage === page
                            ? "bg-green-800 text-white"
                            : "bg-white text-gray-800 border-gray-300"
                        }`}
                      >
                        {page}
                      </button>
                    )
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
    </div>
  );
}

export default FindWorkPage;
