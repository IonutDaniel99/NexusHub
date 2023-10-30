import React from 'react'

function DropDownContent({ services, handlePanel, panel_id }) {
    console.log({ handlePanel, panel_id })
    return (
        <div className='flex flex-col items-center justify-center gap-5 text-white bg-slate-800 h-60 w-80'>
            {services.map((service, index) => (
                <div key={index} className='w-40 p-2 border border-white' onClick={() => handlePanel(panel_id, service.service_name)}>
                    <p>{service.service_name}</p>
                    {/* <p>Status Code: {service.status_code}</p>
                    <p>Error: {service.error || 'No error'}</p> */}
                </div>
            ))}
        </div>
    )
}

export default DropDownContent