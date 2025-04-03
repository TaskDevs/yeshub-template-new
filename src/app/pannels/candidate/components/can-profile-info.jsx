import React from "react";
import CanUserDetails from "./can-user-details";

function CanProfileInfo() {
  return (
    <div className="profile-info-wrapper">
      <div className="d-flex justify-content-between mb-5 align-items-flex-start">
        <div className="user-profile-header">
          <div className="h-12 w-12 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
           
            <img
                    src="/yes-logo-1.png"
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
          </div>
          <div className="user-info">
            <h3>john doe</h3>
            <p>full stack developer</p>
            <p>
              <i className="pi pi-star-fill" style={{ color: "#FACC15" }}></i>
              <span>4.9 (125 reviews)</span>
            </p>
          </div>
        </div>

        <div className="profile-share-btn">
          <button  className="share-btn">
          <span>
              <i className="pi pi-share-alt" style={{ color: "white" }}></i>
            </span>

            Share Profile
            
          </button>
        </div>
      </div>

      <hr />

      <div className="mt-5">
        <div className="user-profile-bio">
          <div className="d-flex justify-content-between align-items-flex-start">
            <h3 className="font-weight-bold">About Me</h3>
            <a
              data-bs-toggle="modal"
              href="#AddProfile"
              role="button"
              title="Add"
              className="site-text-primary"
            >
              <span className="fa fa-edit" />
            </a>
          </div>
          <p>
            Experienced full-stack developer with 6+ years of expertise in
            building scalable web applications. Specialized in React, Node.js,
            and cloud technologies. Passionate about creating elegant solutions
            to complex problems
          </p>
        </div>

        <div className="user-profile-details">
          <CanUserDetails
            label="location"
            icon="pi-map-marker"
            text="Adabraka"
          />
          <CanUserDetails label="rate" icon="pi-user" text="75/hour" />
          <CanUserDetails
            label="languages"
            icon="pi-globe"
            text="English, Hausa"
          />
          <CanUserDetails
            label="member since"
            icon="pi-calendar"
            text="january 2020"
          />
        </div>
      </div>
    </div>
  );
}

export default CanProfileInfo;
