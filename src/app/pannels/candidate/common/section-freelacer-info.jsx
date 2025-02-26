import { useContext } from "react";
import { FreelanceApiData } from "../../../context/freelance/freelanceContextApi";

function SectionFreelancerInfo() {
	const { freelanceProfileData } = useContext(FreelanceApiData);

	return (
		freelanceProfileData ?  (
		<div className="sec-profile">
			
			<p className="profile-data-attributes">
				Experience: <span>{freelanceProfileData?.experience}</span>{" "}
			</p>
			<p className="profile-data-attributes">
				Rate: <span>{freelanceProfileData?.rate}</span>
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
	)
	: 
	(<p>No Freelance Profile found</p>) 
	)
}


export default SectionFreelancerInfo