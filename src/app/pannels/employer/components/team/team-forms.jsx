import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa6";
import {
  FormInput,
  FormTextarea,
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
} from "./team-components";
import { useTeamForm } from "./hooks/useTeamForm";
import { TeamApiData } from "../../../../context/team/teamContextApi";

/**
 * BusinessInfoSection
 */
export const AddTeam = ({ onClose }) => {
  const { processAddTeam } = useContext(TeamApiData);
  const { formData, handleInputChange, isSubmitting } = useTeamForm({
    team_name: "",
    description: "",
  });

  const handleSave = () => {
    console.log(`Your submited from data is ${formData}`);
    let newData = {
      team_name: formData.team_name,
      description: formData.description,
    };
    processAddTeam(newData);
    console.log("Saving business info:", newData);
    onClose();
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">
      <div className="space-y-6 w-full">
        <div className="space-y-4">
          <FormInput
            field="team_name"
            label="Team Name"
            required={true}
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter your task name"
          />

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

export const AddStaffToTeam = ({ onClose }) => {
  const { formData, handleInputChange, isSubmitting } = useTeamForm({
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
