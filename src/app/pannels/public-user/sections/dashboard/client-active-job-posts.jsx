import React from "react";
import { FaCode } from "react-icons/fa";
// import { FaChartPie, FaCode, FaPaintBrush } from "react-icons/fa";
import styles from "./dashboard.module.css";

//  Job Item Component
const JobPostItem = ({
  icon,
  title,
  desc,
  createdAt,
  budget,
  isLastItem = false,
}) => (
  <div
    className={`flex items-center justify-between cursor-pointer ${
      !isLastItem ? "border-b pb-4 mb-4" : ""
    }`}
  >
    <div className="flex items-center space-x-3">
      <div className="bg-gray-100 p-2 rounded-full">{icon}</div>
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-xs text-gray-500">{desc}</p>
        <p className={`text-sm mt-1 ${styles.active_post_date_sm}`}>
          {createdAt}
        </p>
      </div>
    </div>
    <div className="text-right">
      <p className={`text-sm font-medium ${styles.active_post_date_lg}`}>
        {createdAt}
      </p>
      <p className="text-xs text-gray-500">Budget: GHS{budget}</p>
    </div>
  </div>
);

export const ClientActiveJobPostings = ({ employerStats }) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm ${styles.activePosts}`}>
      <h2 className="text-base font-medium mb-4">Active Job Postings</h2>
      <div>
        {employerStats.active_jobs?.length > 0 ? (
          employerStats.active_jobs.map((item) => (
            <JobPostItem
              key={item.id}
              icon={<FaCode className="h-4 w-4 text-[#305718]" />}
              title={item.title}
              desc="12 proposals received"
              createdAt="Posted 2 days ago"
              budget="4,500"
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No active job postings</p>
        )}
      </div>
    </div>
  );
};
