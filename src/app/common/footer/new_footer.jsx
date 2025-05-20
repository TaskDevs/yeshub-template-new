import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="tw-css bg-white">
      {/* Trusted Brands Section */}
      {/* <div className="max-w-7xl mx-auto px-4 py-10">
        <h3 className="text-lg font-semibold mb-6">
          Trusted by leading brands and startups
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 place-items-center">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <img
                key={index}
                src="/logo-placeholder.svg"
                alt="Logo"
                className="h-8 object-contain"
              />
            ))}
        </div>
      </div> */}

      {/* Main Footer Navigation */}
      <div className="bg-[#0B0F1A] text-white pt-12 pb-6 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4  gap-8 text-sm">
          {/* Column 1 */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-300">For Talents</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#">Opportunities</a></li>
              <li><a href="#">Skill Assessment</a></li>
              <li><a href="#">Training Programs</a></li>
            </ul>
          </div>
          {/* Column 2 */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-300">For Clients</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#">Find Talent</a></li>
              <li><a href="#">Partner for Training</a></li>
            </ul>
          </div>
          {/* Column 3 */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-300">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#">Skills Training</a></li>
              <li><a href="#">Training Programs</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Guides</a></li>
            </ul>
          </div>
          {/* Column 4 */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-300">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#">Home</a></li>
              <li><a href="#">About YesHub</a></li>
              <li><a href="#">Partners</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p className="mb-4 md:mb-0">
            © 2025 Office Of The President - Republic Of Ghana - All Rights Reserved.
          </p>
          <div className="flex space-x-4 text-gray-400">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
