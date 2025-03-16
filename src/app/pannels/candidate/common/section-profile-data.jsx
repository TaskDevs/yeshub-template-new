import React, { useContext } from "react";
import { ProfileApiData } from "../../../context/user-profile/profileContextApi";
// import { GlobalApiData } from "../../../context/global/globalContextApi";
// import { BiLoaderCircle } from "react-icons/bi";


function SectionProfileData() {
	const { profileData } = useContext(ProfileApiData);
	



	return (
		<>
		
		

{
		profileData.id ?  (
		<div className="sec-profile">
			<p className="profile-data-attributes">
				Name:{" "}
				<span>
					{profileData.firstname} {profileData.lastname}
				</span>{" "}
			</p>
			<p className="profile-data-attributes">
				Telephone: <span>{profileData.telephone}</span>{" "}
			</p>
			<p className="profile-data-attributes">
				Country: <span>{profileData.country}</span>
			</p>
			<p className="profile-data-attributes">
				Region: <span>{profileData.region}</span>
			</p>
			<p className="profile-data-attributes">
				Address: <span>{profileData.address}</span>
			</p>
			<p className="profile-data-attributes">
				Gps address: <span>{profileData.gps_address}</span>
			</p>
			<p className="profile-data-attributes">
				Postal code: <span>{profileData.postal_code}</span>
			</p>
			<p className="profile-data-attributes">
				Years of experinece: <span>{profileData.experience}</span>
			</p>
			<p className="profile-data-attributes">
				Bio: <span>{profileData.bio}</span>
			</p>
			
		</div>
	)
	: 
	(<p>No Profile found</p>) }
	</>
	)
}

export default SectionProfileData;
