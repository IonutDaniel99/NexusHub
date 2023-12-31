import React, {useEffect, useState} from 'react';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {SystemInfo} from "@/panels/BackendPanels/SystemPanel/types";
import {FaMemory} from "react-icons/fa";
import {bytesToGB} from "@/panels/BackendPanels/SystemPanel/utils";

interface RamLoadData {
    RamLoad: number;
    name: string;
}

const initialData: RamLoadData[] = [
    {
        "RamLoad": 0,
        "name": "60s"
    },
    {
        "RamLoad": 0,
        "name": "50s"
    },
    {
        "RamLoad": 0,
        "name": "40s"
    },
    {
        "RamLoad": 0,
        "name": "30s"
    },
    {
        "RamLoad": 0,
        "name": "20s"
    },
    {
        "RamLoad": 0,
        "name": "10s"
    },
    {
        "RamLoad": 0,
        "name": "Now"
    }
]

const staticSeconds = ['60s', '50s', '40s', '30s', '20s', '10s', 'Now']

function RamDetails({systemHealth}: { systemHealth: SystemInfo }) {
    const ram = systemHealth.mem;
    if (!ram) return;
    const totalMem = Math.ceil(bytesToGB(ram.total));
    const freeMem = bytesToGB(ram.free);
    const usedMem = bytesToGB(ram.used);
    const [staticLoad, setStaticLoad] = useState(Array.from({length: 7}).fill(0));
    const [rechartsData, setRechartsData] = useState<RamLoadData[]>(initialData)

    useEffect(() => {
        setStaticLoad(prevLoad => {
            const newLoad = [...prevLoad];
            newLoad.shift();
            newLoad.push(usedMem);
            return newLoad;
        });

        const resultArray: any = staticLoad.map((value, index) => ({
            RamLoad: value,
            name: staticSeconds[index]
        }));
        setRechartsData(resultArray)
    }, [systemHealth]);

    return (
        <div
            className={'bg-background border rounded-md p-4 flex flex-col gap-2 w-full text-secondary-foreground'}>
            <div className={'flex items-center gap-2 w-fit bg-opacity-20 py-2 px-4 rounded-md bg-secondary'}>
                <FaMemory size={22}/>
                <p className={'font-bold'}>Ram (Random Access Memory)</p>
            </div>
            <div className={'flex flex-row flex-wrap gap-4 h-full'}>
                <div className={'flex gap-2 text-xs items-center flex-wrap w-full'}>
                    <p className={'flex flex-col bg-secondary w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>Used</span>
                        <span
                            className={'font-bold'}>{usedMem} Gb</span>
                    </p>
                    <p className={'flex flex-col bg-secondary w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>Free</span>
                        <span
                            className={'font-bold'}>{freeMem} Gb
                                </span>
                    </p>
                    <p className={'flex flex-col bg-secondary w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                        <span className={'font-semibold'}>Total</span>
                        <span
                            className={'font-bold'}>{totalMem} Gb</span>
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
                            <YAxis type={'number'} includeHidden={true} domain={[0, 16]}
                                   className="text-secondary-foreground"/>
                            <Tooltip contentStyle={{color: "black", borderRadius: '8px'}}/>
                            <Area type="monotone" dataKey="RamLoad" stroke="#fdb462" fill="#fdb462" strokeWidth={2}
                                  unit={" Gb"} animationDuration={750}
                                  activeDot={{r: 4}}/>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default RamDetails;