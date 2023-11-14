import React, {useEffect, useState} from 'react';
import {SystemInfo} from "@/panels/BackendPanels/SystemPanel/types";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {MdNetworkCheck} from "react-icons/md";

interface WifiSignalData {
    SignalPower: number;
    name: string;
}

const initialData: WifiSignalData[] = [
    {
        "SignalPower": 0,
        "name": "60s"
    },
    {
        "SignalPower": 0,
        "name": "50s"
    },
    {
        "SignalPower": 0,
        "name": "40s"
    },
    {
        "SignalPower": 0,
        "name": "30s"
    },
    {
        "SignalPower": 0,
        "name": "20s"
    },
    {
        "SignalPower": 0,
        "name": "10s"
    },
    {
        "SignalPower": 0,
        "name": "Now"
    }
]

const staticSeconds = ['60s', '50s', '40s', '30s', '20s', '10s', 'Now']

function WifiDetails({systemHealth}: { systemHealth: SystemInfo }) {
    const wifi = systemHealth.wifiConnections[0];
    if (!wifi) return;
    const wifiSignal = parseInt(wifi.signalLevel);
    const [staticLoad, setStaticLoad] = useState(Array.from({length: 7}).fill(0));
    const [rechartsData, setRechartsData] = useState<WifiSignalData[]>(initialData)

    useEffect(() => {
        setStaticLoad(prevLoad => {
            const newLoad = [...prevLoad];
            newLoad.shift();
            newLoad.push(wifiSignal);
            return newLoad;
        });

        const resultArray: any = staticLoad.map((value, index) => ({
            SignalPower: value,
            name: staticSeconds[index]
        }));
        setRechartsData(resultArray)
    }, [systemHealth]);

    return (
        <div
            className={'bg-background border rounded-md p-4 flex flex-col gap-2 w-full text-secondary-foreground'}>
            <div className={'flex items-center gap-2 w-fit bg-opacity-20 py-2 px-4 rounded-md bg-secondary'}>
                <MdNetworkCheck size={22}/>
                <p className={'font-bold'}>{wifi.model}</p>

            </div>
            <div className={'flex flex-row flex-wrap gap-4 h-full'}>
                <div className={'flex gap-2 text-xs items-center flex-wrap'}>
                    <p className={'flex flex-col bg-secondary min-w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>Security</span>
                        <span
                            className={'font-bold'}>{wifi.security}</span>
                    </p>
                    <p className={'flex flex-col bg-secondary min-w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>Signal Level</span>
                        <span
                            className={'font-bold'}>{wifi.signalLevel}</span>
                    </p>
                    <p className={'flex flex-col bg-secondary min-w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>Name</span>
                        <span
                            className={'font-bold'}>{wifi.ssid}</span>
                    </p>
                    <p className={'flex flex-col bg-secondary min-w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>Frequency</span>
                        <span
                            className={'font-bold'}>{wifi.frequency < 5000 ? "2 Ghz" : "5 Ghz"}</span>
                    </p>
                </div>
                <div className={'w-full h-36 bg-secondary bg-opacity-30 rounded-md'}>
                    <ResponsiveContainer>
                        <AreaChart
                            data={rechartsData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="0.35"/>
                            <XAxis dataKey="name" className="text-secondary-foreground"/>
                            <YAxis type={'number'} includeHidden={true}
                                   className="text-secondary-foreground"/>
                            <Tooltip contentStyle={{color: "black", borderRadius: '8px'}}/>
                            <Area type="monotone" dataKey="SignalPower" stroke="#fdb462" fill="#fdb462" strokeWidth={2}
                                  unit={" %"} animationDuration={750}
                                  activeDot={{r: 4}}/>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default WifiDetails;