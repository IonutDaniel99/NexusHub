import { Input } from 'antd'
import useRegisterWizardStore from '../RegisterWizard'
import { Link } from 'react-router-dom';

function NameScreen() {

    const getAccountName = useRegisterWizardStore((state) => state.account_name)
    const setAccountName = useRegisterWizardStore((state) => state.set_account_name)
    const setSlide = useRegisterWizardStore((state) => state.set_current_slide)

    const onChange = (e) => {
        setAccountName(e.target.value);
    };

    return (
        <div className='relative h-full w-full'>
            <div className='h-full w-full flex flex-col items-center relative gap-16'>
                <div className='h-3/4 w-2/4 gap-6 flex flex-col items-center justify-center'>
                    <label>{!getAccountName ? " Choose a User Name" : `Welcome ${getAccountName}`}</label>
                    <Input placeholder="Basic usage" value={getAccountName} onChange={onChange} />
                </div>
                <div className='w-full flex items-end justify-end'>
                    <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 disabled:cursor-not-allowed" disabled={!getAccountName} onChange={() => setSlide(1)} >Next</button>
                </div>

            </div>
        </div>
    )
}

export default NameScreen