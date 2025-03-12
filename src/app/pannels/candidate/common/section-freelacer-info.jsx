import { useContext } from "react";
import { FreelanceApiData } from "../../../context/freelance/freelanceContextApi";
import { PortfolioApiData } from "../../../context/portfolio/portfolioContextApi";

function SectionFreelancerInfo() {
  const { freelanceProfileData } = useContext(FreelanceApiData);
  const { portfolios } = useContext(PortfolioApiData);

  // console.log("freelance-profile-data", freelanceProfileData);
  // console.log("portfolios-data", portfolios);

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
    // console.log("freelancePortfolioIds", freelancePortfolioIds, " - ", typeof freelancePortfolioIds);

    const normalizedPortfolio = (() => {
        if (!freelancePortfolioIds) return [];

        if (Array.isArray(freelancePortfolioIds)) {
            return freelancePortfolioIds.map(Number); 
        }

        if (typeof freelancePortfolioIds === "string" && freelancePortfolioIds.startsWith('[') && freelancePortfolioIds.endsWith(']')) {
          try {
              const parsedArray = JSON.parse(freelancePortfolioIds);
            
              return parsedArray.map((portfolioId) => Number(portfolioId));
          } catch (error) {
              console.error("Error parsing JSON:", error);
              return []; 
          }
      } else if (typeof freelancePortfolioIds === "string") {
        return freelancePortfolioIds
        .split(",")
        .map((id) => {
            const trimmedId = id.trim();
            const numId = Number(trimmedId);
            return numId;
        })
        .filter((id) => !isNaN(id));

      }


        return [];
    })();


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
