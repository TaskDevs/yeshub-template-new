import React, { useContext, useState, useEffect } from "react";
import { SubmitWorkSection } from "./submit-form";
import { useParams } from "react-router-dom";
import { FreelanceApiData } from "../../../../context/freelance/freelanceContextApi";
import { getDaysLeft } from "../../../../../utils/dateUtils";

const SubmitWork = () => {
  const { freelanceProjectList } = useContext(FreelanceApiData);
  const [projectInfo, setProjectInfo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    let data = freelanceProjectList.find((item) => item.id == id);
    console.log(data);
    if (data) {
      setProjectInfo(data);
    }
  }, []);

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
              {projectInfo.project_name}
            </span>
          </div>
          <span className="bg-yellow-200 rounded-full px-2 py-1 text-sm text-yellow-600">
            Deadline: (
            {getDaysLeft(projectInfo.start_date, projectInfo.end_date)} days
            remaining)
          </span>
        </div>

        <div className="flex-grow overflow-y-auto p-6 -mt-3 w-full flex  justify-center">
          <SubmitWorkSection id={id} milestones={projectInfo.milestones} />
        </div>
      </div>
    </div>
  );
};

export default SubmitWork;
