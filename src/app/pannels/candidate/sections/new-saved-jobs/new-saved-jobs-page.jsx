import React, { useContext, useEffect, useState } from "react";
import {
  dates,
  experienceLevel,
  jobStatus,
  jobTypes,
  sortTwo,
} from "../find-work/filter-data";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import {
  calculateDaysLeft,
  calculateDaysSincePosted,
} from "../../../../../utils/readableDate";
import CanJobCard from "../../components/can-job-card";
import CanSelectField from "../../components/can-select-field";
import FilterPanel from "../find-work/filter-panel";
import CanCheckbox from "../../components/can-checkbox";
import CanSlider from "../../components/can-slider";
import Pagination from "../../../../common/Pagination";
import { useFilterForm } from "../../../../../utils/useFilterFormHook";
import { filterElements } from "../../common/filter-elements";
import styles from "./new-saved-job.module.css";
import MobileFindSavedWork from "../find-work/mobile-find-work";
import { SavedJobsApiData } from "../../../../context/saved-jobs/savedJobsContextApi";
import { JobCardSkeleton } from "../../../public-user/sections/jobs/skeletonloader";

function NewSavedJobsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { savedjobsData } = useContext(SavedJobsApiData);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const { filters, handleChange } = useFilterForm();

  const itemsPerPage = 10;

  const totalItems = savedjobsData?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const isLoading = !savedjobsData || savedjobsData?.length === 0;

  useEffect(() => {
    if (!isLoading) {
      const results = filterElements(savedjobsData, filters);
      console.log("results new", savedjobsData);
      setFilteredJobs(results);
    }
  }, [filters, savedjobsData]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    if (savedjobsData?.length > 0 && Object.keys(filters).length === 0) {
      setFilteredJobs(savedjobsData);
    }
  }, [savedjobsData]);
  useEffect(() => {
    if (savedjobsData?.length > 0) {
      const results = filterElements(savedjobsData, filters);
      setFilteredJobs(results);
    }
  }, [filters, savedjobsData]);

  return (
    <>
      {isLoading && 
      <>
                    {[...Array(4)].map((_, idx) => (
                      <JobCardSkeleton key={idx} />
                    ))}
                  </>
      }

      <div className="tw-css mx-auto   min-h-screen">
        <div className={`${styles.mobileSavedWork} h-min-h-screen px-4`}>
          <MobileFindSavedWork>
             jobs={filteredJobs}
            {savedjobsData?.map((data) => (
              <CanJobCard
                key={data?.id}
                id={data?.job_id}
                role={data?.job?.title}
                proposal={data?.job?.proposals_count}
                 image={data?.job?.employer?.logo}
                ratings="4.9"
                reviews="23k"
                companyName={data?.job?.category}
                jobType={data?.job_type || "contract"}
                isMobile={true}
                jobLocation={data?.location}
                datePosted={data?.created_at}
                salaryRange={data?.job?.fixed_rate || "400"}
                status={
                  calculateDaysLeft(
                    data?.job?.created_at,
                    data?.job?.end_date
                  ) > 0
                    ? "Active"
                    : "Closed"
                }
                isFindWork={false}
               
              />
            ))}
          </MobileFindSavedWork>
        </div>
        <div className={`${styles.findWorkDesktop}`}>
          <div className=" mx-auto  max-w-7xl p-6">
            <div className="w-full px-4 py-4">
              <div className="grid-container-saved">
                <div className={`${styles.gridOne} section-one`}>
                  <FilterPanel>
                    <CanSelectField
                      options={dates}
                      label="Date Saved"
                      onChange={handleChange("date")}
                    />
                    <CanCheckbox
                      options={jobStatus}
                      label="Job Status"
                      onChange={handleChange("status")}
                    />
                    <CanCheckbox
                      options={jobTypes.slice(1)}
                      label="Job Types"
                      onChange={handleChange("jobTypes")}
                    />
                    <CanSlider
                      values={["0", "100k", "200k+"]}
                      label="Salary"
                      onChange={handleChange("salaryRange")}
                    />
                    <CanCheckbox
                      options={experienceLevel.slice(1)}
                      label="Experience Level"
                      onChange={handleChange("experienceLevel")}
                    />
                  </FilterPanel>
                </div>

                <div className="section-two">
                  <div className="p-6 flex flex-col space-y-4">
                    {/* header */}

                    <div className="w-full">
                      <div className="flex justify-between items-center border-b mb-6 w-full">
                        <h2 className="font-medium text-xl capitalize">
                          saved jobs <span>({totalItems})</span>
                        </h2>
                        <div className="flex mb-2 items-center">
                          <div className="">
                            <CanSelectField options={sortTwo} width="240px" />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-b my-4 w-full px-2 ">
                        <div className="flex capitalize">
                          <button className="flex">
                            <FaRegTrashAlt />
                            <span>remove selected</span>
                          </button>
                          <button className="flex">
                            <CiCircleCheck /> <span>mark as applied</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/*job cards */}
                    <div className="grid grid-cols-1 gap-4 w-full">
                      {savedjobsData?.map((data) => (
                        <CanJobCard
                          key={data.id}
                          id={data.job_id}
                          image={data?.job?.employer?.logo}
                          role={data?.job?.title}
                          proposal={data?.job?.proposals_count}
                          ratings="4.8"
                          reviews="23k"
                          companyName={data?.job?.category}
                          description={data?.job?.description}
                          skills={data?.job?.skills}
                          numberOfProposals="23"
                          salaryRange={data?.job?.fixed_rate || "400"}
                          jobType={data?.job?.job_type}
                          
                          status={
                            calculateDaysLeft(
                              data?.job?.created_at,
                              data?.job?.end_date
                            ) > 0
                              ? "Active"
                              : "Closed"
                          }
                          dateSaved={calculateDaysSincePosted(data?.created_at)}
                          isFindWork={false}
                        />
                      ))}
                    </div>
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.min(5, totalPages)}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    showLabel={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewSavedJobsPage;
