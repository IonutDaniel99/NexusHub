import { Input } from "antd";
import useGlobalStore from "../../../../stores/GlobalStore";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

function NameScreen() {
  const [uuid, setUuid] = useState("");

  const setUuidString = useGlobalStore((state) => state.set_uuid_string);
  const getAccountName: any = useGlobalStore((state) => state.account_name);
  const setAccountName = useGlobalStore((state) => state.set_account_name);
  const incrementSlide = useGlobalStore((state) => state.increment_current_slide);

  const onChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
    const value = e.target.value === "" ? null : e.target.value;
    setAccountName(value);
  };

  useEffect(() => {
    const uuid = uuidv4();
    setUuid(uuid);
    setUuidString(uuid);
  }, []);

  return (
    <div className="relative w-full h-full">
      <div className="relative flex flex-col items-center w-full h-full gap-16">
        <div className="flex flex-col items-center justify-center w-2/4 gap-6 h-3/4">
          <label>Unique UUID</label>
          <Input placeholder="Type here!" value={uuid} disabled />
          <label>Pick a name for your account!</label>
          <Input placeholder="Type here!" value={getAccountName} onChange={onChange} />
        </div>
        <div className="flex items-end justify-between w-full">
          <Link to={"/"} type="button" className="slider-wizard-next-button">
            Home
          </Link>
          <button type="button" className="slider-wizard-next-button" disabled={!getAccountName} onClick={incrementSlide}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default NameScreen;
