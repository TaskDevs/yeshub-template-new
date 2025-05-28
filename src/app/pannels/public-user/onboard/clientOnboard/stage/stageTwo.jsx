import React from "react";
import { START_CLIENT_PROFILE_FIELD } from "../../../../../../globals/user-profile-data";
import InputField from "../../../../../common/input-field";
import SelectField from "../../../../../common/select-field";

const ClientStageTwo = ({ forms, handleInputChange }) => {
  return (
    <>
      <div className="container mt-6 mb-8">
        <div className="row">
          <div className="col-sm-12 col-md-6 px-6">
            <h4 className="twm-title text-3xl text-gray">
              Lets start with a strong title.
            </h4>
            <p className="text-muted mt-2">
              This helps your job stand out to the right candidates. it is the
              first thing they will see. so make it count!
            </p>
          </div>
          <div className="col-sm-12 col-md-6 px-6">
            <div className="input-container">
              <InputField
                field={START_CLIENT_PROFILE_FIELD.fieldDetailTwo}
                label={START_CLIENT_PROFILE_FIELD.fieldDetailTwo.label}
                value={forms[0]}
                change={(data, field) => {
                  handleInputChange(field, data);
                }}
              />
            </div>
            <div>
              <ul>
                <li>
                  Build responsive WordPress site with booking/payment
                  functionality
                </li>
                <li>
                  Graphic designer needed to design ad creative for multiple
                  campaigns
                </li>
                <li>Facebook ad specialist needed for product launch</li>
              </ul>
            </div>

            <div className="input-container">
              <SelectField
                noIcon={"yes"}
                field={START_CLIENT_PROFILE_FIELD.fieldDetailFive[0]}
                label={START_CLIENT_PROFILE_FIELD.fieldDetailFive[0].label}
                options={START_CLIENT_PROFILE_FIELD.fieldDetailFive[0].options}
                value={forms[0]}
                change={(data, field) => {
                  handleInputChange(field, data);
                }}
              />
            </div>
              <div className="input-container">
              <SelectField
                noIcon={"yes"}
                field={START_CLIENT_PROFILE_FIELD.fieldDetailSix[0]}
                label={START_CLIENT_PROFILE_FIELD.fieldDetailSix[0].label}
                options={START_CLIENT_PROFILE_FIELD.fieldDetailSix[0].options}
                value={forms[0]}
                change={(data, field) => {
                  handleInputChange(field, data);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientStageTwo;
