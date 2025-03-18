import { useState } from "react";

export const useMultiStepForm = (steps) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

   function next () {
    setCurrentStepIndex((prev) => {
        if (prev >= steps.length -1) return prev;
        const nextIndex = prev + 1;
        console.log("Next called. Current index:", prev, "Next index:", nextIndex); // Add this
        return nextIndex;
    });
   }

   function back () {
    setCurrentStepIndex((prev) => {
        if (prev <= 0) return prev;
        return prev - 1;
    });
   }

   function goTo (index) {
    setCurrentStepIndex(index)
   }


   return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    next,
    back,
    goTo
   }
}