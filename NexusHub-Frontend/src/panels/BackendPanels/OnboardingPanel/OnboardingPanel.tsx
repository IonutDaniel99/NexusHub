import {OnboardingUrl} from '@/configs/GlobalsServicesURL';
import useAxiosFetch, {IFetchResponse} from '@/hooks/useAxios';
import React from 'react'

function OnboardingPanel() {
    const [fetchResponse, fetchAgain] = useAxiosFetch(OnboardingUrl + '/') as [IFetchResponse, () => void];
    const {data, error, isLoading} = fetchResponse;


    return (
        <div>OnboardingPanel = {data}</div>
    )
}

export default OnboardingPanel