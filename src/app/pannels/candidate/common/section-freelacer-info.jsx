import { useContext } from "react";
import { FreelanceApiData } from "../../../context/freelance/freelanceContextApi";
import { PortfolioApiData } from "../../../context/portfolio/portfolioContextApi";

function SectionFreelancerInfo() {
  const { freelanceProfileData } = useContext(FreelanceApiData);
  const { portfolios } = useContext(PortfolioApiData);
  console.log("freelance-profile-data", freelanceProfileData);
  console.log("portfolios-data", portfolios);

  return freelanceProfileData.length > 0 ? (
    freelanceProfileData.map((data) => (
      <div className="sec-profile" key={data.id}>
        <p className="profile-data-attributes">
          Rate: <span>{data?.rate}</span>
        </p>

        <p className="profile-data-attributes">
          Portfolio(s):{" "}
          {portfolios?.map((portfolio) => {
            // Normalize data.portfolio_id to an array
            const normalizedPortfolio = Array.isArray(portfolio.portfolio_id)
              ? portfolio.portfolio_id
              : portfolio.portfolio_id
              ? portfolio.portfolio_id.toString().split(",").map(Number) // Convert string to array of numbers
              : []; // Default to empty array if null or undefined

            {
              console.log("normalizedPortfolio", normalizedPortfolio);
            }
            // Check if the user has the portfolio
            return (
              normalizedPortfolio.some((user) => user === portfolio.id) && (
                <span key={portfolio.id}>
                  {console.log(
                    "portfolio.project_title",
                    portfolio.project_title
                  )}
                  {portfolio.project_title}
                </span>
              )
            );
          })}
          {/* <span>{data?.portfolio_id}</span> */}
        </p>
        <p className="profile-data-attributes">
          Experience: <span>{data?.experience}</span>{" "}
        </p>
        {/* <p className="profile-data-attributes">
					Region: <span>{freelanceProfileData.region}</span>
				</p>
				<p className="profile-data-attributes">
					Address: <span>{freelanceProfileData.address}</span>
				</p>
				<p className="profile-data-attributes">
					Gps address: <span>{freelanceProfileData.gps_address}</span>
				</p>
				<p className="profile-data-attributes">
					Postal code: <span>{freelanceProfileData.postal_code}</span>
				</p>
				<p className="profile-data-attributes">
					Years of experinece: <span>{freelanceProfileData.experience}</span>
				</p>
				<p className="profile-data-attributes">
					Bio: <span>{freelanceProfileData.bio}</span>
				</p> */}
      </div>
    ))
  ) : (
    <p>No Freelance Profile found</p>
  );
}

export default SectionFreelancerInfo;
