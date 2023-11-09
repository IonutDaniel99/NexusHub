import React, {useEffect, useState} from 'react';
import {io} from "socket.io-client";
import {SystemUrl} from "@/configs/GlobalsServicesURL";


function SystemPanel() {
    const [systemHealth, setSystemHealth] = useState(null);

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
        <div>
            <h1>System Health:</h1>
        </div>
    );
}

export default SystemPanel;