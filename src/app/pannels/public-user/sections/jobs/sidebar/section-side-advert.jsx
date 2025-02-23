import { NavLink } from "react-router-dom";
import { publicUrlFor } from "../../../../../../globals/constants";


function SectionSideAdvert({title, description, link, action}) {
    return (
			<>
				<div
					className="twm-advertisment"
					style={{
						backgroundImage: `url(${publicUrlFor("images/add-bg.jpg")})`,
					}}
				>
					<div className="overlay" />
					<h4 className="twm-title">{title}!</h4>
					{/* Claim Your Dream Job */}
					<p>
						{description}! <br />
						{/* Email. Add Resume NOW! */}
						{/* Stand out from the crowd—apply now and showcase your skills */}
					</p>
					<NavLink to={link} className="site-button white">
						{/* pages.ABOUT */}
						{/* publicUser.jobs.APPLY */}
						{action}!
					</NavLink>
					{/* Bid Now */}
				</div>
			</>
		);
}

export default SectionSideAdvert;