import { Route, Routes } from "react-router-dom";
import { client } from "../globals/route-names";
import ManageJobs from "../app/pannels/employer/components/jobs/manage-jobs";
import ManageProjects from "../app/pannels/employer/components/jobs/manage-projects";
import Error404Page from "../app/pannels/public-user/components/pages/error404";
import ClientDashboard from "../app/pannels/public-user/sections/dashboard/client-dashboard";
import ClientProfile from "../app/pannels/public-user/sections/profile/client-profile";
import FinancialOverview from "../app/pannels/candidate/sections/client-finance/financial-overview";
import ProjectDetailPage from "../app/pannels/employer/components/jobs/project-details";
import JobDetails from "../app/pannels/employer/components/jobs/job-details";
import { TalentPool } from "../app/pannels/employer/components/talent-pool/talent-pool";
import JobApplicant from "../app/pannels/employer/components/applicant/job-applicant";
import FreelancerDetailTwo from "../app/pannels/public-user/sections/find-talent/freelancer-details-two";
import CreateProject from "../app/pannels/employer/components/project/create-project";
import FreelancerSearch from "../app/pannels/public-user/sections/find-talent/client-find-talent";
import ClientfreelancerDetail from "../app/pannels/public-user/sections/find-talent/client-find-talent-details";
import PaymentHistoryPage from "../app/pannels/employer/components/jobs/payment-history";

function ClientRoutes() {
  return (
    <Routes>
      <Route path={client.DASHBOARD} element={<ClientDashboard />} />
      <Route path={client.NEW_MANAGE_JOBS} element={<ManageJobs />} />
      <Route path={client.MANAGE_PROJECT} element={<ManageProjects />} />
      <Route path={client.JOB_DETAILS} element={<JobDetails />} />
      <Route path={client.TALENT_POOL} element={<TalentPool />} />
      <Route
        path={client.CANDIDATE_DETAILS}
        element={<FreelancerDetailTwo />}
      />
      <Route path={client.PROJECT_DETAILS} element={<ProjectDetailPage />} />
      <Route path={client.PROFILE} element={<ClientProfile />} />
      <Route path={client.FINANCE} element={<FinancialOverview />} />
      <Route path={client.CREATE_PROJECT} element={<CreateProject />} />
      <Route path={client.JOB_APPLICANT} element={<JobApplicant />} />
      <Route path={client.CLIENT_FIND_TALENT} element={<FreelancerSearch />} />
      <Route
        path={client.CLIENT_FIND_TALENT_ID}
        element={<ClientfreelancerDetail />}
      />
      <Route path={client.PAYMENT_HISTORY} element={<PaymentHistoryPage />} />
      {/* Add other client routes here */}
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}

export default ClientRoutes;
