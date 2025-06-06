import JobZImage from "../jobz-img";
import { NavLink, useLocation } from "react-router-dom";
import { base, publicUser } from "../../../globals/route-names";
import { useContext, useState } from "react";
import { AuthApiData } from "../../context/auth/authContextApi";
import { Avatar } from "@mui/material";
import { ProfileApiData } from "../../context/user-profile/profileContextApi";
import { JobApiData } from "../../context/jobs/jobsContextApi";
import SearchField from "../search-field";
import { NAVSEARCHFORMFIELD } from "../../../globals/search-form-data";
import { useNavigate } from "react-router-dom";
//import { JobApiData } from "../../context/jobs/jobsContextApi";

function Header1({ _config }) {
  const token = sessionStorage.getItem("authToken");
  const role = sessionStorage.getItem("userRole");
  const [menuActive, setMenuActive] = useState(false);
  const { userProfile } = useContext(AuthApiData);
  const username = userProfile?.username || "U"; // Default to "N" if no username

  const { isSidebarCollapsed, toggleSidebar } = useContext(ProfileApiData);
  const { processSearchJobByTitle } = useContext(JobApiData);

  //const { processSearchJob } = useContext(JobApiData);
  const location = useLocation(); // Get the current location
  const isCandidateDashboard = location.pathname.startsWith(base.CANDIDATE_PRE);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  //navigation
  function handleNavigationClick() {
    setMenuActive(!menuActive);
  }

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

  const handleInputChange = (data, field) => {
    setFormData({
      ...formData,
      [field]: data,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Perform search logic here
    console.log("Searching for:", formData);
    processSearchJobByTitle(formData.search, 1);

    // Close the search modal after submission
    setIsVisible(false);

    navigate("/jobs-available");
  };

  return (
    <>
      <header
        className={
          "site-header " +
          _config.style +
          " mobile-sider-drawer-menu " +
          (menuActive ? "active" : "")
        }
      >
        <div className="sticky-header main-bar-wraper navbar-expand-lg">
          <div className="main-bar">
            <div className="container-fluid clearfix">
              <div className="logo-header">
                <div className="logo-header-inner logo-header-one">
                  <NavLink to={publicUser.HOME1}>
                    {_config.withBlackLogo ? (
                      <JobZImage src="images/yes-lg-2.png" alt="" />
                    ) : _config.withWhiteLogo ? (
                      <JobZImage src="images/yes-lg-2.png" alt="" />
                    ) : _config.withLightLogo ? (
                      <>
                        <JobZImage
                          id="skin_header_logo_light"
                          src="images/yes-lg-2.png"
                          alt=""
                          className="default-scroll-show"
                        />
                        <JobZImage
                          id="skin_header_logo"
                          src="images/yes-lg-2.png"
                          alt=""
                          className="on-scroll-show"
                        />
                      </>
                    ) : (
                      <JobZImage
                        id="skin_header_logo"
                        src="images/yes-lg-2.png"
                        alt=""
                      />
                    )}
                  </NavLink>
                </div>
              </div>
              {/* NAV Toggle Button */}
              <button
                id="mobile-side-drawer"
                data-target=".header-nav"
                data-toggle="collapse"
                type="button"
                className="navbar-toggler collapsed"
                onClick={handleNavigationClick}
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar icon-bar-first" />
                <span className="icon-bar icon-bar-two" />
                <span className="icon-bar icon-bar-three" />
              </button>
              {/* MAIN Vav */}
              <div className="nav-animation header-nav navbar-collapse collapse d-flex justify-content-center">
                <ul className=" nav navbar-nav">
                  <li>
                    <NavLink to={publicUser.HOME1}>Home</NavLink>
                    {/* <ul className="mega-menu">
                                            <li>
                                                <ul>
                                                    <li><NavLink to={publicUser.HOME1}>Home-1</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME2}>Home-2</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME3}>Home-3</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME4}>Home-4</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME5}>Home-5</NavLink></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <ul>
                                                    <li><NavLink to={publicUser.HOME6}>Home-6</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME7}>Home-7</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME8}>Home-8</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME9}>Home-9</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME10}>Home-10</NavLink></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <ul>
                                                    <li><NavLink to={publicUser.HOME11}>Home-11</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME12}>Home-12</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME13}>Home-13</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME14}>Home-14</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME15}>Home-15</NavLink></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <ul>
                                                    <li><NavLink to={publicUser.HOME16}>Home-16</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME17}>Home-17</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME18}>Home-18</NavLink></li>
                                                </ul>
                                            </li>
                                        </ul> */}
                  </li>
                  <li>
                    <NavLink to={publicUser.jobs.LIST}>Jobs</NavLink>
                    {/* <ul className="sub-menu">
                                            <li><NavLink to={publicUser.jobs.GRID}>Jobs Grid</NavLink></li>
                                            <li><NavLink to={publicUser.jobs.GRID_MAP}>Jobs Grid with Map</NavLink></li>
                                            <li><NavLink to={publicUser.jobs.LIST}>Jobs List</NavLink></li>
                                            <li className="has-child"><a href="#">Job Detail</a>
                                                <ul className="sub-menu">
                                                    <li><NavLink to={publicUser.jobs.DETAIL1}>Detail 1</NavLink>
                                                    </li><li><NavLink to={publicUser.jobs.DETAIL2}>Detail 2 </NavLink>
                                                    </li></ul>
                                            </li>
                                            <li><NavLink to={publicUser.jobs.APPLY}>Apply Jobs</NavLink></li>
                                        </ul> */}
                  </li>
                  <li>
                    {/* <NavLink to={publicUser.employer.GRID}>Employers</NavLink> */}
                    {/* <ul className="sub-menu">
                                            <li><NavLink to={publicUser.employer.GRID}>Employers Grid</NavLink></li>
                                            <li><NavLink to={publicUser.employer.LIST}>Employers List</NavLink></li>
                                            <li className="has-child"><a href="#">Employers Detail</a>
                                                <ul className="sub-menu">
                                                    <li><NavLink to={publicUser.employer.DETAIL1}>Detail 1</NavLink>
                                                    </li><li><NavLink to={publicUser.employer.DETAIL2}>Detail 2</NavLink>
                                                    </li></ul>
                                            </li>
                                        </ul> */}
                  </li>
                  <li>
                    <NavLink to={publicUser.pages.COMING}>
                      Assessment & Training
                    </NavLink>
                    {/* <ul className="sub-menu">
                                            <li><NavLink to={publicUser.pages.ABOUT}>About Us</NavLink></li>
                                            <li><NavLink to={publicUser.pages.PRICING}>Pricing</NavLink></li>
                                            <li><NavLink to={publicUser.pages.ERROR404}>Error-404</NavLink></li>
                                            <li><NavLink to={publicUser.pages.FAQ}>FAQ's</NavLink></li>
                                            <li><NavLink to={publicUser.pages.CONTACT}>Contact Us</NavLink></li>
                                            <li><NavLink to={publicUser.pages.MAINTENANCE}>Under Maintenance</NavLink></li>
                                            <li><NavLink to={publicUser.pages.COMING}>Coming soon</NavLink></li>
                                            <li><NavLink to={publicUser.pages.LOGIN}>Login</NavLink></li>
                                            <li><NavLink to={publicUser.pages.AFTER_LOGIN}>After Login</NavLink></li>
                                            <li><NavLink to={publicUser.pages.ICONS}>Icons</NavLink></li>
                                        </ul> */}
                  </li>
                  <li>
                    {/* {publicUser.candidate.GRID} */}
                    <NavLink to={publicUser.candidate.LIST}>
                      Job Seekers
                    </NavLink>
                    {/* <ul className="sub-menu">
                                            <li><NavLink to={publicUser.candidate.GRID}>Candidates Grid</NavLink></li>
                                            <li><NavLink to={publicUser.candidate.LIST}>Candidates List</NavLink></li>
                                            <li className="has-child"><a href="#">Candidate Detail</a>
                                                <ul className="sub-menu">
                                                    <li><NavLink to={publicUser.candidate.DETAIL1}>Detail 1</NavLink>
                                                    </li><li><NavLink to={publicUser.candidate.DETAIL2}>Detail 2</NavLink>
                                                    </li></ul>
                                            </li>
                                        </ul> */}
                  </li>

                  <li>
                    <NavLink to={publicUser.pages.COMING}>Resources</NavLink>
                    {/* <ul className="sub-menu">
                                            <li><NavLink to={publicUser.blog.GRID1}>Blog</NavLink></li>
                                            <li><NavLink to={publicUser.blog.GRID2}>Blog Grid</NavLink></li>
                                            <li><NavLink to={publicUser.blog.GRID3}>Blog Grid-2</NavLink></li>
                                            <li><NavLink to={publicUser.blog.LIST}>Blog List</NavLink></li>
                                            <li><NavLink to={publicUser.blog.DETAIL}>Blog Detail</NavLink></li>
                                        </ul> */}
                  </li>
                </ul>
              </div>
              {/* Header Right Section*/}
              <div className="extra-nav header-2-nav">
                <div className="extra-cell">
                  <div className="header-search">
                    <a
                      href="#search"
                      className="header-search-icon"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent page jump
                        setIsVisible(true);
                      }}
                    >
                      <i className="feather-search" />
                    </a>
                  </div>
                </div>
                <div className="extra-cell">
                  <div className="extra-cell">
                    <div className="header-nav-btn-section">
                      {token ? ( // Check if token exists (User is logged in)
                        <>
                          <div className="twm-nav-btn-left">
                            <a
                              className="d-flex align-items-center p-2"
                              href={
                                role === "freelancer"
                                  ? base.CANDIDATE_PRE
                                  : base.EMPLOYER_PRE
                              }
                              role="button"
                            >
                              <Avatar
                                sx={{
                                  bgcolor: stringToColor(username),
                                  width: 40,
                                  height: 40,
                                  fontSize: "1.2rem",
                                }}
                              >
                                {username.charAt(0).toUpperCase()}
                              </Avatar>
                            </a>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="twm-nav-btn-left">
                            <a
                              className="twm-nav-sign-up"
                              data-bs-toggle="modal"
                              href="#sign_up_popup2"
                              role="button"
                            >
                              <i className="feather-log-in" /> Log In
                            </a>
                          </div>
                          <div className="twm-nav-btn-right">
                            <a
                              className="twm-nav-post-a-job"
                              data-bs-toggle="modal"
                              href="#sign_up_popup"
                              role="button"
                            >
                              <i className="feather-log-in" />
                              Sign up
                            </a>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {isCandidateDashboard && (
                  <div className="extra-cell" onClick={toggleSidebar}>
                    <div className="extra-cell">
                      <div className=" header-right can-header-right">
                        {/* header-left  header-right*/}
                        <div className="nav-btn-wrap">
                          <a className="nav-btn-admin" id="sidebarCollapse">
                            {isSidebarCollapsed ? (
                              <span className="fa fa-angle-left" />
                            ) : (
                              <span className="fa fa-angle-right" />
                            )}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* SITE Search */}
          {isVisible && (
            <div id="search">
              {/* Close Button */}
              <span
                className="close"
                onClick={() => setIsVisible(false)}
                style={{ cursor: "pointer" }}
              ></span>

              {/* Search Form */}
              <form
                role="search"
                id="searchform"
                onSubmit={handleSearch}
                className="radius-xl"
              >
                <SearchField
                  field={NAVSEARCHFORMFIELD}
                  value={formData}
                  change={(data, field) => {
                    handleInputChange(field, data);
                  }}
                />
                <span className="input-group-append">
                  <button type="submit" className="search-btn">
                    <i className="fa fa-paper-plane" />
                  </button>
                </span>
              </form>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header1;
