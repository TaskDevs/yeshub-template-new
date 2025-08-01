import React, { useState, useEffect, useContext } from "react";
import styles from "./profile.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClientProfileSectionsManager } from "./client-profile-sections-manager";
import { CompanyOverviewFormSection } from "./client-profile-forms";
import { ProfileSectionModal } from "../../../candidate/sections/new-profile/profile-components";
//import { useProfileForm } from "../../../candidate/sections/new-profile/hooks/useProfileForm";
import {
  //clientProfileData,
  profileSections,
} from "./data";
import {
  BusinessInfoFormSection,
  CertificationsFormSection,
  CompanyStatsFormSection,
  OfficesFormSection,
  ServicesFormSection,
  AboutMeFormSection,
} from "./client-profile-forms";
import { EmployerApiData } from "../../../../context/employers/employerContextApi";
//import { AuthApiData } from "../../../../context/auth/authContextApi";

const ClientProfile = () => {
  //const { authInfo } = useContext(AuthApiData);
  const { employerProfiles, processEmployerProfile } =
    useContext(EmployerApiData);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  //const { formData } = useProfileForm();

  // console.log(formData);
  // console.log(clientProfileData);
  // console.log(authInfo);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      processEmployerProfile(userId); // assume it returns a promise, ignore result
    }
  }, []);

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
      case "aboutMe":
        return <AboutMeFormSection onClose={handleCloseModal} />;
      case "services":
        return <ServicesFormSection onClose={handleCloseModal} />;
      case "offices":
        return <OfficesFormSection onClose={handleCloseModal} />;
      case "businessInfo":
        return <BusinessInfoFormSection onClose={handleCloseModal} />;
      case "companyStats":
        return <CompanyStatsFormSection onClose={handleCloseModal} />;
      case "certifications":
        return <CertificationsFormSection onClose={handleCloseModal} />;
      case "companyOverview":
        return <CompanyOverviewFormSection onClose={handleCloseModal} />;
      default:
        return null;
    }
  };

  // Map profile sections to keys
  const sectionKeyMap = {
    "Our Offices": "offices",
    "About Me": "aboutMe",
    "Core Services": "services",
    "Business Information": "businessInfo",
    "Company Details": "companyStats",
    Certifications: "certifications",
    "Company Overview": "companyOverview",
  };

  // Setup section click handlers
  const enhancedProfileSections = profileSections.map((section) => ({
    ...section,
    onClick: () => {
      handleOpenSectionModal(sectionKeyMap[section.title]);
    },
  }));
  return (
    <>
      <div className={`tw-css w-full site-bg-gray`}>
        <div className={styles.profileContainer}>
          <ClientProfileSectionsManager
            sectionKeyMap={sectionKeyMap}
            clientData={employerProfiles}
            profileSections={enhancedProfileSections}
          />
        </div>

        {/* Modal for active section */}
        {modalOpen && activeSection && (
          <ProfileSectionModal
            isOpen={modalOpen}
            onClose={handleCloseModal}
            title={`Add ${activeSection.replace(/([A-Z])/g, " $1").trim()}`}
          >
            {getModalContent()}
          </ProfileSectionModal>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ClientProfile;
