export const base = {
  PUBLIC_PRE: "",
  CANDIDATE_PRE: "/dashboard-candidate",
  EMPLOYER_PRE: "/dashboard-employer",
  CLIENT_PRE: "/dashboard-client",
};

export const publicUser = {
  INITIAL: "/",
  HOME1: "/index",
  HOME2: "/index2",
  HOME3: "/index3",
  HOME4: "/index4",
  HOME5: "/index5",
  HOME6: "/index6",
  HOME7: "/index7",
  HOME8: "/index8",
  HOME9: "/index9",
  HOME10: "/index10",
  HOME11: "/index11",
  HOME12: "/index12",
  HOME13: "/index13",
  HOME14: "/index14",
  HOME15: "/index15",
  HOME16: "/index16",
  HOME17: "/index17",
  HOME18: "/index18",
  TEST: "/test",
  LOG: "/log",
  CALLBACK: "/wallet/status",
  
  jobs: {
    GRID: "/job-grid",
    GRID_MAP: "/job-grid-with-map",
    LIST: "/job-list",
    DETAIL1: "/job-detail/:id",
    DETAIL2: "/job-detail/2",
    SEARCH: "/jobs-search/:category/:type/:location",
    AVAILABLE: "/jobs-available",
    APPLY: "/apply-job/:id",
  },
  employer: {
    GRID: "/emp-grid",
    LIST: "/emp-list",
    DETAIL1: "/emp-detail/1",
    DETAIL2: "/emp-detail/2",
  },
  pages: {
    ABOUT: "/about-us",
    PRICING: "/pricing",
    ERROR404: "/error404",
    FAQ: "/faq",
    CONTACT: "/contact-us",
    MAINTENANCE: "/under-maintenance",
    COMING: "/coming-soon",
    WHY: "/why-hub",
    WHYCHOOSEUS: "why-choose-us",
    LOGIN: "/login",
    SIGN_UP: "/sign-up",
    FORGOTPASS: "/forgotton-password",
    AFTER_LOGIN: "/after-login",
    RESET_PASSWORD: "/reset-password",
    VERIFYOTP: "/verify-otp",
    VERIFYRESTOTP: "verify-reset-otp",
    ICONS: "/icons",
    CONTRACT: "/contract",
    GOOGLECALLBACK: "/auth/google/callback",
    LINKEDINCALLBACK: "/linkedin/auth/callback",
    WELCOME: "/welcome-onboarding",
    AUTH: "/auth",
    SIGN_IN: "/sign-in",

    FIND_TALENT: "/find-talent",
    New_FIND_TALENT: "/freelancers",
    New_FIND_TALENT_ID: "/freelancers/:id",
    PROPOSALS: "/client-proposals",

    STAFF: "/client-staff",
    TASK: "/task-management",
    TEAM: "/team",
    MESSAGE: "/messages",
  },
  candidate: {
    GRID: "/can-grid",
    LIST: "/can-list",
    DETAIL1: "/can-detail/1",
    DETAIL2: "/can-detail/2",
    PORTFOLIO: "/can-portfolio",
    DETAIL: "/can-detail/:id",
    PROFILE: "/can-profile",
    FINANCE: "/candidate-finance",
    FINANCE_DETAIL: "/can-finance-detail",
  },
  blog: {
    GRID1: "/blog-grid/1",
    GRID2: "/blog-grid/2",
    GRID3: "/blog-grid/3",
    LIST: "/blog-list",
    DETAIL: "/blog-detail",
  },
  payment: {
    CHECKOUT: "/checkout",
    COMPLETE: "/complete",
  },
};

export const candidate = {
  INITIAL: "/",
  DASHBOARD: "/",
  PROFILE: "/profile",
  Contracts_History: "/contracts-history",
  Active_Contracts: "/active-contracts",
  FIND_WORK: "/find-work",
  FIND_WORK_DETAILS: "/find-work-details/:id",
  FREELANCE_SUBMISSIONS: "/freelance-submissions/:id",
  JOB_DETAILS: "/job-details/:id",
  OFFERS: "/candidate-offers",
  APPLIED_JOBS: "/applied-jobs",
  FINANCE: "/candidate-finance",
  RESUME: "/my-resume",
  SAVED_JOBS: "/saved-jobs",
  CV_MANAGER: "/cv-manager",
  ALERTS: "/job-alerts",
  CHANGE_PASSWORD: "/change-password",
  CHAT: "/chat",
  SUBMIT: "/submit-work/:id",
  REVIEWS: "/reviews",
  ACCOUNTS: "/accounts",
  SUBMIT_PROPOSAL: "/submit-proposal/:id",
  APPLIED_JOB_DETAILS: "/applied-job-details/:id",
  SAVED_JOBS_DETAILS: "/saved-job-details/:id",
  APPLY_MILESTONE_JOB: "/apply-job/:id",
  BILLING: "/billings",
  INVOICE: "/create-invoice",
  PREVIEW_INVOICE: "/invoice-preview/:id",
  INVOICE_DETAIL: "/invoice-detail/:id",
  TRANSACTIONS: "/transactions",
  FINANCE_SETTINGS: "/finance-settings",
  PROJECT_MANAGE: "/manage-project/:id",
  SUPPORT: "/support-center",
  DISPUTE: "/dispute-resolution",
};

export const client = {
  DASHBOARD: "/",
  NEW_MANAGE_JOBS: "/new-manage-jobs",
  MANAGE_JOBS_DETAILS: "/manage-job-details/:id",
  MANAGE_PROJECT: "/manage-projects",
  FINANCE: "/client-finance-overview",
  PROFILE: "/profile",
  PROJECT_DETAILS: "/project-details/:id",
  CLIENT_FIND_TALENT: "/find-talented-freelancers",
  CLIENT_FIND_TALENT_ID: "/find-talented-freelancers/:id",
  PAYMENT_HISTORY: "/payment-history",
  CLIENT_STAFF: "/client-staff",
  CANDIDATE_DETAILS: "/candidate-details/:id/:proposal_id",
  JOB_DETAILS: "/job-details/:id",
  TALENT_POOL: "/talent-pool/:id",
  CREATE_PROJECT: "/create-project",
  JOB_APPLICANT: "/job-applicant/:id",
  VIEW_CANDIDATE_PROPOSAL: "/view-candidate-proposal/:id",
  SUBMISSIONS: "/submissions/:id",
};

export const employer = {
  INITIAL: "/",
  DASHBOARD: "/",
  PROFILE: "/profile",
  ADD_CATEGORY: "/add-category",
  ADD_SKILL: "/add-skill",
  POST_A_JOB: "/post-a-job",
  MANAGE_JOBS: "/manage-jobs",
  CANDIDATES: "/candidates-list",
  STAFF: "/staff-list",
  BOOKMARKS: "/bookmarked-resumes",
  PACKAGES: "/packages",
  MESSAGES1: "/messages-style-1",
  MESSAGES2: "/messages-style-2",
  RESUME_ALERTS: "/resume-alerts",
  REVIEWS: "/reviews",
  ACCOUNTS: "/accounts",
};

export function pubRoute(_route) {
  return base.PUBLIC_PRE + _route;
}

// export function empRoute(_route) {
// 	return base.EMPLOYER_PRE + _route;

// }
export function empRoute(_route, id = "") {
  return `${base.EMPLOYER_PRE}${_route}${id ? `/${id}` : ""}`;
}

export function clientRoute(_route, id = "") {
  return `${base.CLIENT_PRE}${_route}${id ? `/${id}` : ""}`;
}
// export function canRoute(_route) {
//     return base.CANDIDATE_PRE + _route;
// 	// return _route + base.CANDIDATE_PRE;
// }

export function canRoute(_route, id = "") {
  return `${base.CANDIDATE_PRE}${_route}${id ? `/${id}` : ""}`;
}

export const withId = (id, routes) => {
  const updatedRoutes = {};
  for (const key in routes) {
    updatedRoutes[key] = `${routes[key].startsWith("/") ? "" : "/"}${id}${
      routes[key]
    }`;
  }
  return updatedRoutes;
};
