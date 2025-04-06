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

export const CandidateStats = ({ cssModule }) => {
  return (
    <div className={cssModule.statsGrid}>
      <StatsCard
        title="Total Projects"
        value="98"
        subtitle="Last 30 days"
        icon={TiStarFullOutline}
        cssModule={cssModule}
      />

      <StatsCard
        title="Active Projects"
        value="8"
        subtitle="2 due this week"
        icon={FaBriefcase}
        cssModule={cssModule}
      />

      <StatsCard
        title="Saved Jobs"
        value="4"
        subtitle="Expiring soon: 1"
        icon={FaClock}
        cssModule={cssModule}
      />

      <StatsCard
        title="Available Balance"
        value="$4,250.00"
        subtitle="+$1,500 this month"
        icon={FaWallet}
        cssModule={cssModule}
      />
    </div>
  );
};