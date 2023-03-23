import { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from "@mui/material"

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '@/context/ui';


export const NewEntry = () => {

    const { addNewEntry } = useContext( EntriesContext )
    const { isAddingEntry, setIsAddingEntry } = useContext( UIContext )

    //  const [isAdding, setIsAdding] = useState(false);

    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const onTextFieldChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
        setInputValue( event.target.value )
    }

    

    const onSave = () => {

        if ( inputValue.length === 0 ) return;

        addNewEntry( inputValue )
        setIsAddingEntry( false )
        setTouched( false )
        setInputValue('')
                
        

    }
    
  return (
    <Box sx={{ marginBottom: 1, paddingX: 1 }} >
        {
            isAddingEntry ? (
                <>
                    <TextField 
                        autoFocus
                        fullWidth
                        sx={{ marginTop: 1, marginBottom: 1 }}
                        placeholder= 'Nueva entrada'
                        multiline
                        label = "Nueva entrada"
                        helperText= { inputValue.length <= 0 && touched && 'Ingrese un valor' }
                        error= { inputValue.length <= 0 && touched }
                        value={ inputValue }
                        onChange= { onTextFieldChanged }
                        onBlur={ () => setTouched( true) }
                    />

                    <Box display='flex' justifyContent='space-between' >
                        <Button
                            variant="text"
                            onClick={ () => setIsAddingEntry( false ) }
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            startIcon= { <SaveOutlinedIcon /> }
                            onClick={ onSave }
                        >
                            Guardar
                        </Button>

                    </Box>
                </>
            )
            : (
                <Button
                    startIcon= { <AddIcon /> }
                    fullWidth
                    variant="outlined"
                    onClick={ () => setIsAddingEntry( true ) }
                >
                    Agregar Tarea

                </Button>

            )
        }
    
    </Box>
  )
}
    