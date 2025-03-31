import { useEffect, useState } from "react";
import { loadScript } from "../../../../globals/constants";

import StageOne from "./stage/stageOne";
import StageTwo from "./stage/stageTwo";

const Onboard = () => {
  const [stage, setStage] = useState(1);


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
