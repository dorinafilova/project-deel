import { useState, useEffect } from 'react';
import { DEBOUNCE_TIME_IN_MS } from '../utils/constants';

const useDebounce = (value: string) => {
    const [state, setState] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setState(value), DEBOUNCE_TIME_IN_MS);
        
        return () => clearTimeout(handler);
    }, [value]);
    return state;
}
export default useDebounce;