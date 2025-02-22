import SectionJobsSidebar1 from "../../sections/jobs/sidebar/section-jobs-sidebar1";
import SectionJobsList from "../../sections/jobs/section-jobs-list";
import { useSearchParams } from "react-router-dom";
import SectionRecordsFilter from "../../sections/common/section-records-filter";
import { useEffect, useContext } from "react";
import { JobApiData } from "../../../../context/jobs/jobsContextApi";
import { loadScript } from "../../../../../globals/constants";

function JobSearchPage() {
  const { paginationData, searchJobInfo, processSearchJob } =
    useContext(JobApiData);

  useEffect(() => {
    loadScript("js/custom.js");
    console.log("We are trying log something");
    //processSearchJob
  }, []);

  const _filterConfig = {
    prefix: "Showing",
    type: "jobs",
    total: paginationData?.total || 0,
    showRange: false,
    showingUpto: "",
  };

  return (
    <>
      <div className="section-full p-t120  p-b90 site-bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12 rightSidebar">
              <SectionJobsSidebar1 />
            </div>
            <div className="col-lg-8 col-md-12">
              {/*Filter Short By*/}
              <SectionRecordsFilter _config={_filterConfig} />
              <SectionJobsList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobSearchPage;
