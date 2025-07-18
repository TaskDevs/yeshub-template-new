import { Route, Routes } from "react-router-dom";
import { employer } from "../globals/route-names";
import EmpDashboardPage from "../app/pannels/employer/components/emp-dashboard";
import EmpCompanyProfilePage from "../app/pannels/employer/components/emp-company-profile";
import EmpPostAJobPage from "../app/pannels/employer/components/jobs/emp-post-a-job";
// import EmpManageJobsPage from "../app/pannels/employer/components/jobs/emp-manage-jobs";
import EmpCandidatesPage from "../app/pannels/employer/components/emp-candidates";
import EmpBookmarksPage from "../app/pannels/employer/components/emp-bookmarks";
import EmpPackagesPage from "../app/pannels/employer/components/emp-packages";
import EmpMessages1Page from "../app/pannels/employer/components/messages/emp-messages1";
import EmpResumeAlertsPage from "../app/pannels/employer/components/emp-resume-alerts";
import Error404Page from "../app/pannels/public-user/components/pages/error404";

import { EmpReviewsPage } from "../app/pannels/candidate/components/can-reviews-page";
import FinancesPage from "../app/common/payment/accounts/finances-page";
import SkillsPage from "../app/pannels/employer/components/skills/skills-page";
import CategoryPage from "../app/pannels/employer/components/category/category-page";

function EmployerRoutes() {
  return (
    <Routes>
      <Route path={employer.DASHBOARD} element={<EmpDashboardPage />} />
      <Route path={employer.PROFILE} element={<EmpCompanyProfilePage />} />
      <Route path={employer.ADD_SKILL} element={<SkillsPage />} />
      <Route path={employer.ADD_CATEGORY} element={<CategoryPage />} />
      <Route path={employer.POST_A_JOB} element={<EmpPostAJobPage />} />
      {/* <Route path={employer.MANAGE_JOBS} element={<EmpManageJobsPage />} /> */}
      <Route path={employer.CANDIDATES} element={<EmpCandidatesPage />} />
      <Route path={employer.BOOKMARKS} element={<EmpBookmarksPage />} />
      <Route path={employer.PACKAGES} element={<EmpPackagesPage />} />
      <Route path={employer.MESSAGES1} element={<EmpMessages1Page />} />
      {/* <Route path={employer.MESSAGES2} element={<EmpMessages2Page />} /> */}
      <Route path={employer.RESUME_ALERTS} element={<EmpResumeAlertsPage />} />
      <Route path={employer.ACCOUNTS} element={<FinancesPage />} />
      <Route path={employer.REVIEWS} element={<EmpReviewsPage />} />
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}

export default EmployerRoutes;
