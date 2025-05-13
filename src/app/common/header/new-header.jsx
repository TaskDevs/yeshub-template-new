import React, { useState, useRef, useContext, useEffect, useMemo } from "react";
import { Mail } from "@mui/icons-material";
import { FaBell, FaUserCircle } from "react-icons/fa";
 import { Wallet } from 'lucide-react';
import { RiSettings3Fill } from "react-icons/ri";
import { BiSolidLogOut } from "react-icons/bi";
import { ImStatsDots } from "react-icons/im";
import { ToggleSwitch } from "../ToggleSwitch";
import { SearchInput } from "../search-box";
import { IoSearch } from "react-icons/io5";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { base, candidate } from "../../../globals/route-names";
import { ProfileApiData } from "../../context/user-profile/profileContextApi";
import { Avatar } from "@mui/material";
import { logout } from "../../context/auth/authApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import ProfileCompletionModal from "./profile-complettion";
export const Header = ({ isDashboard = true }) => {
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const dropdownRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [activeNav, setActiveNav] = useState("Home");
  const [navOpen, setNavOpen] = useState(false);
  const username = sessionStorage.getItem("username");
  const token = sessionStorage.getItem("authToken");
  const { profileData } = useContext(ProfileApiData);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    firstname,
    lastname,
    profession,
    profile_image,
    profile_completion,
    incomplete_sections,
  } = profileData;
  console.log("Profile Data:", profileData);
  const role = sessionStorage.getItem("userRole");

  useEffect(() => {
    const lastClosed = localStorage.getItem("profileModalClosedAt");
    if (
      !lastClosed ||
      Date.now() - parseInt(lastClosed, 10) > 24 * 60 * 60 * 1000
    ) {
      // Show the modal if it's never been closed or it's been over 24 hours
      setIsModalOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("profileModalClosedAt", Date.now().toString());
    setIsModalOpen(false);
  };

  // colors for the username
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

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };
  const navigate = useNavigate();

  const handleSearch = (value) => {
    console.log("Searching for:", value);
  };

  const navItems = [
    {
      id: "home",
      label: "Home",
      selected: true,
      to: role == "client" ? "/dashboard-client" : "/dashboard-candidate",
    },
    { id: "Find-talent", label: "Find Talent", to: "/find-talent" },
    {
      id: "public-find-work",
      label: "Find Work",
      to: "/dashboard-candidate/find-job",
    },
    {
      id: "my-home",
      label: "Dashboard",
      menu: null,
      selected: true,
      to: "/dashboard-candidate",
    },
    {
      id: "find-work",
      label: "Find Jobs",
      to: "/dashboard-candidate/find-work",
      menu: {
        // title: "Find Work",
        items: [
          {
            id: "find-work-main",
            label: "Find Jobs",
            selected: true,
            to: "/dashboard-candidate/find-work",
          },
          {
            id: "saved-jobs",
            label: "Saved Jobs",
            to: "/dashboard-candidate/saved-jobs",
          },
          {
            id: "proposals-offers",
            label: "Proposals & Offers",
            to: "candidate-offers",
          },
        ],
      },
    },
    {
      id: "deliver-work",
      label: "Deliver Work",
      to: `${base.CANDIDATE_PRE}${candidate.Active_Contracts}`,
      menu: {
        // title: "Deliver Work",
        items: [
          {
            id: "active-contracts",
            label: "Active Contracts",
            to: `${base.CANDIDATE_PRE}${candidate.Active_Contracts}`,
            selected: true,
          },
          {
            id: "contract-history",
            label: "Contract History",
            to: `${base.CANDIDATE_PRE}${candidate.Contracts_History}`,
          },
        ],
      },
    },
    { id: "assessment-training", label: "Assessment & Training", menu: null },
    { id: "why-yeshub", label: "Why YesHub", menu: null },

    {
      id: "manage-finances",
      label: "Manage Finances",
      menu: {
        // title: "Manage Finances",
        items: [
          {
            id: "financial-overview",
            label: "Financial Overview",
            to: `${base.CANDIDATE_PRE}${candidate.FINANCE}`,
            selected: true,
          },
          { id: "your-report", label: "Your Report" },
          {
            id: "billings-earnings",
            label: "Billings & Earnings",
            to: `${base.CANDIDATE_PRE}${candidate.BILLING}`,
          },
          {
            id: "transactions",
            label: "Transactions",
            to: `${base.CANDIDATE_PRE}${candidate.TRANSACTIONS}`,
          },
        ],
      },
    },
    { id: "messages", label: "Messages", to: "/messages" },
  ];

  // Conditional rendering of nav items based on page type
  const getNavItems = () => {
    let items;

    if (isDashboard) {
      // Show only dashboard-related items
      items = navItems.filter((item) =>
        ["Dashboard", "Find Jobs", "Deliver Work", "Manage Finances"].includes(
          item.label
        )
      );
    } else {
      // Show only public nav items
      items = navItems.filter(
        (item) =>
          !["My Home", "Find Jobs", "Manage Finances", "Deliver Work"].includes(
            item.label
          )
      );
    }

    return items.filter((item) => {
      if (role === "client") {
        return item.label !== "Find Work";
      }

      if (role === "freelance") {
        return item.label !== "Team";
      }

      return true; // keep everything else
    });
  };

  const handleNavHover = (item) => {
    if (!isDashboard && item.label === "Find Work") {
      setOpenMenu(null);
      return;
    }
    if (item.menu) {
      setOpenMenu(item.label);
    } else {
      setOpenMenu(null);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    if (openMenu === "profile") {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu, setOpenMenu]);

  const handleNavClick = (item) => {
    setOpenMenu(null);
    setActiveNav(item.label);

    if (!isDashboard && item.label === "Find Work") {
      navigate("/job-list");
      return;
    }
    if (!isDashboard && item.id === "find-talent") {
      navigate("/find-talent");
      return;
    }

    if (item.to) {
      navigate(item.to);
    }
  };

  const handleProfileClick = () => {
    setOpenMenu(openMenu === "profile" ? null : "profile");
  };

  const handleUserProfile = () => {
    setOpenMenu(openMenu === "profile" ? null : "profile");

    if (role === "freelancer") {
      window.location.href = "/dashboard-candidate/profile"; // full page reload
    } else if (role === "client") {
      window.location.href = "/profile"; // full page reload
    } else {
      console.warn("Unknown role, redirecting to default profile");
      window.location.href = "/profile"; // fallback
    }
  };

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  const handleLogoClick = () => {
    if (token && role === "client") {
      navigate("/profile");
    } else if (token && role === "freelancer") {
      navigate("/dashboard-candidate");
    } else {
      navigate("/");
    }
  };
  const handleLogout = async () => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#305718",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out",
    });

    if (confirmation.isConfirmed) {
      setIsLoggingOut(true);

      try {
        const result = await logout(); // Your logout logic

        if (result) {
          toast.success(result.message, {
            position: "top-right",
            autoClose: 3000,
          });
          navigate("/");
        } else {
          console.error("Logout failed");
          toast.error("Logout failed. Please try again.");
        }
      } catch (error) {
        console.error("Logout error:", error);
        toast.error("Something went wrong!");
      } finally {
        setIsLoggingOut(false);
      }
    }
  };

  const getVisibleNavItems = (role) => {
    // Normalize helper
    const normalize = (str) => str?.trim().toLowerCase();

    // Unauthenticated user
    if (!role || !token) {
      const guestItemIds = [
        "home",
        "find-talent",
        "public-find-work",
        "assessment-training",
        "why-yeshub",
      ];

      return navItems.filter((item) =>
        guestItemIds.includes(normalize(item.id))
      );
    }

    // Freelancer
    if (token && normalize(role) === "freelancer") {
      const freelancerItemIds = [
        "my-home",
        "find-work",
        "deliver-work",
        "manage-finances",
        "messages",
      ];
      const visibleItems = navItems.filter((item) =>
        freelancerItemIds.includes(normalize(item.id))
      );

      console.log(
        "Filtered freelancer nav items:",
        visibleItems.map((item) => item.id)
      );
      return visibleItems;
    }

    // Client
    if (token && normalize(role) === "client") {
      const clientItemIds = [
        "find-talent",
        "assessment-training",
        "why-yeshub",
      ];

      return navItems.filter((item) =>
        clientItemIds.includes(normalize(item.id))
      );
    }

    return []; // Fallback
  };

  const visibleNavItems = useMemo(
    () => getVisibleNavItems(role),
    [role, token, navItems]
  );
  return (
    <>
      <header className="tw-css fixed top-0 flex w-full bg-white shadow-sm py-4 px-4  md:px-2 md:py-2 zIndex ">
        <div className="tw-css max-w-[1280px] w-full mx-auto flex justify-start items-center z-50">
          {/* Mobile  */}
          <button className="toggle-bar" onClick={() => setDrawerOpen(true)}>
            <FaBars className="h-5 w-5" />
          </button>

          {/* Navigation */}
          <div className=" new-header-wrapper">
            {/* Logo */}
            <div
              className="flex items-center mr-4 new-header-logo "
              onClick={() => handleLogoClick()}
            >
              <img src="/yes-logo-1.png" alt="YesHub" className="h-14 w-auto" />
            </div>

            {/* Navigation items */}
            <nav className="main-nav">
              {getNavItems().map((item) => (
                <div
                  key={item.id}
                  className="relative px-5"
                  onMouseEnter={() => handleNavHover(item)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    className={`py-2 text-gray-700 hover:text-green-700 font-medium relative ${
                      activeNav === item.label
                        ? "text-[#111827]"
                        : "text-[#6B7280]"
                    }`}
                    onClick={() => handleNavClick(item)}
                  >
                    {item.label}

                    {/* active nav indicator*/}
                    {activeNav === item.label && (
                      <div className="absolute -bottom-0 left-0 right-0 h-1 bg-green-700 rounded-t-md transform translate-y-4 transition-all duration-300"></div>
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
                            onClick={() => handleNavClick(menuItem)}
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
                className="w-full flex-1 search-input"
                rightIcon={null}
                value={searchValue}
                onSearch={handleSearch}
                onChange={setSearchValue}
                placeholder="Search here..."
                leftIcon={<IoSearch size={18} />}
              />
            )}

            {/* show Auth buttons if not dashboard */}
            {/* data-bs-toggle="modal"
            data-bs-target="#sign_up_popup2" */}

            {!isDashboard && (
              <div className="flex space-x-2">
                {!token ? (
                  <>
                    <button
                      className="bg-[#305718] text-white px-4 py-2 rounded-md font-medium"
                      onClick={() => navigate("/login")}
                    >
                      Log In
                    </button>
                  </>
                ) : (
                  <div className="relative new-profile-menu" ref={profileRef}>
                    {profile_image ? (
                      <img
                        src={profile_image}
                        onClick={handleProfileClick}
                        className="w-10 h-10 rounded-full object-cover cursor-pointer"
                        alt="Profile"
                      />
                    ) : (
                      <Avatar
                        sx={{
                          bgcolor: stringToColor(username),
                          width: 40,
                          height: 40,
                          fontSize: "1.2rem",
                        }}
                        onClick={handleProfileClick}
                      >
                        {username.charAt(0).toUpperCase()}
                      </Avatar>
                    )}

                    {openMenu === "profile" && (
                      <div
                        className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl z-50"
                        ref={dropdownRef}
                      >
                        {/* User Info */}
                        <div className="p-4 border-b">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                              <Avatar
                                sx={{
                                  bgcolor: stringToColor(username),
                                  width: 40,
                                  height: 40,
                                  fontSize: "1.2rem",
                                }}
                                src={profile_image}
                                onClick={() => handleProfileClick()}
                              />
                            </div>
                            <div className="text-sm text-gray-600 capitalize">
                              {role}
                            </div>
                          </div>
                        </div>

                        {/* Online Toggle */}
                        <div className="p-4 border-b flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Online for messages
                          </span>
                          <ToggleSwitch
                            initialState={true}
                            onChange={(state) =>
                              console.log("Online status:", state)
                            }
                          />
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          <button
                            className="w-full text-left px-5 py-2 hover:bg-gray-100 transition-all flex items-center gap-3 text-gray-700"
                            onClick={handleUserProfile}
                          >
                            <FaUserCircle className="h-5 w-5" />
                            <span>Your Profile</span>
                          </button>

                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 transition-all flex items-center gap-3 text-gray-700">
                            <ImStatsDots className="h-5 w-5" />
                            <span>Stats & Trends</span>
                          </button>

                          <button className="w-full text-left px-5 py-2 hover:bg-gray-100 transition-all flex items-center gap-3 text-gray-700">
                            <RiSettings3Fill className="h-5 w-5" />
                            <span>Account Settings</span>
                          </button>

                          <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className={`w-full text-left px-5 py-2 rounded-b-xl flex items-center gap-3 text-gray-700 transition-all ${
                              isLoggingOut
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            {isLoggingOut ? (
                              <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <BiSolidLogOut className="h-5 w-5" />
                            )}
                            <span>
                              {isLoggingOut ? "Logging out..." : "Logout"}
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Mobile Menu Toggle */}
                {token && role === "client" && (
                  <button className="toggle-bar" onClick={toggleNav}>
                    {navOpen ? (
                      <FaTimes className="h-5 w-5" />
                    ) : (
                      <div className="lg:hidden">
                        {profile_image ? (
                          <Avatar
                            sx={{
                              bgcolor: stringToColor(username),
                              width: 40,
                              height: 40,
                              fontSize: "1.2rem",
                            }}
                            src={profile_image}
                            onClick={() => toggleNav()}
                          />
                        ) : (
                          <Avatar
                            sx={{
                              bgcolor: stringToColor(username),
                              width: 40,
                              height: 40,
                              fontSize: "1.2rem",
                            }}
                            onClick={() => toggleNav()}
                          >
                            {username.charAt(0).toUpperCase()}
                          </Avatar>
                        )}
                      </div>
                    )}
                  </button>
                )}
              </div>
            )}

            {/* Dashboard-specific content */}
            {isDashboard && (
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-green-700">
                  <FaBell className="h-5 w-5" />
                </button>
                <div className="lg:hidden">
                  {profile_image ? (
                    <Avatar
                      sx={{
                        bgcolor: stringToColor(username),
                        width: 40,
                        height: 40,
                        fontSize: "1.2rem",
                      }}
                      src={profile_image}
                      onClick={() => toggleNav()}
                    />
                  ) : (
                    <Avatar
                      sx={{
                        bgcolor: stringToColor(username),
                        width: 40,
                        height: 40,
                        fontSize: "1.2rem",
                      }}
                      onClick={() => toggleNav()}
                    >
                      {username.charAt(0).toUpperCase()}
                    </Avatar>
                  )}
                </div>

                <button className="text-gray-600 hover:text-green-700 mail-icon">
                  <Mail className="h-5 w-5" />
                </button>

                {/* Profile Menu */}
                <div className="relative new-profile-menu" ref={profileRef}>
                  {profile_image ? (
                    <Avatar
                      sx={{
                        bgcolor: stringToColor(username),
                        width: 40,
                        height: 40,
                        fontSize: "1.2rem",
                      }}
                      src={profile_image}
                      onClick={() => handleProfileClick()}
                    />
                  ) : (
                    <Avatar
                      sx={{
                        bgcolor: stringToColor(username),
                        width: 40,
                        height: 40,
                        fontSize: "1.2rem",
                      }}
                      onClick={() => handleProfileClick()}
                    >
                      {username.charAt(0).toUpperCase()}
                    </Avatar>
                  )}

                  {openMenu === "profile" && (
                    <div className="absolute top-full w-64 right-0 mt-1 bg-white rounded-lg shadow-lg zIndex">
                      <div className="p-4 border-b">
                        <div className="flex items-center justify-start gap-3">
                          <div className="size-12 rounded-full overflow-hidden mr-3">
                            <Avatar
                              sx={{
                                bgcolor: stringToColor(username),
                                width: 40,
                                height: 40,
                                fontSize: "1.2rem",
                              }}
                              src={profile_image}
                            />
                          </div>
                          <div className="text-sm text-gray-500 capitalize space-y-1">
                            <div>{profession}</div>
                            <div>{role}</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border-b flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Online for messages
                        </span>
                        <ToggleSwitch
                          initialState={true}
                          onChange={(state) =>
                            console.log("Online status:", state)
                          }
                        />
                      </div>

                      <div className="py-1">
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                          onClick={handleUserProfile}
                        >
                          <FaUserCircle className="text-gray-600 h-5 w-5" />
                          <span>Your Profile</span>
                        </button>
                        

                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                          onClick={() =>
                            handleNavigate(
                              "/dashboard-candidate/finance-settings"
                            )
                          }
                        >
                          <Wallet className="text-gray-600 h-5 w-5" />
                          <span>Finance Settings</span>
                        </button>

                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                          <ImStatsDots className="text-gray-600 h-5 w-5" />
                          <span>Stats & Trends</span>
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                          <RiSettings3Fill className="text-gray-600 h-5 w-5" />
                          <span>Account Settings</span>
                        </button>
                        <button
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${
                            isLoggingOut
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {isLoggingOut ? (
                            <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <BiSolidLogOut className="text-gray-600 h-5 w-5" />
                          )}
                          <span>
                            {isLoggingOut ? "Logging out..." : "Logout"}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Mobile Menu */}
        {navOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              onClick={toggleNav}
            />

            {/* Drawer */}
            <div className="fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
              {/* Header */}
              <div className="flex justify-end p-4 border-b">
                <button
                  onClick={toggleNav}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>

              {/* User Info */}
              <div className="p-4 border-b">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border">
                    <img
                      src={profile_image || "/yes-logo-1.png"}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm capitalize">
                      {firstname || username} {lastname}
                    </div>
                    <div className="text-xs text-gray-500">{profession}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-600">
                  <span>Online for messages</span>
                  <ToggleSwitch
                    initialState={true}
                    onChange={(state) => console.log("Online status:", state)}
                  />
                </div>
              </div>

              {/* Navigation */}
              <div className="p-4 space-y-2 text-sm">
                <button
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition"
                  onClick={() => {
                    handleUserProfile();
                    toggleNav(); // Close the drawer
                  }}
                >
                  <FaUserCircle className="text-gray-500 w-5 h-5" />
                  <span>Your Profile</span>
                </button>
                 <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                          onClick={() =>
                            handleNavigate(
                              "/dashboard-candidate/finance-settings"
                            )
                          }
                        >
                          <Wallet className="text-gray-600 h-5 w-5" />
                          <span>Finance Settings</span>
                        </button>

                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition">
                  <ImStatsDots className="text-gray-500 w-5 h-5" />
                  <span>Stats & Trends</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition">
                  <RiSettings3Fill className="text-gray-500 w-5 h-5" />
                  <span>Account Settings</span>
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    toggleNav(); // Close the drawer
                  }}
                  disabled={isLoggingOut}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${
                    isLoggingOut
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {isLoggingOut ? (
                    <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <BiSolidLogOut className="text-gray-600 h-5 w-5" />
                  )}
                  <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Mobile Drawer */}
        {/* Backdrop */}
        {drawerOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        {/* Side Drawer */}
        {/* Backdrop */}
        {drawerOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-100 transition-opacity duration-300 md:hidden"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        {/* Drawer */}
        <div
          className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
            <button
              onClick={() => setDrawerOpen(false)}
              className="text-gray-500 hover:text-red-500 text-2xl focus:outline-none"
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col px-5 py-4 space-y-2">
            {visibleNavItems
              .flatMap((item) =>
                item.to || item.label
                  ? [
                      {
                        id: item.id,
                        label: item.label,
                        to: item.to,
                      },
                    ]
                  : []
              )
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.to) window.location.href = item.to;
                    setDrawerOpen(false);
                  }}
                  className="w-full text-left py-3 px-4 rounded-lg text-gray-800 font-medium hover:bg-green-50 hover:text-green-600 transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
          </nav>
        </div>
        {token && role === "freelancer" && (
          <div>
            <ProfileCompletionModal
              completion={profile_completion}
              incompleteSections={incomplete_sections}
              isOpen={isModalOpen}
              onClose={handleClose}
            />
          </div>
        )}
        {/* Profile Completion Modal */}
      </header>
    </>
  );
};
