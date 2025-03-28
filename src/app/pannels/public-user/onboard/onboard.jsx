import { useEffect, useState } from "react";
import { loadScript } from "../../../../globals/constants";
import { useLocation } from "react-router-dom";
import StageOne from "./stage/stageOne";
import StageTwo from "./stage/stageTwo";

const Onboard = () => {
  const [stage, setStage] = useState(1);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("user"); // Get 'user' parameter

  console.log("uid", userId)

  useEffect(() => {
    loadScript("js/anm.js");
    loadScript("js/custom.js");
  });
 
  return (
    <>
      {stage == 1 && <StageOne setStage={setStage} />}
      {stage == 2 && <StageTwo setStage={setStage} />}
    </>
  );
};

export default Onboard;
