// import { useContext } from "react";
import SectionCanPortfolioCard from "../section-can-portfolio-card";
// import { PortfolioApiData } from "../../../../../context/portfolio/portfolioContextApi";


function SectionCandidatePortfolio({ props }) {
    // const { portfolios } = useContext(PortfolioApiData)
    // console.log("portfolios-details", portfolios)

    return (
        <>
            <h4 className="twm-s-title">Portfolios</h4>
            <div className="twm-timing-list-wrap">
                {props.length === 0 ? (
                    <p>No Portfolio Profile Added</p>
                ): (
                    props.map((portfolio) => (
                        <SectionCanPortfolioCard data={portfolio} key={portfolio.id} />
                    ))
                )}
               
                
            </div>
        </>
    )
}

export default SectionCandidatePortfolio;