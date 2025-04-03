import React, { useState, useRef } from "react";
import { Mail } from "@mui/icons-material";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { RiSettings3Fill } from "react-icons/ri";
import { BiSolidLogOut } from "react-icons/bi";
import { ImStatsDots } from "react-icons/im";
import { ToggleSwitch } from "../ToggleSwitch";
import { SearchInput } from "../search-box";
import { IoSearch } from "react-icons/io5";
import { FaBars, FaTimes  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Header = ({ isDashboard = true }) => {
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [activeNav, setActiveNav] = useState("Find Talent");
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };
  const navigate = useNavigate();

  const handleSearch = (value) => {
    console.log("Searching for:", value);
  };

  const navItems = [
    { id: "find-talent", label: "Find Talent", menu: null },
    {
      id: "find-work",
      label: "Find Work",
      menu: {
        title: "Find Work",
        items: [
          { id: "find-work-main", label: "Find Work", selected: true },
          { id: "saved-jobs", label: "Saved Jobs" },
          { id: "proposals-offers", label: "Proposals & Offers" },
        ],
      },
    },
    {
      id: "deliver-work",
      label: "Deliver Work",
      menu: {
        title: "Deliver Work",
        items: [
          { id: "active-contracts", label: "Active Contracts", selected: true },
          { id: "contract-history", label: "Contract History" },
        ],
      },
    },
    { id: "assessment-training", label: "Assessment & Training", menu: null },
    { id: "why-yeshub", label: "Why YesHub", menu: null },
    { id: "enterprise", label: "Enterprise", menu: null },
    {
      id: "manage-finances",
      label: "Manage Finances",
      menu: {
        title: "Manage Finances",
        items: [
          {
            id: "financial-overview",
            label: "Financial Overview",
            selected: true,
          },
          { id: "your-report", label: "Your Report" },
          { id: "billings-earnings", label: "Billings & Earnings" },
          { id: "transactions", label: "Transactions" },
        ],
      },
    },
    { id: "messages", label: "Messages", menu: null },
  ];

  // Conditional rendering of nav items based on page type
  const getNavItems = () => {
    if (isDashboard) {
      return navItems.filter((item) =>
        ["Find Work", "Deliver Work", "Manage Finances", "Messages"].includes(
          item.label
        )
      );
    }
    return navItems.filter(
      (item) =>
        !["Manage Finances", "Deliver Work", "Messages"].includes(item.label)
    );
  };

  const handleNavHover = (item) => {
    if (item.menu) {
      setOpenMenu(item.label);
    } else {
      setOpenMenu(null);
    }
  };

  const handleNavClick = (item) => {
    setOpenMenu(null);
    setActiveNav(item.label);
  };

  const handleProfileClick = () => {
    setOpenMenu(openMenu === "profile" ? null : "profile");
  };

  return (
    <header className="tw-css fixed top-0 flex w-full bg-white shadow-sm py-4 px-4  md:px-2 md:py-2 z-50 zIndex">
      <div className="tw-css max-w-[1280px] w-full mx-auto flex justify-start items-center z-50">
        {/* Navigation */}
        <div className="flex items-center">
          {/* Logo */}
          <div className="flex items-center mr-4" onClick={() => navigate("/")}>
            <img src="/yes-logo-1.png" alt="YesHub" className="h-14 w-auto"  />
          </div>

          {/* Navigation items */}
          <nav className="sm:flex">
            {getNavItems().map((item) => (
              <div
                key={item.id}
                className="relative px-5"
                onMouseEnter={() => handleNavHover(item)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  className={`py-2 text-gray-700 hover:text-green-700 font-medium relative ${activeNav === item.label ? "text-[#111827]" : "text-[#6B7280]"
                    }`}
                  onClick={() => handleNavClick(item)}
                >
                  {item.label}

                  {/* active nav indicator*/}
                  {activeNav === item.label && (
                    <div className="absolute -bottom-4 left-0 right-0 h-1 bg-green-700 rounded-t-md transform translate-y-4 transition-all duration-300"></div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {openMenu === item.label && item.menu && (
                  <div
                    ref={menuRef}
                    className="absolute top-full left-0 bg-white rounded-lg shadow-lg w-64 z-10 py-2"
                  >
                    <div className="px-6 py-3 text-base font-medium ">
                      {item.menu.title}
                    </div>
                    <div className="px-2">
                      {item.menu.items.map((menuItem) => (
                        <div
                          key={menuItem.id}
                          className={`tw-css px-4 py-3 rounded-md hoverHeaderItem cursor-pointer`}
                        >
                          {menuItem.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 justify-end flex-1">
          {/* Search Box - Only show on dashboard */}
          {isDashboard && (
            <SearchInput
              className="w-full flex-1"
              rightIcon={null}
              value={searchValue}
              onSearch={handleSearch}
              onChange={setSearchValue}
              placeholder="Search here..."
              leftIcon={<IoSearch size={18} />}
            />
          )}

          {/* show Auth buttons if not dashboard */}
          {!isDashboard && (
            <div className="flex space-x-2">
              <button className="text-gray-700 hover:text-green-700 font-medium">
                Log In
              </button>
              <button className="bg-[#305718] text-white px-4 py-2 rounded-md font-medium">
                Sign Up
              </button>
              {/* Mobile Menu */}
              <button className="block sm:hidden" onClick={() => toggleNav()}>
              {navOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
              </button>
            </div>
          )}

          {/* Notification Icons - Only show on dashboard */}
          {isDashboard && (
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-green-700">
                <FaBell className="h-5 w-5" />
              </button>
              <button className="text-gray-600 hover:text-green-700">
                <Mail className="h-5 w-5" />
              </button>

              {/* Profile Menu */}
              <div className="relative" ref={profileRef}>
                <button
                  className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center"
                  onClick={handleProfileClick}
                >
                  <img
                    src="/yes-logo-1.png"
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </button>

                {openMenu === "profile" && (
                  <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg w-64 z-10">
                    <div className="p-4 border-b">
                      <div className="flex items-center justify-start gap-3">
                        <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                          <img
                            src="/yes-logo-1.png"
                            alt="John Doe"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">
                            John Doe
                          </div>
                          <div className="text-sm text-gray-500">
                            Freelancer
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center">
                        <span className="text-sm">Online for messages</span>
                        <ToggleSwitch
                          initialState={true}
                          onChange={(state) =>
                            console.log("Online status:", state)
                          }
                        />
                      </div>
                    </div>
                    <div className="py-1">
                      <button className="w-full text-left px-4 py-2 hoverHeaderItem cursor-pointer flex items-center justify-start" onClick={() => navigate('/dashboard-candidate/profile')}>
                        <FaUserCircle className="text-[#A6A6A6] h-5 w-5" />
                        <span>Your Profile</span>
                      </button>
                      <button className="w-full text-left px-4 py-2 hoverHeaderItem cursor-pointer flex items-center justify-start">
                        <ImStatsDots className="text-[#A6A6A6] h-5 w-5" />
                        <span>Stats & Trends</span>
                      </button>
                      <button className="w-full text-left px-4 py-2 hoverHeaderItem cursor-pointer flex items-center justify-start">
                        <RiSettings3Fill className="text-[#A6A6A6] h-5 w-5" />
                        <span>Account Settings</span>
                      </button>
                      <button className="w-full text-left px-4 py-2 hoverHeaderItemointer flex items-center justify-start">
                        <BiSolidLogOut className="text-[#A6A6A6] h-5 w-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile  */}
              <button className={`tw-css block sm:hidden`} onClick={() => toggleNav()}>
              {navOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {navOpen && (
          <div className="fixed top-0 left-0 w-[70%] h-screen bg-white shadow-lg">
            {/*  mobile menu content */}
            {getNavItems().map((item) => (
              <div
                key={item.id}
                className="relative px-5"
                onMouseEnter={() => handleNavHover(item)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  className={`py-2 text-gray-700 hover:text-green-700 font-medium relative ${activeNav === item.label ? "text-[#111827]" : "text-[#6B7280]"
                    }`}
                  onClick={() => handleNavClick(item)}
                >
                  {item.label}

                  {/* active nav indicator*/}
                  {activeNav === item.label && (
                    <div className="absolute bottom-10 left-0 right-0 h-1 bg-green-700 rounded-t-md transform translate-y-4 transition-all duration-300"></div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {openMenu === item.label && item.menu && (
                  <div
                    ref={menuRef}
                    className="absolute top-full left-0 bg-white rounded-lg shadow-lg w-64 z-10 py-2"
                  >
                    <div className="px-6 py-3 text-base font-medium ">
                      {item.menu.title}
                    </div>
                    <div className="px-2">
                      {item.menu.items.map((menuItem) => (
                        <div
                          key={menuItem.id}
                          className={`tw-css px-4 py-3 rounded-md hoverHeaderItem cursor-pointer`}
                        >
                          {menuItem.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
