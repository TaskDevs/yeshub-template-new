import { Routes, Route } from "react-router-dom";

import PublicUserLayout from "../layouts/public-user-layout";
import EmployerLayout from "../layouts/employer-layout";
import CandidateLayout from "../layouts/candidate-layout";
import { base } from "../globals/route-names";
import ProtectedRoute from "./protectedRoute";
import Onboard from "../app/pannels/public-user/onboard/onboard";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path={base.PUBLIC_PRE + "/dashboard/Onboard"}
        element={<Onboard />}
      />
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
