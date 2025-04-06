import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import {
  getAppliedJbsByJobid,
  updateApplication,
} from "../../../context/application/applicationApi";
import toast from "react-hot-toast";
import JobZImage from "../../../common/jobz-img";
import YesNoPopup from "../../../common/popups/popup-yes-no";
import { GlobalApiData } from "../../../context/global/globalContextApi";
import { popupType } from "../../../../globals/constants";

function EmpCandidatesPage() {
  const [searchParams] = useSearchParams();
  const jobid = searchParams.get("jobid");
  const [applicationData, setApplicationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { setSelectedId } = useContext(GlobalApiData);
  const navigate = useNavigate();
  console.log(applicationData);
  const fetchJobAppliedByJobId = async () => {
    if (!jobid) {
      setError("No job ID provided.");
      setLoading(false);
      return;
    }

    try {
      const appliedJobs = await getAppliedJbsByJobid(jobid);
      const data = appliedJobs.data || [];

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

  const statusOptions = [
    { label: "🟡 Pending", value: "pending" },
    { label: "🟢 Shortlisted", value: "shortlisted" },
    { label: "🔴 Rejected", value: "rejected" },
  ];

  const handleStatusChange = async (newStatus, rowData) => {
    try {
      await updateApplication(rowData.id, { status: newStatus });
      setApplicationData((prev) =>
        prev.map((app) =>
          app.id === rowData.id ? { ...app, status: newStatus } : app
        )
      );
      toast.success(`Status updated to ${newStatus}!`);
    } catch (error) {
      toast.error("Failed to update status. Try again.");
      console.error("Error updating status:", error);
    }
  };

  const handleViewCandidates = (userid) => {
    navigate(`/can-detail/${userid}`);
  };

  const handlemsg = (receiverid) => {
    navigate(`/dashboard-employer/messages-style-1?user=${receiverid}`);
  };

  const statusBodyTemplate = (rowData) => (
    <Dropdown
      value={rowData.status}
      options={statusOptions}
      onChange={(e) => handleStatusChange(e.value, rowData)}
      placeholder="Select Status"
    />
  );

  const nameBodyTemplate = (rowData) => (
    <div className="flex items-center gap-3">
      <JobZImage
        src={
          rowData.user.user_info?.profile_img || "images/candidates/pic1.jpg"
        }
        alt="Profile"
        className="w-5 h-10 rounded-full"
      />
      <div>
        <h4>
          {rowData.user.user_info?.firstname} {rowData.user.user_info?.lastname}
        </h4>
        <p className="text-gray-500">{rowData.user.user_info?.region}</p>
      </div>
    </div>
  );

  const dateBodyTemplate = (rowData) =>
    new Date(rowData.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

  const actionsBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-eye"
        className="p-button p-button-sm p-button-info"
        onClick={() => handleViewCandidates(rowData.user.user_info?.user_id)}
      />
      <Button
        icon="pi pi-envelope"
        className="p-button p-button-primary"
        onClick={() => handlemsg(rowData.user?.id)}
      />
    
      <Button
        icon="pi pi-trash"
        className="p-button-sm p-button-danger"
        data-bs-target="#delete-application"
        data-bs-toggle="modal"
        data-bs-dismiss="modal"
        title="Delete Job"
        onClick={() => setSelectedId(rowData.id)}
      />
      <YesNoPopup
        id="delete-application"
        type={popupType.DELETE_APPLIED_JOB}
        msg={"Are you sure you want to delete this application?"}
      />
    </div>
  );

  return (
    <>
      <div className="wt-admin-right-page-header clearfix">
        <h2>Candidates</h2>
      </div>

      <div className="panel panel-default">
        <div className="panel-heading p-a20">
          <h4 className="panel-title">
            <i className="far fa-list-alt mr-3" /> All Applicants
          </h4>
        </div>
        <div className="panel-body p-a20">
          <div className="table-responsive">
            <DataTable
              value={applicationData}
              paginator
              rows={5}
              loading={loading}
              stripedRows
              emptyMessage={error || "No applications found."}
            >
              <Column
                field="user.user_info.firstname"
                header="Name"
                body={nameBodyTemplate}
              />
              <Column
                field="posted_job.job_title"
                header="Applied for"
                sortable
              />
              <Column
                field="created_at"
                header="Date"
                body={dateBodyTemplate}
                sortable
              />
              <Column
                field="status"
                header="Status"
                body={statusBodyTemplate}
              />
              <Column header="Actions" body={actionsBodyTemplate} />
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmpCandidatesPage;
