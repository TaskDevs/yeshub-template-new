import React from "react";
import SectionPagination from "../common/section-pagination";
import Loader from "../../../../common/loader";
import { JobsCard } from "./job-card";

function SectionJobsList({ processedJobList, actionGetAllJob, paginationData  }) {
 

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
            <Loader />
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
              />
            ))
          )}
        </div>
        <SectionPagination
          action={actionGetAllJob}
          paginationData={paginationData}
        />
      </div>
    </>
  );
}

export default SectionJobsList;
