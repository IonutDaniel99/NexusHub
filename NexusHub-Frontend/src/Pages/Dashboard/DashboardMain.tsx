import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import React, { useState, useEffect } from "react"
import 'react-mosaic-component/react-mosaic-component.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import "@/styles/dashboard.less"
import { uniqueId } from '@blueprintjs/core/lib/esm/common/utils';
import { DEFAULT_CONTROLS_WITH_CREATION, PANELS_CONFIG, PANELS_MAP } from './config';
import useAxiosFetch, { IFetchResponse } from '@/hooks/useAxios';
import { ServiceStatusUrl } from '@/config';
import useServiceStatusStore from '@/stores/ServiceStatusStore';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';


function DashboardMain() {
  const [panelsState, setPanelsState] = useState(PANELS_MAP)

  const { data: services, error, isLoading }: IFetchResponse<any> = useAxiosFetch(ServiceStatusUrl + '/services-status');
  const setServices = useServiceStatusStore((state: any) => state.setServices);

  useEffect(() => {
    if (services) {
      setServices(services); // Save the fetched services to the Zustand store
    }
  }, [services]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Eror</div>;
  }

  if (!services) {
    return <div>No services available</div>;
  }

  const handlePanel = (id: any, service_name: string | number) => {
    setPanelsState(prev => ({
      ...prev,
      [id]: {
        title: id,
        component: PANELS_CONFIG[service_name]
      }
    }))
  }

  return (
    <div id="mosaic-wrapper">
      <Mosaic<string>
        blueprintNamespace="bp5"
        renderTile={(id, path) => (
          <MosaicWindow<string>
            path={path}
            createNode={() => uniqueId('mosaic')}
            title={panelsState[id].title}
            toolbarControls={DEFAULT_CONTROLS_WITH_CREATION}
          >
            {panelsState[id].component === null ? (
              <ContextMenu>
                <ContextMenuTrigger className="flex items-center justify-center h-full text-sm text-white text-opacity-40">
                  Right click
                </ContextMenuTrigger>
                <ContextMenuContent>
                  {services.map((service: any, index: React.Key) => (
                    <ContextMenuItem key={index} onSelect={() => handlePanel(id, service.service_name)}>
                      {service.service_name}
                    </ContextMenuItem>
                  ))}
                </ContextMenuContent>
              </ContextMenu>
            ) : (
              <span className='text-white'>
                {panelsState[id].component}
              </span>
            )}
          </MosaicWindow>
        )}
        initialValue={{
          first: {
            direction: "column",
            first: {
              direction: "row",
              second: "e",
              first: "b"
            },
            second: {
              direction: "row",
              first: "d",
              second: "c"
            }
          },
          second: "a",
          direction: "row",
          splitPercentage: 75
        }}
      />
    </div>
  );

};

export default DashboardMain;

