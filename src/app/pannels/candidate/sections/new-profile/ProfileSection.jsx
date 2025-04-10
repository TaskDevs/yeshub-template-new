import { GoPlus } from "react-icons/go";
import { BiSolidEdit } from "react-icons/bi";
import {
  AboutMeDetails,
  CertificationsDetails,
  EducationDetails,
  LicensesDetails,
  PortfolioDetails,
  SkillsDetails,
  TestimonialsDetails,
  WorkHistoryDetails,
  WorkHoursDetails,
} from "./profile-details-components";
import { ShareProfileModal } from "./ShareProfileModal";
import { useContext, useState } from "react";
import { FaShareAlt, FaStar } from "react-icons/fa";
import { ProfileApiData } from "../../../../context/user-profile/profileContextApi";
import { Avatar } from "@mui/material";
// Get the appropriate modal content based on active section
const getInfoContent = (data, activeSection) => {
  if (!activeSection) return null;

  switch (activeSection) {
    case "skills":
      return <SkillsDetails data={data} />;
    case "workHistory":
      return <WorkHistoryDetails data={data} />;
    case "education":
      return <EducationDetails data={data} />;
    case "portfolio":
      return <PortfolioDetails data={data} />;
    case "certifications":
      return <CertificationsDetails data={data} />;
    case "license":
      return <LicensesDetails data={data} />;
    case "testimonials":
      return <TestimonialsDetails data={data} />;
    case "workHours":
      return <WorkHoursDetails data={data} />;
    case "aboutMe":
      return <AboutMeDetails data={data} />;
    default:
      return null;
  }
};

export const ProfileSection = ({
  data,
  noData = true,
  activeSection,
  title,
  description,
  onClick,
}) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const { profileData } = useContext(ProfileApiData);
console.log(profileData)
  const username = sessionStorage.getItem("username");
  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).substr(-2);
    }
    return color;
  };
  const handleShareProfile = () => {
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };
  return (
    <div
      className={`bg-white ${
        activeSection === "aboutMe" ? "rounded-b-lg -mt-5" : "rounded-lg"
      } shadow px-8 py-6`}
    >
      {activeSection === "aboutMe" && (
        <div>
          {/* Header Section - Top Card */}
          <div className=" border-b border-gray-100 shadow-sm mb-6 w-full">
            <div className="py-6">
              <div className="flex justify-between">
                <div className="flex">
                  <div className="mr-4">
                    {data.profile_image ? (
                      <img
                        src={data?.profile_image}
                        alt={data?.firstname}
                        className="w-16 h-16 rounded-full"
                      />
                    ) : (
                      <Avatar
                        sx={{
                          bgcolor: stringToColor(username),
                          width: 60,
                          height: 60,
                          fontSize: "2rem",
                        }}
                     
                      >
                        {username.charAt(0).toUpperCase()}
                      </Avatar>
                    )}
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-capitalize">
                      {data.firstname} {data.lastname}
                    </h1>
                    <p className="text-gray-600 text-capitalize">{data?.user?.role}</p>
                    <div className="flex items-center mt-1">
                      <FaStar className="h-5 w-5 text-[#FACC15]" />
                      <span className="ml-1">{data.rating || 4.0}</span>
                      <span className="text-gray-500 ml-1">
                        ({data.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleShareProfile}
                  className="bg-[#305718] text-white px-4 py-2 rounded flex items-center gap-2 h-10"
                >
                  <FaShareAlt className="w-4 h-4" />
                  <span>Share Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-lg -mb-2">{title}</h2>

        {noData ? (
          <button onClick={onClick}>
            <GoPlus className="w-6 h-6 text-gray-400" />
          </button>
        ) : (
          <BiSolidEdit
            onClick={onClick}
            className="w-4 h-4 text-[#305718] cursor-pointer"
          />
        )}
      </div>
      {noData ? (
        <p className="text-gray-500 text-sm">{description}</p>
      ) : (
        <>{getInfoContent(data, activeSection)}</>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <ShareProfileModal onClose={closeShareModal} profileName={data.firstname} />
      )}
    </div>
  );
};
