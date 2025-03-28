import { START_USER_PROFILE_FIELD } from "../../../../../../globals/user-profile-data";
import TextAreaField from "../../../../../common/text-area-field";

const StageFive = ({ forms, handleInputChange }) => {
  return (
    <div className="container text-center mx-auto contain-width">
      <div>
        <h4 className="twm-title text-3xl text-gray">A Little Bio</h4>
        <span>This help us know more about you</span>
      </div>
      <div className="container text-left mt-6">
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <TextAreaField
              field={START_USER_PROFILE_FIELD.fieldDetailFour[0]}
              label={START_USER_PROFILE_FIELD.fieldDetailFour[0].label}
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

export default StageFive;
