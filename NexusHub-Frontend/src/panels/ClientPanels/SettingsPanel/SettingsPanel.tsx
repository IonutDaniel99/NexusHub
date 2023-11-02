import SaveLayout from './components/SaveLayout'
import {
    Accordion,
} from "@/components/ui/accordion"

function SettingsPanel() {
    return (
        <div className='w-full h-full p-4 bg-background'>
            <Accordion type="single" collapsible>
                <SaveLayout />
            </Accordion>
        </div>

    )
}

export default SettingsPanel