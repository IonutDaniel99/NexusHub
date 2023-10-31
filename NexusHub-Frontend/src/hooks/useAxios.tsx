import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

export interface IFetchResponse<T> {
    data: T | null;
    error: AxiosError<any> | null;
    isLoading: boolean;
}

const useAxiosFetch = (url: string): IFetchResponse<any> => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, error, isLoading };
};

export default useAxiosFetch;
