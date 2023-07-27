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
        <div className="relative w-full h-full">
            <div className="relative flex flex-col items-center w-full h-full gap-16">
                <div className="flex flex-col items-center justify-center w-2/4 gap-6 h-3/4">
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
