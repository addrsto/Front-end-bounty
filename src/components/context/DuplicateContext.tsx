import { createContext } from 'react';

export interface ContextType {
    isduplicate: boolean,
    toggleisduplicate: (value: boolean) => void;
}

// React.createContext< ContextType > ???
const DuplicateContext = createContext({});

export default DuplicateContext;
