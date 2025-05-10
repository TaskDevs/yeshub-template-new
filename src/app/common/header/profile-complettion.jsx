import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { NavLink } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProfileCompletionModal({
  completion,
  incompleteSections,
  isOpen,
  onClose,
}) {
  if (!isOpen) return null;

  const remaining = 100 - completion;

  const pieData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [completion, remaining],
        backgroundColor: ["#3b82f6", "#e5e7eb"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl text-gray-600 hover:text-black"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-1 text-gray-800">
          Profile Completion
        </h2>
        <p className="text-sm mb-4 text-gray-600">
          Complete your profile to get the best experience.{" "}
          <NavLink
            className="text-green-600 mx-2 hover:text-underline"
            to={"/dashboard-candidate/profile"}
               onClick={onClose}
          >
            Countinue
          </NavLink>
        </p>

        {/* Pie Chart */}
        <div className="w-40 mx-auto mb-6">
          <Pie data={pieData} />
          <p className="text-center mt-2 text-sm">{completion}% Complete</p>
        </div>

        {/* Stepper */}
        {incompleteSections?.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-3 text-gray-700">
              Incomplete Sections:
            </h3>
            <ol className="relative border-l border-gray-300 ml-3">
              {incompleteSections.map((section, index) => (
                <li className="mb-4 ml-4" key={index}>
                  <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-1.5 border border-white" />
                  <p className="text-sm text-gray-800">
                    {section.replace(/([A-Z])/g, " $1")}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
