import React from "react";

function CompanyProfileData({ data }) {
  return (
    <div className="">
      <p>
        Company Name: <span>{data?.company_name}</span>{" "}
      </p>
      <p>
        Sector: <span>{data?.sector}</span>{" "}
      </p>
      <p>
        Country: <span>{data?.phone_no}</span>
      </p>
      <p>
        Email: <span>{data?.email}</span>
      </p>
      <p>
        Address: <span>{data?.address}</span>
      </p>
      <p>
        Website: <span>{data?.website}</span>
      </p>
      <p>
        Description: <span>{data?.description}</span>
      </p>
      <p>
        Est. Date: <span>{data?.est_date}</span>
      </p>
    </div>
  );
}

export default CompanyProfileData;
