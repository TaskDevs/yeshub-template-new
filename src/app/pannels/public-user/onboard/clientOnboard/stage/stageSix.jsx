import React from "react";
import { START_CLIENT_PROFILE_FIELD } from "../../../../../../globals/user-profile-data";
import TextAreaField from "../../../../../common/text-area-field";

const ClientStageSix = ({ forms, handleInputChange }) => {
  return (
    <>
      <div className="container mt-6 mb-8">
        <div className="row">
          <div className="col-sm-12 col-md-6 px-6">
            <h4 className="twm-title text-3xl text-gray">
              Start the conversation.
            </h4>
            <p className="text-muted mt-2">Talents are looking for</p>
            <div className="mt-2 mx-4">
              <ul>
                <li className="text-muted">
                  Clear expectations about your task or deliverables
                </li>
                <li className="text-muted">
                  The skills required for your work
                </li>
                <li className="text-muted">Good communication</li>
                <li className="text-muted">
                  Details about how you or your team like to work
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 px-2">
            <TextAreaField
              field={START_CLIENT_PROFILE_FIELD.fieldDetailFour[3]}
              label={START_CLIENT_PROFILE_FIELD.fieldDetailFour[3].label}
              value={forms[0]}
              change={(data, field) => {
                handleInputChange(field, data);
              }}
            />
            <div className="input-container mt-4">
              <label
                htmlFor="end_date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                End Date
              </label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                className="form-control border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                value={forms[0]?.end_date || ""}
                onChange={(e) => handleInputChange(e.target.value, "end_date")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientStageSix;
