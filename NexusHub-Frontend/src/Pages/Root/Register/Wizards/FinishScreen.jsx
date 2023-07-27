import useRegisterWizardStore from "../RegisterWizard";

function FinishScreen() {
  const incrementSlide = useRegisterWizardStore((state) => state.increment_current_slide);
  const decrementSlide = useRegisterWizardStore((state) => state.decrement_current_slide);

  return (
    <div className="relative h-full w-full">
      <div className="h-full w-full flex flex-col items-center relative gap-16">
        <div className="h-3/4 w-2/4 gap-6 flex flex-col items-center justify-center">
          <label>Localization</label>
        </div>
        <div className="w-full flex items-end justify-between">
          <button type="button" className="slider-wizard-next-button" onClick={decrementSlide}>
            Previous
          </button>
          <button type="button" className="slider-wizard-next-button" onClick={incrementSlide}>
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinishScreen;
