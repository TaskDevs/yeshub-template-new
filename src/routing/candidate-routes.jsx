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
import { useAuth } from "../app/context/auth/AuthContext";

function CandidateRoutes() {
	const { user } = useUser();
	// const [routes, setRoutes] = useState({});

	// /dashboard-candidate/${user?.id}


	// const { routes, setRoutes } = useAuth();
	const { userData } = useAuth();

	const [routes, setRoutes] = useState({});

	// console.log("routes-canR", routes);

	

	useEffect(() => {
		if (userData?.id) {
			const updatedRoutes = withId(userData.id, candidate);
			setRoutes(updatedRoutes);
		}

		// console.log("routes-canR2", routes);
	}, [userData?.id]);
    

	return (
		// <ProtectedRoute roleProp="user"></ProtectedRoute>
		<Routes>
			<Route path={routes.DASHBOARD} element={<CanDashboardPage />} />
			<Route path={routes.PROFILE} element={<CanProfilePage />} />
			<Route path={routes.APPLIED_JOBS} element={<CanAppliedJobs />} />
			<Route path={routes.RESUME} element={<CanMyResumePage />} />
			<Route path={routes.SAVED_JOBS} element={<CanSavedJobsPage />} />
			<Route path={routes.CV_MANAGER} element={<CanCVManagerPage />} />
			<Route path={routes.ALERTS} element={<CanJobAlertsPage />} />
			<Route path={routes.ACCOUNTS} element={<FinancesPage />} />
			<Route
				path={routes.CHANGE_PASSWORD}
				element={<CanChangePasswordPage />}
			/>
			<Route path={routes.CHAT} element={<CanChatPage />} />
			<Route path={routes.REVIEWS} element={<CanReviewsPage />} />
			<Route path="*" element={<Error404Page />} />
		</Routes>
	);
}

export default CandidateRoutes;