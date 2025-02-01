import { Route, Routes } from "react-router-dom";
import { candidate, withId } from "../globals/route-names";
import CanDashboardPage from "../app/pannels/candidate/components/can-dashboard";
import CanProfilePage from "../app/pannels/candidate/components/can-profile";
import CanAppliedJobs from "../app/pannels/candidate/components/can-applied-jobs";
import CanMyResumePage from "../app/pannels/candidate/components/can-resume";
import CanSavedJobsPage from "../app/pannels/candidate/components/can-saved-jobs";
import CanCVManagerPage from "../app/pannels/candidate/components/can-cv-manager";
import CanJobAlertsPage from "../app/pannels/candidate/components/can-job-alerts";
import CanChangePasswordPage from "../app/pannels/candidate/components/can-change-password";
import CanChatPage from "../app/pannels/candidate/components/can-chat";
import Error404Page from "../app/pannels/public-user/components/pages/error404";
import { useUser } from "../app/context/auth/UserContext";
import { useEffect, useState } from "react";
import ProtectedRoute from "../app/context/ProtectedRoute";
import SectionReviews from "../app/pannels/public-user/sections/common/section-reviews";
import  { CanReviewsPage } from "../app/pannels/candidate/components/can-reviews-page";
import FinancesPage from "../app/common/payment/accounts/finances-page";

function CandidateRoutes() {
	const { user } = useUser();
	const [routes, setRoutes] = useState({});

	// if (!user) {
	// 	alert("user doesn't exist");
    // }
    
	

	useEffect(() => {
		if (user?.id) {
			// Pass the user id dynamically to withId
			const updatedRoutes = withId(user.id, candidate);
			setRoutes(updatedRoutes); // Set the updated routes in the state
		}
    }, [user]);
    
    // if (!routes.APPLIED_JOBS) {
	// 		return <div>User doesn't exist; Log in to continue</div>;
	// 	}

	return (
		// <ProtectedRoute roleProp="1"></ProtectedRoute>
		<Routes>
			<Route path={candidate.DASHBOARD} element={<CanDashboardPage />} />
			<Route path={candidate.PROFILE} element={<CanProfilePage />} />
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
			<Route path="*" element={<Error404Page />} />
		</Routes>
	);
}

export default CandidateRoutes;