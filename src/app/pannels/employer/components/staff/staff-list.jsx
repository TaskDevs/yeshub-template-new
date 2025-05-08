import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { BiShow, BiSolidEdit, BiPlus, BiMoney } from "react-icons/bi";
import { GoTrash } from "react-icons/go";
import { DataTable } from "primereact/datatable";
import { staff_data } from "./staff-data";
import styles from "./staff.module.css";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { FilterMatchMode } from "primereact/api";
//import { GlobalApiData } from "../../../../context/global/globalContextApi";

function StaffList() {
  //   const userId = sessionStorage.getItem("user_id");
  //const navigate = useNavigate();
  //   const [hasFetched, setHasFetched] = useState(false);
  //const { setSelectedId } = useContext(GlobalApiData);
  const [filters, setFilters] = useState({
    job_type: { value: null, matchMode: FilterMatchMode.CONTAINS },
    position: { value: null, matchMode: FilterMatchMode.EQUALS },
    salary_type: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  //   useEffect(() => {
  //     if (userId && !hasFetched) {
  //       processGetAllJobPostByEmployer(userId).then(() => setHasFetched(true));
  //     }
  //   }, [userId, hasFetched]);

  // Status badge renderer
  //   const statusBodyTemplate = (rowData) => {
  //     const isExpired = new Date(rowData.end_date) < new Date();
  //     return (
  //       <Tag
  //         severity={isExpired ? "danger" : "success"}
  //         value={isExpired ? "Expired" : "Active"}
  //       />
  //     );
  //   };

  // Job type renderer
  const jobTypeBodyTemplate = (rowData) => {
    const jobTypes = {
      "Full Time": { label: "Full Time", severity: "success" },
      "Part Time": { label: "Part Time", severity: "warning" },
      fixed: { label: "Fixed", severity: "warning" },
      hourly: { label: "Hourly", severity: "secondary" },
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

  const salaryTypeBodyTemplate = (rowData) => {
    const salaryTypes = {
      fixed: { label: "Fixed", severity: "warning" },
      hourly: { label: "Hourly", severity: "secondary" },
    };

    const salaryType = salaryTypes[rowData.salary_type] || {
      label: "Unknown",
      severity: "dark",
    };

    return <Tag severity={salaryType.severity} value={salaryType.label} />;
  };

  // Handle View Candidates
  // const handleViewCandidates = (jobId) => {
  //   navigate(`/dashboard-employer/candidates-list?jobid=${jobId}`);
  // };

  // Handle Edit Job
  // const handleEditJob = (jobId) => {
  //   navigate(`/dashboard-employer/edit-job/${jobId}`);
  // };

  // Actions column renderer
  const actionsBodyTemplate = (item) => {
    return (
      <>
        <div className="flex gap-2">
          <button
            className="text-blue-600 hover:text-blue-800"
            title="View"
            onClick={() => console.log(item)}
          >
            <BiShow size={18} />
          </button>
          <button
            className="text-yellow-600 hover:text-yellow-800"
            title="Make Payment"
            onClick={() => console.log(item)}
          >
            <BiMoney size={18} />
          </button>
          <button
            className="text-green-600 hover:text-green-800"
            title="Add To Team"
            onClick={() => console.log(item)}
          >
            <BiPlus size={18} />
          </button>
          <button
            className="text-blue-600 hover:text-blue-800"
            title="Decrease Progress"
            onClick={() => console.log(item)}
          >
            <BiSolidEdit size={18} />
          </button>
          <button className="text-red-600 hover:text-red-800" title="Delete">
            <GoTrash size={18} />
          </button>
        </div>
      </>
    );
  };

  return (
    <div
      className={`tw-css ${styles.twm_right_section_panel} twm-right-section-panel site-bg-gray`}
    >
      <div className="wt-admin-right-page-header clearfix">
        <h2>Manage Staff</h2>
      </div>

      <div className="panel panel-default">
        <div className="panel-heading wt-panel-heading p-a20">
          <h4 className="panel-title m-a0">
            <i className="fa fa-suitcase" /> Manage Staff
          </h4>
        </div>
        <div className="panel-body wt-panel-body p-a20 m-b30">
          <div className="twm-D_table p-a20 table-responsive">
            <DataTable
              value={staff_data}
              paginator
              rows={5}
              stripedRows
              filterDisplay="menu"
              filters={filters}
              onFilter={(e) => setFilters(e.filters)}
              responsiveLayout="scroll"
            >
              <Column
                field="staff_name"
                header="Staff Name"
                // sortable
                // filter
                // filterPlaceholder="Search by title"
              />

              <Column field="position" header="Position" />
              <Column field="start_date" header="Start Date" />
              <Column header="Job Type" body={jobTypeBodyTemplate} />
              <Column header="Salary Type" body={salaryTypeBodyTemplate} />
              <Column field="salary" header="Salary" />
              <Column field="team" header="Team" />
              <Column header="Actions" body={actionsBodyTemplate} />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffList;
