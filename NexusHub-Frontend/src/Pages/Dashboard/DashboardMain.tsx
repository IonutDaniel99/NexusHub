import 'react-mosaic-component/react-mosaic-component.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import "@/styles/dashboard.less"
import {DEFAULT_CONTROLS_WITH_CREATION, Mosaic, MosaicNode, MosaicWindow} from 'react-mosaic-component';
import React, {useEffect, useState} from "react"
import {v4 as uuid4} from "uuid";
import {INITIAL_TREE_VALUE, PANELS_MAP} from './config';
import DashboardPanelsContextMenu from '@/components/DashboardPanelsContextMenu';
import {ContextMenu, ContextMenuTrigger} from '@/components/ui/context-menu';
import {GLOBAL_PANELS_CONFIG} from '@/configs/GlobalsPanel';
import {ServiceStatusUrl} from '@/config';
import useAxiosFetch from '@/hooks/useAxios';
import useDashboardPanelsStore from '@/stores/DashboardPanelsStore';
import useLocalStorage from '@/hooks/useLocalStorage';

function DashboardMain() {
    const [user_panels] = useLocalStorage('user_panels_layout');
    const [panelsState, setPanelsState] = useState(PANELS_MAP)
    const [initialTreeValue, setInitialTreeValue] = useState<MosaicNode<any>>(user_panels ? JSON.parse(user_panels) : INITIAL_TREE_VALUE)
    const [fetchServiceStatus, fetchAgainServiceStatus] = useAxiosFetch(ServiceStatusUrl + '/services-status');
    const setPanels = useDashboardPanelsStore((state: any) => state.setPanels);

    useEffect(() => {
        setPanels(initialTreeValue)
    }, [initialTreeValue])


    const handlePanel = (id: any, service_name?: string | number) => {
        setPanelsState(prev => ({
            ...prev,
            [id]: {
                title: service_name,
                component: service_name ? GLOBAL_PANELS_CONFIG[service_name] : null
            }
        }))
    }

    const handleCreateNode = () => {
        const new_mosaic_string = uuid4()
        handlePanel(new_mosaic_string)
        return new_mosaic_string
    }

    const resetPanelsWhenZero = () => {
        setPanelsState(PANELS_MAP)
        setInitialTreeValue(INITIAL_TREE_VALUE)
    }

    const renderZeroPanelsElement: React.ReactNode = (
        <div className="mosaic-zero-state bp5-non-ideal-state">
            <div className="bp5-non-ideal-state-visual ">
                <span className="!w-40 !h-40 !text-9xl bp5-icon-applications bp5-icon-large"></span>
            </div>
            <h4 className="bp5-heading">You did it.</h4>
            <h4 className="bp5-heading">No Windows Present</h4>
            <button
                onClick={resetPanelsWhenZero}
                className='flex items-center justify-center px-4 py-1 text-base font-bold rounded bg-muted hover:cursor-pointer'>Press
                to Reset
            </button>
        </div>
    )

    return (
        <>
            <div id="mosaic-wrapper">
                <Mosaic<string>
                    blueprintNamespace="bp5"
                    zeroStateView={renderZeroPanelsElement}
                    renderTile={(id, path) => {
                        // @ts-ignore
                        if (panelsState[id] === "undefined") {
                            return <MosaicWindow<string>
                                path={path}
                                createNode={() => handleCreateNode()}
                                title={"Free"}
                                toolbarControls={DEFAULT_CONTROLS_WITH_CREATION}
                            >
                                <ContextMenu>
                                    <ContextMenuTrigger
                                        className="flex items-center justify-center h-full text-sm text-white text-opacity-40">
                                        <div className="bp5-non-ideal-state">
                                            <span className="!text-4xl bp5-icon-applications"></span>
                                            <h4 className="bp5-heading !text-sm">Right click for panels!</h4>
                                        </div>
                                    </ContextMenuTrigger>
                                    <DashboardPanelsContextMenu
                                        id={id}
                                        handlePanel={(id, panel) => handlePanel(id, panel)}
                                        fetchServiceStatus={fetchServiceStatus}
                                        fetchAgainServiceStatus={fetchAgainServiceStatus}/>
                                </ContextMenu>

                            </MosaicWindow>
                        } else {
                            return (
                                <MosaicWindow<string>
                                    path={path}
                                    createNode={() => handleCreateNode()}
                                    title={panelsState[id]?.title ? panelsState[id].title : "Free"}
                                    toolbarControls={DEFAULT_CONTROLS_WITH_CREATION}
                                >
                                    {panelsState[id].component === null ? (
                                        <ContextMenu>
                                            <ContextMenuTrigger
                                                className="flex items-center justify-center h-full text-sm text-white text-opacity-40">
                                                <div className="bp5-non-ideal-state">
                                                    <span className="!text-4xl bp5-icon-applications"></span>
                                                    <h4 className="bp5-heading !text-sm">Right click for panels!</h4>
                                                </div>
                                            </ContextMenuTrigger>
                                            <DashboardPanelsContextMenu
                                                id={id}
                                                handlePanel={(id, panel) => handlePanel(id, panel)}
                                                fetchServiceStatus={fetchServiceStatus}
                                                fetchAgainServiceStatus={fetchAgainServiceStatus}/>
                                        </ContextMenu>

                                    ) : (
                                        <span className='text-white'>
                                          {panelsState[id].component}
                                        </span>
                                    )}
                                </MosaicWindow>
                            )
                        }
                    }}
                    onChange={setInitialTreeValue}
                    initialValue={initialTreeValue}
                />
            </div>
        </>
    );
}

export default DashboardMain;
