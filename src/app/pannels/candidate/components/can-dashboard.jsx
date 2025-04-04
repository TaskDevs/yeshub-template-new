import SectionCandidateOverview from "../sections/dashboard/section-can-overview";
// import SectionCandidateInbox from "../sections/dashboard/section-can-inbox";
// import SectionCandidateProfileViews from "../sections/dashboard/section-can-profile-views";
// import SectionCandidateRecentActivities from "../sections/dashboard/section-can-activities";
// import SectionCandidateRecentApplications from "../sections/dashboard/section-can-applications";
import { useEffect, useState } from "react";
import { loadScript } from "../../../../globals/constants";
import { Link } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";

function CanDashboardPage() {
  useEffect(() => {
    loadScript("js/custom.js");
  });

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("onboarding_incomplete") === "true") {
      setShowAlert(true);
      localStorage.removeItem("onboarding_incomplete"); // Clear flag after showing alert
    }
  }, []);

  return (
    <>
    {showAlert && (
        <Alert severity="warning" onClose={() => setShowAlert(false)} className="mt-4">
          <AlertTitle>Incomplete Profile set up</AlertTitle>
          You haven not completed your profile.{" "}
          <Link to="/dashboard/onboard/freelancer" style={{ color: "blue" }}>
            Click here to finish
          </Link>
        </Alert>
      )}
      <div className="twm-right-section-panel site-bg-gray">
        <SectionCandidateOverview />

        {/* <div className="twm-pro-view-chart-wrap">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 mb-4">
                            <SectionCandidateProfileViews />
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 mb-4">
                            <SectionCandidateInbox />
                        </div>
                        <div className="col-lg-12 col-md-12 mb-4">
                            <SectionCandidateRecentActivities />
                        </div>
                        <div className="col-lg-12 col-md-12 mb-4">
                            <SectionCandidateRecentApplications />
                        </div>
                    </div>
                </div> */}
      </div>
    </>
  );
}

export default CanDashboardPage;
