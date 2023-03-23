import { FC, ReactNode, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Entry } from '@/interfaces';
import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
    entries: Entry[];
}

interface Props {
    children: ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pendiewnte 1 del _id para poner algo que salga por sistema',
            status: 'pending',
            createAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: 'In-Progress 2 2 2 del _id para poner algo que salga por sistema',
            status: 'in-progress',
            createAt: Date.now()-1000000,
        },
        {
            _id: uuidv4(),
            description: 'Finished 3 3 3 del _id para poner algo que salga por sistema',
            status: 'finished',
            createAt: Date.now()-100000,
        },
    ],
}


export const EntriesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const addNewEntry = ( description: string ) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createAt: Date.now(),
            status: 'pending'
        }

        dispatch({ type: '[Entry] Add-Entry', payload: newEntry })
    }

    const updateEntry = ( entry: Entry ) => {
        dispatch({ type: '[Entry] Entry-Updated', payload: entry });
    }

  return (
    <EntriesContext.Provider value={{
        ...state,

        // Methods
        addNewEntry,
        updateEntry,
    }} >
        { children }
    </EntriesContext.Provider>
  )
}
