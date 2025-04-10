import React, { useState, useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
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
} from "./profile-components";
import { SearchInput } from "../../../../common/search-box";
import { CustomDropdown } from "../../../../common/Dropdown";
import {
  useFileUpload,
  useProfileForm,
  useSkillsForm,
} from "./hooks/useProfileForm";
import { availableServicesData, serviceCategories } from "./data";
import { clientProfileData } from "../../../public-user/sections/profile/data";
import { EmployerApiData } from "../../../../context/employers/employerContextApi";

/**
 * ServicesSection
 */
export const ServicesFormSection = ({ onClose }) => {
  //   const { processUpdateEmployer } = useContext(EmployerApiData);
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
    console.log("Saving services:", selectedServices);
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
  const {
    files,
    // uploading,
    uploadError,
    handleFileSelect,
    handleFileDrop,
    removeFile,
    clearFiles,
  } = useFileUpload(10); // 10MB max file size

  const handleSave = () => {
    const officeImages = {
      images: files,
    };
    console.log("Saving office data:", officeImages);
    onClose();
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
      company_name: formData.companyName,
      headline: formData.headline,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      linkedin: formData.linkedIn,
      timezone: formData.timezone,
    };
    processUpdateEmployer(1, newData);
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
  const { formData, handleInputChange, isSubmitting } = useProfileForm({
    foundedYear: "2013",
    employeesCount: "150+",
    clientsCount: "200+",
    annualRevenue: "$5M+",
    completedProjects: "500+",
    industryExperience: "10+ years",
  });

  const handleSave = () => {
    console.log("Saving company stats:", formData);
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

  // State for managing certifications list
  const [certifications, setCertifications] = useState(
    clientProfileData.certifications
  );

  const handleSave = () => {
    if (formData.certificationName && formData.issuingOrganization) {
      const newCertification = {
        title: formData.certificationName,
        organization: formData.issuingOrganization,
        startDate: formData.issueDate,
        endDate: formData.hasExpiry ? formData.expiryDate : "No Expiration",
        credentialUrl: formData.credentialUrl,
        credentialID: formData.credentialID,
        description: formData.description,
      };

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
