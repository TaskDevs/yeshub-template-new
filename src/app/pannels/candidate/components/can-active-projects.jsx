import React from "react";
import { FaChartPie, FaCode, FaPaintBrush } from "react-icons/fa";
import styles from "../sections/dashboard/dashboard.module.css"

//  Project Item Component
const ProjectItem = ({
  icon,
  title,
  client,
  dueText,
  amount,
  isLastItem = false,
}) => (
  <div className={`flex items-center justify-between cursor-pointer ${!isLastItem ? "border-b pb-4 mb-4" : ""}`}>
    <div className="flex items-center space-x-3">
      <div className="bg-gray-100 p-2 rounded-full">{icon}</div>
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-xs text-gray-500">Client: {client}</p>
        <p className={`text-sm mt-1 ${styles.active_proj_date_sm}`}>{dueText}</p>
      </div>
    </div>
    <div className="text-right">
      <p className={`text-sm font-medium ${styles.active_proj_date_lg}`}>{dueText}</p>
      <p className="text-xs text-gray-500">{amount}</p>
    </div>
  </div>
);

export const CanActiveProjects = () => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm ${styles.activeProjects}`}>
      <h2 className="text-base font-medium mb-4">Active Projects</h2>
      <div>
        <ProjectItem
          icon={<FaCode className="h-4 w-4 text-[#305718]" />}
          title="E-commerce Website Development"
          client="Tech Solutions Inc."
          dueText="Due in 5 days"
          amount="$4,500"
        />

        <ProjectItem
          icon={<FaPaintBrush className="h-4 w-4 text-[#305718]" />}
          title="Mobile App UI Design"
          client="Creative Studios"
          dueText="Due in 2 weeks"
          amount="$3,200"
        />

        <ProjectItem
          icon={<FaChartPie className="h-4 w-4 text-[#305718]" />}
          title="Marketing Strategy"
          client="Growth Corp"
          dueText="Due in 3 weeks"
          amount="$2,800"
          isLastItem={true}
        />
      </div>
    </div>
  );
};
