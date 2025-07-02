import React, { useState, useEffect, useContext } from "react";
import { CandidateChart } from "./can-chart";
import { CandidateStats } from "./can-stats";

import { CanActiveProjects } from "./can-active-projects";
import { loadScript } from "../../../../globals/constants";
import styles from "../sections/dashboard/dashboard.module.css";
import { CanQuickActions } from "../sections/dashboard/can-quick-actions";
import { CanRecentActivity } from "../sections/dashboard/can-recent-activity";
import { FreelanceApiData } from "../../../context/freelance/freelanceContextApi";
import ChatToggleButton from "../support/ChatToggleButton";

function CanDashboardPage() {
  const {
    processGetFreelanceProjects,
    freelanceProjectList,
    processGetFreelanceStats,
    processGetFreelanceNotification,
    freelanceNotifications,
    freelanceStats,
  } = useContext(FreelanceApiData);
  // Chart data
  const [chartData, setChartData] = useState([
    { name: "Week 1", earnings: 0 },
    { name: "Week 2", earnings: 0 },
    { name: "Week 3", earnings: 0 },
    { name: "Week 4", earnings: 0 },
  ]);

  useEffect(() => {
    loadScript("js/custom.js");
  });

  useEffect(() => {
    processGetFreelanceStats();
    processGetFreelanceProjects();
    processGetFreelanceNotification();
  }, []);

  useEffect(() => {
    console.log(freelanceNotifications);
  }, [freelanceNotifications]);

  useEffect(() => {
    setChartData(freelanceStats?.chart_data?.last_30_days);
  }, [freelanceStats]);

  const [selectedTimePeriod, setSelectedTimePeriod] = useState("Last 30 Days");

  const timePeriodOptions = [
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
    "This Year",
  ];

  // Function to update chart data based on selected time period
  const updateChartData = (period) => {
    setSelectedTimePeriod(period);

    // Simulate different data for different time periods
    if (period === "Last 7 Days") {
      setChartData(freelanceStats.chart_data.last_7_days);
    } else if (period === "Last 30 Days") {
      setChartData(freelanceStats.chart_data.last_30_days);
    } else if (period === "Last 90 Days") {
      setChartData(freelanceStats.chart_data.last_90_days);
    } else if (period === "This Year") {
      setChartData(freelanceStats.chart_data.this_year);
    }
  };

  return (
    <div
      className={`tw-css ${styles.twm_right_section_panel} twm-right-section-panel site-bg-gray`}
    >
      <div className={styles.dashboardContainer}>
        <CandidateStats cssModule={styles} freelanceStats={freelanceStats} />

        {/* Earnings Overview and Quick Actions */}
        <div className={styles.cardRow}>
          <CandidateChart
            chartData={chartData}
            styles={styles.chart}
            updateChartData={updateChartData}
            timePeriodOptions={timePeriodOptions}
            selectedTimePeriod={selectedTimePeriod}
          />
          <CanQuickActions styles={styles.quickActions} />
        </div>

        {/* Active Projects and Recent Activities */}
        <div className={`${styles.cardRow} ${styles.projectsRow}`}>
          <CanActiveProjects projectList={freelanceProjectList} />
          <CanRecentActivity notifications={freelanceNotifications} />

          <ChatToggleButton />
        </div>
      </div>
    </div>
  );
}

export default CanDashboardPage;
