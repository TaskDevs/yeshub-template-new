import { FaPlus } from "react-icons/fa6";
import SectionMilestone from "../../public-user/sections/jobs/section-milestone";
import InputField from "../../../common/input-field";
import { useContext } from "react";
import { MilestoneApiData } from "../../../context/milestone/milestoneContextApi";
import { MILESTONEFIELD } from "../../../../globals/milestone-data";
import { GlobalApiData } from "../../../context/global/globalContextApi";
import { useParams } from "react-router-dom";

function CanApplyMilestone() {
  const {
    formData,
    selectedOption,
    setSelectedOption,
    setFormData,
    milestones,
    addMilestones,
    removeMilestone,
    handleSubmitMilestoneApplication,
  } = useContext(MilestoneApiData);

  const { isSubmitting } = useContext(GlobalApiData);
  const { id } = useParams();
  console.log("id-params", id);

  const handleChange = (field, data) => {
    setFormData({
      ...formData,
      [field]: data,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitMilestoneApplication(id)
  }



  return (
    <>
      <div className="twm-right-section-panel site-bg-gray applied-wrapper">
        <div className="section-full p-t120 p-b90 bg-white">
          <a
            href={`/dashboard-candidate/saved-jobs`}
            className="applied-view-btn"
          >
            <button className="site-button">Back</button>
          </a>
          <div className="container">
            <h3 className="panel-tittle m-a0 title-apply">
              Apply For This Job
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="">
                <p className="twm-s-title-text">How do you want to be paid?</p>
                <div className="">
                  <div className="twm-pay-terms">
                    <div className="">
                      <input
                        type="radio"
                        className="terms-radio"
                        name="group1"
                        value="milestone"
                        checked={selectedOption === "milestone"}
                        onChange={(e) => setSelectedOption(e.target.value)}
                      />
                    </div>

                    <div className="twm-terms-one">
                      <p>By milestone</p>
                      <p>
                        Split the project into more manageable parts, known as
                        milestones. Following completion and approval of each
                        milestone, you will be compensated.
                      </p>
                    </div>
                  </div>

                  <div className="twm-pay-terms">
                    <div className="">
                      <input
                        type="radio"
                        name="group1"
                        value="project"
                        checked={selectedOption === "project"}
                        onChange={(e) => setSelectedOption(e.target.value)}
                      />
                    </div>
                    <div className="twm-terms-one">
                      <p>By project</p>
                      <p>
                        Receive your full money after all of the work has been
                        completed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedOption === "milestone" && (
                <div className="twm-sec-main">
                  <p className="twm-s-title-text">
                    How many milestones do you want to include?
                  </p>
                  {milestones?.map((milestone, index) => (
                    <SectionMilestone
                      key={index}
                      index={index}
                      milestone={milestone}
                    />
                  ))}
                  <div className="milestone-add-options">
                    <div className="milestone-plus" onClick={addMilestones}>
                      <FaPlus />
                      Add more milestones
                    </div>
                    {milestones?.length > 1 && (
                      <div
                        className="milestone-cancel"
                        onClick={removeMilestone}
                      >
                        Cancel
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedOption === "project" && (
                <div className="twm-terms-one">
                  <p className="twm-s-title-text">
                    How long will this project take?
                  </p>

                  <div className="twm-sec-timelines">
                    <div className="twm-timelines">
                      <label htmlFor="amount">Amount</label>
                      <InputField
                        field={MILESTONEFIELD.fieldDetail[1]}
                        value={formData}
                        change={(data, field) => {
                          handleChange(data, field);
                        }}
                      />
                    </div>

                    <div className="twm-timelines">
                      <label htmlFor="desc">Description</label>

                      <InputField
                        field={MILESTONEFIELD.fieldDetail[2]}
                        value={formData}
                        change={(data, field) => {
                          handleChange(data, field);
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="btn-show-more  ">
                <button className="site-button" type="submit">
                  {isSubmitting ? "Submitting" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CanApplyMilestone;
