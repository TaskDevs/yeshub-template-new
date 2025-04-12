import React from "react";
// import TimeAgo from "../../../../../utils/formateDate";
import { FaCode } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { PrimaryButton } from "../../../candidate/sections/new-profile/profile-components";
import { formatDate } from "../../../../../utils/dateUtils";
import { GoTrash } from "react-icons/go"; // or another trash icon you prefer
// import { FaChartPie, FaCode, FaPaintBrush } from "react-icons/fa";
import styles from "./dashboard.module.css";

//  Job Item Component
const JobPostItem = ({
  icon,
  title,
  desc,
  createdAt,
  budget,
  fixed,
  rate,
  editAction,
  deleteAction,
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
          {formatDate(createdAt)}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className={`text-sm font-medium ${styles.active_post_date_lg}`}>
          {formatDate(createdAt)}
        </p>

        {fixed && <p className="text-xs text-gray-500">Budget: GHS{budget}</p>}
        {!fixed && <p className="text-xs text-gray-500">{rate}</p>}
      </div>

      {/* 🆕 Edit & Delete Icons */}
      <div className="flex items-center gap-2 ml-4">
        <button
          className="text-green-600 hover:text-green-800"
          title="Edit"
          onClick={() => editAction(true)}
        >
          <BiSolidEdit size={18} />
        </button>
        <button
          className="text-red-600 hover:text-red-800"
          title="Delete"
          onClick={deleteAction}
        >
          <GoTrash size={18} />
        </button>
      </div>
    </div>
  </div>
);

export const ClientActiveJobPostings = ({
  employerStats,
  actions,
  deleteAction,
  showMore,
}) => {
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
              createdAt={item.created_at}
              fixed={item.fixed_rate}
              budget={item.fixed_rate}
              rate={
                item.hourly_rate_start &&
                `Earn Range ${item.hourly_rate_start} to ${item.hourly_rate_end}`
              }
              editAction={() => actions(item.id)}
              deleteAction={() => deleteAction(item.id)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No active job postings</p>
        )}
        {employerStats.active_jobs?.length > 4 && (
          <PrimaryButton onClick={showMore}>Show More</PrimaryButton>
        )}
      </div>
    </div>
  );
};
