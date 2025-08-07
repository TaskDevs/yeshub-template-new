import RootLayout from "./layouts/root-layout";
import MaintenancePage from "./app/pannels/public-user/components/pages/maintenance";
import Loader from "./app/common/loader";
import ScrollToTop from "./globals/scroll-to-top";
import React, { useEffect, useState } from "react";
import AuthApiDataProvider from "./app/context/auth/authContextApi";
import GlobalApiDataProvider from "./app/context/global/globalContextApi";
import ApplicationApiDataProvider from "./app/context/application/applicationContextApi";
import CategoryApiDataProvider from "./app/context/category/categoryContextApi";
import EducationApiDataProvider from "./app/context/education/educationContextApi";
import HistoryApiDataProvider from "./app/context/employee-history/historyContextApi";
import EmployerApiDataProvider from "./app/context/employers/employerContextApi";
import FreelanceApiDataProvider from "./app/context/freelance/freelanceContextApi";
import JobApiDataProvider from "./app/context/jobs/jobsContextApi";
import TaskApiDataProvider from "./app/context/task/taskContextApi";
import TeamApiDataProvider from "./app/context/team/teamContextApi";
import ProposalApiDataProvider from "./app/context/proposal/proposalContextApi";
import MilestoneApiDataProvider from "./app/context/milestone/milestoneContextApi";
import PaymentApiDataProvider from "./app/context/payment/paymentContextApi";
import PortfolioApiDataProvider from "./app/context/portfolio/portfolioContextApi";
import SkillsApiDataProvider from "./app/context/skills/skillsContextApi";
import TestimonialApiDataProvider from "./app/context/testimonial/testimonialContextApi";
import ProfileApiDataProvider from "./app/context/user-profile/profileContextApi";
import WalletApiDataProvider from "./app/context/wallet/walletContextApi";
import TransactionApiDataProvider from "./app/context/transaction/transactionContextApi";

import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import PortfolioMediaApiDataProvider from "./app/context/portfolio-media/portfolioMediaContextApi";
import { ChatProvider } from "./app/context/chat/chatContext";
import SavedJobsApiDataProvider from "./app/context/saved-jobs/savedJobsContextApi";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [isInMaintenance, setIsInMaintenance] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location]);

 
useEffect(() => {
  const now = new Date();

  // Retrieve stored launch date or set it
  let launchDate = localStorage.getItem('launchDate');

  if (!launchDate) {
    localStorage.setItem('launchDate', now.toISOString());
    launchDate = now;
  } else {
    launchDate = new Date(launchDate);
  }

  // Calculate difference in months
  const monthsDiff = (now.getFullYear() - launchDate.getFullYear()) * 12 +
                     (now.getMonth() - launchDate.getMonth());

  if (monthsDiff >= 8) {
    setIsInMaintenance(true);
  }
}, []);




  return (
    isInMaintenance ? (
      <MaintenancePage />
    ) : (

    <GlobalApiDataProvider>
      <AuthApiDataProvider>
        <ChatProvider>
          <CategoryApiDataProvider>
            <EducationApiDataProvider>
              <HistoryApiDataProvider>
                <EmployerApiDataProvider>
                  <TaskApiDataProvider>
                    <TeamApiDataProvider>
                      <JobApiDataProvider>
                        <ProposalApiDataProvider>
                          <SavedJobsApiDataProvider>
                            <ApplicationApiDataProvider>
                              <MilestoneApiDataProvider>
                                <PaymentApiDataProvider>
                                  <PortfolioApiDataProvider>
                                    <PortfolioMediaApiDataProvider>
                                      <SkillsApiDataProvider>
                                        <TestimonialApiDataProvider>
                                          <ProfileApiDataProvider>
                                            <FreelanceApiDataProvider>
                                              <WalletApiDataProvider>
                                                <TransactionApiDataProvider>
                                                  {isLoading && <Loader />}
                                                  <Toaster />
                                                  <ScrollToTop />
                                                  <RootLayout />
                                                </TransactionApiDataProvider>
                                              </WalletApiDataProvider>
                                            </FreelanceApiDataProvider>
                                          </ProfileApiDataProvider>
                                        </TestimonialApiDataProvider>
                                      </SkillsApiDataProvider>
                                    </PortfolioMediaApiDataProvider>
                                  </PortfolioApiDataProvider>
                                </PaymentApiDataProvider>
                              </MilestoneApiDataProvider>
                            </ApplicationApiDataProvider>
                          </SavedJobsApiDataProvider>
                        </ProposalApiDataProvider>
                      </JobApiDataProvider>
                    </TeamApiDataProvider>
                  </TaskApiDataProvider>
                </EmployerApiDataProvider>
              </HistoryApiDataProvider>
            </EducationApiDataProvider>
          </CategoryApiDataProvider>
        </ChatProvider>
      </AuthApiDataProvider>
    </GlobalApiDataProvider>
    )
  );
}

export default App;
