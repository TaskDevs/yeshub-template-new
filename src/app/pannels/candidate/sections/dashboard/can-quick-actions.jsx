import React from "react";
import { IoDocumentText, IoChatbubblesSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

//  Quick Action Item Component
const QuickActionItem = ({ icon: Icon, label, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) navigate(path);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-100 px-7 py-2 rounded flex flex-grow h-24 flex-col items-center justify-center text-center w-full cursor-pointer hover:bg-gray-200 transition"
    >
      <div className="bg-gray-100 p-2 rounded-full mb-1">
        <Icon className="h-5 w-5 text-[#305718]" />
      </div>
      <span className="text-xs">{label}</span>
    </div>
  );
};


export const CanQuickActions = ({ styles }) => {
  return (
    <div className={`bg-white flex items-start flex-col h-full p-4 rounded-lg shadow-sm ${styles}`}>
      <h2 className="text-start text-base font-medium mb-4">Quick Actions</h2>
      <div className="flex flex-col items-start w-full">
        <div className="flex flex-row gap-3 w-full -mt-5">
          <QuickActionItem icon={FaClock} label="Ratings" path="/ratings" />
          <QuickActionItem icon={IoDocumentText} label="Manage Finances" path="/dashboard-candidate/candidate-finance" />
        </div>
        <div className="flex flex-row gap-3 w-full pb-14">
          <QuickActionItem icon={IoIosSearch} label="Find Jobs" path="/dashboard-candidate/find-work" />
          <QuickActionItem icon={IoChatbubblesSharp} label="Messages" path="/messages" />
        </div>
      </div>
    </div>
  );
};

