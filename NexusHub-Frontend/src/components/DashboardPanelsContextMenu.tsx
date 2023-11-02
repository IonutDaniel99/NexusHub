import React from 'react'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from './ui/context-menu'
import useServiceStatusStore from '@/stores/ServiceStatusStore';
import { IPanel, IServiceData } from '@/Pages/Dashboard/types';
import { cn, getStatusColor } from '@/lib/utils';
import { ServiceStatusUrl } from '@/config';
import useAxiosFetch from '@/hooks/useAxios';
import { SERVICES_CONFIG } from '@/configs/BackendServicesConfig';
import { CLIENT_PANELS_OBJECT, CLIENT_SERVICES_CONFIG } from '@/configs/ClientServicesConfig';

type IDashboardPanelsContextMenu = {
    id: string,
    handlePanel: (id: string, panel: string | number) => void,
}

function DashboardPanelsContextMenu({ id, handlePanel }: IDashboardPanelsContextMenu) {
    const [fetchServiceStatus, fetchAgainServiceStatus] = useAxiosFetch(ServiceStatusUrl + '/services-status');

    const setServices = useServiceStatusStore((state: any) => state.setServices);

    const renderServicesElement = (id: any) => {
        const { data: services, error, isLoading } = fetchServiceStatus;
        if (isLoading) {
            return <div className='flex flex-col items-center w-full gap-2 p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-background dark:border-gray-800 '>
                <div role="status" className="relative flex flex-col gap-4">
                    <svg aria-hidden="true" className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                </div>
                <span className="text-base">Loading...</span>
            </div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        setServices(services)

        return services
            .slice()
            .sort((a: { service_name: string; }, b: { service_name: any; }) => a.service_name.localeCompare(b.service_name))
            .map((service: IServiceData, index: React.Key) => {
                const service_name = service.service_name
                const service_status = service.status_code
                return <ContextMenuItem
                    key={index}
                    disabled={!SERVICES_CONFIG[service_name].selectable}
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
            .sort((a: { service_name: string; }, b: { service_name: any; }) => a.service_name.localeCompare(b.service_name))
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

        <ContextMenuContent className='flex gap-1 py-4'>
            <div className='w-56'>
                <span className='flex items-center justify-center h-8 gap-2'>
                    <h1 className='font-bold'>Services</h1>
                    <button
                        onClick={fetchAgainServiceStatus}
                        className='flex items-center justify-center px-2 py-1 rounded bg-muted hover:bg-primary hover:text-primary-foreground hover:cursor-pointer'>Refresh</button>
                </span>
                <div className='w-3/4 h-1 mx-auto my-2 rounded-full opacity-50 bg-primary' />
                {renderServicesElement(id)}
            </div>
            <div className='w-[2px] rounded-full opacity-30 bg-primary-foreground' />
            <div className='w-56'>
                <span className='flex items-center justify-center h-8 gap-2'>
                    <h1 className='font-bold'>Client</h1>
                </span>
                <div className='w-3/4 h-1 mx-auto my-2 rounded-full opacity-50 bg-primary' />
                {renderClientElement(id)}
            </div>
        </ContextMenuContent>
    )
}

export default DashboardPanelsContextMenu