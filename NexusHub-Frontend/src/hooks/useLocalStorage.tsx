import { useState } from 'react';

const useLocalStorage = (key: string, initialValue?: any) => {
    // Get the initial value from localStorage or use the provided initialValue
    const storedValue = localStorage.getItem(key) || initialValue;

    // Create a state variable to hold the current value
    const [value, setValue] = useState(storedValue);

    // Function to set a new value in localStorage and update the state
    const setStoredValue = (newValue: string) => {
        localStorage.setItem(key, newValue);
        setValue(newValue);
    };

    // Function to remove the item from localStorage and reset the state
    const removeStoredValue = () => {
        localStorage.removeItem(key);
        setValue(initialValue);
    };

    return [value, setStoredValue, removeStoredValue];
};

export default useLocalStorage;
