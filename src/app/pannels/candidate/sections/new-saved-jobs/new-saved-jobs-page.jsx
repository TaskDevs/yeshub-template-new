import React, { useEffect, useState } from "react";
import {
  dates,
  experinceLevel,
  jobData,
  jobStatus,
  jobTypes,
  sortTwo,
} from "../find-work/filter-data";
import { AiOutlineBars } from "react-icons/ai";
import { MdOutlineWindow } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { calculateDaysLeft } from "../../../../../utils/readableDate";
import CanJobCard from "../../components/can-job-card";
import CanSelectField from "../../components/can-select-field";
import FilterPanel from "../find-work/filter-panel";
import CanCheckbox from "../../components/can-checkbox";
import CanSlider from "../../components/can-slider";
import Pagination from "../../../../common/Pagination";
import { useFilterForm } from "../../../../../utils/useFilterFormHook";
import { filterElements } from "../../common/filter-elements";
import styles from "./new-saved-job.module.css"
import MobileFindSavedWork from "../find-work/mobile-find-work";

function NewSavedJobsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredJobs, setFilteredJobs] = useState(jobData); // initially show all jobs

  const { filters, handleChange } = useFilterForm();

  const itemsPerPage = 10;
  const totalItems = jobData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    const results = filterElements(jobData, filters);
    console.log("filter-results", results);
    setFilteredJobs(results);
  }, [filters, jobData]);

  return (
    <div className="tw-css  min-h-screen">
      <div className={`${styles.mobileSavedWork} h-min-h-screen px-4`}>
        <MobileFindSavedWork >
          {jobData.map((job) => (
            <CanJobCard
              key={job.id}
              role={job.job_title}
              ratings="4.9"
              reviews="23k"
              companyName={job.employer.company_name}
              submitProposalBtn={job?.submitProposalBtn}
              jobType={job?.job_type}
              isMobile={true}
              jobLocation={job?.location}
              datePosted={job?.start_date}
              salaryRange={job?.salary}
            // isFindWork={false}
            />
          ))}
        </MobileFindSavedWork>
      </div>
      <div className={`${styles.findWorkDesktop}`}>
        <div className=" mx-auto px-4 py-6 ">
          <div className="w-full px-4 py-4">
            <div className="grid-container-saved">
              <div className="section-one">
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
                    options={experinceLevel.slice(1)}
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
                        saved jobs <span>(12)</span>
                      </h2>
                      <div className="flex mb-2 items-center">
                        <div className="">
                          <CanSelectField options={sortTwo} width="240px" />
                        </div>
                        <div className="flex border w-fit rounded-md">
                          <button className="border-r px-2">
                            <AiOutlineBars className="size-8" />
                          </button>
                          <button>
                            <MdOutlineWindow className="size-8" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-b my-4 w-full px-2 ">
                      <div className="flex items-center">
                        <input type="checkbox" className="size-4" />
                        <span className="ml-1">Select all</span>
                      </div>
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
                    {filteredJobs.map((job) => (
                      <CanJobCard
                        key={job.id}
                        image={job?.employer?.logo}
                        role={job?.job_title}
                        ratings="4.8"
                        reviews="23k"
                        companyName={job?.employer?.company_name}
                        description={job?.description}
                        skills={job?.skills}
                        numberOfProposals="23"
                        salaryRange={job?.salary}
                        submitProposalBtn={job?.submitProposalBtn}
                        jobType={job?.job_type}
                        status={
                          calculateDaysLeft(job?.start_date, job?.end_date) > 0
                            ? "Active"
                            : "Closed"
                        }
                        dateSaved="2 days ago"
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
  );
}

export default NewSavedJobsPage;
