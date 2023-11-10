import React, {useEffect, useState} from 'react';
import {BsCpu} from "react-icons/bs";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {SystemInfo} from "@/panels/BackendPanels/SystemPanel/types";

interface CpuLoadData {
    CpuLoad: number;
    name: string;
}

const initialData: CpuLoadData[] = [
    {
        "CpuLoad": 0,
        "name": "60s"
    },
    {
        "CpuLoad": 0,
        "name": "50s"
    },
    {
        "CpuLoad": 0,
        "name": "40s"
    },
    {
        "CpuLoad": 0,
        "name": "30s"
    },
    {
        "CpuLoad": 0,
        "name": "20s"
    },
    {
        "CpuLoad": 0,
        "name": "10s"
    },
    {
        "CpuLoad": 0,
        "name": "Now"
    }
]

const staticSeconds = ['60s', '50s', '40s', '30s', '20s', '10s', 'Now']

function CpuDetails({systemHealth}: { systemHealth: SystemInfo }) {
    const cpu = systemHealth.cpu;
    const cpuLoad: number = Number(systemHealth?.currentLoad?.currentLoad?.toFixed());

    const [staticLoad, setStaticLoad] = useState(Array.from({length: 7}).fill(0));
    const [rechartsData, setRechartsData] = useState<CpuLoadData[]>(initialData)
    useEffect(() => {
        setStaticLoad(prevLoad => {
            const newLoad = [...prevLoad];
            newLoad.shift();
            newLoad.push(cpuLoad);
            return newLoad;
        });

        const resultArray: any = staticLoad.map((value, index) => ({
            CpuLoad: value,
            name: staticSeconds[index]
        }));
        setRechartsData(resultArray)
    }, [systemHealth]);

    return (
        <div className={'bg-[#2C365E] rounded-md p-4 flex flex-col gap-2 w-full max-w-xl'}>
            <div className={'flex items-center gap-2 bg-white w-fit bg-opacity-10 py-2 px-4 rounded-md'}>
                <BsCpu size={22}/>
                <p className={'font-bold'}>CPU ({cpu.manufacturer} {cpu.brand})</p>
            </div>
            <div className={'flex flex-row flex-wrap gap-4 h-full'}>
                <div className={'flex gap-2 text-xs items-center flex-wrap w-full'}>
                    <p className={'flex flex-col bg-white w-14 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>Cores</span>
                        <span
                            className={'font-bold'}>{cpu.physicalCores}</span>
                    </p>
                    <p className={'flex flex-col bg-white w-14 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>Threads</span>
                        <span
                            className={'font-bold'}>{cpu.cores}
                                </span>
                    </p>
                    <p className={'flex flex-col bg-white w-14 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>Speed</span>
                        <span
                            className={'font-bold'}>{cpu.speed}</span>
                    </p>
                    <p className={'flex flex-col bg-white w-14 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1 text-xs'}>
                        <span className={'font-semibold'}>Min</span>
                        <span
                            className={'font-bold'}>{cpu.speedMin}</span>
                    </p>
                    <p className={'flex flex-col bg-white w-14 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1 text-xs'}>
                        <span className={'font-semibold'}>Max</span>
                        <span
                            className={'font-bold'}>{cpu.speedMax}</span>
                    </p>
                    <p className={'flex flex-col bg-white w-fit bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>Governor</span>
                        <span
                            className={'font-bold'}>{cpu.governor || "-"}
                                </span>
                    </p>
                </div>
                <div className={'w-full h-36 bg-black bg-opacity-30 rounded-md'}>
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
                            <XAxis dataKey="name" tick={{fill: '#f2f2f26c'}}/>
                            <YAxis type={'number'} includeHidden={true} domain={[0, 100]}
                                   tick={{fill: '#f2f2f26c'}}/>
                            <Tooltip contentStyle={{color: "black", borderRadius: '8px'}}/>
                            <Area type="monotone" dataKey="CpuLoad" stroke="#fdb462" fill="#fdb462" strokeWidth={2}
                                  unit={" %"} animationDuration={750}
                                  activeDot={{r: 4}}/>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default CpuDetails;