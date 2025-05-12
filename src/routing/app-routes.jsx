import { Routes, Route } from "react-router-dom";

import PublicUserLayout from "../layouts/public-user-layout";
import EmployerLayout from "../layouts/employer-layout";
import CandidateLayout from "../layouts/candidate-layout";
import { base } from "../globals/route-names";
import ProtectedRoute from "./protectedRoute";
import Onboard from "../app/pannels/public-user/onboard/onboard";
import FreelancerOnboard from "../app/pannels/public-user/onboard/freelanceOnboard/freelancerOnboard";
import ClientOnboard from "../app/pannels/public-user/onboard/clientOnboard/clientOnboard";
import CreateAccount from "../app/pannels/public-user/onboard/createAccount/createAccount";
import Offers from "../app/pannels/candidate/sections/offers/offers";
import ClientProfileView from "../app/pannels/public-user/sections/profile/client-profile-view";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path={base.PUBLIC_PRE + "/dashboard/Onboard"}
        element={<Onboard />}
      />
      <Route
        path={base.PUBLIC_PRE + "/dashboard/Onboard/freelancer"}
        element={<FreelancerOnboard />}
      />
      <Route
        path={base.PUBLIC_PRE + "/dashboard/Onboard/client"}
        element={<ClientOnboard />}
      />
      <Route
        path={base.PUBLIC_PRE + "/dashboard/Onboard/create-account"}
        element={<CreateAccount />}
      />
      {/** For localhost development */}
      <Route
        path={base.PUBLIC_PRE + "/dashboard/Offers"}
        element={<Offers />}
      />
      <Route
        path={base.PUBLIC_PRE + "/dashboard/company-profile/:id"}
        element={<ClientProfileView />}
      />
      {/** End localhost development */}

      <Route path={base.PUBLIC_PRE + "/*"} element={<PublicUserLayout />} />
      <Route element={<ProtectedRoute allowedRoles={["employer"]} />}>
        <Route path={base.EMPLOYER_PRE + "/*"} element={<EmployerLayout />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["candidate"]} />}>
        <Route path={base.CANDIDATE_PRE + "/*"} element={<CandidateLayout />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
