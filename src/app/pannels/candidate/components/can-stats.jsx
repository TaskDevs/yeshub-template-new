import React from "react";
import { FaBriefcase, FaClock, FaWallet } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";

//  Stats Card Component
const StatsCard = ({ title, value, subtitle, icon: Icon }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
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

export const CandidateStats = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      <StatsCard
        title="Total Projects"
        value="98"
        subtitle="Last 30 days"
        icon={TiStarFullOutline}
        iconColor="text-green-700"
        iconBgColor="bg-green-50"
      />

      <StatsCard
        title="Active Projects"
        value="8"
        subtitle="2 due this week"
        icon={FaBriefcase}
        iconColor="text-emerald-700"
        iconBgColor="bg-emerald-50"
      />

      <StatsCard
        title="Saved Jobs"
        value="4"
        subtitle="Expiring soon: 1"
        icon={FaClock}
        iconColor="text-amber-700"
        iconBgColor="bg-amber-50"
      />

      <StatsCard
        title="Available Balance"
        value="$4,250.00"
        subtitle="+$1,500 this month"
        icon={FaWallet}
        iconColor="text-green-700"
        iconBgColor="bg-green-50"
      />
    </div>
  );
};
