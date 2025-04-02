import { Route, Routes } from "react-router-dom";
import { candidate } from "../globals/route-names";
import CanDashboardPage from "../app/pannels/candidate/components/can-dashboard";
// import CanProfilePage from "../app/pannels/candidate/components/can-profile";
import CanAppliedJobs from "../app/pannels/candidate/components/can-applied-jobs";
import CanMyResumePage from "../app/pannels/candidate/components/can-resume";
import CanSavedJobsPage from "../app/pannels/candidate/components/can-saved-jobs";
import CanCVManagerPage from "../app/pannels/candidate/components/can-cv-manager";
import CanJobAlertsPage from "../app/pannels/candidate/components/can-job-alerts";
import CanChangePasswordPage from "../app/pannels/candidate/components/can-change-password";
import CanChatPage from "../app/pannels/candidate/components/can-chat";
import Error404Page from "../app/pannels/public-user/components/pages/error404";
import React from "react";
import { CanReviewsPage } from "../app/pannels/candidate/components/can-reviews-page";
import FinancesPage from "../app/common/payment/accounts/finances-page";
import CanAppliedJobDetails from "../app/pannels/candidate/components/can-applied-job-details";
import CanSavedJobsDetails from "../app/pannels/candidate/components/can-saved-jobs-details";
import CanApplyMilestone from "../app/pannels/candidate/components/can-apply-milestone";
import ContractsHistory from "../app/pannels/candidate/sections/dashboard/contracts-history";
import CandidateProfile from "../app/pannels/candidate/sections/new-profile/cand-profile";

function CandidateRoutes() {
	return (
		<Routes>
			<Route path={candidate.DASHBOARD} element={<CanDashboardPage />} />
			<Route path={candidate.PROFILE} element={<CandidateProfile />} />
			{/* <Route path={candidate.PROFILE} element={<CanProfilePage />} /> */}
			<Route path={candidate.APPLIED_JOBS} element={<CanAppliedJobs />} />
			<Route path={candidate.RESUME} element={<CanMyResumePage />} />
			<Route path={candidate.SAVED_JOBS} element={<CanSavedJobsPage />} />
			<Route path={candidate.CV_MANAGER} element={<CanCVManagerPage />} />
			<Route path={candidate.ALERTS} element={<CanJobAlertsPage />} />
			<Route path={candidate.ACCOUNTS} element={<FinancesPage />} />
			<Route
				path={candidate.CHANGE_PASSWORD}
				element={<CanChangePasswordPage />}
			/>
			<Route path={candidate.CHAT} element={<CanChatPage />} />
			<Route path={candidate.REVIEWS} element={<CanReviewsPage />} />
			<Route path={candidate.Contracts_History} element={<ContractsHistory />} />
			<Route path={candidate.APPLIED_JOB_DETAILS} element={<CanAppliedJobDetails />} />
			<Route path={candidate.SAVED_JOBS_DETAILS} element={<CanSavedJobsDetails />} />
			<Route path={candidate.APPLY_MILESTONE_JOB} element={<CanApplyMilestone />} />
			<Route path="*" element={<Error404Page />} />

		</Routes>
	);
}

export default CandidateRoutes;