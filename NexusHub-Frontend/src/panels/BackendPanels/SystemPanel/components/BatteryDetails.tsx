import React, {useEffect, useState} from 'react';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {SystemInfo} from "@/panels/BackendPanels/SystemPanel/types";
import {BiBattery} from "react-icons/bi";

interface BatteryLoadData {
    BatteryLoad: number;
    name: string;
}

const initialData: BatteryLoadData[] = [
    {
        "BatteryLoad": 0,
        "name": "60s"
    },
    {
        "BatteryLoad": 0,
        "name": "50s"
    },
    {
        "BatteryLoad": 0,
        "name": "40s"
    },
    {
        "BatteryLoad": 0,
        "name": "30s"
    },
    {
        "BatteryLoad": 0,
        "name": "20s"
    },
    {
        "BatteryLoad": 0,
        "name": "10s"
    },
    {
        "BatteryLoad": 0,
        "name": "Now"
    }
]

const staticSeconds = ['60s', '50s', '40s', '30s', '20s', '10s', 'Now']

function CpuDetails({systemHealth}: { systemHealth: SystemInfo }) {
    const battery = systemHealth.battery;
    const BatteryLoad: number = battery.percent

    if (!battery || !BatteryLoad) return;

    const [staticLoad, setStaticLoad] = useState(Array.from({length: 7}).fill(0));
    const [rechartsData, setRechartsData] = useState<BatteryLoadData[]>(initialData)
    useEffect(() => {
        setStaticLoad(prevLoad => {
            const newLoad = [...prevLoad];
            newLoad.shift();
            newLoad.push(BatteryLoad);
            return newLoad;
        });

        const resultArray: any = staticLoad.map((value, index) => ({
            BatteryLoad: value,
            name: staticSeconds[index]
        }));
        setRechartsData(resultArray)
    }, [systemHealth]);

    return (
        <div
            className={'bg-background border rounded-md p-4 flex flex-col gap-2 w-full  text-secondary-foreground'}>
            <div className={'flex items-center gap-2 w-fit bg-opacity-20 py-2 px-4 rounded-md bg-secondary'}>
                <BiBattery size={22}/>
                <p className={'font-bold'}>Battery {battery.manufacturer}</p>
            </div>
            <div className={'flex flex-row flex-wrap gap-4 h-full'}>
                <div className={'flex gap-2 text-xs items-center flex-wrap w-full'}>
                    <p className={'flex flex-col bg-secondary w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>Voltage</span>
                        <span
                            className={'font-bold'}>{battery.voltage.toFixed(2)} V</span>
                    </p>
                    <p className={'flex flex-col bg-secondary w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>Percent</span>
                        <span
                            className={'font-bold'}>{battery.percent} %
                                </span>
                    </p>
                    <p className={'flex flex-col bg-secondary w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>Charging?</span>
                        <span
                            className={'font-bold'}>{battery.isCharging ? "Yes" : "No"}</span>
                    </p>
                    <p className={'flex flex-col bg-secondary w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1 text-xs'}>
                        <span className={'font-semibold'}>Connected?</span>
                        <span
                            className={'font-bold'}>{battery.acConnected ? "Yes" : "No"}</span>
                    </p>
                    <p className={'flex flex-col bg-secondary w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1 text-xs'}>
                        <span className={'font-semibold'}>Capacity</span>
                        <span
                            className={'font-bold'}>{battery.currentCapacity.toString().substring(0, 2)} Wh</span>
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
                            <Area type="monotone" dataKey="BatteryLoad" stroke="#fdb462" fill="#fdb462" strokeWidth={2}
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