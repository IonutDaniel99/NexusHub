import GoogleMapReact from 'google-map-react';
import Error from "@/components/Error";
import useGlobalStore from '../../../../stores/GlobalStore';
import useGeolocation from '@/hooks/useGeolocation';
import { CustomInput } from "@/Pages/Root/Register/Wizards/CustomInputComponent";


function ConfigurationScreen() {
  const { latitude, longitude, error } = useGeolocation();

  const incrementSlide = useGlobalStore((state) => state.increment_current_slide);
  const decrementSlide = useGlobalStore((state) => state.decrement_current_slide);

  const setLongitude = useGlobalStore((state) => state.set_longitude);
  const setLatitude = useGlobalStore((state) => state.set_latitude);
  const setCityName = useGlobalStore((state) => state.set_city_name);


  setLongitude(longitude)
  setLatitude(latitude)

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
