import { createContext } from 'react';
import { Entry } from '../../interfaces';


interface ContextProps {
    entries: Entry[];

    // Methods
    addNewEntry: (description: string) => void;
    updateEntry: (entry: Entry, showAnackbar?: boolean) => void;

}

export const EntriesContext = createContext({} as ContextProps )
