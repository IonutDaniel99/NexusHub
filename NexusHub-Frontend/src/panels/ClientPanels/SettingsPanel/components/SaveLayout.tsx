import React from 'react'
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Button } from "@/components/ui/button"
import useDashboardPanelsStore from '@/stores/DashboardPanelsStore';
import useLocalStorage from '@/hooks/useLocalStorage';

function SaveLayout() {

    const getPanels = useDashboardPanelsStore((state: any) => state.panels);
    const [user_panels, set_user_panels, delete_user_panels] = useLocalStorage('user_panels_layout');

    const handleSavePanels = () => {
        set_user_panels(JSON.stringify(getPanels))
    }

    const deleteSavePanels = () => {
        delete_user_panels()
    }
    return (
        <AccordionItem value="LayoutSave">
            <AccordionTrigger>Panels Layout</AccordionTrigger>
            <AccordionContent>
                <div className='flex flex-row items-center gap-4 p-4'>
                    <Button variant={'secondary'} size={'sm'} onClick={handleSavePanels} disabled={user_panels}>Save</Button>
                    <Button variant={'secondary'} size={'sm'} onClick={handleSavePanels} disabled={!user_panels}>Update</Button>
                    <Button variant={'destructive'} size={'sm'} onClick={deleteSavePanels}>Delete</Button>
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}

export default SaveLayout