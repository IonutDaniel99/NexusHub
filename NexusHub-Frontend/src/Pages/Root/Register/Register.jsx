import { Steps } from "antd";

import useRegisterWizardStore from "./RegisterWizard";
import NameScreen from "./Wizards/NameScreen";
import ServicesScreen from "./Wizards/ServicesScreen";
import FinishScreen from "./Wizards/FinishScreen";
import ConfigurationScreen from "./Wizards/ConfigurationScreen.jsx";

function Register() {
  const currentSlide = useRegisterWizardStore((state) => state.current_slide);
  const setSlide = useRegisterWizardStore((state) => state.set_current_slide);

  const onChange = (value) => {
    setSlide(value);
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-3/4 border border-gray-700 h-3/4 bg-gray-950 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20">
        <Steps
          type="navigation"
          current={currentSlide}
          onChange={onChange}
          className="site-navigation-steps"
          items={[
            {
              status: currentSlide === 0 ? "process" : currentSlide < 1 ? "wait" : "finish",
              title: "Choose a Name",
            },
            {
              status: currentSlide === 1 ? "process" : currentSlide < 2 ? "wait" : "finish",
              title: "Configuration",
            },
            {
              status: currentSlide === 2 ? "process" : currentSlide < 3 ? "wait" : "finish",
              title: "Others",
            },
            {
              status: currentSlide === 3 ? "process" : currentSlide < 4 ? "wait" : "finish",
              title: "Finish",
            },
          ]}
        />
        <div className="relative w-full h-full p-4">
          {currentSlide === 0 && <NameScreen />}
          {currentSlide === 1 && <ConfigurationScreen />}
          {currentSlide === 2 && <ServicesScreen />}
          {currentSlide === 3 && <FinishScreen />}
        </div>
      </div>
    </div>
  );
}

export default Register;
