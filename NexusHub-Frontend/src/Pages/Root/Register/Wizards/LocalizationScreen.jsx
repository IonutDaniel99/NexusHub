import useGeolocation from "../../../../utils/Geolocation/useGeolocation";
import useRegisterWizardStore from "../RegisterWizard";
import GoogleMapReact from 'google-map-react';

function LocalizationScreen() {
  const { latitude, longitude, error } = useGeolocation();

  const incrementSlide = useRegisterWizardStore((state) => state.increment_current_slide);
  const decrementSlide = useRegisterWizardStore((state) => state.decrement_current_slide);

  return (
    <div className="relative w-full h-full">
      <div className="relative flex flex-col items-center w-full h-full gap-16">
        <div className="flex items-center justify-center w-full gap-6 h-3/4">
          <div className="flex flex-col w-7/12 h-full border">
            <label>{latitude}</label>
            <label>{longitude}</label>
          </div>
          <div className="w-5/12 h-full">
            {error && "google cant load"}
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              center={{
                lat: latitude,
                lng: longitude
              }}
              defaultZoom={12}
              draggable={false}
              options={{
                scaleControl: false,
                clickableIcons: false,
                fullscreenControl: false,
                zoomControl: false,
              }
              }
            />
          </div>
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

export default LocalizationScreen;
