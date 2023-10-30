import useGeolocation from "../../../../utils/Geolocation/useGeolocation";
import useRegisterWizardStore from "../RegisterWizard";
import GoogleMapReact from 'google-map-react';
import Error from "../../../../components/StatusComponents/Error";
import { Input } from "@/src/components/ui/input";

function ConfigurationScreen() {
  const { latitude, longitude, error } = useGeolocation();

  const incrementSlide = useRegisterWizardStore((state) => state.increment_current_slide);
  const decrementSlide = useRegisterWizardStore((state) => state.decrement_current_slide);

  const setLongitude = useRegisterWizardStore((state) => state.set_latitude);
  const setLatitude = useRegisterWizardStore((state) => state.set_longitude);
  const setCityName = useRegisterWizardStore((state) => state.set_city_name);

  setLongitude(longitude)
  setLatitude(latitude)


  const CustomInput = ({ title, value, valueChanged }) => (
    <div className="flex items-center justify-between gap-4">
      <label>{title}</label>
      <Input placeholder="Type here!" value={value} onChange={(e) => valueChanged(e.target.value)} className="w-48" />
    </div>
  )

  return (
    <div className="relative w-full h-full">
      <div className="relative flex flex-col items-center w-full h-full gap-16">
        <div className="flex items-center justify-center w-full gap-6 p-4 h-3/4">
          <div className="flex w-7/12 h-full gap-4 ">
            <div className="flex flex-col w-1/2 gap-2">
              <CustomInput title={"Latitude"} value={latitude} valueChanged={() => { return null }} />
              <CustomInput title={"Longitude"} value={longitude} valueChanged={() => { return null }} />
              <CustomInput title={"Current city"} valueChanged={setCityName} />
            </div>
            <div className="w-1/2">
              TBI
            </div>
          </div>
          <div className="w-5/12 h-full z-100">
            {error && <Error message={error} />}
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              center={{
                lat: latitude,
                lng: longitude
              }}
              zoom={12}
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

export default ConfigurationScreen;
