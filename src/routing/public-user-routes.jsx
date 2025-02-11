import { Route, Routes } from "react-router-dom";
import { publicUser } from "../globals/route-names";
import Home1Page from "../app/pannels/public-user/components/home/index";
import Home2Page from "../app/pannels/public-user/components/home/index2";
import Home3Page from "../app/pannels/public-user/components/home/index3";
import Home4Page from "../app/pannels/public-user/components/home/index4";
import Home5Page from "../app/pannels/public-user/components/home/index5";
import Home6Page from "../app/pannels/public-user/components/home/index6";
import Home7Page from "../app/pannels/public-user/components/home/index7";
import Home8Page from "../app/pannels/public-user/components/home/index8";
import Home9Page from "../app/pannels/public-user/components/home/index9";
import Home10Page from "../app/pannels/public-user/components/home/index10";
import Home11Page from "../app/pannels/public-user/components/home/index11";
import Home12Page from "../app/pannels/public-user/components/home/index12";
import Home13Page from "../app/pannels/public-user/components/home/index13";
import Home14Page from "../app/pannels/public-user/components/home/index14";
import Home15Page from "../app/pannels/public-user/components/home/index15";
import Home16Page from "../app/pannels/public-user/components/home/index16";
import Home17Page from "../app/pannels/public-user/components/home/index17";
import Home18Page from "../app/pannels/public-user/components/home/index18";

import JobsGridPage from "../app/pannels/public-user/components/jobs/jobs-grid";
import JobsGridMapPage from "../app/pannels/public-user/components/jobs/jobs-grid-map";
import JobsListPage from "../app/pannels/public-user/components/jobs/jobs-list";
import JobDetail1Page from "../app/pannels/public-user/components/jobs/job-detail1";
import JobDetail2Page from "../app/pannels/public-user/components/jobs/job-detail2";
import ApplyJobPage from "../app/pannels/public-user/components/jobs/apply-job";

import EmployersGridPage from "../app/pannels/public-user/components/employers/emp-grid";
import EmployersListPage from "../app/pannels/public-user/components/employers/emp-list";
import EmployersDetail1Page from "../app/pannels/public-user/components/employers/emp-detail1";
import EmployersDetail2Page from "../app/pannels/public-user/components/employers/emp-detail2";

import AboutUsPage from "../app/pannels/public-user/components/pages/about-us";
import PricingPage from "../app/pannels/public-user/components/pages/pricing";
import Error404Page from "../app/pannels/public-user/components/pages/error404";
import FaqPage from "../app/pannels/public-user/components/pages/faq";
import ContactUsPage from "../app/pannels/public-user/components/pages/contact-us";
import UnderMaintenancePage from "../app/pannels/public-user/components/pages/under-maintenance";
import ComingSoonPage from "../app/pannels/public-user/components/pages/coming-soon";
import LoginPage from "../app/pannels/public-user/components/pages/login";
import AfterLoginPage from "../app/pannels/public-user/components/pages/after-login";
import IconsPage from "../app/pannels/public-user/components/pages/icons";

import CandidateGridPage from "../app/pannels/public-user/components/candidates/can-grid";
import CandidateListPage from "../app/pannels/public-user/components/candidates/can-list";
import CandidateDetail1Page from "../app/pannels/public-user/components/candidates/can-detail1";
import CandidateDetail2Page from "../app/pannels/public-user/components/candidates/can-detail2";

import BlogGrid1Page from "../app/pannels/public-user/components/blogs/blogs-grid1";
import BlogGrid2Page from "../app/pannels/public-user/components/blogs/blogs-grid2";
import BlogGrid3Page from "../app/pannels/public-user/components/blogs/blogs-grid3";
import BlogListPage from "../app/pannels/public-user/components/blogs/blogs-list";
import BlogDetailPage from "../app/pannels/public-user/components/blogs/blog-detail";
import ResetPasswordPage from "../app/pannels/public-user/components/pages/reset-password";
import CandidatePortfolioPage from "../app/pannels/public-user/sections/candidates/candidate-portfolio-page";
import ContractPopup from "../app/common/popups/popup-contract";


// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import CompletePage from "../app/common/payment/stripe/complete-page";
import CheckoutPage from "../app/common/payment/stripe/checkout-page";


// const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");



function PublicUserRoutes() {


	const [clientSecret, setClientSecret] = useState("");

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		fetch("", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 1000 }] }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, []);

	const appearance = {
		theme: "stripe",
	};
	const loader = "auto";






    return (
			<>
				<Routes>
					<Route path={publicUser.INITIAL} element={<Home1Page />} />
					<Route path={publicUser.HOME1} element={<Home1Page />} />
					<Route path={publicUser.HOME2} element={<Home2Page />} />
					<Route path={publicUser.HOME3} element={<Home3Page />} />
					<Route path={publicUser.HOME4} element={<Home4Page />} />
					<Route path={publicUser.HOME5} element={<Home5Page />} />
					<Route path={publicUser.HOME6} element={<Home6Page />} />
					<Route path={publicUser.HOME7} element={<Home7Page />} />
					<Route path={publicUser.HOME8} element={<Home8Page />} />
					<Route path={publicUser.HOME9} element={<Home9Page />} />
					<Route path={publicUser.HOME10} element={<Home10Page />} />
					<Route path={publicUser.HOME11} element={<Home11Page />} />
					<Route path={publicUser.HOME12} element={<Home12Page />} />
					<Route path={publicUser.HOME13} element={<Home13Page />} />
					<Route path={publicUser.HOME14} element={<Home14Page />} />
					<Route path={publicUser.HOME15} element={<Home15Page />} />
					<Route path={publicUser.HOME16} element={<Home16Page />} />
					<Route path={publicUser.HOME17} element={<Home17Page />} />
					<Route path={publicUser.HOME18} element={<Home18Page />} />
					<Route path={publicUser.TEST} element={<test-login />} />
					{/* <Route path={publicUser.jobs.GRID} element={<JobsListPage />} /> */}
					{/* <Route path={publicUser.jobs.GRID_MAP} element={<JobsGridMapPage />} /> */}
					<Route path={publicUser.jobs.LIST} element={<JobsListPage />} />
					<Route path={publicUser.jobs.DETAIL1} element={<JobDetail1Page />} />
					<Route path={publicUser.jobs.DETAIL2} element={<JobDetail2Page />} />
					<Route path={publicUser.jobs.APPLY} element={<ApplyJobPage />} />
					<Route
						path={publicUser.employer.GRID}
						element={<EmployersGridPage />}
					/>
					<Route
						path={publicUser.employer.LIST}
						element={<EmployersListPage />}
					/>
					<Route
						path={publicUser.employer.DETAIL1}
						element={<EmployersDetail1Page />}
					/>
					<Route
						path={publicUser.employer.DETAIL2}
						element={<EmployersDetail2Page />}
					/>
					<Route path={publicUser.pages.ABOUT} element={<AboutUsPage />} />
					<Route path={publicUser.pages.PRICING} element={<PricingPage />} />
					<Route path={publicUser.pages.ERROR404} element={<Error404Page />} />
					<Route path={publicUser.pages.FAQ} element={<FaqPage />} />
					<Route path={publicUser.pages.CONTACT} element={<ContactUsPage />} />
					<Route path={publicUser.pages.CONTRACT} element={<ContractPopup />} />
					<Route
						path={publicUser.pages.MAINTENANCE}
						element={<UnderMaintenancePage />}
					/>
					<Route path={publicUser.pages.COMING} element={<ComingSoonPage />} />
					<Route path={publicUser.pages.LOGIN} element={<LoginPage />} />
					<Route
						path={publicUser.pages.AFTER_LOGIN}
						element={<AfterLoginPage />}
					/>
					<Route
						path={publicUser.pages.RESET_PASSWORD}
						element={<ResetPasswordPage />}
					/>
					<Route path={publicUser.pages.ICONS} element={<IconsPage />} />
					<Route
						path={publicUser.candidate.GRID}
						element={<CandidateGridPage />}
					/>
					<Route
						path={publicUser.candidate.LIST}
						element={<CandidateListPage />}
					/>
					<Route
						path={publicUser.candidate.DETAIL1}
						element={<CandidateDetail1Page />}
					/>
					<Route
						path={publicUser.candidate.PORTFOLIO}
						element={<CandidatePortfolioPage />}
					/>
					<Route
						path={publicUser.candidate.DETAIL2}
						element={<CandidateDetail2Page />}
					/>
					<Route path={publicUser.blog.GRID1} element={<BlogGrid1Page />} />
					<Route path={publicUser.blog.GRID2} element={<BlogGrid2Page />} />
					<Route path={publicUser.blog.GRID3} element={<BlogGrid3Page />} />
					<Route path={publicUser.blog.LIST} element={<BlogListPage />} />
					<Route path={publicUser.blog.DETAIL} element={<BlogDetailPage />} />
					<Route path="*" element={<Error404Page />} />
				</Routes>
				{/* PAYMENTS */}
				{/* {clientSecret && ( */}
				{/* options={{ clientSecret, appearance, loader }} */}

				{/* <Elements
					options={{
						mode: "payment",
						amount: 345,
						currency: "usd",
						appearance,
					}}
					stripe={stripePromise}
				>
					<Routes>
						<Route
							path={publicUser.payment.CHECKOUT}
							element={<CheckoutPage />}
						/>
						<Route
							path={publicUser.payment.COMPLETE}
							element={<CompletePage />}
						/>
					</Routes>
				</Elements> */}
			</>
		);
}

export default PublicUserRoutes;