import { Input } from "antd";
import useRegisterWizardStore from "../RegisterWizard";
import { Link } from "react-router-dom";

function NameScreen() {
  const getAccountName = useRegisterWizardStore((state) => state.account_name);
  const setAccountName = useRegisterWizardStore((state) => state.set_account_name);
  const incrementSlide = useRegisterWizardStore((state) => state.increment_current_slide);

  const onChange = (e) => {
    const value = e.target.value === "" ? null : e.target.value;
    setAccountName(value);
  };

  return (
    <div className="relative h-full w-full">
      <div className="h-full w-full flex flex-col items-center relative gap-16">
        <div className="h-3/4 w-2/4 gap-6 flex flex-col items-center justify-center">
          <label>{!getAccountName ? " Choose a User Name" : `Welcome ${getAccountName}`}</label>
          <Input placeholder="Basic usage" value={getAccountName} onChange={onChange} />
        </div>
        <div className="w-full flex items-end justify-between">
          <Link to={"/"} type="button" className="slider-pref-next-button">
            Home
          </Link>
          <button type="button" className="slider-pref-next-button" disabled={!getAccountName} onClick={incrementSlide}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default NameScreen;
