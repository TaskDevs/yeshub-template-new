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

const ProposalModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
            Senior Frontend Developer
            <span className="text-xs bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded">
              Proposal Sent
            </span>
          </h2>
          <div className="text-sm text-gray-600 flex items-center justify-between mt-1">
            <div className="flex items-center gap-2">
              <span>Client: <strong>InnoTech Solutions</strong></span>
              <span className="flex items-center gap-1 text-green-600">
                <BadgeCheck size={14} /> Payment Verified
              </span>
            </div>
            <span className="flex items-center gap-1 text-gray-500">
              <Clock size={14} /> Sent 2 days ago
            </span>
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4 border rounded-lg p-4 mb-6">
          <img
            src="https://placehold.co/64x64"
            alt="Profile"
            className="rounded-full w-16 h-16 object-cover border"
          />
          <div>
            <p className="font-semibold text-gray-800">Michael Anderson</p>
            <p className="text-sm text-gray-600">Senior Frontend Developer</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <MapPin size={12} /> London, United Kingdom (GMT+1)
            </p>
            <div className="flex gap-2 mt-1">
              <span className="text-green-700 text-xs bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <BadgeCheck size={12} /> Top Rated Plus
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
            <p className="font-semibold"> ₵90 - $120/hr</p>
          </div>
          <div>
            <p className="text-gray-500">Client Budget</p>
            <p className="font-semibold"> ₵80 - ₵150/hr</p>
          </div>
          <div>
            <p className="text-gray-500">Project Length</p>
            <p className="font-semibold">Full-time<br />(40hrs/week)</p>
          </div>
          <div>
            <p className="text-gray-500">Proposal Status</p>
            <p className="font-semibold text-green-600">Under Review</p>
          </div>
        </div>

        {/* Cover Letter */}
        <div className="mb-8">
          <h3 className="text-base font-semibold text-gray-800 mb-2">Cover Letter</h3>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            Hello InnoTech Solutions team,

            I am excited about the opportunity to join your growing team as a Senior Frontend Developer. With over 8 years of experience building modern, responsive web applications using React, Vue, and Angular, I believe be a great fit for your team.

            My recent work includes developing a complex dashboard application for a fintech company that improved user engagement by 35%. I specialize in creating clean...
          </p>
        </div>

        {/* Skills & Experience */}
        <div className="mb-6">
          <h3 className="text-base font-semibold text-gray-800 mb-2">Skills & Experience</h3>
          <div className="flex flex-wrap gap-2 text-xs text-gray-700 mb-3">
            {[
              'React',
              'Vue.js',
              'TypeScript',
              'JavaScript',
              'CSS/SASS',
              'Responsive Design',
              'Redux',
              'GraphQL',
            ].map(skill => (
              <span key={skill} className="bg-gray-100 px-2 py-1 rounded">{skill}</span>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 text-sm text-gray-700 mb-4">
            <div>
              <p className="text-gray-500">Years of Experience</p>
              <p className="font-medium">8+ years</p>
            </div>
            <div>
              <p className="text-gray-500">Projects Completed</p>
              <p className="font-medium">47</p>
            </div>
          </div>
          <p className="text-sm text-gray-800 font-semibold mb-1">Recent Similar Projects</p>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Financial Dashboard UI for InvestPro (React, TypeScript)</li>
            <li>Ecommerce Platform Frontend for ShopEase (Vue.js)</li>
            <li>Healthcare Patient Portal (Angular, RxJS)</li>
          </ul>
        </div>

        {/* Additional Information */}
        <div className="mb-6">
          <h3 className="text-base font-semibold text-gray-800 mb-2">Additional Information</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 text-sm text-gray-700 mb-4">
            <div>
              <p className="text-gray-500">Response Time</p>
              <p className="font-medium">Under 2 hours</p>
            </div>
            <div>
              <p className="text-gray-500">Languages</p>
              <p className="font-medium">English (Fluent), Spanish (Conversational)</p>
            </div>
            <div>
              <p className="text-gray-500">Total Earnings</p>
              <p className="font-medium">$175,000+</p>
            </div>
            <div>
              <p className="text-gray-500">Job Success</p>
              <p className="font-medium">98%</p>
            </div>
          </div>
        </div>

        {/* Attachments */}
        <div className="mb-6">
          <h3 className="text-base font-semibold text-gray-800 mb-2">Attachments</h3>
          <div className="flex items-center justify-between bg-gray-50 border p-3 rounded">
            <div className="flex items-center gap-2 text-sm text-gray-800">
              <FileText size={16} />
              Michael_Anderson_Portfolio.pdf <span className="text-gray-500">(2.4 MB)</span>
            </div>
            <button className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center gap-1">
              <Download size={14} /> Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalModal;
