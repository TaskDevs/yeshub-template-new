import { useContext } from "react";
// import { PORTFOLIOFIELD } from "../../../globals/portfolio-data";
// import InputField from "../input-field";
// import TextAreaField from "../text-area-field";
// import { PortfolioApiData } from "../../context/portfolio/portfolioContextApi";
import { useMultiStepForm } from "../use-multi-step-form";
import PortfolioForm from "../portfolio-form";
import PortfolioMediaForm from "../portfolio-media-form";
import { PortfolioApiData } from "../../context/portfolio/portfolioContextApi";
import { GlobalApiData } from "../../context/global/globalContextApi";

export const PortfolioPopup = ({ id }) => {
  const { steps, currentStepIndex, back, next } = useMultiStepForm([
    <PortfolioForm key="portfolioForm" />,
    <PortfolioMediaForm key="portfolioMediaForm" />,
  ]);


  const {
    submitFirstForm,
    submitSecondForm,
    formKey
  } = useContext(PortfolioApiData);

  const { isSubmitting } = useContext(GlobalApiData)


  // useEffect(() => {
  //   if (selectedPortfolio && currentStepIndex === 0) {
  //     setEditFirstFormData(selectedPortfolio);
  //   }
  // }, [selectedPortfolio, setEditFirstFormData, currentStepIndex]);

  // useEffect(() => {
  //   if (selectedPortfolio && currentStepIndex === 1) {
  //     setEditSecondFormData(selectedPortfolio);
  //   }
  // }, [selectedPortfolio, setEditSecondFormData, currentStepIndex]);




  const handleNext = async (e) =>{
    await submitFirstForm(e, next); // Pass next as callback
}



  return (
    <div className="">
      <div
        className="modal fade twm-saved-jobs-view"
        id={id}
        tabIndex={-1}
  
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
      
          {/* key={formKey} */}
            <form onSubmit={(e) => e.preventDefault()} key={formKey} >
              <div className="modal-header">
                <div
                  className=""
                  style={{ position: "absolute", top: ".5rem", left: ".5rem" }}
                >
                  {currentStepIndex + 1}/ {steps.length}
                </div>

                <h2 className="modal-title">Work Sample/ Portfolio</h2>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>

              <div className="modal-body">{steps[currentStepIndex]}</div>

              <div className="modal-footer">
              
                {currentStepIndex === 0 ? (
                  <>
                    <button
                      type="button"
                      className="site-button"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="site-button"
                      onClick={handleNext}
                    >
                     {isSubmitting ? (<div style={{animation: 'spin 1s linear infinite'}}>...</div>) : "Next" } 
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="site-button"
                      onClick={back}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="site-button"
                      onClick={submitSecondForm}
                      data-bs-dismiss="modal"
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
