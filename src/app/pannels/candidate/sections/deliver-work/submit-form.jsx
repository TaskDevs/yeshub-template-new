import { FaTrash } from "react-icons/fa";
import {
  FormInput,
  FormTextarea,
  TertiaryButton,
  FileUpload,
} from "../../../candidate/sections/new-profile/profile-components";
import { CustomDropdown } from "../../../../common/Dropdown";
import { useFileUpload } from "../../../candidate/sections/new-profile/hooks/useProfileForm";
import { useDeliverWorkForm } from "./hooks/useDeliverWorkForm";

export const SubmitWorkSection = () => {
  const { formData, handleInputChange, clearAll } = useDeliverWorkForm({
    projectTitle: "",
    deliverableType: "",
    description: "",
    file: "",
  });

  const {
    files: coverFiles,
    handleFileSelect: handleCoverSelect,
    handleFileDrop: handleCoverDrop,
    removeFile: removeCoverFile,
    uploadError: coverUploadError,
  } = useFileUpload();

  const deliverables = ["File", "Link", "PSD", "PDF"];

  const handleSave = () => {
    console.log("We are doing great");
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">
      <div className="space-y-6 w-full">
        <div className="space-y-4">
          <FormInput
            field="title"
            label="Project Title"
            required={true}
            value={formData.projectTitle}
            onChange={handleInputChange}
            placeholder="Website Redesign Project"
          />

          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Deliverable Types
            </label>
            <CustomDropdown
              selected={formData.deliverableType}
              styles="w-full py-2.5"
              options={deliverables}
              onChange={(value) => handleInputChange("deliverableType", value)}
            />
          </div>
          <div className="">
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
          <div className="space-y-2">
            <label className="block text-sm text-gray-700">File</label>
            <FileUpload
              isCoverImage={true}
              files={coverFiles}
              onFileSelect={handleCoverSelect}
              onFileDrop={handleCoverDrop}
              onFileRemove={removeCoverFile}
              error={coverUploadError}
            />
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t pb-5">
          <TertiaryButton onClick={clearAll} icon={<FaTrash size={14} />}>
            Clear All
          </TertiaryButton>

          <div className="flex items-center justify-start gap-3">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Submit Work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
