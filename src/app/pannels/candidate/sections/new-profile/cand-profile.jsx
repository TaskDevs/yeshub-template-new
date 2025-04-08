import React, { useState } from 'react';
import { FaCalendar, FaShareAlt, FaStar } from 'react-icons/fa';
import {
  MdLocationOn,
  MdLanguage,
} from 'react-icons/md';
import { BiSolidEdit } from 'react-icons/bi';
import { FaCediSign } from 'react-icons/fa6';
import { InfoGridItem } from './InfoGridItem';
import { ShareProfileModal } from './ShareProfileModal';
import { candidateData, profileSections } from './data';
import { AboutMeSection, CertificationsSection, EducationSection, LicensesSection, PortfolioSection, ProfileSectionsManager, SkillsSection, TestimonialsSection, WorkHistorySection, WorkHoursSection } from './ProfileSectionsManager';
import { ProfileSectionModal } from './profile-components';
import { useProfileForm } from './hooks/useProfileForm';

const SectionHeader = ({ title, icon = <BiSolidEdit className="w-4 h-4 text-[#305718]" />, onClick }) => (
  <div className="flex justify-between mb-4">
    <h2 className="font-bold">{title}</h2>
    <button className="text-green-700" onClick={onClick}>
      {icon}
    </button>
  </div>
);
const CandidateProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentStepTitle, setCurrentStepTitle] = useState('');

  const { formData } = useProfileForm();

  console.log(formData)

  // Close modal handler
  const handleCloseModal = () => {
    setModalOpen(false);
    setActiveSection(null);
  };

  // Open modal handler with section
  const handleOpenSectionModal = (sectionKey) => {
    setActiveSection(sectionKey);
    setModalOpen(true);
  };

  // Get the appropriate modal content based on active section
  const getModalContent = () => {
    if (!activeSection) return null;

    switch (activeSection) {
      case 'skills':
        return <SkillsSection onClose={handleCloseModal} />;
      case 'workHistory':
        return <WorkHistorySection onClose={handleCloseModal} />;
      case 'education':
        return <EducationSection onClose={handleCloseModal} />;
      case 'portfolio':
        return <PortfolioSection onClose={handleCloseModal} setCurrentStepTitle={setCurrentStepTitle} />;
      case 'certifications':
        return <CertificationsSection onClose={handleCloseModal} />;
      case 'license':
        return <LicensesSection onClose={handleCloseModal} />;
      case 'testimonials':
        return <TestimonialsSection onClose={handleCloseModal} />;
      case 'workHours':
        return <WorkHoursSection onClose={handleCloseModal} />;
      case 'aboutMe':
        return <AboutMeSection onClose={handleCloseModal} />;
      default:
        return null;
    }
  };

  // Map profile sections to keys
  const sectionKeyMap = {
    'Skills': 'skills',
    'Licenses': 'license',
    'About me': 'aboutMe',
    'Education': 'education',
    'Portfolio': 'portfolio',
    'Work Hours': 'workHours',
    'Work History': 'workHistory',
    'Testimonials': 'testimonials',
    'Certifications': 'certifications',
  };

  // Setup section click handlers
  const enhancedProfileSections = profileSections.map(section => ({
    ...section,
    onClick: () => {
      handleOpenSectionModal(sectionKeyMap[section.title])
    }
  }));

  const handleShareProfile = () => {
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  const isSkillsSection = activeSection === 'skills';

  return (
    <div className="tw-css site-bg-gray min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-6 ">
        <div className='bg-white w-full px-4'>
          {/* Header Section - Top Card */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-6">
              <div className="flex justify-between">
                <div className="flex">
                  <div className="mr-4">
                    <img src={candidateData.avatar} alt={candidateData.name} className="w-16 h-16 rounded-full" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">{candidateData.name}</h1>
                    <p className="text-gray-600">{candidateData.title}</p>
                    <div className="flex items-center mt-1">
                      <FaStar className="h-5 w-5 text-[#FACC15]" />
                      <span className="ml-1">{candidateData.rating}</span>
                      <span className="text-gray-500 ml-1">({candidateData.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleShareProfile}
                  className="bg-green-800 text-white px-4 py-2 rounded flex items-center gap-2 h-10"
                >
                  <FaShareAlt className="w-4 h-4" />
                  <span>Share Profile</span>
                </button>
              </div>
            </div>
          </div>

          {/* About Me Section */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-6">
              <SectionHeader title="About Me" onClick={() => handleOpenSectionModal('aboutMe')} />
              <p className="text-gray-700">
                {candidateData.about}
              </p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6 shadow rounded-b-md pb-4">
            {/* Left column */}
            <div className="space-y-6">
              <InfoGridItem
                icon={<MdLocationOn className="w-4 h-4 text-[#4B5563]" />}
                title="Location"
              >
                <p className="text-[#4B5563]">{candidateData.location}</p>
              </InfoGridItem>

              <InfoGridItem
                icon={<MdLanguage className="w-4 h-4 text-[#4B5563]" />}
                title="Languages"
              >
                <div className='flex flex-row items-center'>
                  {candidateData.languages.map((lang, index) => (
                    <>
                      <p className="text-[#4B5563]" key={index}>{lang.language} ({lang.proficiency}) </p>  {index < candidateData.languages.length && index < candidateData.languages.length - 1 && <span className='-ml-4 -mr-2.5'>,</span>}
                    </>
                  ))}
                </div>
              </InfoGridItem>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <InfoGridItem
                icon={<FaCediSign className="w-4 h-4 text-[#4B5563]" />}
                title="Rate"
              >
                <p className="text-[#4B5563]">${candidateData.rate}</p>
              </InfoGridItem>

              <InfoGridItem
                icon={<FaCalendar className="w-4 h-4 text-[#4B5563]" />}
                title="Member Since"
              >
                <p className="text-[#4B5563]">{candidateData.memberSince}</p>
              </InfoGridItem>
            </div>
          </div>
        </div>

        {/* Skills and Work History */}
        <div className="grid md:grid-cols-2 gap-6 mb-10 ">
          {/* Skills */}
          <div className="bg-white rounded-lg shadow p-6">
            <SectionHeader title="Skills" onClick={() => handleOpenSectionModal('skills')} />
            <div className="flex flex-wrap items-start justify-start gap-2">
              {candidateData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Work History */}
          <div className="bg-white rounded-lg shadow p-6">
            <SectionHeader title="Work History" onClick={() => handleOpenSectionModal('workHistory')} />
            <div className="space-y-4">
              {candidateData.workHistory.map((job, index) => (
                <div key={index} className="pb-3">
                  <h3 className="font-medium">{job.role}</h3>
                  <p className="text-gray-500 text-sm">{job.period}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ProfileSectionsManager
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          activeSection={activeSection}
          getModalContent={getModalContent}
          setActiveSection={setActiveSection}
          handleCloseModal={handleCloseModal}
          setCurrentStepTitle={setCurrentStepTitle}
          handleOpenSectionModal={handleOpenSectionModal}
          enhancedProfileSections={enhancedProfileSections}
        />

        {/* Modal for active section */}
        {modalOpen && activeSection && (
          <ProfileSectionModal
            isOpen={modalOpen}
            onClose={handleCloseModal}
            isSkillsSection={isSkillsSection}
            currentStepTitle={activeSection === "portfolio" ? "-" + " " + currentStepTitle : ""}
            title={`${isSkillsSection ? 'Skills Selection' : activeSection === "aboutMe" ? "About Yourself" : `Add ${activeSection.replace(/([A-Z])/g, ' $1').trim()}`}`}
          >
            {getModalContent()}
          </ProfileSectionModal>
        )}

        {/* Share Modal */}
        {showShareModal && (
          <ShareProfileModal
            onClose={closeShareModal}
            profileName={candidateData.name}
          />
        )}
      </div>
    </div>
  );
};

export default CandidateProfile;