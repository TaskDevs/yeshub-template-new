import styles from "./dashboard.module.css";
import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { ClientStats } from "./client-stats";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClientChart } from "./client-overview";
import React, { useState, useEffect, useContext } from "react";
import { loadScript } from "../../../../../globals/constants";
import { ClientHiringActivity } from "./client-hiring-activity";
import { ClientQuickActions } from "./client-hiring-quick-actions";
import { ClientActiveJobPostings } from "./client-active-job-posts";
import { EmployerApiData } from "../../../../context/employers/employerContextApi";
import { ProfileSectionModal } from "../../../candidate/sections/new-profile/profile-components";
import { PostJobFormSection } from "../profile/client-profile-forms";

function ClientDashboard() {
  const { processGetEmployerStats, employerStats, processDeleteJob } =
    useContext(EmployerApiData);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [itemsToEdit, setItemsToEdit] = useState({});
  // const [activeSection, setActiveSection] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadScript("js/custom.js");
  }, []);

  useEffect(() => {
    processGetEmployerStats();
  }, []);

  useEffect(() => {
    console.log(employerStats);
  }, [employerStats]);

  const [selectedTimePeriod, setSelectedTimePeriod] = useState("Last 30 Days");

  const timePeriodOptions = [
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
    "This Year",
  ];

  // Chart data
  const [chartData, setChartData] = useState([
    { name: "Week 1", earnings: 0 },
    { name: "Week 2", earnings: 0 },
    { name: "Week 3", earnings: 0 },
    { name: "Week 4", earnings: 0 },
  ]);

  // Function to update chart data based on selected time period
  const updateChartData = (period) => {
    setSelectedTimePeriod(period);

    // Simulate different data for different time periods
    if (period === "Last 7 Days") {
      setChartData([
        { name: "Day 1", earnings: 0 },
        { name: "Day 2", earnings: 0 },
        { name: "Day 3", earnings: 0 },
        { name: "Day 4", earnings: 0 },
        { name: "Day 5", earnings: 0 },
        { name: "Day 6", earnings: 0 },
        { name: "Day 7", earnings: 0 },
      ]);
    } else if (period === "Last 30 Days") {
      setChartData([
        { name: "Week 1", earnings: 0 },
        { name: "Week 2", earnings: 0 },
        { name: "Week 3", earnings: 0 },
        { name: "Week 4", earnings: 0 },
      ]);
    } else if (period === "Last 90 Days") {
      setChartData([
        { name: "Month 1", earnings: 0 },
        { name: "Month 2", earnings: 0 },
        { name: "Month 3", earnings: 0 },
      ]);
    } else if (period === "This Year") {
      setChartData([
        { name: "Jan", earnings: 0 },
        { name: "Feb", earnings: 0 },
        { name: "Mar", earnings: 0 },
        { name: "Apr", earnings: 0 },
        { name: "May", earnings: 0 },
        { name: "Jun", earnings: 0 },
      ]);
    }
  };

  const goToProposal = () => {
    navigate("/client-proposals");
  };

  const goToStaff = () => {
    navigate("/client-staff");
  };

  const goToTaskManagement = () => {
    navigate("/task-management");
  };

  const goToPostedJob = () => {
    navigate("/jobs-posted");
  };

  // Close modal handler
  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEdit(false);
  };

  // Open modal handler with section
  const handleOpenSectionModal = () => {
    setModalOpen(true);
  };

  const handleSetForEdit = (id) => {
    setIsEdit(true);
    let editData = employerStats.active_jobs.find((item) => item.id === id);
    setItemsToEdit(editData);
    setModalOpen(true);
  };

  const handleDelete = (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your delete function here
        processDeleteJob(itemId);

        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  return (
    <div
      className={`tw-css ${styles.twm_right_section_panel} twm-right-section-panel site-bg-gray`}
    >
      <div className={`mt-16 ${styles.dashboardContainer}`}>
        <ClientStats cssModule={styles} employerStats={employerStats} />

        {/* Earnings Overview and Hiring Quick Actions */}
        <div className={styles.cardRow}>
          <ClientChart
            chartData={chartData}
            styles={styles.chart}
            updateChartData={updateChartData}
            timePeriodOptions={timePeriodOptions}
            selectedTimePeriod={selectedTimePeriod}
          />
          <ClientQuickActions
            styles={styles.quickActions}
            actions={{ post_job_modal: handleOpenSectionModal }}
            goTo={{ goToStaff, goToProposal, goToTaskManagement }}
          />
        </div>

        {/* Active Job Postings and Hiring Activities */}
        <div className={`mb-10 ${styles.cardRow} ${styles.jobPostRow}$`}>
          <ClientActiveJobPostings
            employerStats={employerStats}
            actions={handleSetForEdit}
            deleteAction={handleDelete}
            showMore={goToPostedJob}
          />
          <ClientHiringActivity employerStats={employerStats} />
        </div>
      </div>

      {modalOpen && (
        <ProfileSectionModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          title={isEdit ? `Edit Job` : `Add Job`}
        >
          <PostJobFormSection
            onClose={handleCloseModal}
            isEdit={isEdit}
            itemsToEdit={itemsToEdit}
          />
        </ProfileSectionModal>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default ClientDashboard;
