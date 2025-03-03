import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { loadScript } from "../../../../globals/constants";
import EmpGetApplicants from "./jobs/emp-get-applicants";
import { getAppliedJbsByJobid } from "../../../context/application/applicationApi";

function EmpCandidatesPage() {
  const [searchParams] = useSearchParams();
  const jobid = searchParams.get("jobid"); // ✅ Get job ID from URL query params

  useEffect(() => {
    loadScript("js/custom.js");
  }, []);

  const [applicationData, setApplicationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobAppliedByJobId = async () => {
    if (!jobid) {
      setError("No job ID provided.");
      setLoading(false);
      return;
    }

    try {
      const appliedJobs = await getAppliedJbsByJobid(jobid);
      const data = appliedJobs.data || [];

      console.log("Data by job ID:", data);

      if (data.length === 0) {
        setError("No applications found for this job.");
      } else {
        setError("");
      }

      setApplicationData(data);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
      setError("Failed to fetch job applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobAppliedByJobId();
  }, [jobid]);

  return (
    <>
      <div className="wt-admin-right-page-header clearfix">
        <h2>Candidates</h2>
        <div className="breadcrumbs">
          <a href="/">Home</a>
          <a href="/dashboard-employer/">Dashboard</a>
          <a href="/dashboard-employer/manage-jobs">My Job Listing</a>
          <span>Candidates</span>
        </div>
      </div>
      <div className="twm-pro-view-chart-wrap">
        <div className="col-lg-12 col-md-12 mb-4">
          <div className="panel panel-default site-bg-white m-t30">
            <div className="panel-heading wt-panel-heading p-a20">
              <h4 className="panel-title m-a0">
                <i className="far fa-list-alt mr-3"/>
                  All Applicants
              </h4>
            </div>
            <div className="panel-body wt-panel-body">
              <div className="twm-D_table p-a20 table-responsive">
                {loading ? (
                 <div className="text-center">
                 <i className="fa fa-spinner fa-spin fa-3x" />
                 <p>Loading jobs...</p>
               </div>
                ) : error ? (
                  <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                ) : (
                  <table id="" className="table table-bordered">
                    <thead>
                      <tr>
                        <th>
                          <input type="checkbox" id="candidate_select_all" />
                        </th>
                        <th>Name</th>
                        <th>Applied for</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {applicationData.map((data) => (
                        <EmpGetApplicants data={data} key={data.id} />
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th />
                        <th>Name</th>
                        <th>Applied for</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th />
                      </tr>
                    </tfoot>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmpCandidatesPage;
