
import ClientRoutes from "../routing/client-routes";
import SignUpPopup from "../app/common/popups/popup-signup";
import SignInPopup from "../app/common/popups/popup-signin";

import YesNoPopup from "../app/common/popups/popup-yes-no";
import { popupType } from "../globals/constants";
import { Header } from "../app/common/header/new-header";




function ClientLout() {


  return (
    <>
      <div className="page-wraper">
        {/* <Header1 _config={getHeaderConfig(currentpath)} /> */}
        <Header isDashboard={true} />

     
        <div className="page-content m-t40">
          {/* <InnerPageBanner _data={setBanner(currentpath)} /> */}
          {/* "col-xl-3 col-lg-4 col-md-12 rightSidebar m-b30 */}
          {/* site-bg-white p-b90 */}
          <div className="section-full p-t60    site-bg-gray">
            <ClientRoutes />
          </div>
        </div>

        
        
        {/* Footer */}
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

export default ClientLout;
