import React from 'react'
import reactLogo from '../../assets/react.svg'
import { Link } from 'react-router-dom'

function RootPage() {
    return (
        <>
            <div className='h-screen w-screen relative flex items-center justify-center'>
                <div className='h-4/6 w-5/12 flex-col flex items-center justify-evenly'>
                    <div className='w-40 h-40'>
                        <img src={reactLogo} className='h-full w-full' />
                    </div>
                    <div className='flex w-4/6 h-1/3 justify-evenly'>
                        <div className='w-1/2 flex flex-col items-center justify-evenly gap-6'>
                            <p className='font-medium' >Select User</p>
                            <div className='grid grid-cols-2'>
                                <button type="button" className="select-user-button-gray">Test User 2</button>
                                <button type="button" className="select-user-button-gray">Light</button>
                                <button type="button" className="select-user-button-gray">Light</button>
                            </div>
                            <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Join</button>

                        </div>
                        <span className='border-[1px] border-opacity-50 border-gray-500 mx-4'></span>
                        <div className='w-1/2 flex flex-col items-center justify-evenly'>
                            <Link to={'/register'} className='select-register-button-alternative'>Register</Link>
                        </div>
                    </div>
                </div>


            </div >
        </>
    )
}

export default RootPage