import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { dates, jobStatus, jobTypes } from "../find-work/filter-data";
import CanSelectField from "../../components/can-select-field";
import CanCheckbox from "../../components/can-checkbox";
import CanSlider from "../../components/can-slider";

function MobileFilterDrawer({ isOpen, onClose, handleChange }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <div className="relative w-72 max-w-full bg-white shadow-lg h-full overflow-y-auto z-50 ml-auto p-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-lg font-semibold">Filter Jobs</h2>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-900"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="mt-6 space-y-6">
              <CanSelectField
                options={dates}
                label="Date Saved"
                onChange={handleChange("date")}
              />
              <CanCheckbox
                options={jobStatus}
                label="Job Status"
                onChange={handleChange("status")}
              />
              <CanCheckbox
                options={jobTypes.slice(1)}
                label="Job Types"
                onChange={handleChange("jobTypes")}
              />
              <CanSlider
                values={["0", "100k", "200k+"]}
                label="Salary"
                onChange={handleChange("salaryRange")}
              />
              <button
                onClick={onClose}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileFilterDrawer;
