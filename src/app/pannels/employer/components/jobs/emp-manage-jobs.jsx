import { useEffect, useContext, useState } from "react";
import { JobApiData } from "../../../../context/jobs/jobsContextApi";
import EmpJobPostCard from "./emp-post-job-card";

function EmpManageJobsPage() {
  const { processGetAllJobPostByEmployer, empJobListData, loading } =
    useContext(JobApiData);

  const userId = sessionStorage.getItem("user_id");
  const [hasFetched, setHasFetched] = useState(false); 

  console.log("Jobs",empJobListData)

  useEffect(() => {
    if (userId && !hasFetched) {
      processGetAllJobPostByEmployer(userId).then(() => setHasFetched(true));
    }
  }, [userId, hasFetched]);

  return (
    <>
      <div className="wt-admin-right-page-header clearfix">
        <h2>Manage Jobs</h2>
        <div className="breadcrumbs">
          <a href="#">Home</a>
          <a href="#">Dashboard</a>
          <span>My Job Listing</span>
        </div>
      </div>

      {/* Basic Information */}
      <div className="panel panel-default">
        <div className="panel-heading wt-panel-heading p-a20">
          <h4 className="panel-title m-a0">
            <i className="fa fa-suitcase" /> Job Details
          </h4>
        </div>
        <div className="panel-body wt-panel-body p-a20 m-b30">
          <div className="twm-D_table p-a20 table-responsive">
            {loading ? (
              // 🔥 Show Loader When Data is Loading
              <div className="text-center">
                <i className="fa fa-spinner fa-spin fa-3x" />
                <p>Loading jobs...</p>
              </div>
            ) : (
              <table
                id=""
                className="table table-bordered twm-bookmark-list-wrap"
              >
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Category</th>
                    <th>Job Types</th>
                    <th>Applications</th>
                    <th> Expired at</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(empJobListData) && empJobListData.length > 0 ? (
                    empJobListData.map((item) => (
                      <EmpJobPostCard data={item} key={item.id} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">No jobs found.</td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Job Title</th>
                    <th>Category</th>
                    <th>Job Types</th>
                    <th>Applications</th>
                    <th>Expired Date</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EmpManageJobsPage;
