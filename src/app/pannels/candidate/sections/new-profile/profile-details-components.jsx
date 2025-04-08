import { MdLanguage, MdLocationOn } from "react-icons/md"
import { InfoGridItem } from "./InfoGridItem"
import { FaCediSign, FaIdCard } from "react-icons/fa6"
import { HiBadgeCheck } from "react-icons/hi";
import { FaExternalLinkAlt, FaCircle, FaCalendar, FaBriefcase, FaClock, FaCalendarAlt, FaGlobeAmericas, FaStar, FaQuoteLeft, FaLink, } from 'react-icons/fa';
import { GoDotFill } from "react-icons/go";

export const WorkHistoryDetails = ({ data }) => (
  <div className="space-y-4">
    {data?.map((job, index) => (
      <div key={index} className="pb-3">
        <h3 className="font-medium">{job.role}</h3>
        <p className="text-gray-500 text-sm">{job.period}</p>
      </div>
    ))}
  </div>
)

export const SkillsDetails = ({ data }) => (
  <div className="flex flex-wrap items-start justify-start gap-2">
    {data.map((skill, index) => (
      <span
        key={index}
        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm"
      >
        {skill}
      </span>
    ))}
  </div>
)

// Licenses 
export const LicensesDetails = ({ data }) => (
  <div className="flex flex-col justify-start w-full space-y-6">
    {data.map((license, index) => (
      <div key={index} className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-start mb-3">
          <FaIdCard className="text-blue-600 " size={18} />
          <h3 className="-ml-1 font-bold text-gray-800">{license.licenseName}</h3>
        </div>

        <div className="ml-7 space-y-2">
          <div className="text-gray-700">
            <span className="font-medium">Issuing Organization:</span> {license.issuingOrganization}
          </div>

          <div className="text-gray-700">
            <span className="font-medium">License Number:</span> {license.licenseNumber}
          </div>

          <div className="flex items-center justify-start gap-0 text-gray-600 text-sm mt-1">
            <FaCalendarAlt className="mr-2" size={14} />
            <span>Issued: {new Date(license.issueDate).toLocaleDateString()}</span>
            {!license.neverExpires && license.expirationDate && (
              <span className="flex items-center justify-start gap-0 "> <GoDotFill size={8} className="mx-1 text-gray-400" /> Expires: {new Date(license.expirationDate).toLocaleDateString()}</span>
            )}
            {license.neverExpires && (
              <span className="flex items-center justify-start gap-0  text-green-600"> <GoDotFill size={8} className="mx-1 text-gray-400" /> Never Expires</span>
            )}
          </div>

          {license.description && (
            <div className="text-gray-600 mt-2 text-sm border-t border-gray-100 pt-2">
              {license.description}
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);

// Certifications 
export const CertificationsDetails = ({ data }) => (
  <div className="flex flex-col justify-start w-full space-y-6">
    {data.map((cert, index) => (
      <div key={index} className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-start mb-3">
          <HiBadgeCheck className="text-green-600" size={18} />
          <h3 className="-ml-1 font-bold text-gray-800">{cert.certificationName}</h3>
        </div>

        <div className="ml-7 space-y-2">
          <div className="text-gray-700">
            <span className="font-medium">Issuing Organization:</span> {cert.issuingOrganization}
          </div>

          <div className="text-gray-700 flex items-center justify-start">
            <span className="font-medium">Credential ID:</span>
            <span className="-ml-2.5">{cert.credentialID}</span>
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 ml-auto flex items-center justify-end gap-1 font-bold text-sm hover:underline"
              >
                <FaExternalLinkAlt size={12} className="mr-1" /> Verify
              </a>
            )}
          </div>

          <div className="flex items-center justify-start gap-0 text-gray-600 text-sm mt-1">
            <FaCalendarAlt className="mr-2" size={14} />
            <span>Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>
            {cert.hasExpiry && cert.expiryDate && (
              <span className="flex items-center justify-start gap-0 "> <GoDotFill size={8} className="mx-1 text-gray-400" /> Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
            )}
          </div>

          {cert.description && (
            <div className="text-gray-600 mt-2 text-sm border-t border-gray-100 pt-2">
              {cert.description}
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);

export const EducationDetails = ({ data }) => (
  <div className="flex flex-col flex-wrap items-start justify-start gap-2 space-y-5">
    {data.map((education, index) => (
      <div key={index} className="flex flex-col items-start -space-y-4">
        <div className="text-gray-500 text-sm ml-12">
          {education.startDate} to {education.endDate}
        </div>

        <div className="flex items-center justify-start">
          <FaCircle className="text-green-700 text-xs " />
          <p className="flex items-center justify-start text-green-700 font-medium">
            <hr className="bg-green-700 opacity-100 -mx-2.5 h-0.5 w-6 border-none" />
            {education.institutionName}</p>
        </div>

        <div className="ml-12 pt-2">
          <div className="font-semibold text-black text-sm">
            {education.degree}
          </div>
          <div className="text-gray-600 mt-1.5 text-sm">
            {education.description}
          </div>
        </div>
      </div>
    ))}
  </div>
);

// WorkHoursDetails 
export const WorkHoursDetails = ({ data }) => (
  <div className="flex flex-col justify-start w-full">
    <div className="flex items-center justify-start w-full">
      <div className="justify-start bg-green-100 p-2 rounded-full">
        <FaBriefcase className="text-green-700" />
      </div>
      <div>
        <span className="font-medium">Availability</span>
        <p className="text-gray-600 capitalize">{data.availability}</p>
      </div>
    </div>

    <div className="flex items-center justify-start w-full">
      <div className="bg-blue-100 p-2 rounded-full">
        <FaClock className="text-blue-700" />
      </div>
      <div >
        <span className="font-medium">Working Hours</span>
        <p className="text-gray-600">
          {data.preferredWorkingHours === 'standard' ? 'Standard (9AM - 5PM)' :
            data.preferredWorkingHours === 'flexible' ? 'Flexible Hours' :
              `${data.customStartHour} - ${data.customEndHour}`}
        </p>
      </div>
    </div>

    <div className="flex items-center justify-start w-full">
      <div className="bg-purple-100 p-2 rounded-full">
        <FaCalendarAlt className="text-purple-700" />
      </div>
      <div>
        <span className="font-medium">Work Days</span>
        <div className="flex flex-wrap gap-2 mt-2">
          {Object.keys(data.workDays).map((day) => (
            <span
              key={day}
              className={`px-3 py-1 rounded-full text-xs ${data.workDays[day]
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-gray-100 text-gray-400 border border-gray-200'
                }`}
            >
              {day.charAt(0).toUpperCase() + day.slice(1, 3)}
            </span>
          ))}
        </div>
      </div>
    </div>

    <div className="flex flex-row items-center justify-between w-full">
      <div className="flex items-center justify-start w-full">
        <div className="bg-orange-100 p-2 rounded-full">
          <FaGlobeAmericas className="text-orange-700" />
        </div>
        <div>
          <span className="font-medium">Time Zone</span>
          <p className="text-gray-600">{data.timeZone}</p>
        </div>
      </div>

      <div className="flex items-center justify-start w-full">
        <div className="bg-red-100 p-2 rounded-full">
          <FaClock className="text-red-700" />
        </div>
        <div >
          <span className="font-medium">Notice Period</span>
          <p className="text-gray-600">{data.notice}</p>
        </div>
      </div>
    </div>
  </div>
);

// TestimonialsDetails 
export const TestimonialsDetails = ({ data }) => (
  <div className="space-y-6">
    {data.map((testimonial, index) => (
      <div key={index} className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-semibold text-lg">{testimonial.clientName}</h4>
            <p className="text-gray-600 text-sm">
              {testimonial.clientPosition} at {testimonial.clientCompany}
            </p>
            <p className="text-gray-500 text-xs mt-1">Relationship: {testimonial.relationship}</p>
          </div>
          <div className="flex gap-0">
            {[...Array(parseInt(testimonial.rating))].map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
            {[...Array(5 - parseInt(testimonial.rating))].map((_, i) => (
              <FaStar key={i + parseInt(testimonial.rating)} className="text-gray-200" />
            ))}
          </div>
        </div>

        <div className="relative mt-4 text-gray-700 italic">
          <FaQuoteLeft className="absolute -left-1 -top-1 text-gray-400 opacity-50" size={20} />
          <p className="pl-6">{testimonial.testimonialText}</p>
        </div>

        <div className="mt-4 text-right text-gray-400 text-xs">
          {new Date(testimonial.testimonialDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>
    ))}
  </div>
);

// PortfolioDetails 
export const PortfolioDetails = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {data.map((project, index) => (
      <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {project.images && project.images.length > 0 && (
          <div className="h-28 overflow-hidden bg-gray-100">
            <img
              src={project.images[0]}
              alt={project.projectTitle}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-5">
          <h3 className="font-bold text-lg mb-2">{project.projectTitle}</h3>

          <div className="flex items-center text-gray-600 text-sm mb-3">
            <div className="flex items-center justify-start">
              <FaBriefcase className="text-gray-500" />
              <span>{project.role}</span>
            </div>
            {project.current && (
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Current Project
              </span>
            )}
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {project.description}
          </p>

          <div className="mb-4">
            <div className="flex flex-wrap justify-start gap-2">
              {project.skills.split(', ').map((skill, i) => (
                <span
                  key={i}
                  className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-start">
              <FaCalendarAlt />
              <span>
                {project.startDate} – {project.current ? 'Present' : project.endDate}
              </span>
            </div>

            {project.projectUrl && (
              <a
                href={project.projectUrl}
                className="flex items-center text-green-700 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLink className="-mr-2" />
                <span className="font-semibold text-sm">View Project</span>
              </a>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const AboutMeDetails = ({ data }) => (
  <div className="flex flex-wrap items-start justify-start gap-2">
    {/* About Me  */}
    <div className="bg-white mb-6">
      <div className="mt-1">
        <p className="text-gray-700">
          {data.about}
        </p>
      </div>
    </div>

    {/* Info Grid */}
    <div className="grid grid-cols-2 gap-6 pb-4">
      {/* Left column */}
      <div className="space-y-6">
        <InfoGridItem
          icon={<MdLocationOn className="w-4 h-4 text-[#4B5563]" />}
          title="Location"
        >
          <p className="text-[#4B5563]">{data.location}</p>
        </InfoGridItem>

        <InfoGridItem
          icon={<MdLanguage className="w-4 h-4 text-[#4B5563]" />}
          title="Languages"
        >
          <div className='flex flex-row items-center'>
            {data.languages.map((lang, index) => (
              <>
                <p className="text-[#4B5563]" key={index}>{lang.language} ({lang.proficiency}) </p>  {index < data.languages.length && index < data.languages.length - 1 && <span className='-ml-4 -mr-2.5'>,</span>}
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
          <p className="text-[#4B5563]">${data.rate}</p>
        </InfoGridItem>

        <InfoGridItem
          icon={<FaCalendar className="w-4 h-4 text-[#4B5563]" />}
          title="Member Since"
        >
          <p className="text-[#4B5563]">{data.memberSince}</p>
        </InfoGridItem>
      </div>
    </div>
  </div>
)