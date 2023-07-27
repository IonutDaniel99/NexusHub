import React, { useEffect, useState } from "react";
import reactLogo from "../../assets/react.svg";
import { Link } from "react-router-dom";
import axios from 'axios';
import { onboarding_url } from "./config";

function RootPage() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(onboarding_url + '/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <>
      <div className="relative flex items-center justify-center w-screen h-screen">
        <div className="flex flex-col items-center w-5/12 h-4/6 justify-evenly">
          <div className="w-40 h-40">
            <img src={reactLogo} className="w-full h-full" />
          </div>
          <div className="flex w-full h-1/3 justify-evenly">
            <div className="flex flex-col items-center w-full gap-6 justify-evenly">
              <p className="font-medium">Select User</p>
              <div className="grid grid-cols-3 grid-rows-3 gap-6">
                {users.map((user, index) => (
                  <button key={index} type="button" className="slider-wizard-next-button">
                    {user.account_name}
                  </button>
                ))}

              </div>
              <div className="flex items-center w-full justify-evenly">
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
