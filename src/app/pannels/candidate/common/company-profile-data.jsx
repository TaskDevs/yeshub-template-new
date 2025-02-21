import React, { useContext, useEffect, useState } from "react";
import { ProfileApiData } from "../../../context/user-profile/profileContextApi";

function CompanyProfileData({ data }) {
  return (
    <div className="">
      <p>
        Company Name: <span>{data[0]?.company_name}</span>{" "}
      </p>
      <p>
        Sector: <span>{data[0]?.sector}</span>{" "}
      </p>
      <p>
        Country: <span>{data[0]?.phone_no}</span>
      </p>
      <p>
        Email: <span>{data[0]?.email}</span>
      </p>
      <p>
        Address: <span>{data[0]?.address}</span>
      </p>
      <p>
        Website: <span>{data[0]?.website}</span>
      </p>
      <p>
        Description: <span>{data[0]?.description}</span>
      </p>
      <p>
        Est. Date: <span>{data[0]?.est_date}</span>
      </p>
    </div>
  );
}

export default CompanyProfileData;
