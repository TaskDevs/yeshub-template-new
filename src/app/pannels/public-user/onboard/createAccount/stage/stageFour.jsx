
//  <InputField
//    field={item}
//    value={formData}
//    defaultVal={item.defaultValue}
//    readOnly={item.readOnly}
//    change={(data, field) => {
//      handleInputChange(data, field);
//    }}
//  />;
import { START_USER_PROFILE_FIELD } from "../../../../../../globals/user-profile-data";
import TextAreaField from "../../../../../common/text-area-field";

const StageFive = ({ forms, handleInputChange }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="container text-left mx-auto">
            <div>
              <h4 className="twm-title text-3xl text-gray">A Little Bio</h4>
              <span>This help us know more about you</span>
            </div>
            <div className=" text-left mt-4">
              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <TextAreaField
                    field={START_USER_PROFILE_FIELD.fieldDetailFour[0]}
                    label={START_USER_PROFILE_FIELD.fieldDetailFour[0].label}
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
              src="/assets/images/onb/alil.png"
              className="img-fill-page"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageFive;
