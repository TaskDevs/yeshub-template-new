import React from "react";
import { BiSolidEdit } from "react-icons/bi";
import {
   FaStar,
   FaGlobe,
   FaUsers,
   FaClock,
   FaEnvelope,
   FaLinkedin,
   FaHandshake,
   FaCalendarAlt,
   FaExternalLinkAlt,
   FaPhoneAlt
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

export const ServicesDetails = ({ data }) => (
   <div className="flex flex-wrap justify-start items-start gap-2 mt-2 w-full">
      {data.map((service, index) => (
         <span
            key={index}
            className="bg-gray-100 hover:bg-gray-200 text-[#305718] px-4 py-1.5 rounded-full text-sm transition-colors"
         >
            {service}
         </span>
      ))}
   </div>
);

export const OfficesDetails = ({ data }) => (
   <div className="grid grid-cols-3 gap-4 justify-start items-start w-full mt-2">
      {data.map((image, index) => (
         <div key={index} className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img
               src={image}
               alt={`Office ${index + 1}`}
               className="w-full h-48 object-cover"
            />
         </div>
      ))}
   </div>
);

export const BusinessInfoDetails = ({ data }) => (
   <div className="space-y-2">
      <div className="flex items-center justify-start -space-x-1">
         <FaPhoneAlt className="text-gray-500" />
         <a href={`tel:${data.phone}`} className="text-[#374151] hover:underline flex items-center">
            {data.phone}
         </a>
      </div>

      <div className="flex items-center justify-start -space-x-1">
         <FaEnvelope className="text-gray-500" />
         <a href={`mailto:${data.email}`} className="text-[#374151] hover:underline flex items-center">
            {data.email}
         </a>
      </div>

      <div className="flex items-center justify-start -space-x-1">
         <FaGlobe className="text-gray-500" />
         <a href={`https://${data.website}`} target="_blank" rel="noopener noreferrer" className="text-[#374151] hover:underline flex items-center">
            {data.website}
         </a>
      </div>

      <div className="flex items-center justify-start -space-x-1">
         <FaLinkedin className="text-gray-500" />
         <a href={`https://${data.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-[#374151] hover:underline flex items-center">
            {data.linkedin}
         </a>
      </div>
   </div>
);

export const CompanyStatsDetails = ({ data }) => (
   <div className="space-y-2">
      <div className="flex items-center justify-between">
         <div className="flex items-center -space-x-1">
            <FaCalendarAlt className="text-gray-500" />
            <span>Founded</span>
         </div>
         <span>{data.foundedYear}</span>
      </div>

      <div className="flex items-center justify-between">
         <div className="flex items-center -space-x-1">
            <FaUsers className="text-gray-500" />
            <span>Employees</span>
         </div>
         <span>{data.employeesCount}</span>
      </div>

      <div className="flex items-center justify-between">
         <div className="flex items-center -space-x-1">
            <FaHandshake className="text-gray-500" />
            <span>Clients</span>
         </div>
         <span>{data.clientsCount}</span>
      </div>
   </div>
);

export const CertificationsDetails = ({ data }) => (
   <div className="space-y-6">
      {data.map((cert, index) => (
         <div key={index} className="pb-2">
            <div className="flex items-start">
               <div className="flex-grow">
                  <h3 className="font-medium flex items-center">
                     {cert.title}
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
                  </h3>
                  <p className="text-gray-600">{cert.organization}</p>
                  <div className="flex items-center justify-start text-gray-500 text-sm mt-1 -space-x-1">
                     <FaCalendarAlt size={14} />
                     <span>{cert.startDate} - {cert.endDate}</span>
                  </div>
               </div>
            </div>
         </div>
      ))}
   </div>
);

export const CompanyOverviewDetails = ({ data }) => (
   <div className="space-y-4">
      {data.map((item, index) => (
         <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
            <div className="flex flex-col justify-start items-start gap-0 space-y-0">
               <div className="flex items-center justify-between w-full text-gray-500 text-sm">
                  <h3 className="font-medium text-base">{item.title}</h3>
                  <span className="font-medium text opacity-100 text-black">{item.startDate} - {item.endDate}</span>
               </div>
               <div className="flex justify-between items-center w-full">
                  <span className="text-gray-600">Revenue: {item.revenue}</span>
                  <span>{item.employmentType}</span>
               </div>

               <p className="text-gray-700 pt-2">{item.description}</p>
            </div>
         </div>
      ))}
   </div>
);

export const AboutClientDetails = ({ data, onEditProfile }) => {
   // Generate full stars and empty stars based on rating
   const fullStars = Math.floor(data.rating);
   const emptyStars = 5 - fullStars;

   return (
      <div className="flex flex-col justify-start w-full">
         {/* Cover Image */}
         <div className="w-full h-36 rounded-lg overflow-hidden mb-4">
            <img
               src={data.coverImage}
               alt="Cover"
               className="w-full h-full object-cover"
            />
         </div>

         <div className="flex flex- justify-start items-start w-full">
            {/* Logo/Profile Image */}
            <div className="mr-2 mb-4 sm:mb-0">
               <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
                  <img
                     src={data.logo}
                     alt={data.name}
                     className="w-full h-full object-cover"
                  />
               </div>
            </div>

            {/* Profile Information */}
            <div className="flex-1">
               <div className="flex justify-between items-start mb-1">
                  <div>
                     <h1 className="text-xl font-semibold">{data.companyName}</h1>
                     <p className="text-gray-600 text-sm">{data.headline}</p>
                  </div>
                  <button
                     onClick={onEditProfile}
                     className="bg-[#305718] text-white px-4 py-2 rounded flex items-center gap-2 h-10"
                  >
                     <BiSolidEdit className="w-4 h-4" />
                     <span> Edit Profile</span>
                  </button>
               </div>

               {/* Rating */}
               <div className="flex items-center justify-start gap-1 mb-2">
                  <div className="flex gap-0">
                     {[...Array(fullStars)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                     ))}
                     {[...Array(emptyStars)].map((_, i) => (
                        <FaStar key={i + fullStars} className="text-gray-200" />
                     ))}
                  </div>
                  <span className="text-gray-700 ml-1">{data.rating}</span>
                  <span className="text-gray-500 text-sm">({data.reviewsCount} reviews)</span>
               </div>

               {/* Location & Contact Info */}
               <div className="flex flex-wrap items-center justify-start text-gray-600 text-sm gap-y-1">
                  <div className="flex items-center justify-start gap-1">
                     <MdLocationOn className="w-4 h-4 text-[#9CA3AF]" />
                     <span>{data.city}, {data.country}</span>
                  </div>
                  <div className="flex items-center justify-start gap-1">

                     <FaClock className=" text-[#9CA3AF]" />
                     <span>{data.timezone}</span>
                  </div>
                  <div className="flex items-center justify-start gap-1">
                     <FaEnvelope className=" text-[#9CA3AF]" />
                     <span>{data.email}</span>
                  </div>
               </div>

               {/* description */}
               <div className="mt-4 text-gray-700">
                  <p>{data.about}</p>
               </div>
            </div>
         </div>
      </div>
   );
};