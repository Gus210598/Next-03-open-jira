import { FC, useContext, useMemo, DragEvent } from 'react';

import { List, Paper } from "@mui/material"

import { EntryStatus } from "@/interfaces"
import { UIContext } from '@/context/ui';

import { EntryCard } from "./"
import { EntriesContext } from '../../context/entries';
import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext( EntriesContext );

    const { isDragging, endDragging } = useContext( UIContext )

    const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [ entries ]  ) 

    const allowDrop = ( event: DragEvent<HTMLDivElement> ) => {
        event.preventDefault();
    }
    
    const onDropEntry = ( event: DragEvent<HTMLDivElement> )  => {
        const id = event.dataTransfer.getData('text');

        const entry = entries.find( e => e._id === id )!;
        entry.status = status;
        updateEntry( entry );
        endDragging();
        
    }
    
  return (

    // TODO: vamos hacer drop
    <div
        onDrop={ onDropEntry }
        onDragOver= { allowDrop }
        className= { isDragging ? styles.dragging : '' }
    >
        <Paper sx={{ 
                height: 'calc(100vh - 180px)', 
                // overflow: 'scroll', 

                // ! Personaliza el scroll se ve mucho mejor con esto
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  width: "8px",
                  bgcolor: "#454545",
                }, 
                
                backgroundColor: 'transparent',
                padding: '1px 5px' 
            }}>

            {/* TODO: cambiaraá dependiendo si esa haciendo drag o no */}
            <List sx={{ opacity: isDragging ? 0.2 :1, transition : 'all .3s'  }} >
                {
                    entriesByStatus.map( entry => (
                        <EntryCard key={ entry._id } entry= { entry } />
                    ))
                }
           
            </List>
        </Paper>
    </div>
  )
}
