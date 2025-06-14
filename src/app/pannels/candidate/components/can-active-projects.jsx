import React from "react";
import { useNavigate } from "react-router-dom";
//import { FaChartPie, FaCode, FaPaintBrush } from "react-icons/fa";
import styles from "../sections/dashboard/dashboard.module.css";

//  Project Item Component
const ProjectItem = ({
  id,
  project_name,
  project_category,
  start_date,
  end_date,
  team_no,
}) => {
  const navigate = useNavigate();
  return (
    <div className={`flex items-center justify-between cursor-pointer`}>
      <div className="flex items-center space-x-3">
        {/* <div className="bg-gray-100 p-2 rounded-full">{icon}</div> */}
        <div>
          <h3 className="text-sm font-medium">{project_name}</h3>
          <p className="text-xs text-gray-500">{project_category}</p>
          <p className={`text-sm mt-1 ${styles.active_proj_date_sm}`}>
            {`Posted on ${start_date} - ${end_date}`}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className={`text-sm font-medium ${styles.active_proj_date_lg}`}>
          No. Team
        </p>
        <p className="text-xs text-gray-500 mb-2">{team_no}</p>

        {/* View Button */}
        <button
          onClick={() => navigate(`manage-project/${id}`)}
          className="text-sm text-blue-600 hover:underline"
        >
          View
        </button>
      </div>
    </div>
  );
};

export const CanActiveProjects = ({ projectList }) => {
  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-sm ${styles.activeProjects}`}
    >
      <h2 className="text-base font-medium mb-4">Active Projects</h2>
      <div>
        {projectList?.map((item, idx) => (
          <ProjectItem
            key={idx}
            id={item.id}
            project_name={item.project_name}
            project_category={item.project_category}
            start_date={item.start_date}
            end_date={item.end_date}
            team_no={item.team.length}
          />
        ))}
      </div>
    </div>
  );
};
