import React from 'react'
import {ContextMenuContent, ContextMenuItem} from './ui/context-menu'
import useServiceStatusStore from '@/stores/ServiceStatusStore';
import {IServiceData} from '@/Pages/Dashboard/types';
import {cn, getStatusColor} from '@/lib/utils';
import {IFetchResponse} from '@/hooks/useAxios';
import {SERVICES_CONFIG} from '@/configs/BackendServicesConfig';
import {CLIENT_PANELS_OBJECT, CLIENT_SERVICES_CONFIG} from '@/configs/ClientServicesConfig';
import {Separator} from './ui/separator';
import LoadingComponent from "@/components/LoadingComponent";

type IDashboardPanelsContextMenu = {
    id: string,
    handlePanel: (id: string, panel: string | number) => void,
    fetchServiceStatus: IFetchResponse,
    fetchAgainServiceStatus: () => void
}

function DashboardPanelsContextMenu({
                                        id,
                                        handlePanel,
                                        fetchServiceStatus,
                                        fetchAgainServiceStatus
                                    }: IDashboardPanelsContextMenu) {
    const setServices = useServiceStatusStore((state: any) => state.setServices);

    const renderServicesElement = (id: any) => {
        const {data: services, error, isLoading} = fetchServiceStatus;
        if (isLoading) {
            return <div className={'w-full h-28'}>
                <LoadingComponent/>
            </div>
        }

        if (error) {
            return <div className={'flex flex-col items-center justify-center font-semibold gap-2'}>
                <p>Panels service is down!</p>
                <p><span className={'text-red-500'}>Error:</span> {error.message}</p>
            </div>
        }

        setServices(services)

        return services
            .slice()
            .sort((a: { service_name: string; }, b: {
                service_name: any;
            }) => a.service_name.localeCompare(b.service_name))
            .map((service: IServiceData, index: React.Key) => {
                const service_name = service.service_name
                const service_status = service.status_code
                return <ContextMenuItem
                    key={index}
                    disabled={!SERVICES_CONFIG[service_name].selectable || service_status > 300}
                    onSelect={() => handlePanel(id, service_name)}
                    className="flex items-center h-10 gap-4 px-6 hover:cursor-pointer">
                    <span className='flex items-center justify-center w-5 '>
                        {SERVICES_CONFIG[service_name].icon}
                    </span>
                    <span className='w-full'>
                        {service_name}
                    </span>
                    <span className="relative flex w-2.5 h-2.5">
                        <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                            getStatusColor(service_status))}></span>
                        <span className={cn("relative inline-flex w-2.5 h-2.5 rounded-full",
                            getStatusColor(service_status))}></span>
                    </span>
                </ContextMenuItem>
            })
    }

    const renderClientElement = (id: any) => {
        return CLIENT_PANELS_OBJECT
            .slice()
            .sort((a: { service_name: string; }, b: {
                service_name: any;
            }) => a.service_name.localeCompare(b.service_name))
            .map((service: { service_name: string }, index: React.Key) => {
                const service_name = service.service_name
                return <ContextMenuItem
                    key={index}
                    onSelect={() => handlePanel(id, service_name)}
                    className="flex items-center h-10 gap-4 px-6 hover:cursor-pointer">
                    <span className='flex items-center justify-center w-5'>
                        {CLIENT_SERVICES_CONFIG[service_name].icon}
                    </span>
                    <span className='w-full'>
                        {service_name}
                    </span>
                </ContextMenuItem>
            })
    }

    return (

        <ContextMenuContent className='flex gap-1 py-4 rounded-2xl '>
            <div className='w-56'>
                <span className='flex items-center justify-center h-8 gap-2'>
                    <h1 className='font-bold'>Services</h1>
                    <button
                        onClick={fetchAgainServiceStatus}
                        className='flex items-center justify-center px-2 py-1 rounded bg-muted hover:bg-primary hover:text-primary-foreground hover:cursor-pointer'>Refresh</button>
                </span>
                <Separator className="flex w-3/4 mx-auto my-2"/>
                {renderServicesElement(id)}
            </div>
            <div className='w-[2px] rounded-full opacity-30 bg-primary-foreground'/>
            <div className='w-56'>
                <span className='flex items-center justify-center h-8 gap-2'>
                    <h1 className='font-bold'>Client</h1>
                </span>
                <Separator className="flex w-3/4 mx-auto my-2"/>
                {renderClientElement(id)}
            </div>
        </ContextMenuContent>
    )
}

export default DashboardPanelsContextMenu