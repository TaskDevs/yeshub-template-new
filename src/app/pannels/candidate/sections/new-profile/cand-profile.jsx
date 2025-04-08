import React, { useState } from 'react';
import { FaShareAlt, FaStar } from 'react-icons/fa';
import { ShareProfileModal } from './ShareProfileModal';
import { candidateData, profileSections } from './data';
import { AboutMeSection, CertificationsSection, EducationSection, LicensesSection, PortfolioSection, ProfileSectionsManager, SkillsSection, TestimonialsSection, WorkHistorySection, WorkHoursSection } from './ProfileSectionsManager';
import { ProfileSectionModal } from './profile-components';
import { useProfileForm } from './hooks/useProfileForm';

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
    'About Me': 'aboutMe',
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
        </div>

        <ProfileSectionsManager
          candidateData={candidateData}
          sectionKeyMap={sectionKeyMap}
          profileSections={enhancedProfileSections}
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