import React, { useState } from "react";
import Swal from "sweetalert2";

export default function AddTaskFreelance({
  isOpen,
  onClose,
  onAddTask,
  assignedTo,
}) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTask = async () => {
    setLoading(true);
    try {
      const task = {
        title,
        details,
        status: "Fresh",
        assignedTo: assignedTo,
      };

      await onAddTask(task); // Calls parent function to save

      // Clear form and close modal
      setTitle("");
      setDetails("");
      onClose();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not add task. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOnClose = () => {
    setTitle("");
    setDetails("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={handleOnClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-4">Add New Task</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Task Details */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Task Details
          </label>
          <textarea
            rows={4}
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Describe the task..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={handleAddTask}
            disabled={loading}
            className={`bg-green-600 text-white px-4 py-2 rounded-md text-sm ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
            }`}
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
