import React, {useEffect, useState} from 'react';
import {SystemInfo} from "@/panels/BackendPanels/SystemPanel/types";
import {FaNetworkWired} from "react-icons/fa";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

interface LatencyDate {
    Latency: number;
    name: string;
}

const initialData: LatencyDate[] = [
    {
        "Latency": 0,
        "name": "60s"
    },
    {
        "Latency": 0,
        "name": "50s"
    },
    {
        "Latency": 0,
        "name": "40s"
    },
    {
        "Latency": 0,
        "name": "30s"
    },
    {
        "Latency": 0,
        "name": "20s"
    },
    {
        "Latency": 0,
        "name": "10s"
    },
    {
        "Latency": 0,
        "name": "Now"
    }
]

const staticSeconds = ['60s', '50s', '40s', '30s', '20s', '10s', 'Now']

function RamDetails({systemHealth}: { systemHealth: SystemInfo }) {
    const iface = systemHealth.default_interface;
    const latency = systemHealth.inetLatency;
    if (!iface || !latency) return;
    const [staticLoad, setStaticLoad] = useState(Array.from({length: 7}).fill(0));
    const [rechartsData, setRechartsData] = useState<LatencyDate[]>(initialData)
    useEffect(() => {
        setStaticLoad(prevLoad => {
            const newLoad = [...prevLoad];
            newLoad.shift();
            newLoad.push(latency);
            return newLoad;
        });

        const resultArray: any = staticLoad.map((value, index) => ({
            Latency: value,
            name: staticSeconds[index]
        }));
        setRechartsData(resultArray)
    }, [systemHealth]);

    return (
        <div
            className={'bg-background border rounded-md p-4 flex flex-col gap-2 w-full text-secondary-foreground'}>
            <div className={'flex items-center gap-2 w-fit bg-opacity-20 py-2 px-4 rounded-md bg-secondary'}>
                <FaNetworkWired size={22}/>
                <p className={'font-bold'}>{iface.ifaceName} ({iface.iface}) {iface.operstate == 'up' ? "Up" : "Down"}</p>

            </div>
            <div className={'flex flex-row flex-wrap gap-4 h-full'}>
                <div className={'flex gap-2 text-xs items-center flex-wrap'}>
                    <p className={'flex flex-col bg-secondary min-w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>DHCP</span>
                        <span
                            className={'font-bold'}>{iface.dhcp ? "Yes" : "No"}</span>
                    </p>
                    <p className={'flex flex-col bg-secondary min-w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>DNS Suffix</span>
                        <span
                            className={'font-bold'}>{iface.dnsSuffix}</span>
                    </p>
                    <p className={'flex flex-col bg-secondary min-w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>IP4</span>
                        <span
                            className={'font-bold'}>{iface.ip4}</span>
                    </p>
                    <p className={'flex flex-col bg-secondary min-w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>IP6</span>
                        <span
                            className={'font-bold'}>{iface.ip6}</span>
                    </p>
                    <p className={'flex flex-col bg-secondary min-w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>Max Speed</span>
                        <span
                            className={'font-bold'}>{iface.speed} Mb/s</span>
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
                            <Area type="monotone" dataKey="Latency" stroke="#fdb462" fill="#fdb462" strokeWidth={2}
                                  unit={" ms"} animationDuration={750}
                                  activeDot={{r: 4}}/>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default RamDetails;