import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { ProfileSection } from './ProfileSection';
import {
  FormInput,
  FormTextarea,
  DateInput,
  SkillItem,
  SelectedSkill,
  RecommendedSkill,
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  FileUpload
} from './profile-components';
import { SearchInput } from '../../../../common/search-box';
import { CustomDropdown } from '../../../../common/Dropdown';
import { useFileUpload, useProfileForm, useSkillsForm } from './hooks/useProfileForm';

/**
 * ProfileSectionsManager 
 */

export const ProfileSectionsManager = ({ sectionKeyMap, candidateData, profileSections }) => {
  return (
    <div className='space-y-5'>
      {/* Render profile sections */}

      {/* About me */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        <ProfileSection
          data={candidateData}
          title={profileSections[0]?.title}
          onClick={profileSections[0]?.onClick}
          noData={candidateData?.name ? false : true}
          description={profileSections[0]?.description}
          activeSection={sectionKeyMap[profileSections[0]?.title]}
        />
      </div>

      {/* Skills and Work history  */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <ProfileSection
          data={candidateData?.skills}
          title={profileSections[1]?.title}
          onClick={profileSections[1]?.onClick}
          noData={!candidateData?.skills.length}
          description={profileSections[1]?.description}
          activeSection={sectionKeyMap[profileSections[1]?.title]}
        />
        <ProfileSection
          data={candidateData?.workHistory}
          title={profileSections[2]?.title}
          onClick={profileSections[2]?.onClick}
          noData={!candidateData?.workHistory.length}
          description={profileSections[2]?.description}
          activeSection={sectionKeyMap[profileSections[2]?.title]}
        />
      </div>

      {/* Education and Portfolio */}
      <div className="grid md:grid-cols-2 md:mb-0 gap-6 mb-[5rem]">
        <ProfileSection
          data={candidateData?.education}
          title={profileSections[3]?.title}
          onClick={profileSections[3]?.onClick}
          noData={!candidateData?.education.length}
          description={profileSections[3]?.description}
          activeSection={sectionKeyMap[profileSections[3]?.title]}
        />
        <ProfileSection
          data={candidateData?.portfolio}
          title={profileSections[4]?.title}
          onClick={profileSections[4]?.onClick}
          noData={!candidateData?.portfolio.length}
          description={profileSections[4]?.description}
          activeSection={sectionKeyMap[profileSections[4]?.title]}
        />
      </div>

      {/* Certifications and Work hours */}
      <div className="grid md:grid-cols-2 md:mb-0 gap-6 mb-[5rem]">
        <ProfileSection
          title={profileSections[5]?.title}
          data={candidateData?.certifications}
          onClick={profileSections[5]?.onClick}
          noData={!candidateData?.certifications.length}
          description={profileSections[5]?.description}
          activeSection={sectionKeyMap[profileSections[5]?.title]}
        />
        <ProfileSection
          data={candidateData?.workHours}
          title={profileSections[6]?.title}
          onClick={profileSections[6]?.onClick}
          description={profileSections[6]?.description}
          noData={!candidateData?.workHours.hoursPerWeek}
          activeSection={sectionKeyMap[profileSections[6]?.title]}
        />
      </div>

      {/* Licenses and Testimonials */}
      <div className="grid md:grid-cols-2 md:mb-0 gap-6 mb-[5rem]">
        <ProfileSection
          data={candidateData?.licenses}
          title={profileSections[7]?.title}
          onClick={profileSections[7]?.onClick}
          noData={!candidateData?.licenses.length}
          description={profileSections[7]?.description}
          activeSection={sectionKeyMap[profileSections[7]?.title]}
        />
        <ProfileSection
          data={candidateData.testimonials}
          title={profileSections[8]?.title}
          onClick={profileSections[8]?.onClick}
          noData={!candidateData?.testimonials.length}
          description={profileSections[8]?.description}
          activeSection={sectionKeyMap[profileSections[8]?.title]}
        />
      </div>
    </div>
  );
};

/**
 * SkillsSection 
 */
export const SkillsSection = ({ onClose }) => {
  const {
    searchValue,
    setSearchValue,
    selectedCategory,
    categories,
    selectedSkills,
    availableSkills,
    recommendedSkills,
    addSkill,
    removeSkill,
    clearAllSkills,
    handleCategoryChange
  } = useSkillsForm([
    { name: 'TypeScript', category: 'Programming' },
    { name: 'Python', category: 'Programming' }
  ]);

  const handleSave = () => {
    // Save logic would go here
    console.log('Saving skills:', selectedSkills);
    onClose();
  };

  const handleSearch = (value) => {
    console.log('Searching for:', value);
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full justify-start">
      <p className="flex items-start w-full justify-start text-start text-gray-600 mb-3">Select and manage your professional skills</p>

      {/* Search and filter */}
      <div className="flex gap-4 mb-6 w-full">
        <SearchInput
          className="w-full flex-1"
          value={searchValue}
          onChange={setSearchValue}
          onSearch={handleSearch}
          placeholder="Search skills..."
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
        {/* Available Skills */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Available Skills</h3>
          <div className="border rounded-md bg-white h-64 overflow-y-scroll">
            {availableSkills.length > 0 ? (
              availableSkills.map((skill) => (
                <SkillItem
                  key={skill.name}
                  skill={skill}
                  onSelect={() => addSkill(skill)}
                />
              ))
            ) : (
              <p className="p-4 text-gray-500 text-center">No skills found for the selected filters</p>
            )}
          </div>
        </div>

        {/* Selected Skills */}
        <div>
          <div className="flex justify-between items-center mb-2 ">
            <h3 className="font-semibold text-lg">Selected Skills</h3>
          </div>

          <div className="border rounded-md p-4 min-h-[170px]">
            {selectedSkills.length > 0 ? (
              <div className="flex flex-wrap justify-start gap-2">
                {selectedSkills.map((skill) => (
                  <SelectedSkill
                    key={skill.name}
                    skill={skill}
                    onRemove={removeSkill}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No skills selected yet</p>
            )}
          </div>
          {/* Recommended Skills */}
          {recommendedSkills.length > 0 && (
            <div className="mb-8 mt-6">
              <h3 className="font-semibold text-lg mb-2">Recommended Skills</h3>
              <div className="flex flex-wrap justify-start">
                {recommendedSkills.map((skill) => (
                  <RecommendedSkill
                    key={skill.name}
                    skill={skill}
                    onAdd={addSkill}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>


      {/* Action Buttons */}
      <div className="flex items-center justify-between w-full pt-4 gap-3 pb-5">
        <TertiaryButton
          onClick={clearAllSkills}
          icon={<FaTrash size={14} />}
        >
          Clear All
        </TertiaryButton>


        <div className="flex items-center justify-start gap-3">
          <SecondaryButton onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={handleSave}>
            Save Changes
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

/**
 * EducationSection
 */
export const EducationSection = ({ onClose }) => {
  const {
    formData,
    handleInputChange,
    handleDateChange,
    isSubmitting
  } = useProfileForm({
    institutionName: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    description: '',
    current: false
  });

  const handleSave = () => {
    // Save logic would go here
    console.log('Saving education:', formData);
    onClose();
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">

      <div className="space-y-6  w-full">
        <FormInput
          field="institutionName"
          label="Institution Name"
          value={formData.institutionName}
          onChange={handleInputChange}
          required={true}
          placeholder="Enter university, college or school name"
        />

        <FormInput
          field="degree"
          label="Degree"
          value={formData.degree}
          onChange={handleInputChange}
          required={true}
          placeholder="e.g. Bachelor's, Master's, High School Diploma"
        />

        <FormInput
          field="fieldOfStudy"
          label="Field of Study"
          value={formData.fieldOfStudy}
          onChange={handleInputChange}
          placeholder="e.g. Computer Science, Mathematics"
        />

        <div className="grid grid-cols-2 gap-4">
          <DateInput
            name="startDate"
            label="Start Date"
            value={formData.startDate}
            onChange={handleDateChange}
            required={true}
          />

          <DateInput
            name="endDate"
            label="End Date"
            value={formData.endDate}
            onChange={handleDateChange}
            disabled={formData.current}
          />
        </div>

        <div className="flex items-center justify-end -mt-3">
          <input
            type="checkbox"
            id="current"
            checked={formData.current}
            onChange={() => handleInputChange('current', !formData.current)}
          />
          <label htmlFor="current">I currently study here</label>
        </div>

        <FormTextarea
          field="description"
          label="Description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe your studies, achievements, etc."
          rows={4}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between w-full pt-4 gap-3 pb-5">
        <TertiaryButton
          onClick={() => { }}
          icon={<FaTrash size={14} />}
        >
          Clear All
        </TertiaryButton>


        <div className="flex items-center justify-start gap-3">
          <SecondaryButton onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

/**
 * WorkHistorySection
 */
export const WorkHistorySection = ({ onClose }) => {
  const {
    formData,
    handleInputChange,
    handleDateChange,
    isSubmitting
  } = useProfileForm({
    jobTitle: '',
    companyName: '',
    location: '',
    startDate: '',
    endDate: '',
    responsibilities: '',
    current: false
  });

  const handleSave = () => {
    // Save logic would go here
    console.log('Saving work history:', formData);
    onClose();
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">
      <div className="space-y-6 w-full">
        <FormInput
          field="jobTitle"
          label="Job Title"
          value={formData.jobTitle}
          onChange={handleInputChange}
          required={true}
          placeholder="e.g. Senior Software Engineer"
        />

        <FormInput
          field="companyName"
          label="Company Name"
          value={formData.companyName}
          onChange={handleInputChange}
          required={true}
          placeholder="e.g. Tech Corp"
        />

        <FormInput
          field="location"
          label="Location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="e.g. San Francisco, CA"
        />

        <div className="grid grid-cols-2 gap-4">
          <DateInput
            name="startDate"
            label="Start Date"
            value={formData.startDate}
            onChange={handleDateChange}
            required={true}
          />

          <DateInput
            name="endDate"
            label="End Date"
            value={formData.endDate}
            onChange={handleDateChange}
            disabled={formData.current}
          />
        </div>

        <div className="flex items-center justify-end -mt-3">
          <input
            type="checkbox"
            id="current"
            checked={formData.current}
            onChange={() => handleInputChange('current', !formData.current)}
          />
          <label htmlFor="current">I currently work here</label>
        </div>

        <FormTextarea
          field="responsibilities"
          label="Responsibilities"
          value={formData.responsibilities}
          onChange={handleInputChange}
          placeholder="Describe your key responsibilities and achievements..."
          rows={4}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between w-full pt-4 gap-3 pb-5">
        <TertiaryButton
          onClick={() => { }}
          icon={<FaTrash size={14} />}
        >
          Clear All
        </TertiaryButton>

        <div className="flex items-center justify-start gap-3">
          <SecondaryButton onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

/**
 * PortfolioSection - Multi-step form component
 */
export const PortfolioSection = ({ onClose, setCurrentStepTitle }) => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const totalSteps = 2;

  const {
    formData,
    handleInputChange,
    handleDateChange,
    isSubmitting
  } = useProfileForm({
    projectTitle: '',
    role: '',
    skills: '',
    startDate: '',
    endDate: '',
    description: '',
    current: false,
    projectUrl: ''
  });

  const {
    files,
    // uploading,
    uploadError,
    handleFileSelect,
    handleFileDrop,
    removeFile,
    // clearFiles,
    cleanup
  } = useFileUpload(10); // 10MB max file size

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
    setCurrentStepTitle("Project Assets")
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setCurrentStepTitle("Project Details")
  };

  const handleSave = () => {
    console.log('Saving portfolio project:', formData, files);
    onClose();
  };

  useEffect(() => {
    setCurrentStepTitle("Project Details")

    // Cleanup object URLs when component unmounts
    return () => {
      cleanup();
    }
  }, [])

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">
      {/* Step 1: Project Details */}
      {currentStep === 1 && (
        <div className="flex flex-col w-full">
          <div className="space-y-6 w-full">
            <FormInput
              required={true}
              field="projectTitle"
              label="Project Title"
              value={formData.projectTitle}
              onChange={handleInputChange}
              placeholder="e.g. Web Development Project"
            />

            <FormInput
              field="role"
              label="Role"
              value={formData.role}
              onChange={handleInputChange}
              required={true}
              placeholder="e.g. Solo Developer"
            />

            <FormInput
              field="skills"
              label="Skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="e.g. ReactJS, Node.js"
            />

            <div className="grid grid-cols-2 gap-4">
              <DateInput
                name="startDate"
                label="Project Start Date"
                value={formData.startDate}
                onChange={handleDateChange}
                required={true}
              />

              <DateInput
                name="endDate"
                label="Project End Date"
                value={formData.endDate}
                onChange={handleDateChange}
                disabled={formData.current}
              />
            </div>

            <div className="flex items-center justify-end -mt-3">
              <input
                type="checkbox"
                id="current"
                checked={formData.current}
                onChange={() => handleInputChange('current', !formData.current)}
              />
              <label htmlFor="current">I currently work on this project</label>
            </div>

            <FormTextarea
              field="description"
              label="Project Description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your role, responsibilities, and achievements in this project..."
              rows={4}
            />
          </div>
        </div>
      )}

      {/* Step 2: Project Assets */}
      {currentStep === 2 && (
        <div className="flex flex-col w-full">
          <div className="space-y-6 w-full">
            <FormInput
              field="projectUrl"
              label="Project URL"
              value={formData.projectUrl}
              onChange={handleInputChange}
              placeholder="e.g. https://example.com"
            />

            <FileUpload
              files={files}
              onFileSelect={handleFileSelect}
              onFileDrop={handleFileDrop}
              onFileRemove={removeFile}
              error={uploadError}
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between w-full mt-auto pt-6">
        <div className="flex items-center justify-end ml-auto gap-3">
          {currentStep > 1 && (
            <SecondaryButton onClick={handleBack}>
              Back
            </SecondaryButton>
          )}
          {currentStep < totalSteps ? (

            <div className="flex items-center justify-start gap-3">
              <SecondaryButton onClick={onClose}>
                Cancel
              </SecondaryButton>
              <PrimaryButton onClick={handleNext}>
                Next
              </PrimaryButton>

            </div>

          ) : (
            <PrimaryButton onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * CertificationsSection 
 */
export const CertificationsSection = ({ onClose }) => {
  const {
    formData,
    handleInputChange,
    handleDateChange,
    isSubmitting
  } = useProfileForm({
    certificationName: '',
    issuingOrganization: '',
    credentialID: '',
    issueDate: '',
    expiryDate: '',
    description: '',
    hasExpiry: true,
    credentialUrl: ''
  });

  const handleSave = () => {
    // Save logic would go here
    console.log('Saving certification:', formData);
    onClose();
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">
      <div className="space-y-6 w-full">
        <FormInput
          field="certificationName"
          label="Certification Name"
          value={formData.certificationName}
          onChange={handleInputChange}
          required={true}
          placeholder="e.g. AWS Certified Solutions Architect"
        />

        <FormInput
          field="issuingOrganization"
          label="Issuing Organization"
          value={formData.issuingOrganization}
          onChange={handleInputChange}
          required={true}
          placeholder="e.g. Amazon Web Services"
        />

        <FormInput
          field="credentialID"
          label="Credential ID"
          value={formData.credentialID}
          onChange={handleInputChange}
          placeholder="e.g. ABC123456"
        />

        <FormInput
          field="credentialUrl"
          label="Credential URL"
          value={formData.credentialUrl}
          onChange={handleInputChange}
          placeholder="e.g. https://example.com/verify"
        />

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

        <div className="flex items-center justify-end -mt-3">
          <input
            type="checkbox"
            id="hasExpiry"
            checked={formData.hasExpiry}
            onChange={() => handleInputChange('hasExpiry', !formData.hasExpiry)}
          />
          <label htmlFor="hasExpiry">This certification expires</label>
        </div>

        <FormTextarea
          field="description"
          label="Description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe what you learned and skills you gained..."
          rows={4}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between w-full pt-4 gap-3 pb-5">
        <TertiaryButton
          onClick={() => { }}
          icon={<FaTrash size={14} />}
        >
          Clear All
        </TertiaryButton>

        <div className="flex items-center justify-start gap-3">
          <SecondaryButton onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

/**
 * WorkHoursSection 
 */
export const WorkHoursSection = ({ onClose }) => {
  const {
    formData,
    handleInputChange,
    isSubmitting
  } = useProfileForm({
    availability: 'full-time',
    hoursPerWeek: 40,
    preferredWorkingHours: 'standard',
    customStartHour: '09:00',
    customEndHour: '17:00',
    workDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    timeZone: 'UTC',
    notice: '2 weeks'
  });

  const availabilityOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'internship', label: 'Internship' }
  ];

  const workingHoursOptions = [
    { value: 'standard', label: 'Standard (9AM - 5PM)' },
    { value: 'flexible', label: 'Flexible Hours' },
    { value: 'custom', label: 'Custom Hours' }
  ];

  const noticeOptions = [
    { value: 'immediate', label: 'Immediately' },
    { value: '1 week', label: '1 Week' },
    { value: '2 weeks', label: '2 Weeks' },
    { value: '1 month', label: '1 Month' },
    { value: 'custom', label: 'Custom' }
  ];

  const handleWorkDayChange = (day) => {
    const updatedWorkDays = {
      ...formData.workDays,
      [day]: !formData.workDays[day]
    };
    handleInputChange('workDays', updatedWorkDays);
  };

  const handleSave = () => {
    // Save logic would go here
    console.log('Saving work hours:', formData);
    onClose();
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">
      <div className="space-y-6 w-full">
        <div className="form-group">
          <label className="block text-sm font-medium mb-2">Availability</label>
          <div className="flex items-start justify-start flex-col gap-3">
            {availabilityOptions.map(option => (
              <div key={option.value} className="flex items-center justify-start">
                <input
                  type="radio"
                  id={option.value}
                  checked={formData.availability === option.value}
                  onChange={() => handleInputChange('availability', option.value)}
                  className="mr-2"
                />
                <label htmlFor={option.value}>{option.label}</label>
              </div>
            ))}
          </div>
        </div>

        {formData.availability !== 'full-time' && (
          <div className="form-group">
            <label className="block text-sm font-medium mb-2">Hours Per Week</label>
            <input
              type="range"
              min="1"
              max="60"
              value={formData.hoursPerWeek}
              onChange={(e) => handleInputChange('hoursPerWeek', parseInt(e.target.value))}
              className="w-full cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>1h</span>
              <span>{formData.hoursPerWeek}h</span>
              <span>60h</span>
            </div>
          </div>
        )}

        <div className="form-group">
          <label className="block text-sm font-medium mb-2">Preferred Working Hours</label>
          <div className="space-y-2">
            {workingHoursOptions.map(option => (
              <div key={option.value} className="flex items-center justify-start">
                <input
                  type="radio"
                  id={`hours-${option.value}`}
                  checked={formData.preferredWorkingHours === option.value}
                  onChange={() => handleInputChange('preferredWorkingHours', option.value)}
                  className="mr-2"
                />
                <label htmlFor={`hours-${option.value}`}>{option.label}</label>
              </div>
            ))}
          </div>
        </div>

        {formData.preferredWorkingHours === 'custom' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-sm font-medium mb-2">Start Time</label>
              <input
                type="time"
                value={formData.customStartHour}
                onChange={(e) => handleInputChange('customStartHour', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium mb-2">End Time</label>
              <input
                type="time"
                value={formData.customEndHour}
                onChange={(e) => handleInputChange('customEndHour', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        )}

        <div className="form-group">
          <label className="block text-sm font-medium mb-2">Work Days</label>
          <div className="flex flex-wrap gap-2 justify-start">
            {Object.keys(formData.workDays).map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => handleWorkDayChange(day)}
                className={`px-3 py-1 rounded-full text-sm border ${formData.workDays[day]
                  ? 'bg-green-100 border-green-600 text-green-800'
                  : 'bg-gray-100 border-gray-300 text-gray-600'
                  }`}
              >
                {day.charAt(0).toUpperCase() + day.slice(1, 3)}
              </button>
            ))}
          </div>
        </div>

        <FormInput
          field="timeZone"
          label="Time Zone"
          value={formData.timeZone}
          onChange={handleInputChange}
          placeholder="e.g. UTC, EST, PST"
        />

        <div className="form-group">
          <label className="block text-sm font-medium mb-2">Notice Period</label>
          <div className="space-y-2">
            {noticeOptions.map(option => (
              <div key={option.value} className="flex items-center justify-start">
                <input
                  type="radio"
                  id={`notice-${option.value}`}
                  checked={formData.notice === option.value}
                  onChange={() => handleInputChange('notice', option.value)}
                  className="mr-2"
                />
                <label htmlFor={`notice-${option.value}`}>{option.label}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between w-full pt-4 gap-3 pb-5">
        <TertiaryButton
          onClick={() => { }}
          icon={<FaTrash size={14} />}
        >
          Clear All
        </TertiaryButton>

        <div className="flex items-center justify-start gap-3">
          <SecondaryButton onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

/**
 * LicensesSection 
 */
export const LicensesSection = ({ onClose }) => {
  const {
    formData,
    handleInputChange,
    handleDateChange,
    isSubmitting
  } = useProfileForm({
    licenseName: '',
    issuingOrganization: '',
    licenseNumber: '',
    issueDate: '',
    expirationDate: '',
    description: '',
    neverExpires: false
  });

  const handleSave = () => {
    // Save logic would go here
    console.log('Saving license:', formData);
    onClose();
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">
      <div className="space-y-6 w-full">
        <FormInput
          field="licenseName"
          label="License Name"
          value={formData.licenseName}
          onChange={handleInputChange}
          required={true}
          placeholder="e.g. Professional Engineer License"
        />

        <FormInput
          field="issuingOrganization"
          label="Issuing Organization"
          value={formData.issuingOrganization}
          onChange={handleInputChange}
          required={true}
          placeholder="e.g. State Board of Engineering"
        />

        <FormInput
          field="licenseNumber"
          label="License Number"
          value={formData.licenseNumber}
          onChange={handleInputChange}
          placeholder="e.g. PE12345"
        />

        <div className="grid grid-cols-2 gap-4">
          <DateInput
            name="issueDate"
            label="Issue Date"
            value={formData.issueDate}
            onChange={handleDateChange}
            required={true}
          />

          <DateInput
            name="expirationDate"
            label="Expiration Date"
            value={formData.expirationDate}
            onChange={handleDateChange}
            disabled={formData.neverExpires}
          />
        </div>

        <div className="flex items-center justify-end -mt-3">
          <input
            type="checkbox"
            id="neverExpires"
            checked={formData.neverExpires}
            onChange={() => handleInputChange('neverExpires', !formData.neverExpires)}
          />
          <label htmlFor="neverExpires">This license never expires</label>
        </div>

        <FormTextarea
          field="description"
          label="Description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe the license and its relevance to your profession..."
          rows={4}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between w-full pt-4 gap-3 pb-5">
        <TertiaryButton
          onClick={() => { }}
          icon={<FaTrash size={14} />}
        >
          Clear All
        </TertiaryButton>

        <div className="flex items-center justify-start gap-3">
          <SecondaryButton onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

/**
 * TestimonialsSection 
 */
export const TestimonialsSection = ({ onClose }) => {
  const {
    formData,
    handleInputChange,
    handleDateChange,
    isSubmitting
  } = useProfileForm({
    clientName: '',
    clientCompany: '',
    clientPosition: '',
    relationship: '',
    testimonialDate: '',
    testimonialText: '',
    rating: '5'
  });

  const handleSave = () => {
    // Save logic would go here
    console.log('Saving testimonial:', formData);
    onClose();
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">
      <div className="space-y-6 w-full">
        <FormInput
          field="clientName"
          label="Client Name"
          value={formData.clientName}
          onChange={handleInputChange}
          required={true}
          placeholder="e.g. John Smith"
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            field="clientCompany"
            label="Client Company"
            value={formData.clientCompany}
            onChange={handleInputChange}
            placeholder="e.g. ABC Corporation"
          />

          <FormInput
            field="clientPosition"
            label="Client Position"
            value={formData.clientPosition}
            onChange={handleInputChange}
            placeholder="e.g. Project Manager"
          />
        </div>

        <FormInput
          field="relationship"
          label="Your Relationship"
          value={formData.relationship}
          onChange={handleInputChange}
          required={true}
          placeholder="e.g. Consultant, Contractor, Employee"
        />

        <DateInput
          name="testimonialDate"
          label="Testimonial Date"
          value={formData.testimonialDate}
          onChange={handleDateChange}
        />

        <div className="w-full">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
            Rating (1-5 stars)
          </label>
          <CustomDropdown
            selected={
              {
                '5': '5 Stars (Outstanding)',
                '4': '4 Stars (Excellent)',
                '3': '3 Stars (Good)',
                '2': '2 Stars (Fair)',
                '1': '1 Star (Poor)'
              }[formData.rating] || 'Select Rating'
            }
            options={[
              '5 Stars (Outstanding)',
              '4 Stars (Excellent)',
              '3 Stars (Good)',
              '2 Stars (Fair)',
              '1 Star (Poor)'
            ]}
            onChange={(option) => {
              const value = option[0]; // First character is the number (e.g., '5' from '5 Stars (Outstanding)')
              handleInputChange('rating', value);
            }}
            styles="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <FormTextarea
          field="testimonialText"
          label="Testimonial Text"
          value={formData.testimonialText}
          onChange={handleInputChange}
          placeholder="Enter the client's testimonial about your work..."
          rows={6}
          required={true}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between w-full pt-4 gap-3 pb-5">
        <TertiaryButton
          onClick={() => { }}
          icon={<FaTrash size={14} />}
        >
          Clear All
        </TertiaryButton>

        <div className="flex items-center justify-start gap-3">
          <SecondaryButton onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

/**
 * AboutMeSection 
 */

export const AboutMeSection = ({ onSave, onClose, initialData = {} }) => {
  // Ghana regions and cities
  const ghanaRegionsAndCities = {
    'Greater Accra': ['Adabraka', 'Accra', 'Tema', 'Madina'],
    'Ashanti': ['Kumasi', 'Obuasi'],
    'Western': ['Takoradi', 'Sekondi'],
    'Eastern': ['Koforidua', 'Akosombo'],
    'Central': ['Cape Coast', 'Winneba'],
    'Volta': ['Ho', 'Keta'],
    'Northern': ['Tamale', 'Yendi'],
    'Upper East': ['Bolgatanga', 'Bawku'],
    'Upper West': ['Wa', 'Lawra'],
    'Bono': ['Sunyani', 'Dormaa Ahenkro'],
    'Bono East': ['Techiman', 'Kintampo'],
    'Ahafo': ['Goaso', 'Mim'],
    'Western North': ['Sefwi Wiawso', 'Bibiani'],
    'Oti': ['Dambai', 'Jasikan'],
    'North East': ['Nalerigu', 'Walewale'],
    'Savannah': ['Damongo', 'Salaga'],
  };

  // Proficiency levels
  const proficiencyLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'fluent', label: 'Fluent' },
    { value: 'native', label: 'Native' }
  ];

  // Initialize with profile form hook
  const {
    formData,
    setFormData,
    handleInputChange,
    isSubmitting,
  } = useProfileForm({
    fullName: initialData.fullName || '',
    profession: initialData.profession || '',
    bio: initialData.bio || '',
    region: initialData.region || 'Greater Accra',
    city: initialData.city || 'Adabraka',
    hourlyRate: initialData.hourlyRate || '75',
  });

  // Language management
  const [language, setLanguage] = useState('');
  const [proficiency, setProficiency] = useState('intermediate');
  const [languages, setLanguages] = useState(initialData.languages || [
    { language: 'English', proficiency: 'native' },
    { language: 'French', proficiency: 'intermediate' },
    { language: 'Spanish', proficiency: 'fluent' }
  ]);

  // Cities for selected region
  const [availableCities, setAvailableCities] = useState(
    ghanaRegionsAndCities[formData.region] || []
  );

  // Update cities when region changes
  useEffect(() => {
    setAvailableCities(ghanaRegionsAndCities[formData.region] || []);
    // If current city is not in the new region, set to first city
    if (!ghanaRegionsAndCities[formData.region]?.includes(formData.city)) {
      setFormData(prev => ({
        ...prev,
        city: ghanaRegionsAndCities[formData.region]?.[0] || ''
      }));
    }
  }, [formData.region]);

  // Add a new language
  const handleAddLanguage = () => {
    if (language.trim()) {
      setLanguages([...languages, {
        language: language,
        proficiency: proficiency
      }]);
      // Reset form
      setLanguage('');
      setProficiency('intermediate');
    }
  };

  // Remove a language
  const handleRemoveLanguage = (index) => {
    const updated = [...languages];
    updated.splice(index, 1);
    setLanguages(updated);
  };

  // Save all changes
  const handleSave = () => {

    // Combine form data with languages
    const profileData = {
      ...formData,
      languages
    };

    // Simulate API call
    setTimeout(() => {
      console.log('Saving profile data:', profileData);
      if (onSave) onSave(profileData);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 w-full">
      <div className="space-y-6 w-full">
        {/* Personal Info Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              field="fullName"
              label="Full Name"
              required={true}
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Your name"
            />

            <FormInput
              field="profession"
              label="Profession"
              required={true}
              value={formData.profession}
              onChange={handleInputChange}
              placeholder="e.g. Full-stack Developer"
            />
          </div>

          <FormTextarea
            field="bio"
            label="Bio"
            required={true}
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Tell us about yourself, your expertise and passions"
            rows={4}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Region
              </label>
              <select
                value={formData.region}
                onChange={(e) => handleInputChange('region', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {Object.keys(ghanaRegionsAndCities).map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <select
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {availableCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hourly Rate (USD)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="75"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                /hour
              </span>
            </div>
          </div>
        </div>

        {/* Languages Section */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-lg font-semibold">Languages</h3>

          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g. French, German, Japanese"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proficiency Level
              </label>
              <CustomDropdown
                selected={proficiencyLevels.find(level => level.value === proficiency)?.label || 'Intermediate'}
                styles="w-full py-2.5"
                options={proficiencyLevels.map(level => level.label)}
                onChange={(selectedLabel) => {
                  const selected = proficiencyLevels.find(level => level.label === selectedLabel);
                  if (selected) setProficiency(selected.value);
                }}
              />
            </div>

            <button
              onClick={handleAddLanguage}
              className="bg-green-600 text-white px-4 py-2 rounded-md  transition-colors cursor-pointer"
              disabled={!language.trim()}
            >
              Add
            </button>
          </div>

          {languages.length > 0 ? (
            <div className="border rounded-md p-2">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-2">Language</th>
                    <th className="text-left px-4 py-2">Proficiency</th>
                    <th className="text-right px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {languages.map((lang, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{lang.language}</td>
                      <td className="px-4 py-2 capitalize">{lang.proficiency}</td>
                      <td className="px-4 py-2 text-right">
                        <button
                          onClick={() => handleRemoveLanguage(index)}
                          className="text-red-500 "
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
            <p className="text-gray-500 text-center p-4 border rounded-md">No languages added yet</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t pb-5">
          <TertiaryButton
            onClick={() => { }}
            icon={<FaTrash size={14} />}
          >
            Clear All
          </TertiaryButton>

          <div className="flex items-center justify-start gap-3">
            <SecondaryButton onClick={onClose}>
              Cancel
            </SecondaryButton>
            <PrimaryButton onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};