import { ModeToggle } from '@/components/ui/mode-toggle'
import { ConsoleUrl } from '@/config';
import useAxiosFetch, { IFetchResponse } from '@/hooks/useAxios';
import React from 'react'

function ConsolePanel() {

    const [fetchResponse, fetchAgain] = useAxiosFetch(ConsoleUrl + '/') as [IFetchResponse, () => void];
    const { data, error, isLoading } = fetchResponse;


    return (
        <div>
            console:{data}
            <ModeToggle />
        </div>
    )
}

export default ConsolePanel