import useRegisterWizardStore from "../RegisterWizard";
import { shallow } from 'zustand/shallow'
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FinishScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const decrementSlide = useRegisterWizardStore((state) => state.decrement_current_slide);
  const resetSlide = useRegisterWizardStore((state) => state.reset_slide);

  const { account_name, latitude, longitude, city_name } = useRegisterWizardStore(
    (state) => ({
      account_name: state.account_name,
      latitude: state.latitude,
      longitude: state.longitude,
      city_name: state.city_name,
    }),
    shallow
  )

  let user_data = {
    account_name, latitude, longitude, city_name
  }

  const handleSaveUser = () => {
    axios.post('http://localhost:5800/register/save', { user_data })
      .then((response) => {
        setIsLoading(true)
        if (response.status === 200) {
          return navigate('/')
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="relative w-full h-full">
      <div className="relative flex flex-col items-center w-full h-full gap-16">
        <div className="flex flex-col items-center justify-center w-2/4 gap-6 h-3/4">
          <label>{isLoading ? "Loading" : "Ceva"}</label>
        </div>
        <div className="flex items-end justify-between w-full">
          <button type="button" className="slider-wizard-next-button" onClick={decrementSlide}>
            Previous
          </button>
          <button type="button" className="slider-wizard-next-button" onClick={() => {
            handleSaveUser()
            resetSlide()
          }}>
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinishScreen;
