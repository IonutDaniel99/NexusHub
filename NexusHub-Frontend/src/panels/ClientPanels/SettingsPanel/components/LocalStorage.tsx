import React from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/ui/theme-provider'

function LocalStorage() {

    function clearLocalStorage() {
        localStorage.clear();
    }

    function clearSessionStorage() {
        sessionStorage.clear();
    }

    function clearCookiesStorage() {
        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
    }

    function clearAllStorage() {
        clearLocalStorage();
        clearSessionStorage();
        clearCookiesStorage();
    }

    return (
        <AccordionItem value="LocalStorageOptions">
            <AccordionTrigger className="h-4 pb-6 text-lg font-medium outline-none">Local Storage</AccordionTrigger>
            <AccordionContent>
                <div className='grid items-center grid-cols-2 gap-4 p-4'>
                    <Button variant={'destructive'} size={'sm'} onClick={clearLocalStorage}>Clear Local Storage</Button>
                    <Button variant={'destructive'} size={'sm'} onClick={clearSessionStorage}>Clear Session Storage</Button>
                    <Button variant={'destructive'} size={'sm'} onClick={clearAllStorage}>Clear Cookies</Button>
                    <Button variant={'destructive'} size={'sm'} >Clear Everything</Button>
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}

export default LocalStorage
