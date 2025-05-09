import { SubmitProposalSection } from "./submit-form";

const SubmitProposal = () => {
  return (
    <div className="tw-css">
      <div
        className={`bg-white w-[60%]
        mx-auto rounded-md flex-col justify-center items-center border mb-4`}
      >
        <div className="flex justify-between  px-6 p-5 w-full">
          <div>
            <h2 className="text-xl font-bold capitalize">Submit Proposal</h2>
          </div>
        </div>
        <div className="flex justify-between items-center px-6 p-5 w-full">
          <div className="w-3/4">
            <h2 className="text-lg font-Md capitalize">
              Senior Frontend Developer
            </h2>
            <span className="text-gray-500">
              Tech Corp Inc. 4.8(2.3k Reviews)
            </span>
            <p className="text-gray-500">
              Looking for a an experienced frontend developer with React
              expertise to join our team for a long term project focused on
              building a responsive web application.
            </p>
            <div className="mt-2">
              <span className="bg-gray-300 rounded-full px-2 py-1 text-sm text-gray-500 mr-2">
                React
              </span>
              <span className="bg-gray-300 rounded-full px-2 py-1 text-sm text-gray-500 mr-2">
                Typescript
              </span>
              <span className="bg-gray-300 rounded-full px-2 py-1 text-sm text-gray-500 mr-2">
                Javascript
              </span>
            </div>
          </div>
          <div className="w-1/4 text-right">
            <span className="font-bold text-sm text-gray-500 block">
              Budget
            </span>
            <span className="font-bold text-gray-800 text-md block">
              $80/h - $120/h
            </span>
          </div>
        </div>
        <hr />
        <div className="flex-grow overflow-y-auto p-6 -mt-3 w-full flex  justify-center">
          <SubmitProposalSection />
        </div>
      </div>
    </div>
  );
};

export default SubmitProposal;
