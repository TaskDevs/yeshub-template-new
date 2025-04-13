import { FaRegFlag } from "react-icons/fa"; // Milestone icon

const ProposalTypeBadge = ({ applicant, onViewMilestones }) => {
  const isMilestone = applicant?.type === "Milestone";
  const isFix = applicant?.type === "Fix";

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
              onClick={onViewMilestones}
              className="hover:text-purple-900 focus:outline-none"
              title="View milestones"
            >
              <FaRegFlag className="text-base" />
            </button>
          </div>
        )}
        {isFix ? (
          <span className="text-sm text-green-700 mt-2">Agreed to terms</span>
        ) : (
          <span className="text-sm text-green-700 mt-2 cursor-pointer ">
            click to view milestones
          </span>
        )}
      </div>
    </div>
  );
};

export default ProposalTypeBadge;
