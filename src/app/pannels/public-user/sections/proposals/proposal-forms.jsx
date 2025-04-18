import React, { useState } from "react";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../../candidate/sections/new-profile/profile-components";
import { FaCheckCircle } from "react-icons/fa";

const statusOptions = [
  {
    label: "Pending",
    color: "bg-yellow-100",
    ring: "ring-yellow-400",
    text: "text-yellow-600",
  },
  {
    label: "Interview",
    color: "bg-blue-100",
    ring: "ring-blue-400",
    text: "text-blue-600",
  },
  {
    label: "Probation",
    color: "bg-purple-100",
    ring: "ring-purple-400",
    text: "text-purple-600",
  },
  {
    label: "Hired",
    color: "bg-green-100",
    ring: "ring-green-400",
    text: "text-green-600",
  },
  {
    label: "Failed",
    color: "bg-red-100",
    ring: "ring-red-400",
    text: "text-red-600",
  },
];

export const StatusUpdateForm = ({
  onClose,
  onSave,
  initialStatus = "Pending",
}) => {
  const [status, setStatus] = useState(initialStatus);

  const handleSave = () => {
    onSave(status);
    onClose();
  };

  return (
    <div className="p-6 w-full max-w-md mx-auto space-y-6">
      <h2 className="text-base text-gray-600">
        Update Status of applicant application this will be seen by applicant
      </h2>

      <div className="grid grid-cols-1 gap-3">
        {statusOptions.map((option) => {
          const isSelected = status === option.label;

          return (
            <label
              key={option.label}
              className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer border transition-all
                ${
                  isSelected
                    ? `border-2 ${option.ring} ${option.color}`
                    : "border-gray-200 hover:border-gray-400"
                }
              `}
            >
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="status"
                  value={option.label}
                  checked={isSelected}
                  onChange={() => setStatus(option.label)}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                />
                <span className={`text-base font-medium ${option.text}`}>
                  {option.label}
                </span>
              </div>

              {isSelected && (
                <FaCheckCircle className={`text-xl ${option.text}`} />
              )}
            </label>
          );
        })}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
        <PrimaryButton onClick={handleSave}>Save Status</PrimaryButton>
      </div>
    </div>
  );
};

export const ShowMilestoneOrRequestInfo = ({ statusInfo }) => {
  return (
    <div className="p-6 w-full max-w-md mx-auto space-y-6">
      <h2 className="text-base text-gray-600">
        {statusInfo.status == "milestone"
          ? "Milestone Breakdown for This Application"
          : "Request made by applicant"}
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {statusInfo.status == "milestone" ? (
          statusInfo.data.map((milestone) => (
            <div
              key={milestone.id}
              className="border border-purple-200 rounded-xl p-4 bg-purple-50 hover:bg-purple-100 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-800 font-semibold">
                    {milestone.title}
                  </p>
                  <p className="text-xs text-purple-600 mt-1">
                    Stage #{milestone.id}
                  </p>
                </div>
                <div className="text-right text-sm text-purple-700 font-medium">
                  ${milestone.amount}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="border border-purple-200 rounded-xl p-4 bg-purple-50 ">
            {statusInfo.data[0].requirement}
          </div>
        )}
      </div>
    </div>
  );
};
