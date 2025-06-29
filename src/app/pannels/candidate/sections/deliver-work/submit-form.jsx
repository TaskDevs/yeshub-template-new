import React, { useContext, useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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
import { ProposalApiData } from "../../../../context/proposal/proposalContextApi";
import { TaskApiData } from "../../../../context/task/taskContextApi";
import Swal from "sweetalert2";
import { userId } from "../../../../../globals/constants";
//import withReactContent from "sweetalert2-react-content";

export const SubmitWorkSection = ({ id, milestones }) => {
  const { processSubmitWork } = useContext(TaskApiData);
  const [milestoneData, setMilestoneData] = useState([]);
  const { formData, handleInputChange, clearAll } = useDeliverWorkForm({
    projectTitle: "",
    deliverableType: "",
    milestone: "",
    description: "",
    file: "",
    projectLink: "",
  });

  useEffect(() => {
    console.log(milestones);
    //setMilestoneData([]);
    let newData = [];
    milestones?.map((item) => newData.push(item.name));
    setMilestoneData(newData);
  }, [milestones]);

  const {
    files: coverFiles,
    handleFileSelect: handleCoverSelect,
    handleFileDrop: handleCoverDrop,
    removeFile: removeCoverFile,
    uploadError: coverUploadError,
  } = useFileUpload();

  const navigate = useNavigate();

  const deliverables = ["File", "Link"];

  const handleSave = async () => {
    const form = new FormData();
    form.append("user_id", userId);
    form.append("project_id", id);
    form.append("title", formData.projectTitle);
    form.append("deliver_type", formData.deliverableType);
    form.append("milestone", formData.milestone);
    form.append("description", formData.description);
    form.append("work_file", coverFiles[0]?.file ?? null);
    // Make sure it's the actual File object
    form.append("link", formData.projectLink);

    console.log("FormData entries:");
    for (let pair of form.entries()) {
      console.log(pair[0] + ": ", pair[1]);
    }

    let result = await processSubmitWork(form);
    if (result) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Work submitted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate(`/dashboard-candidate/freelance-submissions/${id}`);
      }, 1500);
    } else {
      console.log("Error submitting proposal");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong, try again",
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">
      <div className="space-y-6 w-full">
        <div className="space-y-4">
          <FormInput
            field="projectTitle"
            label="Project Title"
            required={true}
            value={formData.projectTitle}
            onChange={handleInputChange}
            placeholder="Website Redesign Project"
          />

          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Milestones
            </label>
            <CustomDropdown
              selected={formData.milestone}
              styles="w-full py-2.5"
              options={milestoneData}
              onChange={(value) => handleInputChange("milestone", value)}
            />
          </div>

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

          {formData.deliverableType == "Link" && (
            <FormInput
              field="projectLink"
              label="Enter Link"
              value={formData.projectLink}
              onChange={handleInputChange}
              placeholder="https://yeshub.com"
            />
          )}

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

export const SubmitProposalSection = ({ job_id, companyInfo }) => {
  const { processSubmitProposal } = useContext(ProposalApiData);
  const { formData, setFormData, handleInputChange, clearAll } =
    useDeliverWorkForm({
      cover_letter: "",
      project_understanding: "",
      attachment: "",
      hourly_rate: "",
      fix_rate: "",
      start_date: "",
      completion: "Days",
      completion_day: "",
      week_available: "",
      experience_level: "Beginners",
    });

  const navigate = useNavigate();

  const { files, handleFileSelect, handleFileDrop, removeFile, uploadError } =
    useFileUpload();

  const completion_list = ["Days", "Weeks", "Month", "Year"];
  const experience_level_list = ["Beginners", "Intermediate", "Expert"];

  // Handle date changes
  const handleDateChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    //console.log(formData);
    const userId = sessionStorage.getItem("userId");
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("user_id", userId);
    formDataToSubmit.append("job_id", job_id);
    formDataToSubmit.append("cover_letter", formData.cover_letter);
    formDataToSubmit.append(
      "project_understanding",
      formData.project_understanding
    );
    formDataToSubmit.append("hourly_rate", formData.hourly_rate);
    formDataToSubmit.append("fix_rate", formData.fix_rate);
    formDataToSubmit.append("start_date", formData.start_date);
    formDataToSubmit.append("completion", formData.completion);
    formDataToSubmit.append("completion_day", formData.completion_day);
    formDataToSubmit.append("week_available", formData.week_available);
    formDataToSubmit.append("experience_level", formData.experience_level);
    if (files && files.length > 0 && files[0].file) {
      formDataToSubmit.append("attachment", files[0].file);
    } else {
      formDataToSubmit.append("attachment", ""); // Or omit this line if backend allows
    }

    for (let pair of formDataToSubmit.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    let response = await processSubmitProposal(formDataToSubmit);
    if (response) {
      console.log(response);
      if (response.status == "neutral") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You are already hired by client",
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Proposal has been submitted",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          navigate("/dashboard-candidate/candidate-offers");
        }, 1500);
      }
    } else {
      console.log("Error submitting proposal");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while saving your work!",
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">
      <div className="space-y-6 w-full">
        <div className="space-y-4">
          <div className="">
            <FormTextarea
              field="cover_letter"
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
              field="project_understanding"
              label="Project Understanding"
              required={true}
              value={formData.project_understanding}
              onChange={handleInputChange}
              placeholder="Describe your understanding of the project requirement and how you plan to approach it"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-gray-700">Attachment</label>
            <FileUpload
              files={files}
              onFileSelect={handleFileSelect}
              onFileDrop={handleFileDrop}
              onFileRemove={removeFile}
              error={uploadError}
            />
          </div>
          <div>
            <h2 className="text-xl font-bold capitalize">Pricing</h2>
          </div>
          <div className="bg-gray-100 w-full rounded-md p-10">
            <div className="flex w-full">
              <div className="w-full">
                <FormInput
                  field="hourly_rate"
                  label="Hourly Rate (GH)"
                  required={true}
                  value={formData.hourly_rate}
                  onChange={handleInputChange}
                  placeholder="Enter your rate"
                />
              </div>
              <span className="">Or</span>
              <div className="w-full">
                <FormInput
                  field="fix_rate"
                  label="Fixed Price (GH)"
                  required={true}
                  value={formData.fixed_rate}
                  onChange={handleInputChange}
                  placeholder="Enter fixed price"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold capitalize">
              Timeline & Availability
            </h2>
            <div className="flex justify-between w-full">
              <div className="pt-3 w-1/2">
                <DateInput
                  name="start_date"
                  label="When can you start?"
                  value={formData.start_date}
                  onChange={(name, value) => handleDateChange(name, value)}
                  required={true}
                />
              </div>
              <div className="flex">
                <FormInput
                  field="completion_day"
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
                field="week_available"
                label="Weekly availability"
                required={true}
                value={formData.week_available}
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
              <div className="mt-2">
                {companyInfo?.skills?.map((item, index) => (
                  <span
                    className="bg-gray-300 rounded-full px-2 py-1 text-sm text-gray-700 mr-2"
                    key={index}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* <span className="text-gray-500 mb-3 block">React</span>
              <span className="text-gray-500 mb-3 block">TypeScript</span>
              <span className="text-gray-500 mb-3 block">Redux</span>
              <span className="text-gray-500 mb-3 block">Node.js</span> */}
              <div className="w-full mt-4">
                <div className="mb-4">
                  <label className="block text-sm text-black font-bold mb-1">
                    Experience Level
                  </label>
                  <CustomDropdown
                    selected={formData.experience_level}
                    styles="w-full py-2.5"
                    options={experience_level_list}
                    onChange={(value) =>
                      handleInputChange("experience_level", value)
                    }
                  />
                </div>
              </div>
              {/* <div>
                <label className="block text-sm text-black font-bold mb-1">
                  Portfolio Items
                </label>
                <span className="text-green-600 cursor-pointer">
                  + Add portfolio items
                </span>
              </div> */}
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
