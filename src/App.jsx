import RootLayout from "./layouts/root-layout";
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
import MilestoneApiDataProvider from "./app/context/milestone/milestoneContextApi";
import PaymentApiDataProvider from "./app/context/payment/paymentContextApi";
import PortfolioApiDataProvider from "./app/context/portfolio/portfolioContextApi";
import SkillsApiDataProvider from "./app/context/skills/skillsContextApi";
import TestimonialApiDataProvider from "./app/context/testimonial/testimonialContextApi";
import ProfileApiDataProvider from "./app/context/user-profile/profileContextApi";
import WalletApiDataProvider from "./app/context/wallet/walletContextApi";


import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";


function App() {
//   const [isLoading, setLoading] = useState(true);

//   setTimeout(() => {
//     setLoading(false);
//   }, 500);

const [isLoading, setLoading] = useState(true);
const location = useLocation(); 

    useEffect(() => {
        setLoading(true); 
        const timer = setTimeout(() => {
            setLoading(false); 
        }, 2000); 

        return () => clearTimeout(timer); 
    }, [location]);


  return (
		<GlobalApiDataProvider>
			<AuthApiDataProvider>
				<ApplicationApiDataProvider>
					<CategoryApiDataProvider>
						<EducationApiDataProvider>
							<HistoryApiDataProvider>
								<EmployerApiDataProvider>
									<FreelanceApiDataProvider>
										<JobApiDataProvider>
											<MilestoneApiDataProvider>
												<PaymentApiDataProvider>
													<PortfolioApiDataProvider>
														<SkillsApiDataProvider>
															<TestimonialApiDataProvider>
																<ProfileApiDataProvider>
																	<WalletApiDataProvider>
																		{isLoading && <Loader />}
																		<Toaster />
																		<ScrollToTop />
																		<RootLayout />
																	</WalletApiDataProvider>
																</ProfileApiDataProvider>
															</TestimonialApiDataProvider>
														</SkillsApiDataProvider>
													</PortfolioApiDataProvider>
												</PaymentApiDataProvider>
											</MilestoneApiDataProvider>
										</JobApiDataProvider>
									</FreelanceApiDataProvider>
								</EmployerApiDataProvider>
							</HistoryApiDataProvider>
						</EducationApiDataProvider>
					</CategoryApiDataProvider>
				</ApplicationApiDataProvider>
			</AuthApiDataProvider>
		</GlobalApiDataProvider>
	);
}

export default App;
