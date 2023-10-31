import 'react-mosaic-component/react-mosaic-component.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import "@/styles/dashboard.less"
import { Mosaic, MosaicNode, MosaicWindow } from 'react-mosaic-component';
import React, { useState, useEffect, useMemo } from "react"
import { v4 as uuidv4 } from "uuid";
import { DEFAULT_CONTROLS_WITH_CREATION, INITIAL_TREE_VALUE, PANELS_CONFIG, PANELS_MAP, SERVICES_CONFIG } from './config';
import useAxiosFetch, { IFetchResponse } from '@/hooks/useAxios';
import { ServiceStatusUrl } from '@/config';
import useServiceStatusStore from '@/stores/ServiceStatusStore';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { IServiceData } from './types';
import DashboardLoading from '@/components/DashboardLoading';
import { cn, getStatusColor } from '@/lib/utils';

function DashboardMain() {
  const [panelsState, setPanelsState] = useState(PANELS_MAP)
  const [initialTreeValue, setInitialTreeValue] = useState<MosaicNode<any>>(INITIAL_TREE_VALUE)
  const { data: services, error, isLoading }: IFetchResponse<any> = useAxiosFetch(ServiceStatusUrl + '/services-status', 2000);

  const setServices = useServiceStatusStore((state: any) => state.setServices);

  useEffect(() => {
    if (services) {
      setServices(services); // Save the fetched services to the Zustand store
    }
  }, [services]);

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (error) {
    return <div>Error: Eror</div>;
  }


  const handlePanel = (id: any, service_name?: string | number) => {
    setPanelsState(prev => ({
      ...prev,
      [id]: {
        title: service_name,
        component: service_name ? PANELS_CONFIG[service_name] : null
      }
    }))
  }

  const handleCreateNode = () => {
    const new_mosaic_string = uuidv4()
    handlePanel(new_mosaic_string)
    return new_mosaic_string
  }

  const renderServices = (id: any) => (
    services
      .slice()
      .sort((a: { service_name: string; }, b: { service_name: any; }) => a.service_name.localeCompare(b.service_name))
      .map((service: IServiceData, index: React.Key) => {
        const service_name = service.service_name
        const service_status = service.status_code
        return <ContextMenuItem
          key={index}
          disabled={!SERVICES_CONFIG[service_name].selectable}
          onSelect={() => handlePanel(id, service_name)}
          className="flex items-center gap-4 px-4 py-2 hover:cursor-pointer">
          <span className='w-5'>
            {SERVICES_CONFIG[service_name].icon}
          </span>
          <span className='w-24'>
            {service_name}
          </span>
          <span>
            <span className="relative flex w-2.5 h-2.5">
              <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                getStatusColor(service_status))}></span>
              <span className={cn("relative inline-flex w-2.5 h-2.5 rounded-full",
                getStatusColor(service_status))}></span>
            </span>
          </span>
        </ContextMenuItem>
      }))

  return (
    <div id="mosaic-wrapper">
      <Mosaic<string>
        blueprintNamespace="bp5"
        renderTile={(id, path) => (
          <MosaicWindow<string>
            path={path}
            createNode={() => handleCreateNode()}
            title={panelsState[id].title}
            toolbarControls={DEFAULT_CONTROLS_WITH_CREATION}
          >
            {panelsState[id].component === null ? (
              <ContextMenu>
                <ContextMenuTrigger className="flex items-center justify-center h-full text-sm text-white text-opacity-40">
                  Right click
                </ContextMenuTrigger>
                <ContextMenuContent>
                  {renderServices(id)}
                </ContextMenuContent>
              </ContextMenu>
            ) : (
              <span className='text-white'>
                {panelsState[id].component}
              </span>
            )}
          </MosaicWindow>
        )}
        onChange={setInitialTreeValue}
        initialValue={initialTreeValue}
      />
    </div>
  );

};

export default DashboardMain;
