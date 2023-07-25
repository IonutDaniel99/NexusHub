import React from "react";
import useRegisterWizardStore from "../RegisterWizard";

function LoadingScreen() {
  return (
    <div className="relative h-full w-full">
      <div className="h-full w-full flex flex-col items-center relative gap-16">
        <div className="h-3/4 w-2/4 gap-6 flex flex-col items-center justify-center">
          <label>Loading</label>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
