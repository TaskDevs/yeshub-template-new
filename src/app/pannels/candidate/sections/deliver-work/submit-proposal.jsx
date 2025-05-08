import { SubmitWorkSection } from "./submit-form";

const SubmitWork = () => {
  return (
    <div className="tw-css">
      <div
        className={`bg-white w-[60%]
        mx-auto rounded-md flex-col justify-center items-center border mb-4`}
      >
        <div className="flex justify-between items-center px-6 p-5 w-full">
          <div>
            <h2 className="text-xl font-bold capitalize">Submit Work</h2>
            <span className="text-gray-500 text-sm">
              Website Redesign Project
            </span>
          </div>
          <span className="bg-yellow-200 rounded-full px-2 py-1 text-sm text-yellow-600">
            Deadline: Dec 31, 2025(14 days remaining)
          </span>
        </div>

        <div className="flex-grow overflow-y-auto p-6 -mt-3 w-full flex  justify-center">
          {/* <SubmitWorkSection /> */}
        </div>
      </div>

      <div
        className={`bg-white w-[60%] 
        mx-auto rounded-md flex-col justify-center items-center border`}
      >
        <div className="flex justify-between items-center px-6 p-5 w-full">
          <div>
            <h2 className="text-xl font-bold capitalize">
              Previous Submissions
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitWork;
