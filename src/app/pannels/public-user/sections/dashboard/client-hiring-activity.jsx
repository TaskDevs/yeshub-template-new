import React from "react";
import { FaBriefcase } from "react-icons/fa";
import { IoChatbubbleSharp, IoCheckmarkSharp } from "react-icons/io5";
import { TiStarFullOutline } from "react-icons/ti";
import styles from "./dashboard.module.css";

//  Activity Item Component
const ActivityItem = ({ icon, iconBgColor, title, time }) => (
  <div className="flex justify-start items-start space-x-2">
    <div className={`${iconBgColor} p-1 rounded-full mt-0.5 w-fit`}>{icon}</div>
    <div>
      <p className="text-xs font-medium">{title}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  </div>
);

export const ClientHiringActivity = () => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm ${styles.hiringActivities}`}>
      <h2 className="text-base font-medium mb-4">Hiring Activity</h2>

      <div className="space-y-4">
        <ActivityItem
          icon={<IoCheckmarkSharp className="h-5 w-5 text-[#22C55E]" />}
          iconBgColor="bg-[#DCFCE7]"
          title="New proposal received for Frontend Developer role"
          time="2 hours ago"
        />

        <ActivityItem
          icon={<IoChatbubbleSharp className="h-5 w-5 text-[#3B82F6]" />}
          iconBgColor="bg-[#DBEAFE]"
          title="Interview scheduled with UI/UX Designer candidate"
          time="5 hours ago"
        />

        <ActivityItem
          icon={<TiStarFullOutline className="h-5 w-5 text-[#EAB308]" />}
          iconBgColor="bg-[#FEF9C3]"
          title="Contract started with Marketing Specialist"
          time="Yesterday"
        />

        <ActivityItem
          icon={<FaBriefcase className="h-5 w-5 text-[#8B5CF6]" />}
          iconBgColor="bg-[#EDE9FE]"
          title="Contract started with Marketing Specialist"
          time="2 days ago"
        />
      </div>
    </div>
  );
};
