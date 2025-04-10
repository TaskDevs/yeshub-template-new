import { GoPlus } from "react-icons/go";
import { BiSolidEdit } from "react-icons/bi";
import { useState } from "react";
import { ShareProfileModal } from "../../../candidate/sections/new-profile/ShareProfileModal";
import { AboutClientDetails, BusinessInfoDetails, CertificationsDetails, CompanyOverviewDetails, CompanyStatsDetails, OfficesDetails, ServicesDetails } from "./client-profile-details-components";

// Get the appropriate modal content based on active section
const getInfoContent = (data, activeSection, onEditProfile) => {
   if (!activeSection) return null;

   switch (activeSection) {
      case 'aboutMe':
         return <AboutClientDetails data={data} onEditProfile={onEditProfile} />;
      case 'services':
         return <ServicesDetails data={data} />;
      case 'offices':
         return <OfficesDetails data={data} />;
      case 'businessInfo':
         return <BusinessInfoDetails data={data} />;
      case 'companyStats':
         return <CompanyStatsDetails data={data} />;
      case 'certifications':
         return <CertificationsDetails data={data} />;
      case 'companyOverview':
         return <CompanyOverviewDetails data={data} />;
      default:
         return null;
   }
};

export const ProfileSection = ({ data, noData = true, activeSection, title, description, onClick }) => {
   const [showShareModal, setShowShareModal] = useState(false);

   // const handleShareProfile = () => {
   //    setShowShareModal(true);
   // };

   const closeShareModal = () => {
      setShowShareModal(false);
   };

   return (
      <div className={`bg-white ${activeSection === "aboutMe" ? "rounded-b-lg -mt-5" : "rounded-lg"} shadow px-8 py-6 w-full`}>
         <div className="flex justify-between mb-4">
            <h2 className="font-semibold  text-lg -mb-2">{title}</h2>

            {noData ? (<button onClick={onClick}>
               <GoPlus className="w-6 h-6 text-gray-400" />
            </button>) :
               <BiSolidEdit onClick={onClick} className={`${activeSection === "aboutMe" ? "hidden" : "block"}  w-4 h-4 text-[#305718] cursor-pointer`} />}
         </div>

         {noData ? (<p className="text-gray-500 text-sm">{description}</p>) :
            <>
               {getInfoContent(data, activeSection, onClick)}
            </>
         }

         {/* Share Modal */}
         {showShareModal && (
            <ShareProfileModal
               onClose={closeShareModal}
               profileName={data.name}
            />
         )}
      </div>
   )
};