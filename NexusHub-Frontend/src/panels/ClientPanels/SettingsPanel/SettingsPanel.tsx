import SaveLayout from './components/SaveLayout'
import {
    Accordion,
} from "@/components/ui/accordion"
import ThemeToggle from './components/ThemeToggle'
import { Checkbox } from '@/components/ui/checkbox'
import React, { useState } from 'react'
import { CheckedState } from '@radix-ui/react-checkbox'
import LocalStorage from './components/LocalStorage'

function SettingsPanel() {
    const [isDevMode, setIsDevMode] = useState<CheckedState>(false)
    return (
        <div className='relative w-full h-full p-4 overflow-auto bg-background text-foreground'>
            <Accordion type="multiple" className='flex flex-col gap-6'>
                <SaveLayout />
                <ThemeToggle />
                <div className='sticky flex items-center justify-end gap-2 opacity-20'>
                    <Checkbox id="devMode" onCheckedChange={(checked) => setIsDevMode(checked)} />
                    <label
                        htmlFor="devMode"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Developer Mode (Use at risk)
                    </label>
                </div>
                {isDevMode && (
                    <LocalStorage />
                )}
            </Accordion>
        </div>
    )
}

export default SettingsPanel