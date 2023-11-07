import useRegisterWizardStore from "../../../../stores/GlobalStore";
import { CustomInput } from "@/Pages/Root/Register/Wizards/CustomInputComponent";

function ServicesScreen() {
  const incrementSlide = useRegisterWizardStore((state) => state.increment_current_slide);
  const decrementSlide = useRegisterWizardStore((state) => state.decrement_current_slide);

  const setOpenWeatherApi = useRegisterWizardStore((state) => state.set_openweathermap_api);

  return (
    <div className="relative w-full h-full">
      <div className="relative flex flex-col items-center w-full h-full gap-16">
        <div className="flex flex-col items-center justify-center w-2/4 gap-6 h-3/4">
          <label>Api</label>
          <CustomInput title={"OpenWeatherMap_Api"} valueChanged={setOpenWeatherApi} />
        </div>
        <div className="flex items-end justify-between w-full">
          <button type="button" className="slider-wizard-next-button" onClick={decrementSlide}>
            Previous
          </button>
          <button type="button" className="slider-wizard-next-button" onClick={incrementSlide}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServicesScreen;
