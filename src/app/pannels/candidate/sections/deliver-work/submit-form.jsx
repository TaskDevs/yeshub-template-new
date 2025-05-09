import { FaTrash } from "react-icons/fa";
import {
  FormInput,
  FormTextarea,
  TertiaryButton,
  FileUpload,
  DateInput,
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

export const SubmitProposalSection = () => {
  const { formData, setFormData, handleInputChange, clearAll } =
    useDeliverWorkForm({
      coverLetter: "",
      projectUnderstanding: "",
      attachment: "",
      hourlyRate: "",
      fixRate: "",
      startDate: "",
      completion: "Days",
      completionDay: "",
      weekAvailable: "",
      experienceLevel: "Beginners",
    });

  const {
    files: attachment,
    handleFileSelect: handleAttachmentSelect,
    handleFileDrop: handleAttachmentDrop,
    removeFile: removeAttachmentFile,
    uploadError: attachmentUploadError,
  } = useFileUpload();

  const completion_list = ["Days", "Weeks", "Month", "Year"];
  const experience_level_list = ["Beginners", "Intermediate", "Expert"];

  // Handle date changes
  const handleDateChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("We are doing great");
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">
      <div className="space-y-6 w-full">
        <div className="space-y-4">
          <div className="">
            <FormTextarea
              field="coverLetter"
              label="Cover Letter"
              required={true}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Introduce yourself and explain why you are a good fit for this job"
              rows={4}
            />
          </div>
          <div className="">
            <FormTextarea
              field="projectUnderstanding"
              label="Project Understanding"
              required={true}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your understanding of the project requirement and how you plan to approach it"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-gray-700">Attachment</label>
            <FileUpload
              isAttachment={true}
              files={attachment}
              onFileSelect={handleAttachmentSelect}
              onFileDrop={handleAttachmentDrop}
              onFileRemove={removeAttachmentFile}
              error={attachmentUploadError}
            />
          </div>
          <div>
            <h2 className="text-xl font-bold capitalize">Pricing</h2>
          </div>
          <div className="bg-gray-100 w-full rounded-md p-10">
            <div className="flex w-full">
              <div className="w-full">
                <FormInput
                  field="hourlyRate"
                  label="Hourly Rate ($)"
                  required={true}
                  value={formData.hourlyRate}
                  onChange={handleInputChange}
                  placeholder="Enter your rate"
                />
              </div>
              <span className="">Or</span>
              <div className="w-full">
                <FormInput
                  field="fixedPrice"
                  label="Fixed Price ($)"
                  required={true}
                  value={formData.fixedPrice}
                  onChange={handleInputChange}
                  placeholder="Enter fixed price"
                />
              </div>
            </div>
            <hr className="border-0 h-px bg-gray-500 my-4" />
            <div className="flex justify-between w-full">
              <span className="text-gray-500">Service Fee(10%)</span>
              <span className="text-gray-800">$0.00</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-black font-bold">You Will Receive</span>
              <span className="text-gray-800">$0.00</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold capitalize">
              Timeline & Availability
            </h2>
            <div className="flex justify-between w-full">
              <div className="pt-3 w-1/2">
                <DateInput
                  name="startDate"
                  label="When can you start?"
                  value={formData.startDate}
                  onChange={(name, value) => handleDateChange(name, value)}
                  required={true}
                />
              </div>
              <div className="flex">
                <FormInput
                  field="completionDay"
                  label="Estimated Completion Time"
                  required={true}
                  value={formData.days}
                  onChange={handleInputChange}
                  placeholder="2"
                />
                <CustomDropdown
                  selected={formData.completion}
                  styles="w-full py-3 mt-2"
                  options={completion_list}
                  onChange={(value) => handleInputChange("completion", value)}
                />
              </div>
            </div>
            <div className="flex items-center w-1/2">
              <FormInput
                field="completionDay"
                label="Weekly availability"
                required={true}
                value={formData.weekAvailable}
                onChange={handleInputChange}
                placeholder="2"
              />
              <span className="text-gray-500 text-sm">hours per week</span>
            </div>
            <div>
              <h2 className="text-xl font-bold capitalize mb-2">
                Skills & Qualifications
              </h2>
            </div>
            <div className="bg-gray-100 w-full rounded-md p-10">
              <h3 className="text-black font-bold text-md mb-3">
                Relevant Skills
              </h3>
              <span className="text-gray-500 mb-3 block">React</span>
              <span className="text-gray-500 mb-3 block">TypeScript</span>
              <span className="text-gray-500 mb-3 block">Redux</span>
              <span className="text-gray-500 mb-3 block">Node.js</span>

              <div className="w-full">
                <div className="mb-4">
                  <label className="block text-sm text-black font-bold mb-1">
                    Experience Level
                  </label>
                  <CustomDropdown
                    selected={formData.experienceLevel}
                    styles="w-full py-2.5"
                    options={experience_level_list}
                    onChange={(value) =>
                      handleInputChange("experienceLevel", value)
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-black font-bold mb-1">
                  Portfolio Items
                </label>
                <span className="text-green-600 cursor-pointer">
                  + Add portfolio items
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t pb-5">
          <TertiaryButton onClick={clearAll}>Cancel</TertiaryButton>

          <div className="flex items-center justify-start gap-3">
            <button
              className="border text-gray-500 px-4 py-2 rounded"
              onClick={handleSave}
            >
              Preview
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Submit Proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
