import Header1 from "../app/common/header/header1";
import CandidateRoutes from "../routing/candidate-routes";
import SignUpPopup from "../app/common/popups/popup-signup";
import SignInPopup from "../app/common/popups/popup-signin";
// import CanSidebarSection from "../app/pannels/candidate/sections/common/can-sidebar";
import { useLocation } from "react-router-dom";
import { getHeaderConfig } from "../globals/layout-config";
import YesNoPopup from "../app/common/popups/popup-yes-no";
import { popupType } from "../globals/constants";
// import { ProfileApiData } from "../app/context/user-profile/profileContextApi";
// import { useContext } from "react";


function CandidateLayout() {
  const currentpath = useLocation().pathname;
  // const { isSidebarCollapsed } = useContext(ProfileApiData);

  return (
    <>
      <div className="page-wraper">
        <Header1 _config={getHeaderConfig(currentpath)} />

        <div className="page-content m-t40">
          {/* <InnerPageBanner _data={setBanner(currentpath)} /> */}
          {/* "col-xl-3 col-lg-4 col-md-12 rightSidebar m-b30 */}

          <div className="section-full p-t120  p-b90 site-bg-white">
          <CandidateRoutes />
            {/* <div className="container">
              row
              <div className="row">
                <div
                  // col-md-12 col-xl-3 col-lg-4 col-md-12
                  className={`col-xl-3 col-lg-4 col-md-12 rightSidebar m-b30 ${
                    isSidebarCollapsed ? "collapsed" : ""
                  }`}
                >
                  side-bar-st-1
                  <div className="side-bar-st-1">
                    <CanSidebarSection />
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 col-md-12 m-b30">
                  <CandidateRoutes />
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Footer */}
        {/* <Footer1 /> */}
        {/* {showFooter(currentpath) && setFooterType(currentpath)} */}

        {/* BUTTON TOP START */}
        <button className="scroltop">
          <span className="fa fa-angle-up  relative" id="btn-vibrate" />
        </button>

        <SignUpPopup />
        <SignInPopup />
        

        <YesNoPopup
          id="delete-dash-profile"
          type={popupType.DELETE}
          msg={"Do you want to delete your profile?"}
        />
        <YesNoPopup
          id="logout-dash-profile"
          type={popupType.LOGOUT}
          msg={"Do you want to Logout your profile?"}
        />
        <YesNoPopup
          id="delete-education"
          type={popupType.DELETE_EDUCATION}
          msg={"Are you sure you want to delete your education?"}
        />
        <YesNoPopup
          id="delete-skills"
          type={popupType.DELETE_SKILLS}
          msg={"Are you sure you want to delete this skill?"}
        />
        <YesNoPopup
          id="delete-profile"
          type={popupType.DELETE_PROFILE}
          msg={"Are you sure you want to delete your user profile?"}
        />
        <YesNoPopup
          id="delete-freelance"
          type={popupType.DELETE_FREELANCE}
          msg={"Are you sure you want to delete your freelance profile?"}
        />
        <YesNoPopup
          id="delete-portfolio"
          type={popupType.DELETE_PORTFOLIO}
          msg={"Are you sure you want to delete your portfolio?"}
        />
        <YesNoPopup
          id="delete-applied-job"
          type={popupType.DELETE_APPLIED_JOB}
          msg={"Are you sure you want to delete this job application?"}
        />
        <YesNoPopup
          id="delete-portfolio-media"
          type={popupType.DELETE_PORTFOLIO_MEDIA}
          msg={"Are you sure you want to delete this portfolio media?"}
        />
        <YesNoPopup
          id="delete-milestone"
          type={popupType.DELETE_MILESTONE}
          msg={"Are you sure you want to delete this milestone?"}
        />
      
      </div>
    </>
  );
}

export default CandidateLayout;
