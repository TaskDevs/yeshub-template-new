import { MdLanguage, MdLocationOn } from "react-icons/md"
import { InfoGridItem } from "./InfoGridItem"
import { FaCediSign } from "react-icons/fa6"
import { FaCalendar } from "react-icons/fa"

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
export const LicensesDetails = ({ data }) => (
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
export const CertificationsDetails = ({ data }) => (
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
        
export const EducationDetails = ({ data }) => (
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
        
export const PortfolioDetails = ({ data }) => (
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
export const WorkHoursDetails = ({ data }) => (
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
        
export const TestimonialsDetails = ({ data }) => (
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