import React from 'react';
import {FileSystemSize, SystemInfo} from "@/panels/BackendPanels/SystemPanel/types";
import {bytesToGB} from "@/panels/BackendPanels/SystemPanel/utils";
import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {MdStorage} from "react-icons/md";

function RamDetails({systemHealth}: { systemHealth: SystemInfo }) {
    const HardDrivesArray: any = systemHealth.fsSize;

    if (!HardDrivesArray) return;

    return HardDrivesArray.map((hardDrive: FileSystemSize, index: number) => {
        const used = bytesToGB(hardDrive.used)
        const size = bytesToGB(hardDrive.size)
        const percentage_use = hardDrive.use

        const rechartsData = [{
            name: hardDrive.mount,
            used: percentage_use
        }]

        return (
            <div
                key={index}
                className={'bg-background border rounded-md p-4 flex flex-col gap-2 w-full text-secondary-foreground'}>
                <div className={'flex items-center gap-2 w-fit bg-opacity-20 py-2 px-4 rounded-md bg-secondary'}>
                    <MdStorage size={22}/>
                    <p className={'font-bold'}>Hard Disk ( Drive: {hardDrive.mount}/ )</p>
                </div>
                <div className={'flex flex-row flex-wrap gap-4 h-full'}>
                    <div className={'flex gap-2 text-xs items-center flex-wrap w-full'}>
                        <p className={'flex flex-col bg-secondary w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                            <span className={'font-semibold'}>Total</span>
                            <span
                                className={'font-bold'}>{size} Gb
                                </span>
                        </p>
                        <p className={'flex flex-col bg-secondary w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                            <span className={'font-semibold'}>Used</span>
                            <span
                                className={'font-bold'}>{used} Gb</span>
                        </p>
                        <p className={'flex flex-col bg-secondary w-20 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                            <span className={'font-semibold'}>Percentage</span>
                            <span
                                className={'font-bold'}>{percentage_use}%</span>
                        </p>
                    </div>
                    <div className={'w-full h-36 bg-secondary bg-opacity-30 rounded-md'}>
                        <ResponsiveContainer>
                            <BarChart
                                data={rechartsData}
                                layout={'vertical'}
                                margin={{
                                    top: 20,
                                    right: 20,
                                    left: -20,
                                    bottom: 0,
                                }}
                            >
                                <YAxis dataKey="name" type="category"/>
                                <XAxis domain={[0, 100]} type="number"/>
                                <Tooltip contentStyle={{color: "black", borderRadius: '8px'}}/>
                                <Bar dataKey="used" fill="#fdb462" unit={" %"} layout={"vertical"}/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        );
    })
}

export default RamDetails;