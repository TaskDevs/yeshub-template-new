import SectionJobsSidebar1 from "../../sections/jobs/sidebar/section-jobs-sidebar1";
import SectionJobSearch from "../../sections/jobs/section-jobs-search";
import SectionRecordsFilter from "../../sections/common/section-records-filter";
import { useEffect, useContext, useState } from "react";
import { JobApiData } from "../../../../context/jobs/jobsContextApi";
import { loadScript } from "../../../../../globals/constants";

function JobSearchPage() {
  const { searchPaginationData, searchJobListData, processSearchJob } =
    useContext(JobApiData);
  const [processedSearchJobListData, setProcessedSearchJobListData] = useState(
    []
  );

  useEffect(() => {
    loadScript("js/custom.js");
    console.log("We are trying log something");
    //processSearchJob
  }, []);

  const _filterConfig = {
    prefix: "Showing",
    type: "jobs",
    total: searchPaginationData?.total || 0,
    showRange: false,
    showingUpto: "",
  };

  useEffect(() => {
    setProcessedSearchJobListData(searchJobListData);
  }, [searchJobListData]);

  return (
    <>
      <div className="section-full p-t120  p-b90 site-bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12 rightSidebar">
              <SectionJobsSidebar1
                processDataActionControls={[
                  setProcessedSearchJobListData,
                  searchJobListData,
                  processedSearchJobListData,
                ]}
              />
            </div>
            <div className="col-lg-8 col-md-12">
              {/*Filter Short By*/}
              <SectionRecordsFilter
                _config={_filterConfig}
                processDataActionControls={[
                  setProcessedSearchJobListData,
                  searchJobListData,
                  processedSearchJobListData,
                ]}
              />
              <SectionJobSearch
                processedSearchJobList={processedSearchJobListData}
                actionSearchJob={processSearchJob}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobSearchPage;
