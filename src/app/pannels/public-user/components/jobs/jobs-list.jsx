import SectionJobsSidebar1 from "../../sections/jobs/sidebar/section-jobs-sidebar1";
import SectionJobsList from "../../sections/jobs/section-jobs-list";
import SectionRecordsFilter from "../../sections/common/section-records-filter";
import { useEffect, useContext, useState } from "react";
import { JobApiData } from "../../../../context/jobs/jobsContextApi";
import { loadScript } from "../../../../../globals/constants";

function JobsListPage() {
  const { paginationData, jobListData, processGetAllJob } =
    useContext(JobApiData);
  const [processedJobListData, setProcessedJobListData] = useState([]);

  const _filterConfig = {
    prefix: "Showing",
    type: "jobs",
    total: paginationData?.total || 0,
    showRange: false,
    showingUpto: "",
  };

  useEffect(() => {
    loadScript("js/custom.js");
  });

  useEffect(() => {
    processGetAllJob(1);
  }, []);

  useEffect(() => {
    setProcessedJobListData(jobListData);
  }, [jobListData]);



  return (
    <>
      <div className="section-full p-t120  p-b90 site-bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12 rightSidebar">
              <SectionJobsSidebar1
                processDataActionControls={[
                  setProcessedJobListData,
                  jobListData,
                  processedJobListData,
                ]}
              />
            </div>
            <div className="col-lg-8 col-md-12">
              {/*Filter Short By*/}
              <SectionRecordsFilter
                _config={_filterConfig}
                processDataActionControls={[
                  setProcessedJobListData,
                  jobListData,
                  processedJobListData,
                ]}
              />
              <SectionJobsList
                processedJobList={processedJobListData}
                actionGetAllJob={processGetAllJob}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobsListPage;
