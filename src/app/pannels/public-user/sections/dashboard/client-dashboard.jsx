import styles from "./dashboard.module.css"
import { ClientStats } from "./client-stats";
import { ClientChart } from "./client-overview";
import React, { useState, useEffect } from "react";
import { loadScript } from "../../../../../globals/constants";
import { ClientHiringActivity } from "./client-hiring-activity";
import { ClientQuickActions } from "./client-hiring-quick-actions";
import { ClientActiveJobPostings } from "./client-active-job-posts";

function ClientDashboard() {
  useEffect(() => {
    loadScript("js/custom.js");
  });

  const [selectedTimePeriod, setSelectedTimePeriod] = useState("Last 30 Days");
  
  const timePeriodOptions = [
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
    "This Year",
  ];

  // Chart data
  const [chartData, setChartData] = useState([
    { name: "Week 1", earnings: 1200 },
    { name: "Week 2", earnings: 2100 },
    { name: "Week 3", earnings: 1500 },
    { name: "Week 4", earnings: 2800 },
  ]);

  // Function to update chart data based on selected time period
  const updateChartData = (period) => {
    setSelectedTimePeriod(period);

    // Simulate different data for different time periods
    if (period === "Last 7 Days") {
      setChartData([
        { name: "Day 1", earnings: 400 },
        { name: "Day 2", earnings: 300 },
        { name: "Day 3", earnings: 500 },
        { name: "Day 4", earnings: 200 },
        { name: "Day 5", earnings: 600 },
        { name: "Day 6", earnings: 400 },
        { name: "Day 7", earnings: 700 },
      ]);
    } else if (period === "Last 30 Days") {
      setChartData([
        { name: "Week 1", earnings: 1200 },
        { name: "Week 2", earnings: 2100 },
        { name: "Week 3", earnings: 1500 },
        { name: "Week 4", earnings: 2800 },
      ]);
    } else if (period === "Last 90 Days") {
      setChartData([
        { name: "Month 1", earnings: 4500 },
        { name: "Month 2", earnings: 5200 },
        { name: "Month 3", earnings: 6100 },
      ]);
    } else if (period === "This Year") {
      setChartData([
        { name: "Jan", earnings: 2000 },
        { name: "Feb", earnings: 2200 },
        { name: "Mar", earnings: 2700 },
        { name: "Apr", earnings: 2900 },
        { name: "May", earnings: 3200 },
        { name: "Jun", earnings: 3800 },
      ]);
    }
  };
  
  return (
      <div className={`tw-css ${styles.twm_right_section_panel} twm-right-section-panel site-bg-gray`}>
        <div className={`mt-16 ${styles.dashboardContainer}`}>
          <ClientStats cssModule={styles} />
          
          {/* Earnings Overview and Hiring Quick Actions */}
          <div className={styles.cardRow}>
            <ClientChart
              chartData={chartData}
              styles={styles.chart}
              updateChartData={updateChartData}
              timePeriodOptions={timePeriodOptions}
              selectedTimePeriod={selectedTimePeriod}
            />
            <ClientQuickActions styles={styles.quickActions} />
          </div>

          {/* Active Job Postings and Hiring Activities */}
          <div className={`mb-10 ${styles.cardRow} ${styles.jobPostRow}$`}>
            <ClientActiveJobPostings />
            <ClientHiringActivity />
          </div>
        </div>
      </div>
  );
}

export default ClientDashboard;
