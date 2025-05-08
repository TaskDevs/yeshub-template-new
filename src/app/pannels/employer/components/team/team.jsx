import React, { useState } from "react";
import StaffOnTeam from "./staff-on-team";

const Team = ({ item }) => {
  const [showStaffOnTeam, setShowStaffOnTeam] = useState(false);
  return (
    <>
      <div className="panel-body wt-panel-body p-a20 m-b30">
        <div className="flex flex-col p-4 bg-white rounded shadow cursor-pointer">
          <div className="flex items-start space-x-3 w-full">
            <div className="flex flex-col w-1/4 items-start">
              <h3 className="text-sm font-medium">{item.team_name}</h3>
              <span
                className="text-blue-600 hover:underline text-sm mt-1"
                onClick={() => setShowStaffOnTeam((prev) => !prev)}
              >
                {showStaffOnTeam ? "Close" : " View Members"}
              </span>

              {/* Progress Section */}
            </div>
            <div className="flex flex-col w-1/4">
              <h3 className="text-sm font-medium mb-1">Description</h3>

              <p className="">Hello mix</p>
            </div>
            <div className="flex flex-col w-1/4">
              <h3 className="text-sm font-medium mb-1">Progress</h3>
              <div>
                <div className="w-full bg-gray-200 rounded h-2">
                  <div
                    className="bg-green-500 h-2 rounded"
                    style={{ width: "20%" }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">
                  {item.progress_rate}
                </span>
              </div>
            </div>
            <div>
              <span className="text-sm font-medium">28 members</span>
            </div>
          </div>
          {showStaffOnTeam && (
            <div className="flex items-start space-x-3 w-full">
              <StaffOnTeam data={item.staff_task} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Team;
