import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa6";
import {
  FormInput,
  FormTextarea,
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  DateInput,
} from "./task-components";
import { CustomDropdown } from "../../../../common/Dropdown";
import { useTaskForm, useMilestoneForm } from "./hooks/useTaskForm";
import { TaskApiData } from "../../../../context/task/taskContextApi";

/**
 * BusinessInfoSection
 */
export const AddTask = ({ onClose }) => {
  const { processAddTask, taskProfile } = useContext(TaskApiData);
  const { formData, setFormData, handleInputChange, isSubmitting } =
    useTaskForm({
      title: taskProfile ? taskProfile.title : "",
      assign_to: taskProfile ? taskProfile.assign_to : "",
      start_date: taskProfile ? taskProfile.start_date : "",
      end_date: taskProfile ? taskProfile.end_date : "",
      description: taskProfile ? taskProfile.description : "",
    });

  const staff = ["Joshua Asiedu", "Louis Fobi", "Bernard Asante"];

  // Handle date changes
  const handleDateChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log(`Your submited from data is ${formData}`);
    let newData = {
      title: formData.title,
      assign_to: formData.assign_to,
      description: formData.description,
      start_date: formData.start_date,
      end_date: formData.end_date,
    };
    processAddTask(newData);
    console.log("Saving business info:", newData);
    onClose();
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">
      <div className="space-y-6 w-full">
        <div className="space-y-4">
          <FormInput
            field="title"
            label="Task Name"
            required={true}
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter your task name"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign To
            </label>
            <CustomDropdown
              selected={formData.assign_to}
              styles="w-full py-2.5"
              options={staff}
              onChange={(value) => handleInputChange("assign_to", value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <DateInput
              name="startDate"
              label="Start Date"
              value={formData.startDate}
              onChange={(name, value) => handleDateChange(name, value)}
              required={true}
            />

            <DateInput
              name="endDate"
              label="End Date"
              value={formData.endDate}
              onChange={(name, value) => handleDateChange(name, value)}
              disabled={!formData.startDate}
            />
          </div>

          <FormTextarea
            field="description"
            label="Description"
            required={true}
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe this division, department, or milestone's achievements and responsibilities"
            rows={4}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t pb-5">
          <TertiaryButton onClick={() => {}} icon={<FaTrash size={14} />}>
            Clear All
          </TertiaryButton>

          <div className="flex items-center justify-start gap-3">
            <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
            <PrimaryButton onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AddMilestone = ({ onClose }) => {
  const { formData, handleInputChange, isSubmitting } = useMilestoneForm({
    title: "",
    amount: "",
  });

  const handleSave = () => {
    console.log("We are doing great");
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">
      <div className="space-y-6 w-full">
        <div className="space-y-4">
          <FormInput
            field="title"
            label="Title"
            required={true}
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Add Milestone"
          />

          <FormInput
            field="amount"
            type="number"
            label="Amount"
            required={true}
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="Add Amount"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t pb-5">
          <TertiaryButton onClick={() => {}} icon={<FaTrash size={14} />}>
            Clear All
          </TertiaryButton>

          <div className="flex items-center justify-start gap-3">
            <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
            <PrimaryButton onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
