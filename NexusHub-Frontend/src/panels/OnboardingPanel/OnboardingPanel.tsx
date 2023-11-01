import { OnboardingUrl } from '@/config';
import useAxiosFetch from '@/hooks/useAxios';
import React from 'react'

function OnboardingPanel() {
    const { data, error, isLoading } = useAxiosFetch(OnboardingUrl);

    return (
        <div>OnboardingPanel = {data}</div>
    )
}

export default OnboardingPanel