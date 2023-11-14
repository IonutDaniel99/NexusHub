import React from 'react';
import {SystemInfo} from "@/panels/BackendPanels/SystemPanel/types";
import {MdStorage} from "react-icons/md";
import {capitalize} from "lodash";

function RamDetails({systemHealth}: { systemHealth: SystemInfo }) {
    const osInfo: any = systemHealth.osInfo;
    const appVersions: Object = systemHealth.versions;

    return (
        <div
            className={'bg-background border rounded-md p-4 flex flex-col gap-2 w-full text-secondary-foreground'}>
            <div className={'flex items-center gap-2 w-fit bg-opacity-20 py-2 px-4 rounded-md bg-secondary'}>
                <MdStorage size={22}/>
                <p className={'font-bold'}>{osInfo.distro} {osInfo.arch}</p>
            </div>
            <div className={'flex flex-row flex-wrap gap-2 h-full text-xs w-full  items-center '}>
                {Object.entries(appVersions)
                    .sort(([nameA, versionA], [nameB, versionB]) =>
                        versionA && !versionB ? -1 : !versionA && versionB ? 1 : 0
                    ).map(([name, version], index) => {
                        return <p
                            key={index}
                            className={'flex flex-col bg-secondary w-36 bg-opacity-5 px-2 py-1 rounded-md items-center gap-1'}>
                            <span className={'font-semibold'}>{capitalize(name)}</span>
                            <span
                                className={'font-bold'}>{version ? version : "-"}</span>
                        </p>
                    })}
            </div>
        </div>
    );
}

export default RamDetails;