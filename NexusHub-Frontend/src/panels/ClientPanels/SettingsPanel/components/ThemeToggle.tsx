import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/ui/theme-provider'
import React from 'react'

function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <AccordionItem value="ThemeChange">
            <AccordionTrigger className="h-4 pb-6 text-lg font-medium outline-none">Appearance</AccordionTrigger>
            <AccordionContent>
                <p className="text-sm text-muted-foreground">
                    Customize the appearance of the app. Current theme is <b>{theme}</b>.
                </p>
                <div className='flex flex-row items-center gap-4 p-4'>
                    <Button variant={'default'} size={'sm'} onClick={() => setTheme("light")} disabled={theme === "light"}>Light</Button>
                    <Button variant={'default'} size={'sm'} onClick={() => setTheme("dark")} disabled={theme === "dark"}>Dark</Button>
                    <Button variant={'default'} size={'sm'} onClick={() => setTheme("system")} disabled={theme === "system"}>System</Button>
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}

export default ThemeToggle