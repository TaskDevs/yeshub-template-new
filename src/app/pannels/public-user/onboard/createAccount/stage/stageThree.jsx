import { START_USER_PROFILE_FIELD } from "../../../../../../globals/user-profile-data";
import InputField from "../../../../../common/input-field";
import SelectField from "../../../../../common/select-field";

const StageThree = ({ forms, handleInputChange }) => {
  return (
    <div className="container text-center mx-auto contain-width">
      <div>
        <h4 className="twm-title text-3xl text-gray">Profession Information</h4>
        <span>Professional information for beeter metrics</span>
      </div>
      <div className="container text-left mt-6">
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <InputField
              field={START_USER_PROFILE_FIELD.fieldDetailThree[0]}
              label={START_USER_PROFILE_FIELD.fieldDetailThree[0].label}
              value={forms[0]}
              change={(data, field) => {
                handleInputChange(data, field);
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-12">
            <SelectField
              noIcon={"yes"}
              field={START_USER_PROFILE_FIELD.fieldDetailThree[1]}
              label={START_USER_PROFILE_FIELD.fieldDetailThree[1].label}
              options={START_USER_PROFILE_FIELD.fieldDetailThree[1].options}
              value={forms[0]}
              change={(data, field) => {
                handleInputChange(data, field);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <InputField
              field={START_USER_PROFILE_FIELD.fieldDetailThree[2]}
              label={START_USER_PROFILE_FIELD.fieldDetailThree[2].label}
              value={forms[0]}
              change={(data, field) => {
                handleInputChange(data, field);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageThree;

//  <InputField
//    field={item}
//    value={formData}
//    defaultVal={item.defaultValue}
//    readOnly={item.readOnly}
//    change={(data, field) => {
//      handleInputChange(data, field);
//    }}
//  />;
