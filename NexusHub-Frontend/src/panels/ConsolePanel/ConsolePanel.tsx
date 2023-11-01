import { ModeToggle } from '@/components/ui/mode-toggle'
import { ConsoleUrl } from '@/config';
import useAxiosFetch from '@/hooks/useAxios';
import React from 'react'

function ConsolePanel() {

    const { data, error, isLoading } = useAxiosFetch(ConsoleUrl + '/');

    return (
        <div>
            console:{data}
            <ModeToggle />
        </div>
    )
}

export default ConsolePanel