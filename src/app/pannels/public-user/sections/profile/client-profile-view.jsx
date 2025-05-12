import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./profile.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClientProfileSectionsManager } from "./client-profile-sections-manager";
import { clientProfileData, profileSections } from "./data";
import { EmployerApiData } from "../../../../context/employers/employerContextApi";

const ClientProfileView = () => {
  const { id } = useParams();
  const { employerProfiles, processEmployerProfile } =
    useContext(EmployerApiData);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  console.log(modalOpen);
  console.log(activeSection);
  console.log(clientProfileData);

  useEffect(async () => {
    processEmployerProfile(id);
  }, []);

  // Open modal handler with section
  const handleOpenSectionModal = (sectionKey) => {
    setActiveSection(sectionKey);
    setModalOpen(true);
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
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ClientProfileView;
