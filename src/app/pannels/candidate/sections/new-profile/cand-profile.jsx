import React, { useContext, useState } from 'react';
import {  profileSections } from './data';
import { AboutMeSection, CertificationsSection, EducationSection, LicensesSection, PortfolioSection, ProfileSectionsManager, SkillsSection, TestimonialsSection, WorkHistorySection, WorkHoursSection } from './ProfileSectionsManager';
import { ProfileSectionModal } from './profile-components';
// import { useProfileForm } from './hooks/useProfileForm';
import { ProfileApiData } from '../../../../context/user-profile/profileContextApi';


const CandidateProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [currentStepTitle, setCurrentStepTitle] = useState('');
  const { profileData } = useContext(ProfileApiData);
  const [activeId, setactiveId] = useState(null);
  
  // const { formData } = useProfileForm();



  // Close modal handler
  const handleCloseModal = () => {
    setModalOpen(false);
    setActiveSection(null);
  };


 
  // Open modal handler with section
  const handleOpenSectionModal = (sectionKey,id) => {
    //fetching data here .. 
    if (id.typeof !== undefined) {
      console.log('fetching data here...', id);
    } else {
      console.log('new data...');
    }
    setactiveId(id);

    setActiveSection(sectionKey);
    setModalOpen(true);
  };

  // Get the appropriate modal content based on active section
  const getModalContent = () => {
    if (!activeSection) return null;

    switch (activeSection) {
      case 'skills':
        return <SkillsSection initialSelectedSkills={profileData} onClose={handleCloseModal} />;
      case 'workHistory':
        return <WorkHistorySection id={activeId} onClose={handleCloseModal} />;
      case 'education':
        return <EducationSection initialData={profileData} onClose={handleCloseModal} />;
      case 'portfolio':
        return <PortfolioSection initialData={profileData} onClose={handleCloseModal} setCurrentStepTitle={setCurrentStepTitle} />;
      case 'certifications':
        return <CertificationsSection initialData={profileData} onClose={handleCloseModal} />;
      case 'license':
        return <LicensesSection  initialData={profileData} onClose={handleCloseModal} />;
      case 'testimonials':
        return <TestimonialsSection initialData={profileData} onClose={handleCloseModal} />;
      case 'workHours':
        return <WorkHoursSection initialData={profileData} onClose={handleCloseModal} />;
      case 'aboutMe':
        return <AboutMeSection initialData={profileData} onClose={handleCloseModal} />;
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
    onClick: (id) => {
      handleOpenSectionModal(sectionKeyMap[section.title],id)
    }
  }));

  const isSkillsSection = activeSection === 'skills';

  return (
    <div className="tw-css site-bg-gray min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-6 ">
        <ProfileSectionsManager
          candidateData={profileData}
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
      </div>
    </div>
  );
};

export default CandidateProfile;