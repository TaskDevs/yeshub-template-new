import { FiUser, FiCheckSquare, FiCreditCard } from "react-icons/fi";
import CarouselComponent from "../carousel";

const StageOne = ({ setStage }) => {
  return (
    <div className="container">
      <div className="row align-items-center vh-100">
        <div className="col-sm-12 col-md-6 d-flex justify-content-center">
          <div>
            <h4 className="twm-title text-3xl text-gray">
              Hey Rebecca, Ready for your next big opportunity?
            </h4>
            <div className="mt-6">
              <FiUser size={24} className="mr-4" />
              <span>Answer a few question and start building your profile</span>
              <hr className="my-4" />
              <FiCheckSquare size={24} className="mr-4" />
              <span>Apply for roles or list services for clients to buy</span>
              <hr className="my-4" />
              <FiCreditCard size={24} className="mr-4" />
              <span>Get paid safely and know we are there to help</span>
              <hr className="my-4" />
            </div>
            <div className="container-fluid mt-6">
              <div className="row">
                <div className="col-sm-12 col-md-3">
                  <button
                    className="btn btn-success text-sm"
                    onClick={() => setStage(2)}
                  >
                    Get Started
                  </button>
                </div>
                <div className="col-sm-12 col-md-9">
                  <span className="text-sm">
                    It only takes 5 - 10 minutes and you can edit it later. we
                    will save as you go
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div>
            <CarouselComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageOne;
