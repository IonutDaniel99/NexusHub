import {ConsoleUrl} from '@/configs/GlobalsServicesURL';
import useAxiosFetch, {IFetchResponse} from '@/hooks/useAxios';
import React from 'react'

function ConsolePanel() {

    const [fetchResponse, fetchAgain] = useAxiosFetch(ConsoleUrl + '/') as [IFetchResponse, () => void];
    const {data, error, isLoading} = fetchResponse;


    return (
        <div>
            console: {data}
        </div>
    )
}

export default ConsolePanel