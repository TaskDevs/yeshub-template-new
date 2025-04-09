import React from 'react'
import { ProfileSection } from './ProfileSection'
import styles from "./profile.module.css"

export const ClientProfileSectionsManager = ({ sectionKeyMap, clientData, profileSections }) => {
   return (
      <div className='space-y-5 mt-24'>
         {/* Render profile sections */}

         {/* About client */}
         <div className="grid grid-cols-1 gap-6 mb-6">
            <ProfileSection
               data={clientData}
               noData={!clientData?.companyName}
               onClick={profileSections[0]?.onClick}
               title={profileSections[0]?.companyName}
               description={profileSections[0]?.description}
               activeSection={sectionKeyMap[profileSections[0]?.title]}
            />
         </div>

         <div className='flex flex-row w-full items-start space-x-3'>
            {/* Left column */}
            {/* Company overview, Core Services and Our Offices  */}
            <div className={`flex flex-col items-start justify-start ${styles.clientLeftColumn}`}>
               <ProfileSection
                  data={clientData?.experience}
                  title={profileSections[1]?.title}
                  onClick={profileSections[1]?.onClick}
                  noData={!clientData?.experience.length}
                  description={profileSections[1]?.description}
                  activeSection={sectionKeyMap[profileSections[1]?.title]}
               />
               <ProfileSection
                  data={clientData?.services}
                  title={profileSections[2]?.title}
                  onClick={profileSections[2]?.onClick}
                  noData={!clientData?.services.length}
                  description={profileSections[2]?.description}
                  activeSection={sectionKeyMap[profileSections[2]?.title]}
               />
               <ProfileSection
                  data={clientData?.officeImages}
                  title={profileSections[3]?.title}
                  onClick={profileSections[3]?.onClick}
                  noData={!clientData?.officeImages.length}
                  description={profileSections[3]?.description}
                  activeSection={sectionKeyMap[profileSections[3]?.title]}
               />
            </div>

            {/* Right column */}
            {/* Business Information, Company Details and Certifications */}
            <div className={`flex flex-col items-start justify-start ${styles.clientRightColumn}`}>
               <ProfileSection
                  data={clientData?.contact}
                  title={profileSections[4]?.title}
                  onClick={profileSections[4]?.onClick}
                  description={profileSections[4]?.description}
                  activeSection={sectionKeyMap[profileSections[4]?.title]}
                  noData={!clientData?.contact.phone && !clientData?.contact.website && !clientData?.contact.linkedin}
               />
               <ProfileSection
                  data={clientData?.stats}
                  title={profileSections[5]?.title}
                  onClick={profileSections[5]?.onClick}
                  description={profileSections[5]?.description}
                  activeSection={sectionKeyMap[profileSections[5]?.title]}
                  noData={!clientData?.stats.foundedYear && !clientData?.stats.employeesCount && !clientData?.stats.clientsCount}
               />
               <ProfileSection
                  data={clientData?.certifications}
                  title={profileSections[6]?.title}
                  onClick={profileSections[6]?.onClick}
                  noData={!clientData?.certifications.length}
                  description={profileSections[6]?.description}
                  activeSection={sectionKeyMap[profileSections[6]?.title]}
               />
            </div>
         </div>
      </div>
   )
}
