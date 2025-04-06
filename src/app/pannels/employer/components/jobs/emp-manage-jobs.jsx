import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JobApiData } from "../../../../context/jobs/jobsContextApi";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import YesNoPopup from "../../../../common/popups/popup-yes-no";
import { popupType } from "../../../../../globals/constants";
import { GlobalApiData } from "../../../../context/global/globalContextApi";

function EmpManageJobsPage() {
  const { processGetAllJobPostByEmployer, empJobListData, loading } =
    useContext(JobApiData);
  const userId = sessionStorage.getItem("user_id");
  const navigate = useNavigate();
  const [hasFetched, setHasFetched] = useState(false);
  const {setSelectedId} = useContext(GlobalApiData)
  const [filters, setFilters] = useState({
    job_title: { value: null, matchMode: FilterMatchMode.CONTAINS },
    job_category_id: { value: null, matchMode: FilterMatchMode.EQUALS },
    job_type: { value: null, matchMode: FilterMatchMode.EQUALS },
    job_applications_count: {
      value: null,
      matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL,
    },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  useEffect(() => {
    if (userId && !hasFetched) {
     processGetAllJobPostByEmployer(userId).then(() => setHasFetched(true));
   
    }
  }, [userId, hasFetched]);

  // Status badge renderer
  const statusBodyTemplate = (rowData) => {
    const isExpired = new Date(rowData.end_date) < new Date();
    return (
      <Tag
        severity={isExpired ? "danger" : "success"}
        value={isExpired ? "Expired" : "Active"}
      />
    );
  };

  // Job type renderer
  const jobTypeBodyTemplate = (rowData) => {

    const jobTypes = {
      "Full Time": { label: "Full Time", severity: "success" },
      "Part Time": { label: "Part Time", severity: "warning" },
      Contract: { label: "Contract", severity: "info" },
      Freelance: { label: "Freelance", severity: "secondary" },
      Internship: { label: "Internship", severity: "primary" },
      Temporary: { label: "Temporary", severity: "danger" },
    };

    const jobType = jobTypes[rowData.job_type] || {
      label: "Unknown",
      severity: "dark",
    };

    return <Tag severity={jobType.severity} value={jobType.label} />;
  };



  // Handle View Candidates
  const handleViewCandidates = (jobId) => {
    navigate(`/dashboard-employer/candidates-list?jobid=${jobId}`);
  };

  // Handle Edit Job
  const handleEditJob = (jobId) => {
    navigate(`/dashboard-employer/edit-job/${jobId}`);
  };




  // Actions column renderer
  const actionsBodyTemplate = (rowData) => {
    return (
      <>
       <div className="flex gap-2">
        <Button
          icon="pi pi-eye"
          className="p-button-sm p-button-info"
          title="View Candidates"
          onClick={() => handleViewCandidates(rowData.id)}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-sm p-button-warning"
          title="Edit Job"
          onClick={() => handleEditJob(rowData.id)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-sm p-button-danger"
          data-bs-target="#delete-job"
          data-bs-toggle="modal"
          data-bs-dismiss="modal"
          title="Delete Job"
          onClick={() => setSelectedId(rowData.id)}
        />


      </div>
      <YesNoPopup
				id="delete-job"
				type={popupType.DELETE_JOB}
				msg={"Are you sure you want to delete this skill?"}
			/>
      </>
     
    );
  };

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

      <div className="panel panel-default">
        <div className="panel-heading wt-panel-heading p-a20">
          <h4 className="panel-title m-a0">
            <i className="fa fa-suitcase" /> Posted Jobs
          </h4>
        </div>
        <div className="panel-body wt-panel-body p-a20 m-b30">
          <div className="twm-D_table p-a20 table-responsive">
          

            <DataTable
              value={empJobListData}
              paginator
              rows={5}
              loading={loading}
              stripedRows
              filterDisplay="menu"
              filters={filters}
              onFilter={(e) => setFilters(e.filters)}
              responsiveLayout="scroll"
            >
              <Column
                field="job_title"
                header="Job Title"
                sortable
                filter
                filterPlaceholder="Search by title"
              />
              <Column
                field="job_category_id"
                header="Category"
                filter
                body={(rowData) =>
                  rowData.job_category
                }
              />
              <Column header="Job Type" body={jobTypeBodyTemplate} filter />
              <Column
                field="job_applications_count"
                header="Applications"
                sortable
                filter
                body={(rowData) => `${rowData.job_applications_count} Applied`}
              />
              <Column header="Status" body={statusBodyTemplate} filter />
              <Column header="Actions" body={actionsBodyTemplate} />
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmpManageJobsPage;
