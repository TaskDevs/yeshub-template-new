import React, { useEffect,useState } from "react";
import { FaBriefcase, FaClock, FaWallet } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";
import { JobUserStat } from "../../../context/application/applicationApi";



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
   const userId = sessionStorage.getItem('userId')
   const [stats, setStats] = useState({
    total_projects: 0,
    total_active_projects: 0,
    active_jobs: [],
    total_saved_jobs: 0,
    available_balance: 0,
    expiring_soon_saved_jobs_count:0,
    active_projects_due_this_week_count:0,
  });
    
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await JobUserStat(userId);
        if (res) {
          setStats(res);
          console.log("dasb", res)
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    if (userId) {
      fetchStats();
    }
  }, [userId])
  return (
    <div className={cssModule.statsGrid}>
      <StatsCard
        title="Total Projects"
        value={stats.total_projects}
        subtitle="Last 30 days"
        icon={TiStarFullOutline}
        cssModule={cssModule}
      />

      <StatsCard
        title="Active Projects"
        value={stats.total_active_projects}
        subtitle={`${stats.active_projects_due_this_week_count} due this week`}
        icon={FaBriefcase}
        cssModule={cssModule}
      />

      <StatsCard
        title="Saved Jobs"
        value={stats.total_saved_jobs}
        subtitle={`Expiring soon: ${stats.expiring_soon_saved_jobs_count}`}
        icon={FaClock}
        cssModule={cssModule}
      />

      <StatsCard
        title="Available Balance"
        value={`GH₵ ${stats.available_balance}`}
        subtitle="+₵1,500 this month"
        icon={FaWallet}
        cssModule={cssModule}
      />
    </div>
  );
};