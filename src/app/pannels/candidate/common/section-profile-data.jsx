import React, { useContext, useEffect, useState } from "react";
import { ProfileApiData } from "../../../context/user-profile/profileContextApi";

function SectionProfileData({}) {
  const { profileData } = useContext(ProfileApiData);

  console.log("profileData-sec", profileData);

    // if (!profileData.id) {
    //     return (
	// 		<p>No Profile Created</p>
	// 	)
    // }

	return (
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
		: (<p>No Profile Created</p>) 
	);
}

export default SectionProfileData;
