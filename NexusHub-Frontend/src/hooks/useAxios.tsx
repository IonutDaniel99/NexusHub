import { useEffect, useState } from 'react';
import axios from 'axios';

export interface IFetchResponse {
    data: any | null;
    error: any;
    isLoading: boolean;
}

const useAxiosFetch = (url: string, delay?: number): [IFetchResponse, () => void] => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            // Simulate delay with setTimeout if a delay value is provided
            if (delay) {
                setTimeout(async () => {
                    const response = await axios.get(url);
                    setData(response.data);
                    setIsLoading(false);
                }, delay);
            } else {
                const response = await axios.get(url);
                setData(response.data);
                setIsLoading(false);
            }
        } catch (error: any) {
            setError(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url, delay]);

    const fetchAgain = () => {
        setIsLoading(true);
        fetchData();
    };

    const fetchResponse: IFetchResponse = { data, error, isLoading };
    return [fetchResponse, fetchAgain];
};

export default useAxiosFetch;
