import { GoPlus } from "react-icons/go";
import { BiSolidEdit } from "react-icons/bi";
import { AboutMeDetails, CertificationsDetails, EducationDetails, LicensesDetails, PortfolioDetails, SkillsDetails, TestimonialsDetails, WorkHistoryDetails, WorkHoursDetails } from "./profile-details-components";

// Get the appropriate modal content based on active section
const getInfoContent = (data, activeSection) => {
  if (!activeSection) return null;

  switch (activeSection) {
    case 'skills':
      return <SkillsDetails data={data} />;
    case 'workHistory':
      return <WorkHistoryDetails data={data} />;
    case 'education':
      return <EducationDetails data={data} />;
    case 'portfolio':
      return <PortfolioDetails data={data} />;
    case 'certifications':
      return <CertificationsDetails data={data} />;
    case 'license':
      return <LicensesDetails data={data} />;
    case 'testimonials':
      return <TestimonialsDetails data={data} />;
    case 'workHours':
      return <WorkHoursDetails data={data} />;
    case 'aboutMe':
      return <AboutMeDetails data={data} />;
    default:
      return null;
  }
};

export const ProfileSection = ({ data, noData = true, activeSection, title, description, onClick }) => (
  <div className="bg-white rounded-lg shadow px-8 py-6">
    <div className="flex justify-between mb-4">
      <h2 className="font-bold">{title}</h2>

      {noData ? (<button onClick={onClick}>
        <GoPlus className="w-6 h-6 text-gray-400" />
      </button>) : <BiSolidEdit onClick={onClick} className="w-4 h-4 text-[#305718] cursor-pointer" />}
    </div>
    {noData ? (<p className="text-gray-500 text-sm">{description}</p>) :
      <>
        {getInfoContent(data, activeSection)}
      </>
    }
  </div>
);