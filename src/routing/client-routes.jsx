import { Route, Routes } from "react-router-dom";
import { client } from "../globals/route-names";
import ManageJobs from "../app/pannels/employer/components/jobs/manage-jobs";
import Error404Page from "../app/pannels/public-user/components/pages/error404";
import ClientDashboard from "../app/pannels/public-user/sections/dashboard/client-dashboard";
import ClientProfile from "../app/pannels/public-user/sections/profile/client-profile";
import FinancialOverview from "../app/pannels/candidate/sections/client-finance/financial-overview";
import ProjectDetailPage from "../app/pannels/employer/components/jobs/project-details";
import JobDetails from "../app/pannels/employer/components/jobs/job-details";
function ClientRoutes() {
  return (
    <Routes>
      <Route path={client.DASHBOARD} element={<ClientDashboard />} />
      <Route path={client.NEW_MANAGE_JOBS} element={<ManageJobs />} />
      <Route path={client.JOB_DETAILS} element={<JobDetails />} />
      <Route path={client.PROJECT_DETAILS} element={<ProjectDetailPage />} />
      <Route path={client.PROFILE} element={<ClientProfile />} />
      <Route path={client.FINANCE} element={<FinancialOverview />} />
      {/* Add other client routes here */}
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}

export default ClientRoutes;
