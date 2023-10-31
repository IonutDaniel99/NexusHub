import { useEffect, useState } from 'react';
import axios from 'axios';

export interface IFetchResponse<T> {
    data: T | null;
    error: any;
    isLoading: boolean;
}

const useAxiosFetch = (url: string, delay?: number): IFetchResponse<any> => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
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

        fetchData();
    }, [url, delay]);

    return { data, error, isLoading };
};

export default useAxiosFetch;
