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

       

<div className="profile-data-attributes">
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

</div>


<div className="mb-5">
    <p className="" style={{ fontWeight: "bold" }}>Experience: </p>
    <div
        className="pl-2"
        dangerouslySetInnerHTML={{
            __html: data?.experience
                ? (() => {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = data.experience;
                    // console.log("tempDiv.innerHTML", tempDiv.innerHTML);
                    const capitalizeFirstLetterOfSentences = (htmlString) => {
                        return htmlString.replace(/([.!?]\s*)(\w)/g, (match, punctuation, char) => {
                            return punctuation + char.toUpperCase();
                        }).toLowerCase(); // Ensure the rest of the text is lowercase
                    };
                    return capitalizeFirstLetterOfSentences(tempDiv.innerHTML);
                })()
                : '',
        }}
    />
</div>


      </div>
    ))
  ) : (
    <p>No Freelance Profile found</p>
  );
}

export default SectionFreelancerInfo;
