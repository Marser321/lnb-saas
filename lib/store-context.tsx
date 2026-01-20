import { createContext, useContext, Dispatch } from 'react';

// Using console.log to debug context usage
export const StoreContext = createContext<Dispatch<any> | null>(null);

export function useStore() {
    return useContext(StoreContext);
}
