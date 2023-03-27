import { FC, ReactNode, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';


import { Entry } from '@/interfaces';
import { EntriesContext, entriesReducer } from './';
import { entriesApi } from '../../apis';

export interface EntriesState {
    entries: Entry[];
}

interface Props {
    children: ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}


export const EntriesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
    const { enqueueSnackbar } = useSnackbar();


    const addNewEntry = async( description: string ) => {
        // * Realizado por el frontEnd para para sun funcionalidad hasta que el backEnd estuviera funcionando
        // const newEntry: Entry = {
        //     _id: uuidv4(),
        //     description,
        //     createdAt: Date.now(),
        //     status: 'pending'
        // }
       

        const { data } = await entriesApi.post<Entry>('/entries',{ description })
        
        dispatch({ type: '[Entry] Add-Entry', payload: data })
    }
    
    const updateEntry = async({ _id, description, status }: Entry, showAnackbar = false ) => {
        
        try {
            
            const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description, status })
            dispatch({ type: '[Entry] Entry-Updated', payload: data });

            if ( showAnackbar ) {
                // TODO: mostrar snackbar
                enqueueSnackbar('Entrada Actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }
        } catch (error) {
            console.log({ error });
        }
        
    }

    const refreshEntries = async() => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] Refresh-Data', payload: data })
    }

    useEffect(() => {
      refreshEntries();
    }, [])
    

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
