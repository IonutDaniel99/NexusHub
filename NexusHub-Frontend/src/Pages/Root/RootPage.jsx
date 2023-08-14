import React, { useEffect, useInsertionEffect, useLayoutEffect, useState } from "react";
import reactLogo from "../../assets/react.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { onboarding_url } from "./config";
import useRootStore from "./RootStore";
import { useNavigate } from "react-router-dom";
import { _, delay } from "lodash";
function RootPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const setSelectedUser = useRootStore((state) => state.set_selected_user);
  const getSelectedUser = useRootStore((state) => state.selected_user);

  useEffect(() => {
    const current_user = localStorage.getItem('current_user');
    console.log(current_user)
    if (current_user) {
      navigate("/dashboard")
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    axios
      .get(onboarding_url + "/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleUserChange = (user) => {
    setSelectedUser(user.uuid_string);
    localStorage.setItem('current_user', user.uuid_string);
  };

  const handleJoinButton = () => {
    const current_user = localStorage.getItem('current_user');
    setLoading(true);
    delay(() => {
      if (!!current_user) {
        navigate("/dashboard")
      }
      else {
        setErrorMessage("An error occured. Contact Administrator.")
        setLoading(false)
        setIsError(true)
      }
    }, 1500);
  };

  return (
    <>
      <div className="relative flex items-center justify-center w-screen h-screen">
        <div className="flex flex-col items-center w-5/12 h-4/6 justify-evenly">
          <div className="w-40 h-40">
            <img src={reactLogo} className="w-full h-full" />
          </div>
          <div className="flex w-full h-1/3 justify-evenly">
            {isError && <span className="text-2xl font-medium ">{errorMessage}</span>}
            {loading ? (
              <span className="text-2xl font-medium animate-pulse">Loading...</span>
            ) : (
              <div className="flex flex-col items-center w-full gap-6 justify-evenly">
                <p className="font-medium">Select User</p>
                <div className="grid grid-cols-3 grid-rows-3 gap-6">
                  {users.map((user, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`${getSelectedUser !== user.uuid_string ? "root_user_button_not_selected" : "root_user_button_selected"}`}
                      onClick={() => handleUserChange(user)}
                      title={user.account_name}
                    >
                      {user.account_name}
                    </button>
                  ))}
                </div>
                <div className="flex items-center w-full justify-evenly">
                  <button type="button" className="slider-wizard-next-button" disabled={!getSelectedUser} onClick={handleJoinButton}>
                    Join
                  </button>
                  {users.length <= 9 && (
                    <Link to={"/register"} className="select-register-button-alternative">
                      Register
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RootPage;
