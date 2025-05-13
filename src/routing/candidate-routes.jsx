import { Route, Routes } from "react-router-dom";
import { candidate } from "../globals/route-names";
import CanDashboardPage from "../app/pannels/candidate/components/can-dashboard";
// import CanProfilePage from "../app/pannels/candidate/components/can-profile";
import CanAppliedJobs from "../app/pannels/candidate/components/can-applied-jobs";
import CanMyResumePage from "../app/pannels/candidate/components/can-resume";
// import CanSavedJobsPage from "../app/pannels/candidate/components/can-saved-jobs";
import CanCVManagerPage from "../app/pannels/candidate/components/can-cv-manager";
import CanJobAlertsPage from "../app/pannels/candidate/components/can-job-alerts";
import CanChangePasswordPage from "../app/pannels/candidate/components/can-change-password";
import CanChatPage from "../app/pannels/candidate/components/can-chat";
import Error404Page from "../app/pannels/public-user/components/pages/error404";
import React from "react";
import { CanReviewsPage } from "../app/pannels/candidate/components/can-reviews-page";
import FinancesPage from "../app/common/payment/accounts/finances-page";
import Offers from "../app/pannels/candidate/sections/offers/offers";
import CanAppliedJobDetails from "../app/pannels/candidate/components/can-applied-job-details";
import CanSavedJobsDetails from "../app/pannels/candidate/components/can-saved-jobs-details";
import CanApplyMilestone from "../app/pannels/candidate/components/can-apply-milestone";
import ContractsHistory from "../app/pannels/candidate/sections/deliver-work/contracts-history";
import CandidateProfile from "../app/pannels/candidate/sections/new-profile/cand-profile";
import FindWorkPage from "../app/pannels/candidate/sections/find-work/find-work-page";
import ActiveContracts from "../app/pannels/candidate/sections/deliver-work/active-contracts";
import SubmitWork from "../app/pannels/candidate/sections/deliver-work/submit-work";
import SubmitProposal from "../app/pannels/candidate/sections/deliver-work/submit-proposal";
import NewSavedJobsPage from "../app/pannels/candidate/sections/new-saved-jobs/new-saved-jobs-page";
import FindWorkDetails from "../app/pannels/candidate/sections/find-work/find-work-details";
import FinancialDashboard from "../app/pannels/candidate/sections/finances/finance-dashboad";
import BillingDashboard from "../app/pannels/candidate/sections/finances/billings-dashboard";
import CreateInvoice from "../app/pannels/candidate/sections/finances/invoice";
import InvoicePreview from "../app/pannels/candidate/sections/finances/invoice-preview";
import InvoiceDetailsPage from "../app/pannels/candidate/sections/finances/invoice-details";
import TransactionsPage from "../app/pannels/candidate/sections/finances/transactions";
import FinancialSettings from "../app/pannels/candidate/sections/finances/finance-settings";
import JobDetailsPage from "../app/pannels/public-user/components/jobs/new-job-datails";

function CandidateRoutes() {
  return (
    <Routes>
      <Route path={candidate.DASHBOARD} element={<CanDashboardPage />} />
      <Route path={candidate.PROFILE} element={<CandidateProfile />} />
      <Route path={candidate.FIND_WORK} element={<FindWorkPage />} />
      <Route path={candidate.FIND_WORK_DETAILS} element={<FindWorkDetails />} />
      <Route path={candidate.JOB_DETAILS} element={<JobDetailsPage />} />
      <Route path={candidate.SUBMIT} element={<SubmitWork />} />
      <Route path={candidate.APPLIED_JOBS} element={<CanAppliedJobs />} />
      <Route path={candidate.RESUME} element={<CanMyResumePage />} />
      <Route path={candidate.SAVED_JOBS} element={<NewSavedJobsPage />} />
      <Route path={candidate.CV_MANAGER} element={<CanCVManagerPage />} />
      <Route path={candidate.ALERTS} element={<CanJobAlertsPage />} />
      <Route path={candidate.ACCOUNTS} element={<FinancesPage />} />
      <Route path={candidate.FINANCE} element={<FinancialDashboard />} />
      <Route path={candidate.BILLING} element={<BillingDashboard />} />
      <Route path={candidate.INVOICE} element={<CreateInvoice />} />
      <Route path={candidate.PREVIEW_INVOICE} element={<InvoicePreview />} />
      <Route path={candidate.INVOICE_DETAIL} element={<InvoiceDetailsPage />} />
      <Route path={candidate.TRANSACTIONS} element={<TransactionsPage />} />
      <Route path={candidate.FINANCE_SETTINGS} element={<FinancialSettings />} />
      <Route path={candidate.CHANGE_PASSWORD} element={<CanChangePasswordPage />} />
      <Route path={candidate.OFFERS} element={<Offers />} />
      <Route path={candidate.CHAT} element={<CanChatPage />} />
      <Route path={candidate.REVIEWS} element={<CanReviewsPage />} />
      <Route path={candidate.Contracts_History} element={<ContractsHistory />} />
      <Route path={candidate.Active_Contracts} element={<ActiveContracts />} />
      <Route path={candidate.APPLIED_JOB_DETAILS} element={<CanAppliedJobDetails />} />
      <Route path={candidate.SAVED_JOBS_DETAILS} element={<CanSavedJobsDetails />} />
      <Route path={candidate.APPLY_MILESTONE_JOB} element={<CanApplyMilestone />} />
      <Route path={candidate.SUBMIT_PROPOSAL} element={<SubmitProposal />} />
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}

export default CandidateRoutes;
