import { ModeToggle } from '@/src/components/ui/mode-toggle'
import { ConsoleUrl } from '@/src/config';
import useAxiosFetch from '@/src/hooks/useAxios';
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