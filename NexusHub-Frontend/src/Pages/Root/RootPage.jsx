import React from "react";
import reactLogo from "../../assets/react.svg";
import { Link } from "react-router-dom";

function RootPage() {
  return (
    <>
      <div className="h-screen w-screen relative flex items-center justify-center">
        <div className="h-4/6 w-5/12 flex-col flex items-center justify-evenly">
          <div className="w-40 h-40">
            <img src={reactLogo} className="h-full w-full" />
          </div>
          <div className="flex w-full h-1/3 justify-evenly">
            <div className="w-full flex flex-col items-center justify-evenly gap-6">
              <p className="font-medium">Select User</p>
              <div className="grid grid-cols-3 grid-rows-3 gap-6">
                <button type="button" className="select-user-button-gray">
                  Test User 2
                </button>
                <button type="button" className="select-user-button-gray">
                  Light
                </button>
                <button type="button" className="select-user-button-gray">
                  Light
                </button>
              </div>
              <div className="w-full flex items-center justify-evenly">
                <button type="button" className="slider-wizard-next-button">
                  Join
                </button>
                <Link to={"/register"} className="select-register-button-alternative">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RootPage;
