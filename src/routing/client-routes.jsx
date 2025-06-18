import { Route, Routes } from "react-router-dom";
import { client } from "../globals/route-names";
import ManageJobs from "../app/pannels/employer/components/jobs/manage-jobs";
import Error404Page from "../app/pannels/public-user/components/pages/error404";
import ClientDashboard from "../app/pannels/public-user/sections/dashboard/client-dashboard";
import ClientProfile from "../app/pannels/public-user/sections/profile/client-profile";
import FinancialOverview from "../app/pannels/candidate/sections/client-finance/financial-overview";
import ProjectDetailPage from "../app/pannels/employer/components/jobs/project-details";
import FreelancerSearch from "../app/pannels/public-user/sections/find-talent/client-find-talent";
import ClientfreelancerDetail from "../app/pannels/public-user/sections/find-talent/client-find-talent-details";
import PaymentHistoryPage from "../app/pannels/employer/components/jobs/payment-history";
import JobListing from "../app/pannels/employer/components/jobs/manage-job-details";
import ManageProjects from "../app/pannels/employer/components/jobs/manage-projects";
import CreateProject from "../app/pannels/employer/components/project/create-project";
import JobApplicant from "../app/pannels/employer/components/applicant/job-applicant";
import { TalentPool } from "../app/pannels/employer/components/talent-pool/talent-pool";
import ViewProposal from "../app/pannels/candidate/sections/deliver-work/view-proposal";
import FreelancerDetailTwo from "../app/pannels/public-user/sections/find-talent/freelancer-details-two";
//import projectDetails from "../app/pannels/employer/components/project/project-details";

function ClientRoutes() {
  return (
    <Routes>
      <Route path={client.DASHBOARD} element={<ClientDashboard />} />
      <Route path={client.NEW_MANAGE_JOBS} element={<ManageJobs />} />
      <Route path={client.MANAGE_JOBS_DETAILS} element={<JobApplicant />} />
      <Route path={client.MANAGE_PROJECT} element={<ManageProjects />} />
      <Route path={client.PROJECT_DETAILS} element={<ProjectDetailPage />} />
      <Route path={client.PROFILE} element={<ClientProfile />} />
      <Route path={client.CREATE_PROJECT} element={<CreateProject />} />
      <Route path={client.TALENT_POOL} element={<TalentPool />} />
      <Route path={client.FINANCE} element={<FinancialOverview />} />
      <Route path={client.CLIENT_FIND_TALENT} element={<FreelancerSearch />} />
      <Route path={client.VIEW_CANDIDATE_PROPOSAL} element={<ViewProposal />} />
      <Route
        path={client.CLIENT_FIND_TALENT_ID}
        element={<ClientfreelancerDetail />}
      />
      <Route path={client.PAYMENT_HISTORY} element={<PaymentHistoryPage />} />
      <Route path={client.MANAGE_JOBS_DETAILS} element={<JobListing />} />
      <Route
        path={client.CANDIDATE_DETAILS}
        element={<FreelancerDetailTwo />}
      />
      {/* Add other client routes here */}
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}

export default ClientRoutes;
