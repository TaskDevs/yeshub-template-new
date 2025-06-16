
import { useEffect, useState } from "react";
import SectionJobsSidebar1 from "../../sections/jobs/sidebar/section-jobs-sidebar1";
import SectionJobsList from "../../sections/jobs/section-jobs-list";
import SectionRecordsFilter from "../../sections/common/section-records-filter";
import { loadScript } from "../../../../../globals/constants";
import { AllJoblist } from "../../../../context/jobs/jobsApi";

function JobsListPage() {
  const [processedJobListData, setProcessedJobListData] = useState([]);
  const [paginationTotal, setPaginationTotal] = useState(0);
  const [paginationData, setPaginationData] = useState({});

  // Load external script


  // ✅ Move this function OUTSIDE of useEffect
//    const fetchJobs = async () => {
//     const res = await AllJoblist();
//     console.log("Raw API response:", res); // Log what you get

//     if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
//      const transformedJobs = res.data.map((job) => ({
//   ...job,
//   job_title: job.job_title,
//   salary: job.salary || 0,
//   employer: job.employer || { logo: "/default-logo.png" }, // ← FIXED LINE
//   address: job.address || "Remote",
//   start_date: job.created_at || new Date().toISOString(),
//   end_date: job.end_date || new Date().toISOString(),
//   employer_id: job.employer_id || job.company_id,
//   job_type: job.job_type || "Full-Time",
//   start_rate:job.hourly_rate_start,
//   end_rate:job.hourly_rate_end,
//  skills: typeof job.skills === "string"
//   ? job.skills.split(",").map((s) => s.trim())
//   : Array.isArray(job.skills)
//   ? job.skills
//   : [],

// }));


//       setProcessedJobListData(transformedJobs);
//       setPaginationTotal(res.total);
//       setPaginationData({
//       currentPage: res.current_page,
//       totalPages: res.last_page,
//       nextPageUrl: res.next_page_url,
//       prevPageUrl: res.prev_page_url,
//       perPage: res.per_page,
//     });
      
//     if (typeof window.page_loader === "function") {
//       window.page_loader();
//     }
//     } else {
//       console.warn("No data found in API response", res);
//       setProcessedJobListData([]);
//     }
//   };

const fetchJobs = async (page = 1, filters = {}) => {
  const res = await AllJoblist({ page, ...filters });

  if (res && Array.isArray(res.data)) {
    const transformedJobs = res.data.map((job) => ({
      ...job,
      job_title: job.job_title,
      salary: job.salary || 0,
      employer: job.employer || { logo: "/default-logo.png" },
      address: job.address || "Remote",
      city:job.employer.city,
      region:job.employer.region,
      start_date: job.created_at || new Date().toISOString(),
      end_date: job.end_date || new Date().toISOString(),
      employer_id: job.employer_id || job.company_id,
      job_type: job.job_type || "Full-Time",
      start_rate: job.hourly_rate_start,
      end_rate: job.hourly_rate_end,
      skills: typeof job.skills === "string"
        ? job.skills.split(",").map((s) => s.trim())
        : Array.isArray(job.skills)
        ? job.skills
        : [],
    }));

    setProcessedJobListData(transformedJobs);
    setPaginationTotal(res.total);
    setPaginationData(res);
  } else {
    setProcessedJobListData([]);
    setPaginationTotal(0);
    setPaginationData({});
  }

  if (typeof window.page_loader === "function") {
    window.page_loader();
  }
};

  // Initial fetch
  useEffect(() => {
    fetchJobs();
  }, []);

  const _filterConfig = {
    prefix: "Showing",
    type: "jobs",
    total: paginationTotal,
    showRange: false,
    showingUpto: "",
  };

    useEffect(() => {
    loadScript("js/custom.js");
  }, []);
  return (
    <div className="section-full p-t120 p-b90 site-bg-white">
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-4 col-md-12 rightSidebar">
            <SectionJobsSidebar1
              processDataActionControls={[
                setProcessedJobListData,
                processedJobListData,
                processedJobListData,
              ]}
            />
          </div>

          {/* Main Content */}
          <div className="col-lg-8 col-md-12">
            <SectionRecordsFilter
              _config={_filterConfig}
              processDataActionControls={[
                setProcessedJobListData,
                processedJobListData,
                processedJobListData,
              ]}
            />
            <SectionJobsList
              processedJobList={processedJobListData}
              actionGetAllJob={fetchJobs} // ✅ this is the fix
              paginationData={paginationData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobsListPage;
