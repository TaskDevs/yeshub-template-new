import { useState } from "react";

export default function AddMilestoneModal({
  isOpen,
  onClose,
  milestone,
  handleMilestoneChange,
  handleAddDeliverable,
  handleDeliverableChange,
  handleRemoveDeliverable,
  newMilestoneInfo,
  action,
}) {
  const [isEditingSalary, setIsEditingSalary] = useState(false);

  if (!isOpen) return null;

  const handleAddMilestone = () => {
    let newData = { ...milestone };
    newData.assignedTo = newMilestoneInfo.assignedTo;
    action(newData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white max-h-[90vh] overflow-y-auto w-full max-w-3xl p-6 rounded-xl shadow-lg relative mt-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Add Milestone
        </h2>

        <div className="relative border border-gray-300 bg-white rounded-xl p-4 mb-6">
          {/* Salary Section */}
          <div className="absolute right-4 top-4 text-sm text-right">
            {!isEditingSalary ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-semibold">
                  GHS {newMilestoneInfo.salary ?? "Not Set"}
                </span>
                <button
                  onClick={() => setIsEditingSalary(true)}
                  className="text-blue-500 hover:text-blue-700 text-xs"
                >
                  ✏️
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="number"
                  value={milestone.salary || ""}
                  onChange={(e) =>
                    handleMilestoneChange("salary", e.target.value)
                  }
                  className="border px-2 py-1 rounded-md w-24 text-sm"
                  placeholder="Salary"
                />
                <button
                  onClick={() => setIsEditingSalary(false)}
                  className="text-red-500 hover:text-red-700 text-xs"
                >
                  ✖
                </button>
              </div>
            )}
          </div>

          {/* Header */}
          <div className="mb-2">
            <span className="p-1 px-3 rounded-full bg-green-100 text-green-600 mr-2">
              1
            </span>
            <span className="font-semibold">
              {milestone?.name || "Untitled"}
            </span>
          </div>

          {/* Name & Due Date */}
          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="w-full mb-4 md:mb-0">
              <label className="text-sm text-gray-500">Milestone Name</label>
              <input
                type="text"
                value={milestone?.name}
                onChange={(e) => handleMilestoneChange("name", e.target.value)}
                className="w-full pl-3 pr-4 py-2 mt-2 border rounded-md"
              />
            </div>
            <div className="w-full">
              <label className="text-sm text-gray-500">Due Date</label>
              <input
                type="date"
                value={milestone?.due_date}
                onChange={(e) =>
                  handleMilestoneChange("due_date", e.target.value)
                }
                className="w-full pl-3 pr-4 py-2 mt-2 border rounded-md"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700">Description</label>
            <textarea
              value={milestone?.description}
              onChange={(e) =>
                handleMilestoneChange("description", e.target.value)
              }
              placeholder="Initial project setup, team onboarding and requirements gathering"
              rows="4"
              className="w-full mt-1 px-3 py-2 border rounded-md resize-none"
            />
          </div>

          {/* Assign Member */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700">Assign To</label>
            <p className="text-xs text-gray-400">
              {newMilestoneInfo.firstname}
            </p>
          </div>

          {/* Deliverables */}
          <h4 className="text-sm text-gray-500">Deliverables</h4>
          {milestone.deliverables?.map((item, dIndex) => (
            <div key={dIndex} className="flex space-x-2 items-center mb-2">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleDeliverableChange(dIndex, e.target.value)
                }
                className="w-full pl-2 pr-4 py-2 border rounded-xl"
              />
              <span
                className="cursor-pointer text-gray-400 font-bold text-lg"
                onClick={() => handleRemoveDeliverable(dIndex)}
              >
                ×
              </span>
            </div>
          ))}
          <span
            className="text-green-600 text-sm mt-4 mb-6 cursor-pointer block"
            onClick={() => handleAddDeliverable()}
          >
            + Add Deliverables
          </span>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-end mt-6 gap-2">
          <button
            onClick={handleAddMilestone}
            className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600"
          >
            Add
          </button>
          <button
            onClick={onClose}
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md text-sm hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
