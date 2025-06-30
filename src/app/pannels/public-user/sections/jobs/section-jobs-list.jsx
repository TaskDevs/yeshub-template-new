import React from "react";
import SectionPagination from "../common/section-pagination";
import { JobsCard } from "./job-card";
import { JobCardSkeleton } from "./skeletonloader";

function SectionJobsList({
  processedJobList,
  actionGetAllJob,
  paginationData,
}) {
  //Function to calculate the number of days left
  const calculateDaysLeft = (start_date, end_date) => {
    new Date(start_date);
    const endDate = new Date(end_date);
    const today = new Date();

    // If the job period is already over
    if (today > endDate) {
      return 0; // No days left
    }

    const timeDiff = endDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days
  };

  return (
    <>
      <div>
        <div className="twm-jobs-list-wrap">
          {processedJobList.length === 0 ? (
            <>
              {[...Array(4)].map((_, idx) => (
                <JobCardSkeleton key={idx} />
              ))}
            </>
          ) : (
            processedJobList.map((item, index) => (
              <JobsCard
                key={index}
                img={item.employer?.logo || "/default-logo.png"}
                title={item.job_title}
                duration={item.start_date}
                location={item.address}
                amount={`GH₵${item.salary}`}
                job_type={item.job_type}
                days_left={calculateDaysLeft(item.start_date, item.end_date)}
                link={`/job-detail/${item.id}`}
                employerId={item.employer_id}
                skills={item.skills}
                start_rate={item.start_rate}
                end_rate={item.end_rate}
                created_at = {item.start_date}
                companyName={item.employer?.name || "Unknown Company"}
              />
            ))
          )}
        </div>
       <SectionPagination
          paginationData={paginationData}
          action={(page) => actionGetAllJob(page)} // make sure `page` is passed
        />

      </div>
    </>
  );
}

export default SectionJobsList;
