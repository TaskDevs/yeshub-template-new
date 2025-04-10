import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import {
   FormInput,
   FormTextarea,
   SkillItem,
   SelectedSkill,
   PrimaryButton,
   SecondaryButton,
   TertiaryButton,
   FileUpload,
   DateInput
} from '../../../candidate/sections/new-profile/profile-components';
import { SearchInput } from '../../../../common/search-box';
import { CustomDropdown } from '../../../../common/Dropdown';
import { useFileUpload, useProfileForm, useSkillsForm } from '../../../candidate/sections/new-profile/hooks/useProfileForm';
import { availableServicesData, serviceCategories } from '../../../candidate/sections/new-profile/data';
import { clientProfileData } from './data';
import { countryData } from '../../../../../utils/countryData';

/**
 * CompanyOverviewSection 
 */
export const CompanyOverviewFormSection = ({ onClose, initialData = {} }) => {
   const {
      formData,
      setFormData,
      handleInputChange,
      isSubmitting,
      clearAll
   } = useProfileForm({
      title: initialData.title || '',
      organization: initialData.organization || '',
      startDate: initialData.startDate || '',
      endDate: initialData.endDate || '',
      employmentType: initialData.employmentType || 'Full-time',
      revenue: initialData.revenue || '',
      description: initialData.description || ''
   });

   // Employment types
   const employmentTypes = [
      'Full-time',
      'Part-time',
      'Contract',
      'Freelance',
      'Seasonal'
   ];

   // Handle date changes
   const handleDateChange = (name, value) => {
      setFormData(prev => ({
         ...prev,
         [name]: value
      }));
   };

   // Save changes
   const handleSave = () => {
      console.log('Saving company experience data:', formData);
      setTimeout(() => {
         onClose();
      }, 800);
   };

   return (
      <div className="flex flex-col h-full bg-white z-50 w-full">
         <div className="space-y-6 w-full">
            <div className="space-y-4 -mt-2">
               <p className="text-gray-600">Add details about your company&apos;s division, department, or major milestone</p>

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
                           onChange={(value) => handleInputChange('employmentType', value)}
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
               <TertiaryButton
                  onClick={clearAll}
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

/**
 * ServicesSection 
 */
export const ServicesFormSection = ({ onClose }) => {
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
      handleCategoryChange
   } = useSkillsForm([
      { name: 'Digital Transformation', category: 'Digital' },
      { name: 'Cloud Solutions', category: 'IT Services' },
      { name: 'IT Consulting', category: 'IT Services' },
   ],
      serviceCategories,
      availableServicesData
   );

   const handleSave = () => {
      console.log('Saving services:', selectedServices);
      onClose();
   };

   const handleSearch = (value) => {
      console.log('Searching for:', value);
   };

   return (
      <div className="flex flex-col h-full bg-white z-50 w-full justify-start">
         <p className="flex items-start w-full justify-start text-start text-gray-600 mb-3">Select and manage your company services</p>

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
                     <p className="p-4 text-gray-500 text-center">No services found for the selected filters</p>
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
                     <p className="text-gray-500 text-center">No services selected yet</p>
                  )}
               </div>
            </div>
         </div>

         {/* Action Buttons */}
         <div className="flex items-center justify-between w-full pt-4 gap-3 pb-5">
            <TertiaryButton
               onClick={clearAllServices}
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
         images: files
      };
      console.log('Saving office data:', officeImages);
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
               <TertiaryButton
                  onClick={clearFiles}
                  icon={<FaTrash size={14} />}
               >
                  Clear All
               </TertiaryButton>

               <div className="flex items-center justify-start gap-3">
                  <SecondaryButton onClick={onClose}>
                     Cancel
                  </SecondaryButton>
                  <PrimaryButton onClick={handleSave} >
                     Save Changes
                  </PrimaryButton>
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
   const {
      formData,
      handleInputChange,
      isSubmitting
   } = useProfileForm({
      companyName: "Tech Solutions Ghana Ltd",
      headline: "Digital Transformation & IT Services",
      email: "contact@techsolutionsghana.com",
      phone: "+233 20 555 7890",
      website: "www.techsolutionsghana.com",
      linkedin: "linkedin.com/company/techsolutionsghana",
      timezone: "GMT+0"
   });

   const timezones = [
      "GMT+0",
      "GMT+1",
      "GMT+2",
      "GMT+3",
      "GMT-1",
      "GMT-2",
      "GMT-3"
   ];

   const handleSave = () => {
      console.log('Saving business info:', formData);
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
                     onChange={(value) => handleInputChange('timezone', value)}
                  />
               </div>
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

/**
 * CompanyStatsSection 
 */
export const CompanyStatsFormSection = ({ onClose }) => {
   const {
      formData,
      handleInputChange,
      isSubmitting
   } = useProfileForm({
      foundedYear: "2013",
      employeesCount: "150+",
      clientsCount: "200+",
      annualRevenue: "$5M+",
      completedProjects: "500+",
      industryExperience: "10+ years"
   });

   const handleSave = () => {
      console.log('Saving company stats:', formData);
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

/**
 * CertificationsSection 
 */
export const CertificationsFormSection = ({ onClose }) => {
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

   // State for managing certifications list
   const [certifications, setCertifications] = useState(clientProfileData.certifications);

   const handleSave = () => {
      if (formData.certificationName && formData.issuingOrganization) {
         const newCertification = {
            title: formData.certificationName,
            organization: formData.issuingOrganization,
            startDate: formData.issueDate,
            endDate: formData.hasExpiry ? formData.expiryDate : 'No Expiration',
            credentialUrl: formData.credentialUrl,
            credentialID: formData.credentialID,
            description: formData.description
         };

         setCertifications([...certifications, newCertification]);
      }

      console.log('Saving certifications:', certifications);
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
                     onChange={() => handleInputChange('hasExpiry', !formData.hasExpiry)}
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
                  <p className="text-gray-500 text-center p-4 border rounded-md">No certifications added yet</p>
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

/**
 * AboutMeFormSection 
 */
export const AboutMeFormSection = ({ onClose, initialData = {} }) => {
   const {
      formData,
      setFormData,
      handleInputChange,
      isSubmitting,
      clearAll
   } = useProfileForm({
      companyName: initialData.companyName || "Tech Solutions Ghana Ltd",
      headline: initialData.headline || "Digital Transformation & IT Services",
      city: initialData.city || "Accra",
      region: initialData.region || "Greater Accra",
      country: initialData.country || "Ghana",
      timezone: initialData.timezone || "GMT+0",
      email: initialData.email || "john.doe@example.com",
      about: initialData.about || "Leading IT solutions provider in Ghana with over 10 years of experience delivering digital transformation, software development, and IT consulting services to enterprise clients across West Africa."
   });

   // Countries
   const countries = ['Ghana', 'Nigeria', 'Kenya', 'South Africa', 'Ivory Coast'];

   // Timezones
   const timezones = ['GMT-12', 'GMT-11', 'GMT+10', 'GMT+11', 'GMT+12'];

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
      uploadError: logoUploadError
   } = useFileUpload();

   const {
      files: coverFiles,
      handleFileSelect: handleCoverSelect,
      handleFileDrop: handleCoverDrop,
      removeFile: removeCoverFile,
      uploadError: coverUploadError
   } = useFileUpload();

   // Update cities when region changes
   useEffect(() => {
      setAvailableCities(countryData[formData.region] || []);
      // If current city is not in the new region, set to first city
      if (!countryData[formData.region]?.includes(formData.city)) {
         setFormData(prev => ({
            ...prev,
            city: countryData[formData.region]?.[0] || ''
         }));
      }
   }, [formData.region]);

   // Save changes
   const handleSave = () => {
      // Combine form data with file info
      const profileData = {
         ...formData,
         logo: logoFiles.length > 0 ? logoFiles[0] : null,
         coverImage: coverFiles.length > 0 ? coverFiles[0] : null
      };

      console.log('Saving company profile data:', profileData);

      setTimeout(() => {
         onClose();
      }, 800);
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
                        onChange={(value) => handleInputChange('country', value)}
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
                        onChange={(value) => handleInputChange('region', value)}
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
                        onChange={(value) => handleInputChange('city', value)}
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
                        onChange={(value) => handleInputChange('timezone', value)}
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
                  <p className="text-gray-500 text-sm">Upload your company logo (recommended size: 800x400px)</p>

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
                  <p className="text-gray-500 text-sm">Upload your company cover image (recommended size: 800x400px)</p>

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
               <TertiaryButton
                  onClick={clearAll}
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