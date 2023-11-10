import React, {useEffect, useState} from 'react';
import {SystemInfo} from "@/panels/BackendPanels/SystemPanel/types";
import SystemJson from './mock.json'
import CpuDetails from "@/panels/BackendPanels/SystemPanel/components/CpuDetails";
import {io} from "socket.io-client";
import {SystemUrl} from "@/configs/GlobalsServicesURL";


function SystemPanel() {
    const [systemHealth, setSystemHealth] = useState<SystemInfo | null>(SystemJson);

    // Socket IO TODO clear
    useEffect(() => {
        const system_socket = io(SystemUrl);

        // When 'systemHealthResponse' is received, update the state with the received data
        system_socket.on('systemHealthUpdate', (data) => {
            console.log(data)
            setSystemHealth(data);
        });

        return () => {
            console.log("socket.disconnected()")
            system_socket.disconnect();
        };
    }, []);
    return (
        <div
            className={'h-full w-full bg-[#202948] p-2'}>
            <div className={'w-full flex flex-wrap gap-4'}>
                <CpuDetails systemHealth={systemHealth}/>
                <div className={'bg-[#2C365E] rounded-md p-4 flex flex-col gap-2 w-full  max-w-xl'}>System Health:
                </div>
                <div className={'bg-[#2C365E] rounded-md p-4 flex flex-col gap-2 w-full  max-w-xl'}>System Health:</div>
                <div className={'bg-[#2C365E] rounded-md p-4 flex flex-col gap-2 w-full  max-w-xl'}>System Health:</div>
                <div className={'bg-[#2C365E] rounded-md p-4 flex flex-col gap-2 w-full  max-w-xl'}>System Health:</div>
                <div className={'bg-[#2C365E] rounded-md p-4 flex flex-col gap-2 w-full  max-w-xl'}>System Health:</div>
                <div className={'bg-[#2C365E] rounded-md p-4 flex flex-col gap-2 w-full  max-w-xl'}>System Health:</div>

            </div>
        </div>
    );
}

export default SystemPanel;