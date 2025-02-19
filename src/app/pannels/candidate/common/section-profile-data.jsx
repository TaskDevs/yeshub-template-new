import React, { useContext, useEffect, useState } from "react";
import { ProfileApiData } from "../../../context/user-profile/profileContextApi";

function SectionProfileData({}) {
  const { profileData } = useContext(ProfileApiData);

  console.log("profileData-sec", profileData);

  if (!profileData) {
    return false;
  }

  return (
    <div className="">
      <p>
        Name:{" "}
        <span>
          {profileData.firstname} {profileData.lastname}
        </span>{" "}
      </p>
      <p>
        Telephone: <span>{profileData.telephone}</span>{" "}
      </p>
      <p>
        Country: <span>{profileData.country}</span>
      </p>
      <p>
        Region: <span>{profileData.region}</span>
      </p>
      <p>
        Address: <span>{profileData.address}</span>
      </p>
      <p>
        Gps address: <span>{profileData.gps_address}</span>
      </p>
      <p>
        Postal code: <span>{profileData.postal_code}</span>
      </p>
      <p>
        Years of experinece: <span>{profileData.experience}</span>
      </p>
      <p>
        Bio: <span>{profileData.bio}</span>
      </p>
    </div>
  );
}

export default SectionProfileData;
