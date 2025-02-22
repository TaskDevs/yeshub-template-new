import { useEffect, useState, useContext } from "react";
import JobZImage from "../../../../common/jobz-img";
import { useApify } from "../../../../context/work-data/useApify";
import { JobApiData } from "../../../../context/jobs/jobsContextApi";
import EmpJobPostCard from "./emp-post-job-card";

function EmpManageJobsPage() {
  const { processGetAllJobPostByEmployer, empJobListData, empPaginationData } =
    useContext(JobApiData);

  useEffect(() => {
    processGetAllJobPostByEmployer(3);
  }, []);

  // const { postedJobsData, error } = useApify();
  return (
    <>
      <div className="wt-admin-right-page-header clearfix">
        <h2>Manage Jobs</h2>
        <div className="breadcrumbs">
          <a href="#">Home</a>
          <a href="#">Dasboard</a>
          <span>My Job Listing</span>
        </div>
      </div>
      {/*Basic Information*/}
      <div className="panel panel-default">
        <div className="panel-heading wt-panel-heading p-a20">
          <h4 className="panel-tittle m-a0">
            <i className="fa fa-suitcase" /> Job Details
          </h4>
        </div>
        <div className="panel-body wt-panel-body p-a20 m-b30 ">
          <div className="twm-D_table p-a20 table-responsive">
            <table
              id="jobs_bookmark_table"
              className="table table-bordered twm-bookmark-list-wrap"
            >
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Category</th>
                  <th>Job Types</th>
                  <th>Applications</th>
                  <th>Created &amp; Expired</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/*1*/}
                {empJobListData.map((item) => (
                  <EmpJobPostCard data={item} />
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>Job Title</th>
                  <th>Category</th>
                  <th>Job Types</th>
                  <th>Applications</th>
                  <th>Created &amp; Expired</th>
                  <th>Action</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default EmpManageJobsPage;
