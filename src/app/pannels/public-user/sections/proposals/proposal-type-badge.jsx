import { FaRegFlag } from "react-icons/fa"; // Milestone icon

const ProposalTypeBadge = ({
  applicant,
  viewAction,
  milestones,
  requirement,
}) => {
  const isMilestone = applicant?.type === "Milestone";
  const isFix = applicant?.type === "Fix";

  const showInfo = () => {
    let data = milestones.length > 0 ? milestones : requirement;
    let new_status = milestones.length > 0 ? "milestone" : "requirement";
    viewAction(new_status, data);
  };

  return (
    <div className="mb-2 w-full">
      <h3 className="font-bold text-black">Type</h3>
      <hr className="my-2" />

      {/* Description */}

      {/* Badges */}
      <div className="flex items-center gap-3">
        {isFix && (
          <span className="inline-block px-4 py-1 text-sm font-semibold bg-blue-100 text-blue-700 rounded-full">
            Fix
          </span>
        )}

        {isMilestone && (
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full">
            Milestone
            <button
              onClick={showInfo}
              className="hover:text-purple-900 focus:outline-none"
              title="View milestones"
            >
              <FaRegFlag className="text-base" />
            </button>
          </div>
        )}
        {isMilestone ? (
          <span
            className="text-sm text-purple-700 mt-2 cursor-pointer"
            onClick={showInfo}
          >
            Click to view milestones
          </span>
        ) : isFix && applicant.request === "request_made" ? (
          <span
            className="text-sm text-green-700 mt-2 cursor-pointer"
            onClick={showInfo}
          >
            Request Made Click To View
          </span>
        ) : (
          <span className="text-sm text-green-700 mt-2 cursor-pointer">
            Agreed to terms
          </span>
        )}
      </div>
    </div>
  );
};

export default ProposalTypeBadge;
