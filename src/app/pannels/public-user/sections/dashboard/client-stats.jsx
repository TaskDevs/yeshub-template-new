import React from "react";
import { FaBriefcase, FaClock, FaWallet } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";

// Stats Card Component
const StatsCard = ({ title, value, subtitle, icon: Icon, cssModule }) => (
  <div className={cssModule.statsCard}>
    <div className="flex justify-between mb-2">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className={`p-1 rounded-full`}>
        <Icon className={`h-5 w-5 text-[#305718]`} />
      </div>
    </div>
    <div className="text-3xl font-bold mb-1">{value}</div>
    <div className="text-gray-500 text-xs">{subtitle}</div>
  </div>
);

export const ClientStats = ({ cssModule, employerStats }) => {
  return (
    <div className={cssModule.statsGrid}>
      <StatsCard
        title="Active Jobs"
        value={employerStats.total_jobs_posted}
        subtitle={`${employerStats.total_application_to_review} need review`}
        icon={FaBriefcase}
        cssModule={cssModule}
      />

      <StatsCard
        title="Total Spent"
        value={`GH₵${employerStats.total_spent}`}
        subtitle={`This month budget: GH₵${employerStats.total_spent_month}`}
        icon={FaWallet}
        cssModule={cssModule}
      />

      <StatsCard
        title="Hire Rate"
        value={`${employerStats.hire_percentage_last_30_days}%`}
        subtitle={`${employerStats.hires_last_30_days} hires this month`}
        icon={TiStarFullOutline}
        cssModule={cssModule}
      />

      <StatsCard
        title="Average Time to Hire"
        value={`${employerStats.average_time_to_hire_percent}%`}
        subtitle={`${employerStats.average_time_to_hire_days} days average`}
        icon={FaClock}
        cssModule={cssModule}
      />
    </div>
  );
};
