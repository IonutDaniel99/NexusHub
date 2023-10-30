import { BiErrorAlt } from 'react-icons/bi';

function Error({ message }) {
    return (
        <div className='flex flex-col items-center justify-center w-full gap-10 py-10'>
            <BiErrorAlt size={96} color='#dc3545' />
            <p className='font-medium capitalize'>{message}</p>
        </div>
    )
}

export default Error