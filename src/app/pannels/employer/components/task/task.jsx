import React, { useState } from "react";
import { Tag } from "primereact/tag";
import { GoTrash } from "react-icons/go"; // or another trash icon you prefer
import { BiSolidEdit } from "react-icons/bi";
import styles from "./task.module.css";
import Milestones from "./milestones";

const Task = ({ item, action }) => {
  const [showMilestone, setShowMilestone] = useState(false);
  return (
    <>
      <div className="panel-body wt-panel-body p-a20 m-b30">
        <div className="flex flex-col p-4 bg-white rounded shadow cursor-pointer">
          <div className="flex items-start space-x-3 w-full">
            {/* Icon */}

            {/* Task Info */}
            <div className="flex flex-col w-1/3 items-start">
              <h3 className="text-sm font-medium">{item.title}</h3>
              <span className="text-sm text-gray-700">
                Assigned to{" "}
                <a className="text-blue-600 hover:underline text-sm mt-1">
                  {item.name}
                </a>
              </span>
              <p className={`text-sm mt-1 ${styles.active_post_date_sm}`}>
                Deadline: {item.deadline}
              </p>
              <p className="text-xs text-gray-500">{item.description}</p>

              <span
                className="text-blue-600 hover:underline text-sm mt-1"
                onClick={() => setShowMilestone((prev) => !prev)}
              >
                {showMilestone ? "Close Milestone" : " View Milestones"}
              </span>

              {/* Progress Section */}
            </div>

            <div className="flex flex-col w-1/3">
              <h3 className="text-sm font-medium mb-1">Progress</h3>
              <div className="w-full bg-gray-200 rounded h-2">
                <div
                  className="bg-green-500 h-2 rounded"
                  style={{ width: item.progress_rate }}
                ></div>
              </div>
              <div className="text-xs text-gray-600 mt-1 flex justify-between">
                <span>2/3</span>
              </div>
            </div>

            <div className="flex flex-col w-1/3">
              <h3 className="text-sm font-medium mb-1">Status</h3>

              <Tag severity={"secondary"} value={item.status} />
            </div>

            <div className="flex flex-col w-1/3">
              {/* Edit & Delete Icons */}
              <div className="flex items-center gap-2 ml-4">
                <button
                  className="text-green-600 hover:text-green-800"
                  title="Edit"
                  onClick={() => action(item)}
                >
                  <BiSolidEdit size={18} />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <GoTrash size={18} />
                </button>
              </div>
            </div>
          </div>
          {showMilestone && (
            <div className="flex items-start space-x-3 w-full">
              <Milestones data={item.milestone} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Task;
