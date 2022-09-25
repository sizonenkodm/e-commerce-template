import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialState) => {
    const get = () => {
        const storage = localStorage.getItem(key);
        return !storage ? initialState : (key === 'page') ? +storage : storage;
    };
    const [value, setValue] = useState(get);

    useEffect(() => {
        localStorage.setItem(key, value);
    }, [value]);

    return [value, setValue];
};

export default useLocalStorage;