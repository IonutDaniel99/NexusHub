import React from "react";
import useRegisterWizardStore from "../RegisterWizard";
import { shallow } from 'zustand/shallow'

function LoadingScreen() {

  const { account_name, latitude, longitude } = useRegisterWizardStore(
    (state) => ({
      account_name: state.account_name,
      latitude: state.latitude,
      longitude: state.longitude
    }),
    shallow
  )
  return (
    <div className="relative w-full h-full">
      <div className="relative flex flex-col items-center w-full h-full gap-16">
        <div className="flex flex-col items-center justify-center w-2/4 gap-6 h-3/4">
          <label>Loading</label>
          {console.log(account_name, latitude, longitude)}
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
