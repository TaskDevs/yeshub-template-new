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
    freelanceStats,
  } = useContext(FreelanceApiData);
  useEffect(() => {
    loadScript("js/custom.js");
  });

  useEffect(() => {
    processGetFreelanceStats();
    processGetFreelanceProjects();
  }, []);


  
  // useEffect(() => {
  //   console.log(freelanceProjectList);
  // }, [freelanceProjectList]);

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
          <CanRecentActivity />

          <ChatToggleButton />
        </div>
      </div>
    </div>
  );
}

export default CanDashboardPage;
