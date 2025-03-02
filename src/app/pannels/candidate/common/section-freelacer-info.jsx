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
Portfolio(s):
<ul className="portfolio-lists" >
{portfolios?.map((portfolio) => {

    const freelancePortfolioIds = freelanceProfileData[0]?.portfolio_id;

    const normalizedPortfolio = Array.isArray(freelancePortfolioIds)
        ? freelancePortfolioIds
        : freelancePortfolioIds
        ? freelancePortfolioIds.toString().split(",").map(Number)
        : [];

    return (
        normalizedPortfolio.some((id) => id === portfolio.id) && (
            <li key={portfolio.id} className="portfolio-list">
               
                {portfolio.project_title}
            </li>
        )
    );
})}
</ul>

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
