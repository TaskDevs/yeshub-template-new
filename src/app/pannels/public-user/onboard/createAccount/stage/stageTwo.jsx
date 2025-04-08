import { START_USER_PROFILE_FIELD } from "../../../../../../globals/user-profile-data";
import InputField from "../../../../../common/input-field";

const StageTwo = ({ forms, handleInputChange }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="container text-center mx-auto">
            <div>
              <h4 className="twm-title text-3xl text-gray">User Information</h4>
              <span>Personal information for beeter metrics</span>
            </div>
            <div className="container text-left mt-6">
              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <InputField
                    field={START_USER_PROFILE_FIELD.fieldDetailTwo[0]}
                    label={START_USER_PROFILE_FIELD.fieldDetailTwo[0].label}
                    value={forms[0]}
                    change={(data, field) => {
                      handleInputChange(field, data);
                    }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <InputField
                    field={START_USER_PROFILE_FIELD.fieldDetailTwo[1]}
                    label={START_USER_PROFILE_FIELD.fieldDetailTwo[1].label}
                    value={forms[0]}
                    change={(data, field) => {
                      handleInputChange(field, data);
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <InputField
                    field={START_USER_PROFILE_FIELD.fieldDetailTwo[2]}
                    label={START_USER_PROFILE_FIELD.fieldDetailTwo[2].label}
                    value={forms[0]}
                    change={(data, field) => {
                      handleInputChange(field, data);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="d-flex w-full items-center test-border">
            <img
              src="/assets/images/freelance-onboard/create-stage-two.png"
              className="img-fill-page"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageTwo;

//  <InputField
//    field={item}
//    value={formData}
//    defaultVal={item.defaultValue}
//    readOnly={item.readOnly}
//    change={(data, field) => {
//      handleInputChange(data, field);
//    }}
//  />;
