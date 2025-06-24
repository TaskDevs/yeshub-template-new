import React from 'react';
import {
  X,
  BadgeCheck,
  Clock,
  MapPin,
  Verified,
  Download,
  FileText,

} from 'lucide-react';

const ProposalModal = ({ isOpen, onClose,  proposal }) => {
  if (!isOpen) return null;

 const getFileNameFromUrl = (url) => {
  try {
    return decodeURIComponent(url.split('/').pop());
  } catch {
    return 'Attachment';
  }
};

const forceDownload = async (fileUrl, filename = "attachment.pdf") => {
  try {
    const response = await fetch(fileUrl, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[70vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            {proposal.job_title || "Proposal Details"}
            <span className="text-xs bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded">
              Proposal Sent
            </span>
          </h2>
          <div className="text-sm text-gray-600 flex items-center justify-between mt-1">
            <div className="flex items-center gap-2">
              <span>Client: <strong>{proposal.client_name}</strong></span>
              <span className="flex items-center gap-1 text-green-600">
                <BadgeCheck size={14} /> Payment Verified
              </span>
            </div>
            <span className="flex items-center gap-1 text-gray-500">
              <Clock size={14} /> {proposal.sent}
            </span>
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4 border rounded-lg p-4 mb-6">
          <img
            src={proposal.profile_image || "/default-profile.png"}
            alt="Profile"
            className="rounded-full w-16 h-16 object-cover border"
          />
          <div>
            <p className="font-semibold text-gray-800 text-capitalize">{proposal.user_name}</p>
            <p className="text-sm text-gray-600 text-capitalize">{proposal.profession}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1 text-capitalize">
              <MapPin size={12} /> 
              {proposal.country}, {proposal.region}, {proposal.city}
            </p>
            <div className="flex gap-2 mt-1">
              <span className="text-green-700 text-xs bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <BadgeCheck size={12} /> {proposal?.proposal?.top_status}
              </span>
              <span className="text-blue-700 text-xs bg-blue-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Verified size={12} /> ID Verified
              </span>
            </div>
          </div>
        </div>

        {/* Bid/Project Info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-sm text-gray-700">
          <div>
            <p className="text-gray-500">Your Bid</p>
            <p className="font-semibold"> ₵{proposal?.proposal?.fix_rate ?? proposal?.proposal?.hourly_rate}
</p>
          </div>
          <div>
            <p className="text-gray-500">Client Budget</p>
            <p className="font-semibold">₵{proposal?.budget}</p>
          </div>
          <div>
            <p className="text-gray-500">Project Length</p>
            <p className="font-semibold text-capitalize">{proposal.job_type}<br/>({proposal.proposal.completion_day}/{proposal.proposal.completion})</p>
          </div>
          <div>
            <p className="text-gray-500">Proposal Status</p>
            <p className="font-semibold text-green-600">{proposal.proposal.stage}</p>
          </div>
        </div>

        {/* Cover Letter */}
        <div className="mb-8">
          <h3 className="text-base font-semibold text-gray-800 mb-2">Cover Letter</h3>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {proposal.proposal?.cover_letter || "No cover letter provided."}
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-base font-semibold text-gray-800 mb-2">Project Understanding</h3>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {proposal.proposal?.project_understanding || "No other details."}
          </p>
        </div>

        {/* Skills & Experience */}
        <div className="mb-6">
          <h3 className="text-base font-semibold text-gray-800 mb-2">Skills & Experience</h3>
          <div className="flex flex-wrap gap-2 text-xs text-gray-700 mb-3">
            {proposal.skills.map(skill => (
              <span key={skill} className="bg-gray-100 px-2 py-1 rounded">{skill}</span>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 text-sm text-gray-700 mb-4">
            <div>
              <p className="text-gray-500">Experience Level</p>
              <p className="font-medium">{proposal.experience}</p>
            </div>
          </div>
        
        </div>

        {/* Additional Information */}
        {/* <div className="mb-6">
          <h3 className="text-base font-semibold text-gray-800 mb-2">Additional Information</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 text-sm text-gray-700 mb-4">
            <div>
              <p className="text-gray-500">Job Success</p>
              <p className="font-medium">98%</p>
            </div>
          </div>
        </div> */}

        {/* Attachments */}
        <div className="mb-6">
          <h3 className="text-base font-semibold text-gray-800 mb-2">Attachments</h3>
          {proposal?.proposal.attachment && (
          <div className="flex items-center justify-between bg-gray-50 border p-3 rounded">
            <div className="flex items-center gap-2 text-sm text-gray-800">
              <FileText size={16} />
               {getFileNameFromUrl(proposal?.proposal.attachment)}
            </div>
            <button 
             onClick={() => {
              const fileName = proposal?.proposal?.attachment.split("/").pop();
              forceDownload(proposal?.proposal?.attachment, fileName);
            }}
             className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center gap-1">
              <Download size={14} /> Download
            </button>
          </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProposalModal;
