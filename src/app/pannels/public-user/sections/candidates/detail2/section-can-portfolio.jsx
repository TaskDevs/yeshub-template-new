// import { useContext } from "react";
import { useContext, useEffect, useState } from "react";
import SectionCanPortfolioCard from "../section-can-portfolio-card";
import { PortfolioMediaApiData } from "../../../../../context/portfolio-media/portfolioMediaContextApi";
// import { PortfolioApiData } from "../../../../../context/portfolio/portfolioContextApi";


function SectionCandidatePortfolio({ props }) {
    
    const [portfolioMedia, setPortfolioMedia] = useState([]);
    const { processGetPortfolioMedia } = useContext(PortfolioMediaApiData)

    console.log("portfolios-media", portfolioMedia)


    const fetchAllPortfolioMedia = async () => {
        try {
         
          const mediaPromises = props.map(async (portfolio) => {
            const media = await processGetPortfolioMedia(portfolio.id);
            console.log("media", media)
            return {
              ...portfolio,
              media: media.data.data, 
            };
          });
      
          
          const portfoliosWithMedia = await Promise.all(mediaPromises);
    
          setPortfolioMedia(portfoliosWithMedia); 
        } catch (err) {
          console.error("failed to get all portfolio media", err);
        }
      };
    
      useEffect(() => {
       
        fetchAllPortfolioMedia();
    
      }, []);






    return (
        <>
            <h4 className="twm-s-title">Portfolios</h4>
            <div className="twm-timing-list-wrap">
                {portfolioMedia.length === 0 ? (
                    <p>No Portfolio Profile Added</p>
                ): (
                    portfolioMedia.map((portfolio) => (
                        <SectionCanPortfolioCard data={portfolio} key={portfolio.id} />
                    ))
                )}
               
                
            </div>
        </>
    )
}

export default SectionCandidatePortfolio;