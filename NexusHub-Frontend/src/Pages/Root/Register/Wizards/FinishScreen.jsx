import useRegisterWizardStore from "../RegisterWizard";
import { shallow } from "zustand/shallow";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingUrl } from "../../config";

function FinishScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const resetSlide = useRegisterWizardStore((state) => state.reset_slide);

  const { uuid_string, account_name, latitude, longitude, city_name } = useRegisterWizardStore(
    (state) => ({
      uuid_string: state.uuid_string,
      account_name: state.account_name,
      latitude: state.latitude,
      longitude: state.longitude,
      city_name: state.city_name,
    }),
    shallow
  );

  let user_data = {
    uuid_string,
    account_name,
    latitude,
    longitude,
    city_name,
  };

  const handleSaveUser = () => {
    axios
      .post(`${OnboardingUrl}/register/save`, { user_data })
      .then((response) => {
        setIsLoading(true);
        setIsError(false);
        if (response.status === 200) {
          resetSlide();
          return navigate("/");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        setErrorMessage(error);
      });
  };

  const initialRender = useRef(true); // Ref to track initial render

  useEffect(() => {
    if (initialRender.current) {
      handleSaveUser();
      initialRender.current = false;
    }
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <div className="relative flex items-center w-full h-5/6 ">
      <div className="relative flex items-center justify-center w-full h-3/4">
        <div className="flex items-center justify-center w-2/4 h-full ">
          {isLoading && <span className="">Loading</span>}
          {isError && <span className="">{errorMessage}</span>}
        </div>
      </div>
    </div>
  );
}

export default FinishScreen;
