import React, {useEffect, useState} from 'react';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {SystemInfo} from "@/panels/BackendPanels/SystemPanel/types";
import {BsGpuCard} from "react-icons/bs";

interface TemperatureData {
    Temperature: number;
    name: string;
}

const initialData: TemperatureData[] = [
    {
        "Temperature": 0,
        "name": "60s"
    },
    {
        "Temperature": 0,
        "name": "50s"
    },
    {
        "Temperature": 0,
        "name": "40s"
    },
    {
        "Temperature": 0,
        "name": "30s"
    },
    {
        "Temperature": 0,
        "name": "20s"
    },
    {
        "Temperature": 0,
        "name": "10s"
    },
    {
        "Temperature": 0,
        "name": "Now"
    }
]

const staticSeconds = ['60s', '50s', '40s', '30s', '20s', '10s', 'Now']

function GraphicsDetails({systemHealth}: { systemHealth: SystemInfo }) {
    const graphic = systemHealth.graphics.controllers[0];
    const temp = graphic.temperatureGpu
    if (!graphic) return;

    const [staticLoad, setStaticLoad] = useState(Array.from({length: 7}).fill(0));
    const [rechartsData, setRechartsData] = useState<TemperatureData[]>(initialData)
    useEffect(() => {
        setStaticLoad(prevLoad => {
            const newLoad = [...prevLoad];
            newLoad.shift();
            newLoad.push(temp);
            return newLoad;
        });

        const resultArray: any = staticLoad.map((value, index) => ({
            Temperature: value,
            name: staticSeconds[index]
        }));
        setRechartsData(resultArray)
    }, [systemHealth]);

    return (
        <div
            className={'bg-background border rounded-md p-4 flex flex-col gap-2 w-full h-72 text-secondary-foreground'}>
            <div className={'flex items-center gap-2 w-fit bg-opacity-20 py-2 px-4 rounded-md bg-secondary'}>
                <BsGpuCard size={22}/>
                <p className={'font-bold'}>{graphic.name}</p>
            </div>
            <div className={'flex flex-row flex-wrap gap-4 h-full'}>
                <div className={'flex gap-2 text-xs items-center flex-wrap w-full'}>
                    <p className={'flex flex-col bg-secondary w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>VRam</span>
                        <span
                            className={'font-bold'}>{graphic.vram} Mb</span>
                    </p>
                    <p className={'flex flex-col bg-secondary w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>Free VRam</span>
                        <span
                            className={'font-bold'}>{graphic.memoryFree} Mb
                                </span>
                    </p>
                    <p className={'flex flex-col bg-secondary w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>Version</span>
                        <span
                            className={'font-bold'}>{graphic.driverVersion}</span>
                    </p>
                    <p className={'flex flex-col bg-secondary w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1 text-xs'}>
                        <span className={'font-semibold'}>Temperature</span>
                        <span
                            className={'font-bold'}>{graphic.temperatureGpu} C°</span>
                    </p>
                    <p className={'flex flex-col bg-secondary w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1 text-xs'}>
                        <span className={'font-semibold'}>Displays</span>
                        <span
                            className={'font-bold'}>{systemHealth.graphics.displays.length}</span>
                    </p>
                </div>
                <div className={'w-full h-36 bg-secondary rounded-md'}>
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
                            <YAxis type={'number'} includeHidden={true} domain={[0, 100]}
                                   className="text-secondary-foreground"/>
                            <Tooltip contentStyle={{color: "black", borderRadius: '8px'}}/>
                            <Area type="monotone" dataKey="Temperature" stroke="#fdb462" fill="#fdb462" strokeWidth={2}
                                  unit={" C°"} animationDuration={750}
                                  activeDot={{r: 4}}/>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default GraphicsDetails;