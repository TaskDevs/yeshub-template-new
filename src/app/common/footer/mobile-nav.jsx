import React, { useRef, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { IoChatbubblesSharp } from "react-icons/io5";
import { FaWallet } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

export function MobileNav({ isDashboard = true }) {
    const menuRef = useRef(null);
    const [openMenu, setOpenMenu] = useState(null);
    const [activeNav, setActiveNav] = useState("Find Talent");
    const navigate = useNavigate();
    
  const navItems = [
    { id: "find-talent", label: "Find Talent", menu: null, icon: "" },
    // { id: "home", label: "Home", menu: null, to: "/dashboard-candidate", icon: "" },
    {
      id: "find-work",
      label: "Find Work",
      icon: <IoIosSearch/>,
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
      icon: <AiOutlineBars />,
      menu: {
        title: "Deliver Work",
        items: [
          { id: "active-contracts", label: "Active Contracts", selected: true },
          {
            id: "contract-history",
            label: "Contract History",
            to: "/dashboard-candidate/contracts-history",
          },
        ],
      },
    },
    { id: "assessment-training", label: "Assessment & Training", menu: null, icon: "" },
    { id: "why-yeshub", label: "Why YesHub", menu: null },
    { id: "enterprise", label: "Enterprise", menu: null },
    {
      id: "finances",
      label: "Finances",
      icon: <FaWallet />,
      menu: {
        title: " Finances",
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
    { id: "messages", label: "Messages", menu: null, icon: <IoChatbubblesSharp/> },
  ];

  // Conditional rendering of nav items based on page type
  const getNavItems = () => {
    if (isDashboard) {
      return navItems.filter((item) =>
        [ "Find Work", "Deliver Work", "Finances", "Messages"].includes(
          item.label
        )
      );
    }
    return navItems.filter(
      (item) =>
        !["Finances", "Deliver Work", "Messages"].includes(item.label)
    );
  };

  const handleNavClick = (item) => {
    console.log("item-hovered")
    setOpenMenu(null);
    setActiveNav(item.label);
    if (item.to) {
      navigate(item.to);
    }
  };

  const handleNavHover = (item) => {
    if (item.menu) {
      setOpenMenu(item.label);
    } else {
      setOpenMenu(null);
    }
  };
  return (
    <footer className="tw-css fixed bottom-0 w-full bg-white shadow-sm py-2 px-2 z-50  mobile-nav">
      <div className="tw-css max-w-[1280px] w-full mx-auto flex justify-start items-center z-50">
      <nav className="w-full flex">
            {getNavItems().map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => handleNavHover(item)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  className={`py-2 text-[#4B5563] w-ful text-center font-normal relative flex items-center flex-col ${
                    activeNav === item.label
                      ? "text-[#305718]"
                      : "text-[#4B5563]"
                  }`}
                  onClick={() => handleNavClick(item)}
                >
                  
                  {item.icon}
                  <span className="text-sm w-full">{item.label}</span>

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
    </footer>
  )
}
