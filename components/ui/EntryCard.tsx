import { FC, DragEvent, useContext } from "react";
import { useRouter } from "next/router";

import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"

import { Entry } from "@/interfaces"
import { UIContext } from "@/context/ui";
import { dateFunctions } from "@/utils";



interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const router= useRouter();

    const { startDragging, endDragging } = useContext( UIContext );

    const onDragStart = ( event: DragEvent ) => {

        event.dataTransfer.setData( 'text', entry._id )

        // todo: Modificar el estado, para indicar que estoy haciendo drag
        startDragging();
    }

    const onDragEnd = () => {
        // TODO: cancelar on drag
        endDragging();
    }

    const onClick = () => {
        router.push(`/entries/${ entry._id }`)
    }

  return (
  
    <Card
        onClick={ onClick }
        sx={{ marginBottom: 1, position:'relative', zIndex: 999 }}
        // Eventos de drag
        draggable
        onDragStart={ onDragStart }
        onDragEnd= { onDragEnd }
        >
        <CardActionArea>
            <CardContent  >
                <Typography sx={{ whiteSpace: 'pre-line' }} >{ entry.description } </Typography>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }} >
                <Typography variant="body2" >{ dateFunctions.gerFormatDistanceToNow( entry.createdAt ) } </Typography>
            </CardActions>
        </CardActionArea>
        
    </Card>
   
  )
}
