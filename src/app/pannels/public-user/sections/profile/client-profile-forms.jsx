import React, { useState, useEffect, useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import Compressor from "compressorjs";
import Swal from "sweetalert2";
import {
  FormInput,
  FormTextarea,
  SkillItem,
  SelectedSkill,
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  FileUpload,
  DateInput,
} from "../../../candidate/sections/new-profile/profile-components";
import { SearchInput } from "../../../../common/search-box";
import { CustomDropdown } from "../../../../common/Dropdown";
import {
  useFileUpload,
  useProfileForm,
  useSkillsForm,
} from "../../../candidate/sections/new-profile/hooks/useProfileForm";
import {
  availableServicesData,
  serviceCategories,
} from "../../../candidate/sections/new-profile/data";
import { clientProfileData } from "./data";
import { countryData } from "../../../../../utils/countryData";
import { EmployerApiData } from "../../../../context/employers/employerContextApi";

/**
 * CompanyOverviewSection
 */
export const CompanyOverviewFormSection = ({ onClose, initialData = {} }) => {
  const { processAddExperience, employerProfiles } =
    useContext(EmployerApiData);
  const { formData, setFormData, handleInputChange, isSubmitting, clearAll } =
    useProfileForm({
      title: initialData.title || "",
      organization: initialData.organization || "",
      startDate: initialData.startDate || "",
      endDate: initialData.endDate || "",
      employmentType: initialData.employmentType || "Full-time",
      revenue: initialData.revenue || "",
      description: initialData.description || "",
    });

  //processAddExperience;

  // Employment types
  const employmentTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Seasonal",
  ];

  // Handle date changes
  const handleDateChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save changes
  const handleSave = () => {
    let newExperience = {
      company_id: employerProfiles.id,
      title: formData.title,
      organization: formData.organization,
      employmentType: formData.employmentType,
      revenue: formData.revenue,
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: formData.description,
    };
    processAddExperience(newExperience);
    console.log("Saving company experience data:", formData);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">
      <div className="space-y-6 w-full">
        <div className="space-y-4 -mt-2">
          <p className="text-gray-600">
            Add details about your company&apos;s division, department, or major
            milestone
          </p>

          <div className="space-y-4 mt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                field="title"
                label="Title/Division Name"
                required={true}
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Enterprise Solutions Division"
              />

              <FormInput
                field="organization"
                label="Organization"
                required={true}
                value={formData.organization}
                onChange={handleInputChange}
                placeholder="e.g. Your Company Name"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employment Type
                </label>
                <CustomDropdown
                  selected={formData.employmentType}
                  styles="w-full py-2.5"
                  options={employmentTypes}
                  onChange={(value) =>
                    handleInputChange("employmentType", value)
                  }
                />
              </div>

              <FormInput
                field="revenue"
                label="Revenue (if applicable)"
                value={formData.revenue}
                onChange={handleInputChange}
                placeholder="e.g. $5M+ annually"
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
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t pb-5">
          <TertiaryButton onClick={clearAll} icon={<FaTrash size={14} />}>
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

/**
 * ServicesSection
 */
export const ServicesFormSection = ({ onClose }) => {
  const { processUpdateEmployer, employerProfiles } =
    useContext(EmployerApiData);
  const {
    searchValue,
    setSearchValue,
    selectedCategory,
    categories,
    selectedSkills: selectedServices,
    availableSkills: availableServices,
    addSkill: addService,
    removeSkill: removeService,
    clearAllSkills: clearAllServices,
    handleCategoryChange,
  } = useSkillsForm(
    [
      { name: "Digital Transformation", category: "Digital" },
      { name: "Cloud Solutions", category: "IT Services" },
      { name: "IT Consulting", category: "IT Services" },
    ],
    serviceCategories,
    availableServicesData
  );

  const handleSave = () => {
    let fullString = "";
    selectedServices.length > 0 &&
      selectedServices.map((item) => {
        let data = `name:${item.name}, category: ${item.category} ||`;
        fullString += data;
      });

    let newData = {
      status: "service",
      services: fullString,
    };

    processUpdateEmployer(employerProfiles.id, newData);

    console.log("Saving services:", fullString);
    onClose();
  };

  const handleSearch = (value) => {
    console.log("Searching for:", value);
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full justify-start">
      <p className="flex items-start w-full justify-start text-start text-gray-600 mb-3">
        Select and manage your company services
      </p>

      {/* Search and filter */}
      <div className="flex gap-4 mb-6 w-full">
        <SearchInput
          className="w-full flex-1"
          value={searchValue}
          onChange={setSearchValue}
          onSearch={handleSearch}
          placeholder="Search services..."
          leftIcon={<IoSearch size={18} />}
          rightIcon={null}
        />

        <CustomDropdown
          styles="py-3 w-full min-w-32"
          options={categories}
          selected={selectedCategory}
          onChange={handleCategoryChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6 w-full">
        {/* Available Services */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Available Services</h3>
          <div className="border rounded-md bg-white h-64 overflow-y-scroll">
            {availableServices?.length > 0 ? (
              availableServices?.map((service) => (
                <SkillItem
                  key={service.name}
                  skill={service}
                  onSelect={() => addService(service)}
                />
              ))
            ) : (
              <p className="p-4 text-gray-500 text-center">
                No services found for the selected filters
              </p>
            )}
          </div>
        </div>

        {/* Selected Services */}
        <div>
          <div className="flex justify-between items-center mb-2 ">
            <h3 className="font-semibold text-lg">Selected Services</h3>
          </div>

          <div className="border rounded-md p-4 min-h-[170px]">
            {selectedServices.length > 0 ? (
              <div className="flex flex-wrap justify-start gap-2">
                {selectedServices.map((service) => (
                  <SelectedSkill
                    key={service.name}
                    skill={service}
                    onRemove={removeService}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                No services selected yet
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between w-full pt-4 gap-3 pb-5">
        <TertiaryButton onClick={clearAllServices} icon={<FaTrash size={14} />}>
          Clear All
        </TertiaryButton>

        <div className="flex items-center justify-start gap-3">
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleSave}>Save Changes</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

/**
 * OfficesSection
 */
export const OfficesFormSection = ({ onClose }) => {
  const { employerProfiles, processUpdateOfficeImage } =
    useContext(EmployerApiData);
  const {
    files,
    // uploading,
    uploadError,
    handleFileSelect,
    handleFileDrop,
    removeFile,
    clearFiles,
  } = useFileUpload(10); // 10MB max file size

  const handleSave = async () => {
    if (!files || files.length === 0) return;

    const getCompressedBase64 = (file) => {
      return new Promise((resolve, reject) => {
        new Compressor(file.file, {
          quality: 0.6,
          success: (compressedResult) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result); // base64 string
            reader.onerror = reject;
            reader.readAsDataURL(compressedResult);
          },
          error(err) {
            reject(err);
          },
        });
      });
    };

    try {
      // Compress all images and get base64 strings
      const compressedImages = await Promise.all(
        files.map((file) => getCompressedBase64(file))
      );

      const newData = {
        company_id: employerProfiles.id,
        images: compressedImages.join("||"), // Join into a single string
      };

      processUpdateOfficeImage(employerProfiles.id, newData);

      console.log("Saving office data:", newData);

      // TODO: send `newData` to backend here...

      onClose();
    } catch (error) {
      console.error("Error compressing or processing images:", error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">
      <div className="space-y-6 w-full">
        {/* Office Images */}
        <FileUpload
          files={files}
          onFileSelect={handleFileSelect}
          onFileDrop={handleFileDrop}
          onFileRemove={removeFile}
          error={uploadError}
        />

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t pb-5">
          <TertiaryButton onClick={clearFiles} icon={<FaTrash size={14} />}>
            Clear All
          </TertiaryButton>

          <div className="flex items-center justify-start gap-3">
            <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
            <PrimaryButton onClick={handleSave}>Save Changes</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * BusinessInfoSection
 */
export const BusinessInfoFormSection = ({ onClose }) => {
  const { processUpdateEmployer, employerProfiles } =
    useContext(EmployerApiData);
  const { formData, handleInputChange, isSubmitting } = useProfileForm({
    companyName: employerProfiles ? employerProfiles.companyName : "",
    headline: employerProfiles ? employerProfiles.headline : "",
    email: employerProfiles ? employerProfiles.email : "",
    phone: employerProfiles ? employerProfiles.contact.phone : "",
    website: employerProfiles ? employerProfiles.contact.website : "",
    linkedin: employerProfiles ? employerProfiles.contact.linkedin : "",
    timezone: employerProfiles ? employerProfiles.timezone : "",
  });

  const timezones = [
    "GMT+0",
    "GMT+1",
    "GMT+2",
    "GMT+3",
    "GMT-1",
    "GMT-2",
    "GMT-3",
  ];

  const handleSave = () => {
    console.log(`Your submited from data is ${formData}`);
    formData.company_name = employerProfiles.companyName;
    let newData = {
      status: "businessInfo",
      company_name: formData.companyName,
      headline: formData.headline,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      linkedin: formData.linkedIn,
      timezone: formData.timezone,
    };
    processUpdateEmployer(employerProfiles.id, newData);
    console.log("Saving business info:", newData);
    onClose();
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">
      <div className="space-y-6 w-full">
        <div className="space-y-4">
          <FormInput
            field="companyName"
            label="Company Name"
            required={true}
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="Enter your company name"
          />

          <FormInput
            field="headline"
            label="Headline"
            required={true}
            value={formData.headline}
            onChange={handleInputChange}
            placeholder="Brief headline describing your business"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              field="email"
              label="Business Email"
              required={true}
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter business email"
            />

            <FormInput
              field="phone"
              label="Business Phone"
              required={true}
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter business phone"
            />
          </div>

          <FormInput
            field="website"
            label="Website"
            value={formData.website}
            onChange={handleInputChange}
            placeholder="Enter company website URL"
          />

          <FormInput
            field="linkedin"
            label="LinkedIn Profile"
            value={formData.linkedin}
            onChange={handleInputChange}
            placeholder="Enter LinkedIn profile URL"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Zone
            </label>
            <CustomDropdown
              selected={formData.timezone}
              styles="w-full py-2.5"
              options={timezones}
              onChange={(value) => handleInputChange("timezone", value)}
            />
          </div>
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

/**
 * CompanyStatsSection
 */
export const CompanyStatsFormSection = ({ onClose }) => {
  const { processUpdateEmployer, employerProfiles } =
    useContext(EmployerApiData);
  const { formData, handleInputChange, isSubmitting } = useProfileForm({
    foundedYear: employerProfiles ? employerProfiles.foundedYear : "",
    employeesCount: employerProfiles ? employerProfiles.employeesCount : "",
    clientsCount: employerProfiles ? employerProfiles.clientsCount : "",
    annualRevenue: employerProfiles ? employerProfiles.annualRevenue : "",
    completedProjects: employerProfiles
      ? employerProfiles.completedProjects
      : "",
    industryExperience: employerProfiles
      ? employerProfiles.industryExperience
      : "",
  });

  const handleSave = () => {
    let newData = {
      status: "stats",
      est_date: formData.foundedYear,
      employeesCount: formData.employeesCount,
      clientsCount: formData.clientsCount,
      annualRevenue: formData.annualRevenue,
      completedProjects: formData.completedProjects,
      industryExperience: formData.industryExperience,
    };
    processUpdateEmployer(employerProfiles.id, newData);
    console.log("Saving company stats:", newData);
    onClose();
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">
      <div className="space-y-6 w-full">
        <p className="flex items-start w-full justify-start text-start text-gray-600 mb-3">
          Add important statistics about your company
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              field="foundedYear"
              label="Year Founded"
              required={true}
              value={formData.foundedYear}
              onChange={handleInputChange}
              placeholder="e.g. 2013"
            />

            <FormInput
              field="employeesCount"
              label="Number of Employees"
              required={true}
              value={formData.employeesCount}
              onChange={handleInputChange}
              placeholder="e.g. 150+"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              field="clientsCount"
              label="Number of Clients"
              value={formData.clientsCount}
              onChange={handleInputChange}
              placeholder="e.g. 200+"
            />

            <FormInput
              field="annualRevenue"
              label="Annual Revenue"
              value={formData.annualRevenue}
              onChange={handleInputChange}
              placeholder="e.g. $5M+"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              field="completedProjects"
              label="Completed Projects"
              value={formData.completedProjects}
              onChange={handleInputChange}
              placeholder="e.g. 500+"
            />

            <FormInput
              field="industryExperience"
              label="Industry Experience"
              value={formData.industryExperience}
              onChange={handleInputChange}
              placeholder="e.g. 10+ years"
            />
          </div>
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

/**
 * CertificationsSection
 */
export const CertificationsFormSection = ({ onClose }) => {
  const { processAddCertification, employerProfiles } =
    useContext(EmployerApiData);

  const { formData, handleInputChange, handleDateChange, isSubmitting } =
    useProfileForm({
      certificationName: "",
      issuingOrganization: "",
      credentialID: "",
      issueDate: "",
      expiryDate: "",
      description: "",
      hasExpiry: true,
      credentialUrl: "",
    });

  //processAddCertification

  // State for managing certifications list
  const [certifications, setCertifications] = useState(
    clientProfileData.certifications
  );

  const handleSave = () => {
    let newCertification;
    if (formData.certificationName && formData.issuingOrganization) {
      newCertification = {
        company_id: employerProfiles.id,
        title: formData.certificationName,
        organization: formData.issuingOrganization,
        startDate: formData.issueDate,
        endDate: formData.hasExpiry ? formData.expiryDate : "No Expiration",
        credentialUrl: formData.credentialUrl,
        credentialID: formData.credentialID,
        description: formData.description,
      };

      processAddCertification(newCertification);

      setCertifications([...certifications, newCertification]);
    }

    console.log("Saving certifications:", certifications);
    onClose();
  };

  const removeCertification = (index) => {
    const updated = [...certifications];
    updated.splice(index, 1);
    setCertifications(updated);
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">
      <div className="space-y-6 w-full">
        {/* Add New Certification */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              field="certificationName"
              label="Certification Name"
              required={true}
              value={formData.certificationName}
              onChange={handleInputChange}
              placeholder="e.g. AWS Certified Solutions Architect"
            />

            <FormInput
              field="issuingOrganization"
              label="Issuing Organization"
              required={true}
              value={formData.issuingOrganization}
              onChange={handleInputChange}
              placeholder="e.g. Amazon Web Services"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              field="credentialID"
              label="Credential ID"
              value={formData.credentialID}
              onChange={handleInputChange}
              placeholder="Enter credential ID if available"
            />

            <FormInput
              field="credentialUrl"
              label="Credential URL"
              value={formData.credentialUrl}
              onChange={handleInputChange}
              placeholder="Enter verification URL if available"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <DateInput
              name="issueDate"
              label="Issue Date"
              value={formData.issueDate}
              onChange={handleDateChange}
              required={true}
            />

            <DateInput
              name="expiryDate"
              label="Expiry Date"
              value={formData.expiryDate}
              onChange={handleDateChange}
              disabled={!formData.hasExpiry}
            />
          </div>

          <div className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              id="hasExpiry"
              checked={formData.hasExpiry}
              onChange={() =>
                handleInputChange("hasExpiry", !formData.hasExpiry)
              }
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="hasExpiry" className="text-sm text-gray-700">
              This certification expires
            </label>
          </div>

          <FormTextarea
            field="description"
            label="Description (Optional)"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Briefly describe what this certification represents"
            rows={3}
          />
        </div>

        {/* Existing Certifications */}
        <div className="pt-4 border-t">
          <h3 className="font-semibold text-lg mb-4">Your Certifications</h3>

          {certifications.length > 0 ? (
            <div className="border rounded-md">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-2">Certification</th>
                    <th className="text-left px-4 py-2">Organization</th>
                    <th className="text-left px-4 py-2">Validity</th>
                    <th className="text-right px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {certifications.map((cert, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{cert.title}</td>
                      <td className="px-4 py-2">{cert.organization}</td>
                      <td className="px-4 py-2">{`${cert.startDate} - ${cert.endDate}`}</td>
                      <td className="px-4 py-2 text-right">
                        <button
                          onClick={() => removeCertification(index)}
                          className="text-red-500"
                        >
                          <FaTrash size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center p-4 border rounded-md">
              No certifications added yet
            </p>
          )}
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

/**
 * PostAJobSection
 */
export const PostJobFormSection = ({ onClose, isEdit, itemsToEdit }) => {
  const { processAddJobPost, processUpdateJob, employerProfiles } =
    useContext(EmployerApiData);

  const [formData, setFormData] = useState({
    title: isEdit ? itemsToEdit.title : "",
    skills: isEdit ? itemsToEdit.skills : "",
    category: isEdit ? itemsToEdit.category : "",
    scope: isEdit ? itemsToEdit.scope : "Small",
    job_type: isEdit ? itemsToEdit.job_type : "All",
    experience: isEdit ? itemsToEdit.experience : "All",
    fixedRateSelected: isEdit ? (itemsToEdit.fixed_rate ? false : true) : true,
    fixed_rate: isEdit
      ? itemsToEdit.fixed_rate
        ? itemsToEdit.fixed_rate
        : ""
      : "",
    hourly_rate_start: isEdit
      ? itemsToEdit.hourly_rate_start
        ? itemsToEdit.hourly_rate_start
        : ""
      : "",
    hourly_rate_end: isEdit
      ? itemsToEdit.hourly_rate_end
        ? itemsToEdit.hourly_rate_end
        : ""
      : "",
    end_date: isEdit ? itemsToEdit.end_date : "",
    description: isEdit ? itemsToEdit.description : "",
  });

  const scopes = ["Small", "Medium", "Large"];
  const job_type = ["All", "Full-Time", "Part-Time", "Contract"];
  const experience = ["All", "Beginners", "Intermediate", "Experience"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const data = {
      title: formData.title,
      skills: formData.skills,
      category: formData.category,
      scope: formData.scope,
      job_type: formData.job_type.toLowerCase(),
      experience: formData.experience.toLowerCase(),
      fixed_rate: formData.fixedRateSelected ? formData.fixed_rate : null,
      hourly_rate_start: formData.hourly_rate_start
        ? formData.hourly_rate_start
        : null,
      hourly_rate_end: formData.hourly_rate_end
        ? formData.hourly_rate_end
        : null,
      description: formData.description,
      company_id: employerProfiles.id,
      end_date: formData.end_date,
      status: "active",
    };
    let response = isEdit
      ? processUpdateJob(itemsToEdit.id, data)
      : processAddJobPost(data);

    if (response) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Job posted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Failed to post a job",
      });
    }
    //console.log("Posting job:", data);
    onClose();
  };

  const clearAll = () => {
    setFormData({
      title: "",
      skills: "",
      category: "",
      scope: "Small",
      job_type: "All",
      experience: "All",
      fixedRateSelected: true,
      fixed_rate: "",
      hourly_rate_start: "",
      hourly_rate_end: "",
      description: "",
      end_date: "",
    });
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">
      <div className="space-y-6 w-full">
        <p className="text-gray-600">
          {isEdit
            ? "Edit your job to attract more candidates"
            : "Fill in the details to post a new job opportunity"}
          :
        </p>

        <div className="space-y-4 mt-3">
          <FormInput
            field="title"
            label="Job Title"
            required={true}
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g. Frontend Developer"
          />

          <FormInput
            field="skills"
            label="Skills Required"
            required={true}
            value={formData.skills}
            onChange={handleInputChange}
            placeholder="e.g. React, JavaScript"
          />

          <FormInput
            field="category"
            label="Category"
            required={true}
            value={formData.category}
            onChange={handleInputChange}
            placeholder="e.g. Development"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Scope
            </label>
            <CustomDropdown
              selected={formData.scope}
              styles="w-full py-2.5"
              options={scopes}
              onChange={(value) => handleInputChange("scope", value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Type
            </label>
            <CustomDropdown
              selected={formData.job_type}
              styles="w-full py-2.5"
              options={job_type}
              onChange={(value) => handleInputChange("job_type", value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience
            </label>
            <CustomDropdown
              selected={formData.experience}
              styles="w-full py-2.5"
              options={experience}
              onChange={(value) => handleInputChange("experience", value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Type
            </label>
            <div className="flex items-center gap-4">
              <button
                className={`py-2 px-4 rounded-md border text-sm font-medium ${
                  formData.fixedRateSelected
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
                onClick={() => handleInputChange("fixedRateSelected", true)}
              >
                Fixed Rate
              </button>
              <button
                className={`py-2 px-4 rounded-md border text-sm font-medium ${
                  !formData.fixedRateSelected
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
                onClick={() => handleInputChange("fixedRateSelected", false)}
              >
                Hourly Rate
              </button>
            </div>
          </div>

          {formData.fixedRateSelected ? (
            <FormInput
              field="fixed_rate"
              label="Fixed Rate"
              value={formData.fixed_rate}
              onChange={handleInputChange}
              placeholder="e.g. GH500"
            />
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                field="hourly_rate_start"
                label="Hourly Rate Start"
                value={formData.hourlyRateStart}
                onChange={handleInputChange}
                placeholder="e.g. GH25"
              />
              <FormInput
                field="hourly_rate_end"
                label="Hourly Rate End"
                value={formData.hourlyRateEnd}
                onChange={handleInputChange}
                placeholder="e.g. GH50"
              />
            </div>
          )}

          <FormInput
            field="end_date"
            label="Application End Date"
            required={true}
            type="date"
            value={formData.end_date}
            onChange={handleInputChange}
          />

          <FormTextarea
            field="description"
            label="Job Description"
            required={true}
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe the responsibilities, expectations, and other relevant job details"
            rows={5}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t pb-5">
          <TertiaryButton onClick={clearAll} icon={<FaTrash size={14} />}>
            Clear All
          </TertiaryButton>

          <div className="flex items-center justify-start gap-3">
            <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
            <PrimaryButton onClick={handleSave}>
              {isEdit ? "Update Job" : "Post Job"}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * AboutMeFormSection
 */
export const AboutMeFormSection = ({ onClose }) => {
  const { employerProfiles, processUpdateEmployer } =
    useContext(EmployerApiData);
  const { formData, setFormData, handleInputChange, isSubmitting, clearAll } =
    useProfileForm({
      companyName: employerProfiles.companyName || "",
      headline: employerProfiles.headline || "",
      city: employerProfiles.city || "",
      region: employerProfiles.region || "",
      country: employerProfiles.country || "",
      timezone: employerProfiles.timezone || "",
      email: employerProfiles.email || "",
      about: employerProfiles.about || "",
    });

  // Countries
  const countries = [
    "Ghana",
    "Nigeria",
    "Kenya",
    "South Africa",
    "Ivory Coast",
  ];

  // Timezones
  const timezones = ["GMT-12", "GMT-11", "GMT+10", "GMT+11", "GMT+12"];

  // Cities for selected region
  const [availableCities, setAvailableCities] = useState(
    countryData[formData.region] || []
  );

  // For file handling
  const {
    files: logoFiles,
    handleFileSelect: handleLogoSelect,
    handleFileDrop: handleLogoDrop,
    removeFile: removeLogoFile,
    uploadError: logoUploadError,
  } = useFileUpload();

  const {
    files: coverFiles,
    handleFileSelect: handleCoverSelect,
    handleFileDrop: handleCoverDrop,
    removeFile: removeCoverFile,
    uploadError: coverUploadError,
  } = useFileUpload();

  // Update cities when region changes
  useEffect(() => {
    setAvailableCities(countryData[formData.region] || []);
    // If current city is not in the new region, set to first city
    if (!countryData[formData.region]?.includes(formData.city)) {
      setFormData((prev) => ({
        ...prev,
        city: countryData[formData.region]?.[0] || "",
      }));
    }
  }, [formData.region]);

  // Save changes
  const handleSave = () => {
    // Async handling
    const processAndSubmit = async () => {
      console.log(formData);

      const form = new FormData();
      form.append("status", "info");
      form.append("company_name", formData.companyName);
      form.append("headline", formData.headline);
      form.append("city", formData.city);
      form.append("region", formData.region);
      form.append("country", formData.country);
      form.append("timezone", formData.timezone);
      form.append("email", formData.email);
      form.append("description", formData.about);
      form.append("logo", logoFiles[0]?.file ?? null);
      form.append("coverImage", coverFiles[0]?.file ?? null);

      // const payload = {
      //   status: "info",
      //   company_name: formData.companyName,
      //   headline: formData.headline,
      //   city: formData.city,
      //   region: formData.region,
      //   country: formData.country,
      //   timezone: formData.timezone,
      //   email: formData.email,
      //   description: formData.about,
      //   logo: logoFiles[0]?.file ?? null,
      //   coverImage: coverFiles[0]?.file ?? null,
      // };

      try {
        console.log(employerProfiles.id);
        processUpdateEmployer(employerProfiles.id, form);

        //console.log("Saving company profile data:", formData);

        setTimeout(() => {
          onClose();
        }, 800);
      } catch (error) {
        console.error("Error compressing images:", error);
      }
    };

    processAndSubmit(); // Call async function
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">
      <div className="space-y-6 w-full">
        {/* Company Info Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              field="companyName"
              label="Company Name"
              required={true}
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Your company name"
            />

            <FormInput
              field="headline"
              label="Headline"
              required={true}
              value={formData.headline}
              onChange={handleInputChange}
              placeholder="e.g. Digital Transformation & IT Services"
            />
          </div>

          <FormTextarea
            field="about"
            label="About"
            required={true}
            value={formData.about}
            onChange={handleInputChange}
            placeholder="Tell us about your company, services and expertise"
            rows={4}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <CustomDropdown
                selected={formData.country}
                styles="w-full py-2.5"
                options={countries}
                onChange={(value) => handleInputChange("country", value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Region
              </label>
              <CustomDropdown
                selected={formData.region}
                styles="w-full py-2.5"
                options={Object.keys(countryData)}
                onChange={(value) => handleInputChange("region", value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <CustomDropdown
                selected={formData.city}
                styles="w-full py-2.5"
                options={availableCities}
                onChange={(value) => handleInputChange("city", value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timezone
              </label>
              <CustomDropdown
                selected={formData.timezone}
                styles="w-full py-2.5"
                options={timezones}
                onChange={(value) => handleInputChange("timezone", value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              field="email"
              label="Email"
              type="email"
              required={true}
              value={formData.email}
              onChange={handleInputChange}
              placeholder="company@example.com"
            />
          </div>
        </div>

        {/* Company Media Section */}
        <div className="space-y-5 pt-4 border-t">
          <div className="space-y-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Company Logo
            </label>
            <p className="text-gray-500 text-sm">
              Upload your company logo (recommended size: 800x400px)
            </p>

            <FileUpload
              files={logoFiles}
              onFileSelect={handleLogoSelect}
              onFileDrop={handleLogoDrop}
              onFileRemove={removeLogoFile}
              error={logoUploadError}
            />
          </div>

          {/* Cover Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Cover Image
            </label>
            <p className="text-gray-500 text-sm">
              Upload your company cover image (recommended size: 800x400px)
            </p>

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

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t pb-5">
          <TertiaryButton onClick={clearAll} icon={<FaTrash size={14} />}>
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

/**
 * CompanyOverviewSection
 * Handles multiple experience additional
 * Has the delete functionality as well
 */
// export const CompanyOverviewFormSection = ({ onClose, initialData = {} }) => {
//    const {
//       formData,
//       setFormData,
//       handleInputChange,
//       handleDateChange,
//       isSubmitting,
//       clearAll
//    } = useProfileForm({
//       experiences: initialData.experience || [
//          {
//             title: "",
//             organization: "",
//             startDate: "",
//             endDate: "",
//             employmentType: "Full-time",
//             revenue: "",
//             description: ""
//          }
//       ]
//    });

//    // Employment types
//    const employmentTypes = [
//       'Full-time',
//       'Part-time',
//       'Contract',
//       'Freelance',
//       'Seasonal'
//    ];

//    // Add a new experience entry
//    const addExperience = () => {
//       setFormData(prev => ({
//          ...prev,
//          experiences: [
//             ...prev.experiences,
//             {
//                title: "",
//                organization: "",
//                startDate: "",
//                endDate: "",
//                employmentType: "Full-time",
//                revenue: "",
//                description: ""
//             }
//          ]
//       }));
//    };

//    // Remove an experience entry
//    const removeExperience = (index) => {
//       setFormData(prev => {
//          const updatedExperiences = [...prev.experiences];
//          updatedExperiences.splice(index, 1);
//          return {
//             ...prev,
//             experiences: updatedExperiences
//          };
//       });
//    };

//    // Update a specific experience field
//    const updateExperienceField = (index, field, value) => {
//       setFormData(prev => {
//          const updatedExperiences = [...prev.experiences];
//          updatedExperiences[index] = {
//             ...updatedExperiences[index],
//             [field]: value
//          };
//          return {
//             ...prev,
//             experiences: updatedExperiences
//          };
//       });
//    };

//    // Save changes
//    const handleSave = () => {
//       console.log('Saving company experience data:', formData);
//       setTimeout(() => {
//          onClose();
//       }, 800);
//    };

//    return (
//       <div className="flex flex-col h-full bg-white z-50 w-full">
//          <div className="space-y-6 w-full">
//             <div className="space-y-4">
//                <p className="text-gray-600">Add details about your company`s divisions, departments, or major milestones</p>

//                {formData.experiences.map((experience, index) => (
//                   <div key={index} className="border p-4 rounded-md space-y-4">
//                      <div className="flex justify-between items-center">
//                         <h4 className="font-medium -ml-1">Experience {index + 1}</h4>
//                         {formData.experiences.length > 1 && (
//                            <button
//                               onClick={() => removeExperience(index)}
//                               className="text-red-500"
//                            >
//                               <FaTrash size={14} />
//                            </button>
//                         )}
//                      </div>

//                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <FormInput
//                            field={`title-${index}`}
//                            label="Title/Division Name"
//                            required={true}
//                            value={experience.title}
//                            onChange={(_, value) => updateExperienceField(index, 'title', value)}
//                            placeholder="e.g. Enterprise Solutions Division"
//                         />

//                         <FormInput
//                            field={`organization-${index}`}
//                            label="Organization"
//                            required={true}
//                            value={experience.organization}
//                            onChange={(_, value) => updateExperienceField(index, 'organization', value)}
//                            placeholder="e.g. Your Company Name"
//                         />
//                      </div>

//                      <div className="grid grid-cols-2 gap-4">
//                         <DateInput
//                            name="startDate"
//                            label="Start Date"
//                            value={formData.startDate}
//                            onChange={handleDateChange}
//                            required={true}
//                         />

//                         <DateInput
//                            name="endDate"
//                            label="End Date"
//                            value={formData.endDate}
//                            onChange={handleDateChange}
//                            disabled={!formData.startDate}
//                         />
//                      </div>

//                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                            <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Employment Type
//                            </label>
//                            <CustomDropdown
//                               selected={experience.employmentType}
//                               styles="w-full py-2.5"
//                               options={employmentTypes}
//                               onChange={(value) => handleInputChange('employmentType', value)}
//                            />
//                         </div>

//                         <FormInput
//                            field={`revenue-${index}`}
//                            label="Revenue (if applicable)"
//                            value={experience.revenue}
//                            onChange={(_, value) => updateExperienceField(index, 'revenue', value)}
//                            placeholder="e.g. $5M+ annually"
//                         />
//                      </div>

//                      <FormTextarea
//                         field={`description-${index}`}
//                         label="Description"
//                         required={true}
//                         value={experience.description}
//                         onChange={(_, value) => updateExperienceField(index, 'description', value)}
//                         placeholder="Describe this division, department, or milestone's achievements and responsibilities"
//                         rows={4}
//                      />
//                   </div>
//                ))}

//                <button
//                   onClick={addExperience}
//                   className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
//                >
//                   + Add Another Experience
//                </button>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center justify-between pt-4 border-t pb-5">
//                <TertiaryButton
//                   onClick={clearAll}
//                   icon={<FaTrash size={14} />}
//                >
//                   Clear All
//                </TertiaryButton>

//                <div className="flex items-center justify-start gap-3">
//                   <SecondaryButton onClick={onClose}>
//                      Cancel
//                   </SecondaryButton>
//                   <PrimaryButton onClick={handleSave} disabled={isSubmitting}>
//                      {isSubmitting ? 'Saving...' : 'Save Changes'}
//                   </PrimaryButton>
//                </div>
//             </div>
//          </div>
//       </div>
//    );
// };
