import { GoPlus } from "react-icons/go";
import { BiSolidEdit } from "react-icons/bi";
import toast from "react-hot-toast";
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
import { useContext, useState, useRef } from "react";
import { FaShareAlt, FaStar } from "react-icons/fa";
import { ProfileApiData } from "../../../../context/user-profile/profileContextApi";
import { Avatar } from "@mui/material";

// Determines which modal content to show
const getInfoContent = (data, activeSection) => {
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { processUpdateUserLogo } = useContext(ProfileApiData);
  const userId = sessionStorage.getItem("userId");
  const username =
    sessionStorage.getItem("username") || `${data.firstname?.charAt(0) ?? "U"}`;

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

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("profile_image", file);
    formData.append("_method", "PUT");
    try {
      setIsUploading(true);
      await processUpdateUserLogo(userId, formData);
      toast.success("Profile image updated");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleShareProfile = () => setShowShareModal(true);
  const closeShareModal = () => setShowShareModal(false);

  return (
    <div
      className={`bg-white ${
        activeSection === "aboutMe" ? "rounded-b-lg -mt-5" : "rounded-lg"
      } shadow px-8 py-6`}
    >
      {activeSection === "aboutMe" && (
        <div className="mb-6 w-full">
          <div className="flex justify-between sm:flex-row sm:justify-between sm:items-center items-center sm:justify-center mb-4">
            {/* Avatar and Info */}
            <div className="flex items-center gap-4">
              {/* Avatar Upload */}
              <div className="relative group shrink-0">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div
                  onClick={handleImageClick}
                  className="group cursor-pointer w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white shadow-md bg-white relative"
                >
                  {selectedImage || data.profile_image ? (
                    <img
                      src={selectedImage || data.profile_image}
                      alt={data.firstname}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Avatar
                      sx={{
                        bgcolor: stringToColor(username),
                        width: "100%",
                        height: "100%",
                        fontSize: "2rem",
                      }}
                    >
                      {username?.charAt(0).toUpperCase()}
                    </Avatar>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-white text-sm">Change</span>
                  </div>
                </div>
                {isUploading && (
                  <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-70 flex items-center justify-center rounded-full">
                    <div className="loader border-t-2 border-green-600 rounded-full w-6 h-6 animate-spin" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-left">
                <h1 className="text-lg font-bold capitalize">
                  {data.firstname} {data.lastname}
                </h1>
                <p className="text-gray-600 capitalize">
                  {data?.user?.role || "Full Stack Developer"}
                </p>
                <div className="flex items-center mt-1">
                  <FaStar className="h-4 w-4 text-[#FACC15]" />
                  <span className="text-sm">{data.rating || 4.9}</span>
                  <span className="text-gray-500 ml-1 text-sm">
                    ({data.reviews || 125} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Share Button */}
            <div className="flex justify-center sm:justify-end">
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
      )}

      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-lg -mb-2">{title}</h2>

        {noData ||
        !["aboutMe", "skills", "workHours"].includes(activeSection) ? (
          <button onClick={onClick}>
            <GoPlus className="w-6 h-6 text-gray-400" />
          </button>
        ) : (
          <></>
        )}

        {!noData &&
        (activeSection === "aboutMe" || activeSection === "skills") ? (
          <BiSolidEdit
            onClick={onClick}
            className="w-4 h-4 text-[#305718] cursor-pointer"
          />
        ) : (
          <></>
        )}
      </div>

      {noData ? (
        <p className="text-gray-500 text-sm">{description}</p>
      ) : (
        <>{getInfoContent(data, activeSection, onClick)}</>
      )}

      {showShareModal && (
        <ShareProfileModal
          onClose={closeShareModal}
          profileName={data.firstname}
          id={data?.id}
        />
      )}
    </div>
  );
};
