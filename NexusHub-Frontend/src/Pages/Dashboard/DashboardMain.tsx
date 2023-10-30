import { ExpandButton, Mosaic, MosaicWindow, MosaicWithoutDragDropContext, RemoveButton, SplitButton } from 'react-mosaic-component';
import React, { useState, useEffect } from "react"
import 'react-mosaic-component/react-mosaic-component.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import "./dashboard.less"
import { uniqueId } from '@blueprintjs/core/lib/esm/common/utils';
import MosaicAdditionalControls from '../../components/MosaicAdditionalControls/MosaicAdditionalControls';
import WeatherPanel from '../../panels/WeatherPanel/WeatherPanel';
import useAxiosFetch from '../../hooks/useAxios';
import { ServiceStatusUrl } from '../../config';
import useServiceStatusStore from '../../stores/ServiceStatusStore';
import { Dropdown, theme } from 'antd';
import DropDownContent from './DropDownContent';
import OnboardingPanel from '../../panels/OnboardingPanel/OnboardingPanel';
import ConsolePanel from '../../panels/ConsolePanel/ConsolePanel';

export const DEFAULT_CONTROLS_WITH_CREATION = React.Children.toArray([
  <ExpandButton />,
  <SplitButton />,
  <RemoveButton />,
]);

const PANELS_MAP = {
  a: {
    title: "a",
    component: null
  },
  b: {
    title: "b",
    component: null
  },
  c: {
    title: "c",
    component: null
  },
  d: {
    title: "d",
    component: null
  },
  e: {
    title: "e",
    component: null
  },
};


const PANELS_CONFIG = {
  "Onboarding": <OnboardingPanel />,
  "Weather": <WeatherPanel />,
  "Console": <ConsolePanel />,
}

function DashboardMain() {
  const [panelsState, setPanelsState] = useState(PANELS_MAP)

  const { data, error, isLoading } = useAxiosFetch(ServiceStatusUrl + '/services-status');
  const setServices = useServiceStatusStore((state) => state.setServices);
  useEffect(() => {
    if (data) {
      setServices(data); // Save the fetched data to the Zustand store
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Eror</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const handlePanel = (id, service_name) => {
    console.log(id)
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
            {panelsState[id].component === null ?
              <Dropdown trigger={['contextMenu']} dropdownRender={() => (<DropDownContent services={data} panel_id={id} handlePanel={handlePanel} />)}>
                <div className='flex items-center justify-center h-full text-white opacity-40'>
                  Right Click on here
                </div>
              </Dropdown> : <span className='text-white'>
                {panelsState[id].component}
              </span>
            }
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
          "splitPercentage": 75
        }}
      />
    </div>
  )
};

export default DashboardMain;

