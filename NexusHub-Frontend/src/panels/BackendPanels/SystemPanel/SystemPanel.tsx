import React, {useEffect, useState} from 'react';
import {SystemInfo} from "@/panels/BackendPanels/SystemPanel/types";
import SystemJson from './mock.json'
import CpuDetails from "@/panels/BackendPanels/SystemPanel/components/CpuDetails";
import {io} from "socket.io-client";
import {SystemUrl} from "@/configs/GlobalsServicesURL";
import RamDetails from "@/panels/BackendPanels/SystemPanel/components/RamDetails";
import HddDetails from "@/panels/BackendPanels/SystemPanel/components/HddDetails";
import DefaultInterface from "@/panels/BackendPanels/SystemPanel/components/DefaultInterface";
import WifiDetails from "@/panels/BackendPanels/SystemPanel/components/WifiDetails";


function SystemPanel() {
    // @ts-ignore
    const [systemHealth, setSystemHealth] = useState<SystemInfo>(SystemJson);
    const [isSocketDown, setIsSocketDown] = useState(false)
    useEffect(() => {
        const system_socket = io(SystemUrl);

        system_socket.on('systemHealthUpdate', (data) => {
            setIsSocketDown(false)
            console.log(data)
            setSystemHealth(data);
        });

        return () => {
            setIsSocketDown(true)
            system_socket.disconnect();
            console.log("socket.disconnected()")
        };
    }, []);

    if (isSocketDown) {
        return <div className={'flex items-center justify-center h-full flex-col opacity-80 gap-4'}>
            <p className={'font-bold text-2xl'}>You broke it. Somehow...</p>
            <p className={'w-1/2 text-center line-clamp-2'}>
                <span className={'text-red-500 font-bold '}>Error: System Health Socket is down.</span>
            </p>
        </div>
    }

    return (
        <div
            className={'h-full w-full bg-background p-2 overflow-y-scroll'}>
            <div className={'w-full flex flex-wrap gap-4'}>
                <CpuDetails systemHealth={systemHealth}/>
                <RamDetails systemHealth={systemHealth}/>
                <HddDetails systemHealth={systemHealth}/>
                <DefaultInterface systemHealth={systemHealth}/>
                <WifiDetails systemHealth={systemHealth}/>
            </div>
        </div>
    );
}

export default SystemPanel;