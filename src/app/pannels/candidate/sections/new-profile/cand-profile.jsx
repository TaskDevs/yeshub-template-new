import React, { useState } from 'react';
import { FaCalendar, FaShareAlt, FaStar } from 'react-icons/fa';
import {
  MdLocationOn,
  MdLanguage,
} from 'react-icons/md';
import { BiSolidEdit } from 'react-icons/bi';
import { FaCediSign } from 'react-icons/fa6';
import { ProfileSection } from './ProfileSection';
import { InfoGridItem } from './InfoGridItem';
import { ShareProfileModal } from './ShareProfileModal';
import { candidateData, profileSections } from './data';

const SectionHeader = ({ title, icon = <BiSolidEdit className="w-4 h-4 text-[#305718]" /> }) => (
  <div className="flex justify-between mb-4">
    <h2 className="font-bold">{title}</h2>
    <button className="text-green-700">
      {icon}
    </button>
  </div>
);

const CandidateProfile = () => {
  const [showShareModal, setShowShareModal] = useState(false);

  const handleShareProfile = () => {
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  return (
    <div className="tw-css site-bg-gray min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-6 ">

        <div className='bg-white w-full px-4'>
          {/* Header Section - Top Card */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-6">
              <div className="flex justify-between">
                <div className="flex">
                  <div className="mr-4">
                    <img src={candidateData.avatar} alt={candidateData.name} className="w-16 h-16 rounded-full" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">{candidateData.name}</h1>
                    <p className="text-gray-600">{candidateData.title}</p>
                    <div className="flex items-center mt-1">
                      <FaStar className="h-5 w-5 text-[#FACC15]" />
                      <span className="ml-1">{candidateData.rating}</span>
                      <span className="text-gray-500 ml-1">({candidateData.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleShareProfile}
                  className="bg-green-800 text-white px-4 py-2 rounded flex items-center gap-2 h-10"
                >
                  <FaShareAlt className="w-4 h-4" />
                  <span>Share Profile</span>
                </button>
              </div>
            </div>
          </div>

          {/* About Me Section */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-6">
              <SectionHeader title="About Me" />
              <p className="text-gray-700">
                {candidateData.about}
              </p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6 shadow rounded-b-md pb-4">
            {/* Left column */}
            <div className="space-y-6">
              <InfoGridItem
                icon={<MdLocationOn className="w-4 h-4 text-[#4B5563]" />}
                title="Location"
              >
                <p className="text-[#4B5563]">{candidateData.location}</p>
              </InfoGridItem>

              <InfoGridItem
                icon={<MdLanguage className="w-4 h-4 text-[#4B5563]" />}
                title="Languages"
              >
                <div className='flex flex-row items-center'>
                  {candidateData.languages.map((lang, index) => (
                    <>
                      <p className="text-[#4B5563]" key={index}>{lang.language} ({lang.proficiency}) </p>  {index < candidateData.languages.length && index < candidateData.languages.length - 1 && <span className='-ml-4 -mr-2.5'>,</span>}
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
                <p className="text-[#4B5563]">${candidateData.rate}</p>
              </InfoGridItem>

              <InfoGridItem
                icon={<FaCalendar className="w-4 h-4 text-[#4B5563]" />}
                title="Member Since"
              >
                <p className="text-[#4B5563]">{candidateData.memberSince}</p>
              </InfoGridItem>
            </div>
          </div>
        </div>

        {/* Skills and Work History */}
        <div className="grid md:grid-cols-2 gap-6 mb-10 ">
          {/* Skills */}
          <div className="bg-white rounded-lg shadow p-6">
            <SectionHeader title="Skills" />
            <div className="flex flex-wrap items-start justify-start gap-2">
              {candidateData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Work History */}
          <div className="bg-white rounded-lg shadow p-6">
            <SectionHeader title="Work History" />
            <div className="space-y-4">
              {candidateData.workHistory.map((job, index) => (
                <div key={index} className="pb-3">
                  <h3 className="font-medium">{job.role}</h3>
                  <p className="text-gray-500 text-sm">{job.period}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Empty profile sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <ProfileSection title={profileSections[0].title} description={profileSections[0].description} onClick={profileSections[0].onClick} />
          <ProfileSection title={profileSections[1].title} description={profileSections[1].description} onClick={profileSections[1].onClick} />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <ProfileSection title={profileSections[2].title} description={profileSections[2].description} onClick={profileSections[2].onClick} />
          <ProfileSection title={profileSections[3].title} description={profileSections[3].description} onClick={profileSections[3].onClick} />
        </div>

        <div className="grid md:grid-cols-2 md:mb-0 gap-6 mb-[5rem]">
          <ProfileSection title={profileSections[4].title} description={profileSections[4].description} onClick={profileSections[4].onClick} />
          <ProfileSection title={profileSections[5].title} description={profileSections[5].description} onClick={profileSections[5].onClick} />
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <ShareProfileModal
            onClose={closeShareModal}
            profileName={candidateData.name}
          />
        )}
      </div>
    </div>
  );
};

export default CandidateProfile;