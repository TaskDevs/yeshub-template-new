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

export const ClientStats = ({ cssModule }) => {
  return (
    <div className={cssModule.statsGrid}>
      <StatsCard
        title="Active Jobs"
        value="8"
        subtitle="3 need review"
        icon={FaBriefcase}
        cssModule={cssModule}
      />

      <StatsCard
        title="Total Spent"
        value="GH₵4,250.00"
        subtitle="This month budget: GH₵10,000"
        icon={FaWallet}
        cssModule={cssModule}
      />

      <StatsCard
        title="Hire Rate"
        value="98%"
        subtitle="15 hires this month"
        icon={TiStarFullOutline}
        cssModule={cssModule}
      />

      <StatsCard
        title="Average Time to Hire"
        value="98%"
        subtitle="3.5 days average"
        icon={FaClock}
        cssModule={cssModule}
      />
    </div>
  );
};